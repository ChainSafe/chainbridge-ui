import { ReactNode } from "react";

// TODO expand to represent required data
export interface ITokenConfig {
  name: string;
  icon: ReactNode;
}

export const AcceptedTokens: ITokenConfig[] = [];
