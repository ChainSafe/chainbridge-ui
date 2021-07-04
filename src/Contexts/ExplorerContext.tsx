import React, { useContext, useEffect, useReducer } from 'react';
import {
  Bridge,
  BridgeFactory,
  Erc20HandlerFactory,
} from '@chainsafe/chainbridge-contracts';
import { BigNumber, ethers, Event, providers } from 'ethers';
import { chainbridgeConfig, EvmBridgeConfig } from '../chainbridgeConfig';
import { Transfers, transfersReducer } from './Reducers/TransfersReducer';

interface IExplorerContextProps {
  children: React.ReactNode | React.ReactNode[];
}

type ExplorerContext = {
  transfers: Transfers;
};

const ExplorerContext = React.createContext<ExplorerContext | undefined>(
  undefined,
);

const ExplorerProvider = ({ children }: IExplorerContextProps) => {
  const [transfers, transfersDispatch] = useReducer(transfersReducer, {});

  const fetchTransfersAndListen = async () => {
    const bridges = await Promise.all(
      chainbridgeConfig.chains
        .filter(c => c.type === 'Substrate')
        .map(async bridge => {
          console.log(`Checking events for ${bridge.name}`);

          const provider = new providers.JsonRpcProvider(
            bridge.rpcUrl,
            bridge.networkId,
          );
          const bridgeContract = BridgeFactory.connect(
            (bridge as EvmBridgeConfig).bridgeAddress,
            provider,
          );
          const erc20HandlerContract = Erc20HandlerFactory.connect(
            (bridge as EvmBridgeConfig).erc20HandlerAddress,
            provider,
          );
          const depositFilter = bridgeContract.filters.Deposit(
            null,
            null,
            null,
          );
          const depositLogs = await provider.getLogs({
            ...depositFilter,
            fromBlock: (bridge as EvmBridgeConfig).deployedBlockNumber,
          });
          depositLogs.forEach(async dl => {
            const parsedLog = bridgeContract.interface.parseLog(dl);
            const depositRecord = await erc20HandlerContract.getDepositRecord(
              parsedLog.args.depositNonce,
              parsedLog.args.destinationChainID,
            );

            transfersDispatch({
              type: 'addTransfer',
              payload: {
                depositNonce: parsedLog.args.depositNonce.toNumber(),
                transferDetails: {
                  fromAddress: depositRecord._depositer,
                  depositBlockNumber: dl.blockNumber,
                  depositTransactionHash: dl.transactionHash,
                  fromChainId: bridge.chainId,
                  fromNetworkName: bridge.name,
                  timestamp: (await provider.getBlock(dl.blockNumber))
                    .timestamp,
                  toChainId: parsedLog.args.destinationChainID,
                  toNetworkName:
                    chainbridgeConfig.chains.find(
                      c => c.chainId === parsedLog.args.destinationChainID,
                    )?.name || '',
                  toAddress: depositRecord._destinationRecipientAddress,
                  tokenAddress: depositRecord._tokenAddress,
                  // @ts-expect-error
                  amount: depositRecord._amount,
                  resourceId: parsedLog.args.resourceID,
                },
              },
            });
          });
          console.log(`Added ${bridge.name} ${depositLogs.length} deposits`);
          bridgeContract.on(
            depositFilter,
            async (
              destChainId: number,
              resourceId: string,
              depositNonce: ethers.BigNumber,
              tx: Event,
            ) => {
              const depositRecord = await erc20HandlerContract.getDepositRecord(
                depositNonce,
                destChainId,
              );

              transfersDispatch({
                type: 'addTransfer',
                payload: {
                  depositNonce: depositNonce.toNumber(),
                  transferDetails: {
                    fromAddress: depositRecord._depositer,
                    depositBlockNumber: tx.blockNumber,
                    depositTransactionHash: tx.transactionHash,
                    fromChainId: bridge.chainId,
                    fromNetworkName: bridge.name,
                    timestamp: (await provider.getBlock(tx.blockNumber))
                      .timestamp,
                    toChainId: destChainId,
                    toNetworkName:
                      chainbridgeConfig.chains.find(
                        c => c.chainId === destChainId,
                      )?.name || '',
                    toAddress: depositRecord._destinationRecipientAddress,
                    tokenAddress: depositRecord._tokenAddress,
                    // @ts-expect-error
                    amount: depositRecord._amount,
                    resourceId,
                  },
                },
              });
            },
          );
          const proposalEventFilter = bridgeContract.filters.ProposalEvent(
            null,
            null,
            null,
            null,
            null,
          );

          const proposalEventLogs = await provider.getLogs({
            ...proposalEventFilter,
            fromBlock: (bridge as EvmBridgeConfig).deployedBlockNumber,
          });
          proposalEventLogs.forEach(async pel => {
            const parsedLog = bridgeContract.interface.parseLog(pel);
            transfersDispatch({
              type: 'addProposalEvent',
              payload: {
                depositNonce: parsedLog.args.depositNonce.toNumber(),
                transferDetails: {
                  resourceId: parsedLog.args.resourceID,
                  fromChainId: parsedLog.args.originChainID,
                  fromNetworkName:
                    chainbridgeConfig.chains.find(
                      c => c.chainId === parsedLog.args.originChainID,
                    )?.name || '',
                  toChainId: bridge.chainId,
                  toNetworkName: bridge.name,
                },
                proposalEventDetails: {
                  proposalEventBlockNumber: pel.blockNumber,
                  proposalEventTransactionHash: pel.transactionHash,
                  dataHash: parsedLog.args.dataHash,
                  timestamp: (await provider.getBlock(pel.blockNumber))
                    .timestamp,
                  proposalStatus: parsedLog.args.status,
                },
              },
            });
          });
          console.log(
            `Added ${bridge.name} ${proposalEventLogs.length} proposal events`,
          );
          bridgeContract.on(
            proposalEventFilter,
            async (
              originChainId: number,
              depositNonce: BigNumber,
              status: number,
              resourceId: string,
              dataHash: string,
              tx: Event,
            ) => {
              transfersDispatch({
                type: 'addProposalEvent',
                payload: {
                  depositNonce: depositNonce.toNumber(),
                  transferDetails: {
                    resourceId,
                    fromChainId: originChainId,
                    fromNetworkName:
                      chainbridgeConfig.chains.find(
                        c => c.chainId === originChainId,
                      )?.name || '',
                    toChainId: bridge.chainId,
                    toNetworkName: bridge.name,
                  },
                  proposalEventDetails: {
                    proposalEventBlockNumber: tx.blockNumber,
                    proposalEventTransactionHash: tx.transactionHash,
                    dataHash,
                    timestamp: (await provider.getBlock(tx.blockNumber))
                      .timestamp,
                    proposalStatus: status,
                  },
                },
              });
            },
          );
          const proposalVoteFilter = bridgeContract.filters.ProposalVote(
            null,
            null,
            null,
            null,
          );

          const proposalVoteLogs = await provider.getLogs({
            ...proposalVoteFilter,
            fromBlock: (bridge as EvmBridgeConfig).deployedBlockNumber,
          });
          proposalVoteLogs.forEach(async pvl => {
            const parsedLog = bridgeContract.interface.parseLog(pvl);

            transfersDispatch({
              type: 'addVote',
              payload: {
                depositNonce: parsedLog.args.depositNonce.toNumber(),
                transferDetails: {
                  resourceId: parsedLog.args.resourceID,
                  fromChainId: parsedLog.args.originChainID,
                  fromNetworkName:
                    chainbridgeConfig.chains.find(
                      c => c.chainId === parsedLog.args.originChainID,
                    )?.name || '',
                  toChainId: bridge.chainId,
                  toNetworkName: bridge.name,
                },
                voteDetails: {
                  voteBlockNumber: pvl.blockNumber,
                  voteTransactionHash: pvl.transactionHash,
                  dataHash: parsedLog.args.dataHash,
                  timestamp: (await provider.getBlock(pvl.blockNumber))
                    .timestamp,
                  voteStatus: parsedLog.args.status,
                },
              },
            });
          });
          console.log(
            `Added ${bridge.name} ${proposalVoteLogs.length} proposal votes`,
          );
          bridgeContract.on(
            proposalVoteFilter,
            async (
              originChainId: number,
              depositNonce: BigNumber,
              status: number, // TODO: Confirm wether this is actually being used
              resourceId: string,
              tx: Event,
            ) => {
              transfersDispatch({
                type: 'addVote',
                payload: {
                  depositNonce: depositNonce.toNumber(),
                  transferDetails: {
                    resourceId,
                    fromChainId: originChainId,
                    fromNetworkName:
                      chainbridgeConfig.chains.find(
                        c => c.chainId === originChainId,
                      )?.name || '',
                    toChainId: bridge.chainId,
                    toNetworkName: bridge.name,
                  },
                  voteDetails: {
                    voteBlockNumber: tx.blockNumber,
                    voteTransactionHash: tx.transactionHash,
                    dataHash: '', // TODO: Confirm whether this is available
                    timestamp: (await provider.getBlock(tx.blockNumber))
                      .timestamp,
                    voteStatus: status === 1, // TODO: Confirm whether this is the correct status
                  },
                },
              });
            },
          );
          return bridgeContract;
        }),
    );
    return bridges;
  };

  useEffect(() => {
    let bridgeContracts: Bridge[] = [];

    const handler = async () => {
      bridgeContracts = await fetchTransfersAndListen();
    };

    handler();

    return () => {
      if (bridgeContracts.length > 0) {
        bridgeContracts.forEach(bc => {
          // @ts-ignore
          bc.removeAllListeners();
        });
      }
    };
  }, []);

  return (
    <ExplorerContext.Provider
      value={{
        transfers,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
};

const useExplorer = () => {
  const context = useContext(ExplorerContext);
  if (context === undefined) {
    throw new Error('useExplorer must be called within a ExplorerProvider');
  }
  return context;
};

export { ExplorerProvider, useExplorer };
