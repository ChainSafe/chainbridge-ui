import { ApiPromise, WsProvider } from "@polkadot/api";
import { decodeAddress } from "@polkadot/util-crypto";
import BigNumber from "bignumber.js";
import {
  chainbridgeConfig,
  SubstrateBridgeConfig,
  getСhainConfig,
} from "../../../chainbridgeConfig";

const base = new BigNumber(10);

export enum VoteStatus {
  INITIATED = "Initiated",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

export type GetBridgeProsalVotesRes = {
  votes_for: string[];
  votes_against: string[];
  status: VoteStatus;
  expiry: string;
};

export type Extrinsic = { method: { method: string; args: string[] } };

export type GetBlockRes = {
  block: {
    header: {
      number: string;
    };
    extrinsics: Extrinsic[];
  };
};

export const createApi = async (rpcUrl: string, rpcFallbackUrls?: string[]) => {
  let urls = [rpcUrl];
  if (rpcFallbackUrls) {
    urls = urls.concat(rpcFallbackUrls);
  }
  const provider = new WsProvider(urls);
  const subChainConfig = chainbridgeConfig.chains.find(
    (c) => c.rpcUrl === rpcUrl
  ) as SubstrateBridgeConfig;
  const types = (await import(`./${subChainConfig.typesFileName}`)) as any;
  return ApiPromise.create({ provider, types });
};

export const submitDeposit = (
  api: ApiPromise,
  amount: number,
  recipient: string,
  srcChainId: number,
  dstChainId: number
) => {
  const subChainConfig = getСhainConfig(srcChainId) as SubstrateBridgeConfig;

  return api.tx[subChainConfig.transferPalletName][
    subChainConfig.transferFunctionName
  ](
    getBNFromDecimalAmount(amount, subChainConfig.decimals).toString(),
    recipient,
    dstChainId
  );
};

export const getBridgeProposalVotes = async (
  api: ApiPromise,
  srcChainId: number,
  destinationChainId: number,
  recipient: string,
  depositNonce: number,
  decimalAmount: number
): Promise<GetBridgeProsalVotesRes | undefined> => {
  const destinationChainConfig = getСhainConfig(destinationChainId);
  const call = api.registry.createType("Call", {
    args: [
      decodeAddress(recipient),
      await decimalToBalance(
        api,
        decimalAmount,
        destinationChainConfig.decimals
      ),
    ],
    callIndex: api.tx.erc20.transfer.callIndex,
  });

  const result = await api.query.chainBridge.votes(srcChainId, [
    depositNonce,
    call,
  ]);
  return result.toHuman() as GetBridgeProsalVotesRes;
};

export const decimalToBalance = async (
  api: ApiPromise,
  amount: number,
  decimals: number
) => {
  const amountBN = getBNFromDecimalAmount(amount, decimals);
  return api.registry.createType("Balance", amountBN.toString());
};

export const getBalance = async (
  api: ApiPromise,
  address: string
): Promise<BigNumber> => {
  return new BigNumber(
    (await api.query.system.account(address)).data.free.toString()
  );
};

export const hasTokenSupplies = async (
  api: ApiPromise,
  address: string,
  amount: number,
  decimals: number
): Promise<boolean> => {
  const balance = await getBalance(api, address);
  const amountBN = getBNFromDecimalAmount(amount, decimals);
  return amountBN.isLessThan(balance);
};

export const getBlockHashByNumber = async (
  api: ApiPromise,
  blockNumber: number
): Promise<string> => {
  return (await api.rpc.chain.getBlockHash(blockNumber)).toString();
};

export const getLatestBlock = async (api: ApiPromise): Promise<GetBlockRes> => {
  return (await api.rpc.chain.getBlock()).toHuman() as GetBlockRes;
};

export const getBlockByHash = async (
  api: ApiPromise,
  blockHash: string
): Promise<any> => {
  return (await api.rpc.chain.getBlock(blockHash)).toHuman();
};

export const getTransferTxHashByNonce = async (
  api: ApiPromise,
  nonce: number
): Promise<string | undefined> => {
  let attempts = 0;
  let limit = 10;
  let { block } = await getLatestBlock(api);
  let blockNumber = parseIntFromHuman(block.header.number);
  do {
    const blockHash = await getBlockHashByNumber(api, blockNumber);
    block = (await getBlockByHash(api, blockHash)).block;
    const extrinsic = block.extrinsics.find(
      (extrinsic: Extrinsic) =>
        extrinsic.method.method === "acknowledgeProposal" &&
        parseIntFromHuman(extrinsic.method.args[0]) === nonce
    );
    if (extrinsic) return blockHash;
    ++attempts;
    --blockNumber;
  } while (attempts <= limit);
};

export const getBNFromDecimalAmount = (
  decimalAmount: number,
  decimals: number
): BigNumber => {
  return new BigNumber(decimalAmount).multipliedBy(base.pow(decimals));
};

export const parseIntFromHuman = (human: string): number => {
  return parseInt(human.replaceAll(",", ""));
};
