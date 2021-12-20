import { BigNumberish } from "ethers";
import { DepositRecord, TransferDetails } from "../reducers/TransfersReducer";
import { EvmBridgeConfig, SubstrateBridgeConfig } from "../chainbridgeConfig";
export declare const shortenAddress: (address: string) => string;
export declare const isValidSubstrateAddress: (address: string) => boolean;
export declare const getNetworkName: (id: any) => "Localhost" | "Mainnet" | "Ropsten" | "Rinkeby" | "Kotti" | "Kovan" | "Ethereum Classic - Mainnet" | "CELO - Mainnet" | "CELO - Alfajores Testnet" | "CELO - Baklava Testnet" | "Other";
export declare const selectToken: (config: EvmBridgeConfig | SubstrateBridgeConfig | undefined, tokenAddress: string) => import("../chainbridgeConfig").TokenConfig | undefined;
export declare const formatTransferDate: (transferDate: number | undefined) => string;
export declare const formatAmount: (amount: BigNumberish) => string;
export declare const getRandomSeed: () => string;
export declare const getProposalStatus: (status: number | undefined) => "Inactive" | "Active" | "Passed" | "Executed" | "Cancelled" | "No status";
export declare const getColorSchemaTransferStatus: (status: number | undefined) => {
    borderColor: string;
    background: string;
};
export declare const computeAndFormatAmount: (amount: string) => string;
export declare const selectChains: (chains: Array<EvmBridgeConfig | SubstrateBridgeConfig>, fromDomainId: number, toDomainId: number) => {
    fromChain: EvmBridgeConfig | SubstrateBridgeConfig | undefined;
    toChain: EvmBridgeConfig | SubstrateBridgeConfig | undefined;
};
export declare const computeTransferDetails: (txDetails: DepositRecord, chains: Array<EvmBridgeConfig | SubstrateBridgeConfig>) => TransferDetails;
//# sourceMappingURL=Helpers.d.ts.map