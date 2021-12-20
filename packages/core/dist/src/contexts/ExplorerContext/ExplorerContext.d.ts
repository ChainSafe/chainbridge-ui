import React from "react";
import { ExplorerState, PaginationParams } from "../../reducers/TransfersReducer";
interface IExplorerContextProps {
    children: React.ReactNode | React.ReactNode[];
}
declare type ExplorerContext = {
    explorerState: ExplorerState;
    loadMore: (options: PaginationParams) => void;
    setExplorerStateContext: any;
};
declare const ExplorerContext: React.Context<ExplorerContext | undefined>;
declare const ExplorerProvider: ({ children }: IExplorerContextProps) => JSX.Element;
declare const useExplorer: () => ExplorerContext;
export { ExplorerProvider, useExplorer };
//# sourceMappingURL=ExplorerContext.d.ts.map