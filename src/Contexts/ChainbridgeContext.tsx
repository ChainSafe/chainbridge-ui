import { useWeb3 } from "@chainsafe/web3-context";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import {
  BigNumber,
  BigNumberish,
  ContractTransaction,
  ethers,
  Overrides,
  PayableOverrides,
  utils,
} from "ethers";
import { Erc20DetailedFactory } from "../Contracts/Erc20DetailedFactory";
import {
  BridgeConfig,
  chainbridgeConfig,
  TokenConfig,
} from "../chainbridgeConfig";
import { transitMessageReducer } from "./Reducers/TransitMessageReducer";
import { Weth } from "../Contracts/Weth";
import { WethFactory } from "../Contracts/WethFactory";

interface IChainbridgeContextProps {
  children: React.ReactNode | React.ReactNode[];
}

export type Vote = {
  address: string;
  signed: "Confirmed" | "Rejected";
};

const resetAllowanceLogicFor = [
  "0xdac17f958d2ee523a2206206994597c13d831ec7".toLowerCase(), //USDT
  //Add other offending tokens here
];

type ChainbridgeContext = {
  homeChain?: BridgeConfig;
  destinationChain?: BridgeConfig;
  destinationChains: Array<{ chainId: number; name: string }>;
  setDestinationChain(chainId: number): void;
  deposit(
    amount: number,
    recipient: string,
    tokenAddress: string
  ): Promise<void>;
  resetDeposit(): void;
  transactionStatus?: TransactionStatus;
  depositVotes: number;
  relayerThreshold?: number;
  depositNonce?: string;
  inTransitMessages: Array<string | Vote>;
  depositAmount?: number;
  bridgeFee?: number;
  transferTxHash?: string;
  selectedToken?: string;
  wrapToken:
    | ((
        overrides?: PayableOverrides | undefined
      ) => Promise<ContractTransaction>)
    | undefined;
  unwrapToken:
    | ((
        wad: BigNumberish,
        overrides?: Overrides | undefined
      ) => Promise<ContractTransaction>)
    | undefined;
  wrapTokenConfig: TokenConfig | undefined;
  transactionStatusReason: string | undefined;
  networkFee(tokenAddress: string, amount: number): Promise<BigNumber>;
};

type TransactionStatus =
  | "Initializing Transfer"
  | "In Transit"
  | "Transfer Completed"
  | "Transfer Aborted";

const ChainbridgeContext = React.createContext<ChainbridgeContext | undefined>(
  undefined
);

