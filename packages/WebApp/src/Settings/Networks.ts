import { ReactNode } from "react";

// TODO expand to represent required data
export interface INetworkConfig {
  name: string;
  explorerUrl: string;
  icon: ReactNode;
  id?: number;
}

export const AcceptedNetworks: INetworkConfig[] = [];
