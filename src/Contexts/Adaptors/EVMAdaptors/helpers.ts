import { CeloProvider } from "@celo-tools/celo-ethers-wrapper";
import { ethers, utils, BigNumber } from "ethers";
import { Erc20HandlerFactory } from "@chainsafe/chainbridge-contracts";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";

import { Erc20DetailedFactory } from "../../../Contracts/Erc20DetailedFactory";

import { EvmBridgeConfig, TokenConfig } from "../../../chainbridgeConfig";

const isCelo = (networkId?: number) =>
  [42220, 44787, 62320].includes(networkId ?? 0);

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
    provider = new ethers.providers.JsonRpcProvider(
      destinationChainConfig?.rpcUrl
    );
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
    if (Number(utils.formatUnits(balanceTokens)) < amount) {
      console.log("Not enough token balance on destination chain!");
      return false;
    }
    return true;
  }
}

export async function detectEIP1559MaxFeePerGas(
  provider: ethers.providers.Web3Provider
): Promise<boolean> {
  try {
    const feeData = await provider.getFeeData();
    if (typeof feeData.maxFeePerGas !== "undefined") {
      return true;
    }
  } catch (error) {
    console.warn(error);
    console.warn(
      "Can't access fee data for EIP-1559, fallback to legacy transaction"
    );
  }
  return false;
}

export async function getPriceCompatibility(
  provider: ethers.providers.Web3Provider | undefined,
  homeChainConfig: any,
  gasPrice: number
) {
  let gasPriceCompatibility = undefined;
  if (provider) {
    const hasMaxPrice = await detectEIP1559MaxFeePerGas(provider);
    if (!hasMaxPrice) {
      gasPriceCompatibility = BigNumber.from(
        utils.parseUnits(
          (
            (homeChainConfig as EvmBridgeConfig).defaultGasPrice || gasPrice
          ).toString(),
          9
        )
      ).toString();
    }
  }
  return gasPriceCompatibility;
}