const ChainbridgeProvider = ({ children }: IChainbridgeContextProps) => {
  const { isReady, network, provider, gasPrice, address } = useWeb3();
  const [homeChain, setHomeChain] = useState<BridgeConfig | undefined>();
  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>(
    undefined
  );
  const [destinationChain, setDestinationChain] = useState<
    BridgeConfig | undefined
  >();
  const [destinationChains, setDestinationChains] = useState<BridgeConfig[]>(
    []
  );
  // Contracts
  const [homeBridge, setHomeBridge] = useState<Bridge | undefined>(undefined);
  const [wrapper, setWrapper] = useState<Weth | undefined>(undefined);
  const [wrapTokenConfig, setWrapperConfig] = useState<TokenConfig | undefined>(
    undefined
  );
  const [destinationBridge, setDestinationBridge] = useState<
    Bridge | undefined
  >(undefined);
  const [transactionStatus, setTransactionStatus] = useState<
    TransactionStatus | undefined
  >(undefined);
  const [transactionStatusReason, setTransactionStatusReason] = useState<
    string | undefined
  >(undefined);
  const [depositNonce, setDepositNonce] = useState<string | undefined>(
    undefined
  );
  const [depositVotes, setDepositVotes] = useState<number>(0);
  const [inTransitMessages, tokensDispatch] = useReducer(
    transitMessageReducer,
    []
  );
  const [depositAmount, setDepositAmount] = useState<number | undefined>();
  const [bridgeFee, setBridgeFee] = useState<number | undefined>();
  const [transferTxHash, setTransferTxHash] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<string>("");

  const resetDeposit = () => {
    chainbridgeConfig.chains.length > 2 && setDestinationChain(undefined);
    setTransactionStatus(undefined);
    setDepositNonce(undefined);
    setDepositVotes(0);
    setDepositAmount(undefined);
    tokensDispatch({
      type: "resetMessages",
    });
    setSelectedToken("");
  };

  const handleSetDestination = (chainId: number) => {
    const chain = destinationChains.find((c) => c.chainId === chainId);
    if (!chain) {
      throw new Error("Invalid destination chain selected");
    }
    setDestinationChain(chain);
  };

  useEffect(() => {
    if (destinationChain) {
      let provider;
      if (destinationChain?.rpcUrl.startsWith("wss")) {
        if (destinationChain.rpcUrl.includes("infura")) {
          const parts = destinationChain.rpcUrl.split("/");
          provider = new ethers.providers.InfuraWebSocketProvider(
            destinationChain.networkId,
            parts[parts.length - 1]
          );
        }
        if (destinationChain.rpcUrl.includes("alchemyapi")) {
          const parts = destinationChain.rpcUrl.split("/");
          provider = new ethers.providers.AlchemyWebSocketProvider(
            destinationChain.networkId,
            parts[parts.length - 1]
          );
        } else {
          provider = new ethers.providers.WebSocketProvider(
            destinationChain.rpcUrl,
            destinationChain.networkId
          );
        }
      } else {
        provider = new ethers.providers.JsonRpcProvider(
          destinationChain?.rpcUrl
        );
      }
      if (provider) {
        const bridge = BridgeFactory.connect(
          destinationChain?.bridgeAddress,
          provider
        );
        setDestinationBridge(bridge);
      }
    }
  }, [destinationChain]);

  useEffect(() => {
    if (network && isReady) {
      const home = chainbridgeConfig.chains.find(
        (c) => c.networkId === network
      );
      if (!home) {
        setHomeChain(undefined);
        setHomeBridge(undefined);
        setWrapperConfig(undefined);
        setWrapper(undefined);
        return;
      }
      setHomeChain(home);

      const signer = provider?.getSigner();
      if (!signer) {
        console.log("No signer");
        return;
      }

      const bridge = BridgeFactory.connect(home.bridgeAddress, signer);
      setHomeBridge(bridge);
      setDestinationChains(
        chainbridgeConfig.chains.filter((c) => c.networkId !== network)
      );
      if (chainbridgeConfig.chains.length === 2) {
        const destChain = chainbridgeConfig.chains.find(
          (c) => c.networkId !== network
        );

        destChain && setDestinationChain(destChain);
      }

      const wrapperToken = home.tokens.find(
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
    } else {
      setHomeChain(undefined);
      setWrapperConfig(undefined);
      setWrapper(undefined);
    }
    resetDeposit();
  }, [isReady, network, provider]);

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

  useEffect(() => {
    if (homeChain && destinationBridge && depositNonce) {
      destinationBridge.on(
        destinationBridge.filters.ProposalEvent(
          homeChain.chainId,
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
                payload: `Proposal created on ${destinationChain?.name}`,
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
              setDepositNonce(undefined);
              break;
            case 4:
              setTransactionStatus("Transfer Aborted");
              setTransferTxHash(tx.transactionHash);
              setDepositNonce(undefined);
              break;
          }
        }
      );

      destinationBridge.on(
        destinationBridge.filters.ProposalVote(
          homeChain.chainId,
          BigNumber.from(depositNonce),
          null,
          null
        ),
        async (originChainId, depositNonce, status, resourceId, tx) => {
          const txReceipt = await tx.getTransactionReceipt();
          if (txReceipt.status === 1) {
            console.log("Setting deposit votes");
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
    homeChain,
    destinationBridge,
    depositVotes,
    destinationChain,
    inTransitMessages,
  ]);

  const networkFee = async (tokenAddress: string, amount: number) => {
    if (!homeChain) {
      console.log("Home chain contract is not instantiated");
      return BigNumber.from("0");
    }

    const signer = provider?.getSigner();
    if (!address || !signer) {
      console.log("NF: No signer");
      return BigNumber.from("0");
    }

    try {
      const erc20 = Erc20DetailedFactory.connect(tokenAddress, signer);
      const decimals = await erc20.decimals();

      const currentAllowance = await erc20.allowance(
        address,
        homeChain.erc20HandlerAddress
      );

      const estimatedDeposit = BigNumber.from("260000");
      const needsApproval =
        Number(utils.formatUnits(currentAllowance, decimals)) < amount;
      const needsResetApproval =
        Number(utils.formatUnits(currentAllowance, decimals)) > 0 &&
        resetAllowanceLogicFor.includes(tokenAddress.toLowerCase());
      const currentGasPrice = BigNumber.from(
        utils.parseUnits((homeChain.defaultGasPrice || gasPrice).toString(), 9)
      );

      //Check if the user can afford the two transactions
      let price = estimatedDeposit.mul(currentGasPrice);
      if (needsApproval) {
        let estimatedApprove = BigNumber.from("47000");
        try {
          estimatedApprove = await erc20.estimateGas.approve(
            homeChain.erc20HandlerAddress,
            BigNumber.from(utils.parseUnits(amount.toString(), decimals))
          );
        } catch (e) {
          console.log(
            "Couldn't determine approval gas amount, falling back to 47000\n" +
              e
          );
          console.log(e);
        }
        price = price.add(estimatedApprove.mul(currentGasPrice));
        if (needsResetApproval) {
          price = price.add(estimatedApprove.mul(currentGasPrice));
        }
      }

      return price;
    } catch (error) {
      console.log(
        "Got error while calculating price, using miniumum calculation"
      );
      console.log(error);

      const currentGasPrice = BigNumber.from(
        utils.parseUnits((homeChain.defaultGasPrice || gasPrice).toString(), 9)
      );
      const estimatedDeposit = BigNumber.from("260000");
      const estimatedApprove = BigNumber.from("47000");
      const needsResetApproval = resetAllowanceLogicFor.includes(
        tokenAddress.toLowerCase()
      );
      let price = estimatedDeposit.mul(currentGasPrice);
      price = price.add(estimatedApprove.mul(currentGasPrice));
      if (needsResetApproval) {
        price = price.add(estimatedApprove.mul(currentGasPrice));
      }

      return price;
    }
  };

  const deposit = async (
    amount: number,
    recipient: string,
    tokenAddress: string
  ) => {
    if (!homeBridge || !homeChain) {
      console.log("Home bridge contract is not instantiated");
      return;
    }

    if (!destinationChain || !destinationBridge) {
      console.log("Destination bridge contract is not instantiated");
      return;
    }

    const signer = provider?.getSigner();
    if (!address || !signer) {
      console.log("No signer");
      return;
    }

    const token = homeChain.tokens.find(
      (token) => token.address === tokenAddress
    );

    if (!token) {
      console.log("Invalid token selected");
      return;
    }

    //TODO Fix decimal bug
    amount = parseFloat(Number(amount).toFixed(4));

    setTransactionStatus("Initializing Transfer");
    setDepositAmount(amount);
    setSelectedToken(tokenAddress);
    const erc20 = Erc20DetailedFactory.connect(tokenAddress, signer);
    const decimals = await erc20.decimals();

    const data =
      "0x" +
      utils
        .hexZeroPad(
          // TODO Wire up dynamic token decimals
          BigNumber.from(
            utils.parseUnits(amount.toString(), decimals)
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
        homeChain.erc20HandlerAddress
      );

      const signerBalance = await signer.getBalance();
      let fee = await networkFee(tokenAddress, amount);
      const needsApproval =
        Number(utils.formatUnits(currentAllowance, decimals)) < amount;
      const needsResetApproval =
        Number(utils.formatUnits(currentAllowance, decimals)) > 0 &&
        resetAllowanceLogicFor.includes(tokenAddress.toLowerCase());
      let weiBridgeFee = utils.parseUnits((bridgeFee || 0).toString(), 18);

      if (signerBalance.lt(fee.add(weiBridgeFee))) {
        setTransactionStatus("Transfer Aborted");
        setTransactionStatusReason(
          "You don't have enough funds to execute the transfer"
        );
        return Promise.reject();
      }

      if (needsApproval) {
        if (needsResetApproval) {
          //We need to reset the user's allowance to 0 before we give them a new allowance
          //TODO Should we alert the user this is happening here?
          await (
            await erc20.approve(
              homeChain.erc20HandlerAddress,
              BigNumber.from(utils.parseUnits("0", decimals)),
              {
                gasPrice: BigNumber.from(
                  utils.parseUnits(
                    (homeChain.defaultGasPrice || gasPrice).toString(),
                    9
                  )
                ).toString(),
              }
            )
          ).wait(1);
        }
        await (
          await erc20.approve(
            homeChain.erc20HandlerAddress,
            BigNumber.from(utils.parseUnits(amount.toString(), decimals)),
            {
              gasPrice: BigNumber.from(
                utils.parseUnits(
                  (homeChain.defaultGasPrice || gasPrice).toString(),
                  9
                )
              ).toString(),
            }
          )
        ).wait(1);
      }
      homeBridge.once(
        homeBridge.filters.Deposit(
          destinationChain.chainId,
          token.resourceId,
          null
        ),
        (destChainId, resourceId, depositNonce) => {
          setDepositNonce(`${depositNonce.toString()}`);
          setTransactionStatus("In Transit");
        }
      );

      await (
        await homeBridge.deposit(
          destinationChain.chainId,
          token.resourceId,
          data,
          {
            gasPrice: utils.parseUnits(
              (homeChain.defaultGasPrice || gasPrice).toString(),
              9
            ),
            value: utils.parseUnits((bridgeFee || 0).toString(), 18),
          }
        )
      ).wait();
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      setTransactionStatus("Transfer Aborted");
      let reason =
        "Something went wrong and we could not complete your transfer:\n";
      if (error.code == 4001) {
        reason += "User rejected transaction";
      }
      if (error.reason !== null && error.reason !== undefined) {
        reason += error.reason;
      }
      if (
        error.data !== null &&
        error.data !== undefined &&
        error.data.message !== null &&
        error.data.message !== undefined
      ) {
        reason += error.data.message;
      }
      setTransactionStatusReason(reason);
      return Promise.reject();
    }
  };

  return (
    <ChainbridgeContext.Provider
      value={{
        homeChain: homeChain,
        destinationChain: destinationChain,
        destinationChains: destinationChains.map((c) => ({
          chainId: c.chainId,
          name: c.name,
        })),
        setDestinationChain: handleSetDestination,
        deposit,
        resetDeposit,
        depositVotes,
        relayerThreshold: relayerThreshold,
        depositNonce,
        bridgeFee,
        transactionStatus,
        inTransitMessages,
        depositAmount,
        transferTxHash,
        selectedToken,
        wrapToken: wrapper?.deposit,
        wrapTokenConfig,
        unwrapToken: wrapper?.withdraw,
        transactionStatusReason,
        networkFee,
      }}
    >
      {children}
    </ChainbridgeContext.Provider>
  );
};

const useChainbridge = () => {
  const context = useContext(ChainbridgeContext);
  if (context === undefined) {
    throw new Error("useChainbridge must be called within a DriveProvider");
  }
  return context;
};

export { ChainbridgeProvider, useChainbridge };
