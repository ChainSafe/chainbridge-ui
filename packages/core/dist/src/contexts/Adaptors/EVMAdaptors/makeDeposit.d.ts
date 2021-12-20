import { providers } from "ethers";
import { TransactionStatus } from "../../NetworkManagerContext";
import { BridgeConfig } from "../../../chainbridgeConfig";
declare const makeDeposit: (setTransactionStatus: (message: TransactionStatus | undefined) => void, setDepositNonce: (input: string | undefined) => void, setHomeTransferTxHash: (input: string) => void, setDepositAmount: (input: number | undefined) => void, setSelectedToken: (tokenAddress: string) => void, gasPrice: number, homeChainConfig?: BridgeConfig | undefined, homeBridge?: any, provider?: providers.Web3Provider | undefined, address?: string | undefined, bridgeFee?: number | undefined) => (amount: number, recipient: string, tokenAddress: string, destinationChainId: number) => Promise<void>;
export default makeDeposit;
//# sourceMappingURL=makeDeposit.d.ts.map