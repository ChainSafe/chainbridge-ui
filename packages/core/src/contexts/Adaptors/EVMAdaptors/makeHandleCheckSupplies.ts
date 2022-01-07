import { chainbridgeConfig, BridgeConfig } from "../../../chainbridgeConfig";
import { hasTokenSupplies } from "./helpers";

const handleCheckSupplies = (homeChainConfig?: BridgeConfig) => async (
  amount: number,
  tokenAddress: string,
  destinationChainId: number
) => {
  if (homeChainConfig) {
    const destinationChain = chainbridgeConfig.chains.find(
      (c) => c.domainId === destinationChainId
    );
    const token = homeChainConfig.tokens.find(
      (token) => token.address === tokenAddress
    );

    if (destinationChain?.type === "Ethereum" && token) {
      const hasSupplies = await hasTokenSupplies(
        destinationChain,
        token,
        amount
      );
      if (!hasSupplies) {
        return false;
      }
    }
    return true;
  }
};
export default handleCheckSupplies;
