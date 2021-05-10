import React from "react";
import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { useWeb3 } from "@chainsafe/web3-context";
import { BigNumber, ethers, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { BridgeConfig, TokenConfig } from "../../chainbridgeConfig";
import { Erc20DetailedFactory } from "../../Contracts/Erc20DetailedFactory";
import { Weth } from "../../Contracts/Weth";
import { WethFactory } from "../../Contracts/WethFactory";
import { TransactionStatus, useNetworkManager } from "../NetworkManagerContext";
import {
  AddMessageAction,
  ResetAction,
} from "../Reducers/TransitMessageReducer";
import {
  DestinationChainAdaptor,
  IHomeBridgeProviderProps,
} from "./interfaces";
import { HomeBridgeContext } from "../HomeBridgeContext";

const resetAllowanceLogicFor = [
  "0xdac17f958d2ee523a2206206994597c13d831ec7", //USDT
  //Add other offending tokens here
];

export const EVMHomeAdaptorProvider = ({
  children,
}: IHomeBridgeProviderProps) => {
  const {
    isReady,
    network,
    provider,
    gasPrice,
    address,
    tokens,
    wallet,
    ethBalance,
  } = useWeb3();

  const {
    homeChainConfig,
    setTransactionStatus,
    setDepositNonce,
  } = useNetworkManager();

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
    if (homeChainConfig && network && isReady) {
      const signer = provider?.getSigner();
      if (!signer) {
        console.log("No signer");
        return;
      }

      const bridge = BridgeFactory.connect(
        homeChainConfig.bridgeAddress,
        signer
      );
      setHomeBridge(bridge);

      const wrapperToken = homeChainConfig.tokens.find(
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
  }, [homeChainConfig, network, isReady, provider]);

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

  const handleConnect = useCallback(async () => {
    if (wallet && wallet.connect) {
      await wallet.connect();
    }
  }, [wallet]);

  const deposit = useCallback(
    async (
      amount: number,
      recipient: string,
      tokenAddress: string,
      destinationChainId: number
    ) => {
      if (!homeChainConfig || !homeBridge) {
        console.error("Home bridge contract is not instantiated");
        return;
      }
      const signer = provider?.getSigner();
      if (!address || !signer) {
        console.log("No signer");
        return;
      }

      const token = homeChainConfig.tokens.find(
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
          homeChainConfig.erc20HandlerAddress
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
                homeChainConfig.erc20HandlerAddress,
                BigNumber.from(utils.parseUnits("0", erc20Decimals)),
                {
                  gasPrice: BigNumber.from(
                    utils.parseUnits(
                      (homeChainConfig.defaultGasPrice || gasPrice).toString(),
                      9
                    )
                  ).toString(),
                }
              )
            ).wait(1);
          }
          await (
            await erc20.approve(
              homeChainConfig.erc20HandlerAddress,
              BigNumber.from(
                utils.parseUnits(amount.toString(), erc20Decimals)
              ),
              {
                gasPrice: BigNumber.from(
                  utils.parseUnits(
                    (homeChainConfig.defaultGasPrice || gasPrice).toString(),
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
              (homeChainConfig.defaultGasPrice || gasPrice).toString(),
              9
            ),
            value: utils.parseUnits((bridgeFee || 0).toString(), 18),
          })
        ).wait();
        return Promise.resolve();
      } catch (error) {}
    },
    [
      homeBridge,
      address,
      bridgeFee,
      homeChainConfig,
      gasPrice,
      provider,
      setDepositNonce,
      setTransactionStatus,
      tokens,
    ]
  );

  return (
    <HomeBridgeContext.Provider
      value={{
        connect: handleConnect,
        bridgeFee,
        deposit,
        depositAmount,
        selectedToken,
        setDepositAmount,
        setSelectedToken,
        tokens,
        relayerThreshold,
        wrapTokenConfig,
        wrapper,
        isReady,
        chainConfig: homeChainConfig,
        address,
        nativeTokenBalance: ethBalance,
      }}
    >
      {children}
    </HomeBridgeContext.Provider>
  );
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

  useEffect(() => {
    let provider;
    if (chainConfig?.rpcUrl.startsWith("wss")) {
      if (chainConfig.rpcUrl.includes("infura")) {
        const parts = chainConfig.rpcUrl.split("/");

        provider = new ethers.providers.InfuraWebSocketProvider(
          chainConfig.networkId,
          parts[parts.length - 1]
        );
      }
      if (chainConfig.rpcUrl.includes("alchemyapi")) {
        const parts = chainConfig.rpcUrl.split("/");

        provider = new ethers.providers.AlchemyWebSocketProvider(
          chainConfig.networkId,
          parts[parts.length - 1]
        );
      }
    } else {
      provider = new ethers.providers.JsonRpcProvider(chainConfig?.rpcUrl);
    }
    if (provider) {
      const bridge = BridgeFactory.connect(
        chainConfig?.bridgeAddress,
        provider
      );
      setDestinationBridge(bridge);
    }
  }, [chainConfig]);

  useEffect(() => {
    if (homeChainId && destinationBridge && depositNonce) {
      destinationBridge.on(
        destinationBridge.filters.ProposalEvent(
          homeChainId,
          BigNumber.from(depositNonce),
          null,
          null,
          null
        ),
        (originChainId, depositNonce, status, resourceId, dataHash, tx) => {
          switch (BigNumber.from(status).toNumber()) {
            case 1:
              tokensDispatch({
                type: "addMessage",
                payload: `Proposal created on ${chainConfig.name}`,
              });
              break;
            case 2:
              tokensDispatch({
                type: "addMessage",
                payload: `Proposal has passed. Executing...`,
              });
              break;
            case 3:
              setTransactionStatus("Transfer Completed");
              setTransferTxHash(tx.transactionHash);
              break;
            case 4:
              setTransactionStatus("Transfer Aborted");
              setTransferTxHash(tx.transactionHash);
              break;
          }
        }
      );

      destinationBridge.on(
        destinationBridge.filters.ProposalVote(
          homeChainId,
          BigNumber.from(depositNonce),
          null,
          null
        ),
        async (originChainId, depositNonce, status, resourceId, tx) => {
          const txReceipt = await tx.getTransactionReceipt();
          if (txReceipt.status === 1) {
            setDepositVotes(depositVotes + 1);
          }
          tokensDispatch({
            type: "addMessage",
            payload: {
              address: String(txReceipt.from),
              signed: txReceipt.status === 1 ? "Confirmed" : "Rejected",
            },
          });
        }
      );
    }
    return () => {
      //@ts-ignore
      destinationBridge?.removeAllListeners();
    };
  }, [
    depositNonce,
    homeChainId,
    destinationBridge,
    depositVotes,
    chainConfig,
    setDepositVotes,
    setTransactionStatus,
    setTransferTxHash,
    tokensDispatch,
  ]);

  return {
    chainConfig: chainConfig,
  };
};
