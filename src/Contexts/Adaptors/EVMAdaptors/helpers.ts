import { CeloProvider } from "@celo-tools/celo-ethers-wrapper";
import { ethers, utils, BigNumber } from "ethers";
import {
  BridgeFactory,
  Erc20HandlerFactory,
} from "@chainsafe/chainbridge-contracts";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";

import { Erc20DetailedFactory } from "../../../Contracts/Erc20DetailedFactory";

import { EvmBridgeConfig, TokenConfig } from "../../../chainbridgeConfig";

const isCelo = (networkId?: number) =>
  [42220, 44787, 62320].includes(networkId ?? 0);

const getRpcProviderFromHttpUrl = (url: string) => {
  const urlInstance = new URL(url);

  if (urlInstance.username && urlInstance.password) {
    var urlInfo = {
      url: urlInstance.origin,
      user: urlInstance.username,
      password: urlInstance.password,
    };
    return new ethers.providers.StaticJsonRpcProvider(urlInfo);
  }
  return new ethers.providers.StaticJsonRpcProvider(url);
};

export function getProvider(destinationChainConfig?: any) {
  let provider: any;
  if (isCelo(destinationChainConfig?.networkId)) {
    provider = new CeloProvider(destinationChainConfig?.rpcUrl);
  } else if (destinationChainConfig?.rpcUrl.startsWith("wss")) {
    if (destinationChainConfig.rpcUrl.includes("infura")) {
      const parts = destinationChainConfig.rpcUrl.split("/");

      provider = new ethers.providers.InfuraWebSocketProvider(
        destinationChainConfig.networkId,
        parts[parts.length - 1]
      );
    }
    if (destinationChainConfig.rpcUrl.includes("alchemyapi")) {
      const parts = destinationChainConfig.rpcUrl.split("/");

      provider = new ethers.providers.AlchemyWebSocketProvider(
        destinationChainConfig.networkId,
        parts[parts.length - 1]
      );
    }
  } else {
    provider = getRpcProviderFromHttpUrl(destinationChainConfig?.rpcUrl);
  }
  return provider;
}

export async function hasTokenSupplies(
  destinationChain: EvmBridgeConfig,
  tokens: Tokens,
  token: TokenConfig,
  amount: number,
  tokenAddress: string
) {
  const destinationToken = destinationChain?.tokens.find(
    (_token: TokenConfig) => _token.resourceId === token.resourceId
  );
  if (
    destinationToken &&
    destinationChain !== undefined &&
    destinationChain.type === "Ethereum"
  ) {
    let provider = getProvider(destinationChain);
    await provider.ready;
    const erc20destinationToken = Erc20DetailedFactory.connect(
      destinationToken.address,
      provider
    );
    const destinationErc20Handler = (destinationChain as EvmBridgeConfig)
      .erc20HandlerAddress;

    const destinationErc20DHandlerInstance = Erc20HandlerFactory.connect(
      destinationErc20Handler,
      provider
    );
    const isMintable = await destinationErc20DHandlerInstance._burnList(
      destinationToken.address
    );
    if (isMintable) {
      console.log("token mintable on destination chain");
      return true;
    }
    const balanceTokens = await erc20destinationToken.balanceOf(
      destinationErc20Handler
    );
    const erc20Decimals =
      destinationToken.decimals ?? destinationChain.decimals;
    if (Number(utils.formatUnits(balanceTokens, erc20Decimals)) < amount) {
      console.log("Not enough token balance on destination chain!");
      return false;
    }
    return true;
  }
}

export async function getEIP1559FeeData(
  provider: ethers.providers.Web3Provider
): Promise<any> {
  try {
    const feeData = await provider.getFeeData();
    if (typeof feeData.maxFeePerGas !== "undefined") {
      return feeData;
    }
  } catch (error) {
    console.warn(error);
    console.warn(
      "Can't access fee data for EIP-1559, fallback to legacy transaction"
    );
  }
  return undefined;
}

export async function getPriceCompatibility(
  provider: ethers.providers.Web3Provider | undefined,
  homeChainConfig: any,
  gasPrice: number
) {
  let gasPriceCompatibility = undefined;
  if (provider) {
    const feeData = await getEIP1559FeeData(provider);
    if (!feeData) {
      gasPriceCompatibility = BigNumber.from(
        utils.parseUnits(
          (
            (homeChainConfig as EvmBridgeConfig).defaultGasPrice || gasPrice
          ).toString(),
          9
        )
      ).toString();
      console.log(
        `No fee data. gasPriceCompatibility is ${gasPriceCompatibility}`
      );
    } else if ((homeChainConfig as EvmBridgeConfig).gasPriceSuggestionEnabled) {
      gasPriceCompatibility = BigNumber.from(feeData.gasPrice);
      const increaseByPercents =
        (homeChainConfig as EvmBridgeConfig)
          .defaultGasPriceIncreaseInPercents || 0;
      console.log(
        `Has fee data. gasPriceCompatibility is ${gasPriceCompatibility}`
      );
      if (increaseByPercents > 0) {
        gasPriceCompatibility = gasPriceCompatibility
          .add(gasPriceCompatibility.div(increaseByPercents))
          .toString();
        console.log(
          `Increased. gasPriceCompatibility is ${gasPriceCompatibility}`
        );
      }
    }
  }
  return gasPriceCompatibility;
}

const getHexTokenCents = (decimalAmount: number, decimals: number) =>
  BigNumber.from(
    utils.parseUnits(decimalAmount.toString(), decimals)
  ).toHexString();

const getEthBridgeData = (decimalAmount: number, recipient: string) =>
  "0x" +
  utils.hexZeroPad(getHexTokenCents(decimalAmount, 10), 32).substr(2) +
  utils.hexZeroPad(utils.hexlify((recipient.length - 2) / 2), 32).substr(2) +
  recipient.substr(2);

export function getErc20ProposalHash(
  erc20AddressHandlerContract: string,
  decimalAmount: number,
  recipient: string
) {
  const data =
    erc20AddressHandlerContract +
    getEthBridgeData(decimalAmount, recipient).substr(2);
  return utils.keccak256(data);
}

export async function getTransferTxHashByNonce(
  destinationChain: EvmBridgeConfig,
  depositNonce: number
): Promise<any> {
  let provider = getProvider(destinationChain);
  await provider.ready;
  const bridgeContract = BridgeFactory.connect(
    (destinationChain as EvmBridgeConfig).bridgeAddress,
    provider
  );
  let eventFilter = bridgeContract.filters.ProposalEvent(
    null,
    depositNonce,
    VoteStatus.EXECUTED,
    null,
    null
  );
  const eventResult = await bridgeContract.queryFilter(eventFilter, -3000);
  console.log(
    'ProposalEvent with "executed" status: ' + JSON.stringify(eventResult)
  );
  return eventResult[0].transactionHash;
}

export enum VoteStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  PASSED = 2,
  EXECUTED = 3,
  CANCELLED = 4,
}
