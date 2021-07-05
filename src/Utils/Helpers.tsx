import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';

export const shortenAddress = (address: string): string =>
  `${address.substr(0, 6)}...${address.substr(address.length - 6, 6)}`;

export const isValidSubstrateAddress = (address: string): boolean => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    return false;
  }
};
