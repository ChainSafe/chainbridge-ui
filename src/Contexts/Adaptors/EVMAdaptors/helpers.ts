import { CeloProvider } from "@celo-tools/celo-ethers-wrapper";
import { ethers, utils, BigNumber } from "ethers";

import { EvmBridgeConfig } from "../../../chainbridgeConfig";

const isCelo = (networkId?: number) =>
  [42220, 44787, 62320].includes(networkId ?? 0);

export function getProvider(destinationChainConfig?: any) {
  let provider: any;
  if (isCelo(destinationChainConfig?.networkId)) {
    provider = new CeloProvider(destinationChainConfig?.rpcUrl);
  } else if (destinationChainConfig?.rpcUrl.startsWith("wss")) {
    if (destinationChainConfig.rpcUrl.includes("infura")) {
      const parts = destinationChainConfig.rpcUrl.split("/");

      provider = new ethers.providers.InfuraWebSocketProvider(
        destinationChainConfig.networkId,
        parts[parts.length - 1]
      );
    }
    if (destinationChainConfig.rpcUrl.includes("alchemyapi")) {
      const parts = destinationChainConfig.rpcUrl.split("/");

      provider = new ethers.providers.AlchemyWebSocketProvider(
        destinationChainConfig.networkId,
        parts[parts.length - 1]
      );
    }
  } else {
    provider = new ethers.providers.JsonRpcProvider(
      destinationChainConfig?.rpcUrl
    );
  }
  return provider;
}

export async function detectEIP1559MaxFeePerGas(
  provider: any
): Promise<boolean> {
  try {
    const feeData = await provider.getFeeData();
    if (typeof feeData.maxFeePerGas !== "undefined") {
      return true;
    }
  } catch (error) {
    console.warn(error);
    console.warn(
      "Can't access fee data for EIP-1559, fallback to legacy transaction"
    );
  }
  return false;
}

export async function getPriceCompatibility(
  provider: any,
  homeChainConfig: any,
  gasPrice: number
) {
  let gasPriceCompatibility = undefined;
  if (provider) {
    const hasMaxPrice = await detectEIP1559MaxFeePerGas(provider);
    if (!hasMaxPrice) {
      gasPriceCompatibility = BigNumber.from(
        utils.parseUnits(
          (
            (homeChainConfig as EvmBridgeConfig).defaultGasPrice || gasPrice
          ).toString(),
          9
        )
      ).toString();
    }
  }
  return gasPriceCompatibility;
}
