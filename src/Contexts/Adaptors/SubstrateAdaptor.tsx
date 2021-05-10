import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { useWeb3 } from "@chainsafe/web3-context";
import { BigNumber, ethers, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { BridgeConfig, TokenConfig } from "../../chainbridgeConfig";
import { Erc20DetailedFactory } from "../../Contracts/Erc20DetailedFactory";
import { Weth } from "../../Contracts/Weth";
import { WethFactory } from "../../Contracts/WethFactory";
import { TransactionStatus } from "../ChainbridgeContext";
import {
  AddMessageAction,
  ResetAction,
} from "../Reducers/TransitMessageReducer";
import { DestinationChainAdaptor, HomeChainAdaptor } from "./interfaces";

const resetAllowanceLogicFor = [
  "0xdac17f958d2ee523a2206206994597c13d831ec7", //USDT
  //Add other offending tokens here
];

export const EVMHomeAdaptorFactory = (
  chainConfig: BridgeConfig,
  setTransactionStatus: (message: TransactionStatus) => void,
  setDepositNonce: (nonce: string) => void,
  setTransferTxHash: (txHash: string) => void
): HomeChainAdaptor => {
  // const [homeChain, setHomeChain] = useState(chainConfig)
  const { isReady, network, provider, gasPrice, address, tokens } = useWeb3();
  const [homeBridge, setHomeBridge] = useState<Bridge | undefined>(undefined);
  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>(
    undefined
  );
  const [bridgeFee, setBridgeFee] = useState<number | undefined>();

  const [depositAmount, setDepositAmount] = useState<number | undefined>();
  const [selectedToken, setSelectedToken] = useState<string>("");

  // Contracts
  const [wrapper, setWrapper] = useState<Weth | undefined>(undefined);
  const [wrapTokenConfig, setWrapperConfig] = useState<TokenConfig | undefined>(
    undefined
  );

  useEffect(() => {
    if (network && isReady) {
      const signer = provider?.getSigner();
      if (!signer) {
        console.log("No signer");
        return;
      }

      const bridge = BridgeFactory.connect(chainConfig.bridgeAddress, signer);
      setHomeBridge(bridge);

      const wrapperToken = chainConfig.tokens.find(
        (token) => token.isNativeWrappedToken
      );

      if (!wrapperToken) {
        setWrapperConfig(undefined);
        setWrapper(undefined);
      } else {
        setWrapperConfig(wrapperToken);
        const connectedWeth = WethFactory.connect(wrapperToken.address, signer);
        setWrapper(connectedWeth);
      }
    }
  }, [chainConfig, network, isReady]);

  useEffect(() => {
    const getRelayerThreshold = async () => {
      if (homeBridge) {
        const threshold = BigNumber.from(
          await homeBridge._relayerThreshold()
        ).toNumber();
        setRelayerThreshold(threshold);
      }
    };
    const getBridgeFee = async () => {
      if (homeBridge) {
        const bridgeFee = Number(utils.formatEther(await homeBridge._fee()));
        setBridgeFee(bridgeFee);
      }
    };
    getRelayerThreshold();
    getBridgeFee();
  }, [homeBridge]);

  const deposit = useCallback(
    async (
      amount: number,
      recipient: string,
      tokenAddress: string,
      destinationChainId: number
    ) => {
      if (!homeBridge) {
        console.error("Home bridge contract is not instantiated");
        return;
      }
      const signer = provider?.getSigner();
      if (!address || !signer) {
        console.log("No signer");
        return;
      }

      const token = chainConfig.tokens.find(
        (token) => token.address === tokenAddress
      );

      if (!token) {
        console.log("Invalid token selected");
        return;
      }
      setTransactionStatus("Initializing Transfer");
      setDepositAmount(amount);
      setSelectedToken(tokenAddress);
      const erc20 = Erc20DetailedFactory.connect(tokenAddress, signer);
      const erc20Decimals = tokens[tokenAddress].decimals;

      const data =
        "0x" +
        utils
          .hexZeroPad(
            // TODO Wire up dynamic token decimals
            BigNumber.from(
              utils.parseUnits(amount.toString(), erc20Decimals)
            ).toHexString(),
            32
          )
          .substr(2) + // Deposit Amount (32 bytes)
        utils
          .hexZeroPad(utils.hexlify((recipient.length - 2) / 2), 32)
          .substr(2) + // len(recipientAddress) (32 bytes)
        recipient.substr(2); // recipientAddress (?? bytes)

      try {
        const currentAllowance = await erc20.allowance(
          address,
          chainConfig.erc20HandlerAddress
        );

        if (
          Number(utils.formatUnits(currentAllowance, erc20Decimals)) < amount
        ) {
          if (
            Number(utils.formatUnits(currentAllowance, erc20Decimals)) > 0 &&
            resetAllowanceLogicFor.includes(tokenAddress)
          ) {
            //We need to reset the user's allowance to 0 before we give them a new allowance
            //TODO Should we alert the user this is happening here?
            await (
              await erc20.approve(
                chainConfig.erc20HandlerAddress,
                BigNumber.from(utils.parseUnits("0", erc20Decimals)),
                {
                  gasPrice: BigNumber.from(
                    utils.parseUnits(
                      (chainConfig.defaultGasPrice || gasPrice).toString(),
                      9
                    )
                  ).toString(),
                }
              )
            ).wait(1);
          }
          await (
            await erc20.approve(
              chainConfig.erc20HandlerAddress,
              BigNumber.from(
                utils.parseUnits(amount.toString(), erc20Decimals)
              ),
              {
                gasPrice: BigNumber.from(
                  utils.parseUnits(
                    (chainConfig.defaultGasPrice || gasPrice).toString(),
                    9
                  )
                ).toString(),
              }
            )
          ).wait(1);
        }

        homeBridge.once(
          homeBridge.filters.Deposit(
            destinationChainId,
            token.resourceId,
            null
          ),
          (destChainId, resourceId, depositNonce) => {
            setDepositNonce(`${depositNonce.toString()}`);
            setTransactionStatus("In Transit");
          }
        );

        await (
          await homeBridge.deposit(destinationChainId, token.resourceId, data, {
            gasPrice: utils.parseUnits(
              (chainConfig.defaultGasPrice || gasPrice).toString(),
              9
            ),
            value: utils.parseUnits((bridgeFee || 0).toString(), 18),
          })
        ).wait();
        return Promise.resolve();
      } catch (error) {}
    },
    [homeBridge]
  );

  return {
    chainConfig,
    bridgeFee,
    deposit,
    depositAmount,
    selectedToken,
    setDepositAmount,
    setSelectedToken,
    setTransferTxHash,
    relayerThreshold,
    wrapTokenConfig,
    wrapper,
  };
};

export const EVMDestinationAdaptorFactory = (
  chainConfig: BridgeConfig,
  homeChainId: number,
  depositNonce: string,
  depositVotes: number,
  setDepositVotes: (votes: number) => void,
  tokensDispatch: (action: AddMessageAction | ResetAction) => void,
  setTransactionStatus: (message: TransactionStatus) => void,
  setTransferTxHash: (txHash: string) => void
): DestinationChainAdaptor => {
  const [destinationBridge, setDestinationBridge] = useState<
    Bridge | undefined
  >(undefined);

  return {
    chainConfig: chainConfig,
  };
};