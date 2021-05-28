import React from "react";
import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { useWeb3 } from "@chainsafe/web3-context";
import { BigNumber, ethers, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { BridgeConfig, TokenConfig } from "../../chainbridgeConfig";
import { Erc20DetailedFactory } from "../../Contracts/Erc20DetailedFactory";
import { Weth } from "../../Contracts/Weth";
import { WethFactory } from "../../Contracts/WethFactory";
import { useNetworkManager } from "../NetworkManagerContext";
import {
  IDestinationBridgeProviderProps,
  IHomeBridgeProviderProps,
} from "./interfaces";
import { HomeBridgeContext } from "../HomeBridgeContext";
import { DestinationBridgeContext } from "../DestinationBridgeContext";
import { parseUnits } from "ethers/lib/utils";

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
    checkIsReady,
    onboard,
    ethBalance,
  } = useWeb3();

  const getNetworkName = (id: any) => {
    switch (Number(id)) {
      case 1337:
        return "Localhost";
      case 1:
        return "Mainnet";
      case 3:
        return "Ropsten";
      case 4:
        return "Rinkeby";
      case 5:
        return "Goerli";
      case 6:
        return "Kotti";
      case 42:
        return "Kovan";
      case 61:
        return "Ethereum Classic - Mainnet";
      default:
        return "Other";
    }
  };

  const {
    homeChainConfig,
    setTransactionStatus,
    setDepositNonce,
    handleSetHomeChain,
    homeChains,
    setNetworkId,
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

  const [initialised, setInitialised] = useState<"start" | "select" | "ready">(
    "start"
  );
  useEffect(() => {
    if (initialised === "start") {
      onboard?.walletSelect("metamask").then((success) => {
        if (success) {
          setInitialised("select");
        }
      });
    } else if (initialised === "select") {
      checkIsReady().then((success) => {
        if (success) {
          setInitialised("ready");
        }
      });
    }
  }, [provider, initialised, onboard, checkIsReady]);

  useEffect(() => {
    if (initialised !== "ready") return;
    try {
      if (provider) {
        const signer = provider?.getSigner();
        if (!signer) {
          console.log("No signer");
          return;
        }

        if (network && !homeChainConfig) {
          const chain = homeChains.find(
            (chain: BridgeConfig) => chain.networkId === network
          );
          setNetworkId(network);
          if (chain) {
            handleSetHomeChain(chain.chainId);
          }
        }

        if (homeChainConfig && network && isReady) {
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
            const connectedWeth = WethFactory.connect(
              wrapperToken.address,
              signer
            );
            setWrapper(connectedWeth);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    homeChainConfig,
    handleSetHomeChain,
    wallet,
    homeChains,
    network,
    isReady,
    provider,
    initialised,
    checkIsReady,
    setNetworkId,
  ]);

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
    if (wallet && wallet.connect && network) {
      await wallet.connect();
    }
  }, [wallet, network]);

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

  const wrapToken = async (value: number): Promise<string> => {
    if (!wrapTokenConfig || !wrapper?.deposit || !homeChainConfig)
      return "not ready";

    try {
      const tx = await wrapper.deposit({
        value: parseUnits(`${value}`, homeChainConfig.decimals),
        gasPrice: BigNumber.from(
          utils.parseUnits(
            (homeChainConfig?.defaultGasPrice || gasPrice).toString(),
            9
          )
        ).toString(),
      });

      await tx?.wait();
      if (tx?.hash) {
        return tx?.hash;
      } else {
        return "";
      }
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  const unwrapToken = async (value: number): Promise<string> => {
    if (!wrapTokenConfig || !wrapper?.withdraw || !homeChainConfig)
      return "not ready";

    try {
      const tx = await wrapper.deposit({
        value: parseUnits(`${value}`, homeChainConfig.decimals),
        gasPrice: BigNumber.from(
          utils.parseUnits(
            (homeChainConfig?.defaultGasPrice || gasPrice).toString(),
            9
          )
        ).toString(),
      });

      await tx?.wait();
      if (tx?.hash) {
        return tx?.hash;
      } else {
        return "";
      }
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  return (
    <HomeBridgeContext.Provider
      value={{
        connect: handleConnect,
        getNetworkName,
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
        wrapToken,
        unwrapToken,
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

export const EVMDestinationAdaptorProvider = ({
  children,
}: IDestinationBridgeProviderProps) => {
  console.log("EVM destination loaded");
  const {
    depositNonce,
    destinationChainConfig,
    homeChainConfig,
    tokensDispatch,
    setTransactionStatus,
    setTransferTxHash,
    setDepositVotes,
    depositVotes,
  } = useNetworkManager();

  const [destinationBridge, setDestinationBridge] = useState<
    Bridge | undefined
  >(undefined);

  useEffect(() => {
    let provider;
    if (destinationChainConfig?.rpcUrl.startsWith("wss")) {
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
    if (destinationChainConfig && provider) {
      const bridge = BridgeFactory.connect(
        destinationChainConfig.bridgeAddress,
        provider
      );
      setDestinationBridge(bridge);
    }
  }, [destinationChainConfig]);

  useEffect(() => {
    if (
      destinationChainConfig &&
      homeChainConfig?.chainId &&
      destinationBridge &&
      depositNonce
    ) {
      destinationBridge.on(
        destinationBridge.filters.ProposalEvent(
          homeChainConfig.chainId,
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
                payload: `Proposal created on ${destinationChainConfig.name}`,
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
          homeChainConfig.chainId,
          BigNumber.from(depositNonce),
          null,
          null
        ),
        async (originChainId, depositNonce, status, resourceId, tx) => {
          debugger;
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
    homeChainConfig,
    destinationBridge,
    depositVotes,
    destinationChainConfig,
    setDepositVotes,
    setTransactionStatus,
    setTransferTxHash,
    tokensDispatch,
  ]);

  return (
    <DestinationBridgeContext.Provider value={{}}>
      {children}
    </DestinationBridgeContext.Provider>
  );
};
