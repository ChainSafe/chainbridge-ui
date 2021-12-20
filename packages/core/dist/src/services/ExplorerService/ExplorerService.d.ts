import { ExplorerState } from "../../reducers/TransfersReducer";
export declare const fetchTransfers: (setState: React.SetStateAction<any>, state: ExplorerState, options?: {
    first?: string | undefined;
    last?: string | undefined;
    before?: string | undefined;
    after?: string | undefined;
} | undefined) => Promise<any>;
export declare const fetchTransaction: (txHash: string, setState: React.SetStateAction<any>) => Promise<unknown>;
//# sourceMappingURL=ExplorerService.d.ts.map