import { providers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { getPriceCompatibility } from "./helpers";
import { BridgeConfig, TokenConfig } from "../../../chainbridgeConfig";
import { Weth } from "../../../Contracts/Weth";

const makeUnwrappedToken = (
  gasPrice: number,

  homeChainConfig?: BridgeConfig,
  wrapTokenConfig?: TokenConfig,
  wrapper?: Weth,
  provider?: providers.Web3Provider
) => async (value: number): Promise<string> => {
  if (!wrapTokenConfig || !wrapper?.withdraw || !homeChainConfig)
    return "not ready";

  try {
    const gasPriceCompatibility = await getPriceCompatibility(
      provider,
      homeChainConfig,
      gasPrice
    );

    const tx = await wrapper.withdraw(
      parseUnits(`${value}`, homeChainConfig.decimals),
      {
        gasPrice: gasPriceCompatibility,
      }
    );

    await tx?.wait();
    if (tx?.hash) {
      return tx?.hash;
    } else {
      return "";
    }
  } catch (error) {
    console.error(error);
    return "";
  }
};
export default makeUnwrappedToken;
