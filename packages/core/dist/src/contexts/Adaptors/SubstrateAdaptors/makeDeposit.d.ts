import { ApiPromise } from "@polkadot/api";
import { BridgeConfig } from "../../../chainbridgeConfig";
declare const makeDeposit: (address: string | undefined, api: ApiPromise | undefined, setTransactionStatus: (message: "Initializing Transfer" | "In Transit" | "Transfer Completed" | "Transfer Aborted" | undefined) => void, setDepositAmount: (value: React.SetStateAction<number | undefined>) => void, homeChainConfig: BridgeConfig | undefined, setDepositNonce: (input: string | undefined) => void) => (amount: number, recipient: string, tokenAddress: string, destinationChainId: number) => Promise<void>;
export default makeDeposit;
//# sourceMappingURL=makeDeposit.d.ts.map