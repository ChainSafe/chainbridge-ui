import ETHIcon from "../media/tokens/eth.png";
import DAIIcon, {
  ReactComponent as DaiTokenIcon,
} from "../media/tokens/dai.svg";
import { ReactComponent as EthIcon } from "../media/networks/eth.svg";
import { ReactComponent as CeloUSD } from "../media/networks/celo.svg";
const { decodeAddress, encodeAddress } = require("@polkadot/keyring");
const { hexToU8a, isHex } = require("@polkadot/util");

export const shortenAddress = (address: string) => {
  return `${address.substr(0, 6)}...${address.substr(address.length - 6, 6)}`;
};

export const isValidSubstrateAddress = (address: string) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    return false;
  }
};

export const getNetworkName = (id: any) => {
  switch (Number(id)) {
    case 5:
      return "Localhost";
    case 1:
      return "Mainnet";
    case 3:
      return "Ropsten";
    case 4:
      return "Rinkeby";
    // case 5:
    //   return "Goerli";
    case 6:
      return "Kotti";
    case 42:
      return "Kovan";
    case 61:
      return "Ethereum Classic - Mainnet";
    case 42220:
      return "CELO - Mainnet";
    case 44787:
      return "CELO - Alfajores Testnet";
    case 62320:
      return "CELO - Baklava Testnet";
    default:
      return "Other";
  }
};

export const PredefinedIcons: any = {
  ETHIcon: ETHIcon,
  WETHIcon: WETHIcon,
  DAIIcon: DAIIcon,
  celoUSD: celoUSD,
};

export const getIcon = (chainId: number | undefined) => {
  switch (chainId) {
    case 1:
    case 3:
    case 4:
    case 5:
    case 42:
      return EthIcon;
    case 42220:
    case 44787:
    case 62320:
      return CeloUSD;
    case 61:
      return EthIcon;
    default:
      return EthIcon;
  }
};

// TODO: for now just DAI token Icon
export const getTokenIcon = () => {
  return DaiTokenIcon;
};
