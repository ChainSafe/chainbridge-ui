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

export const toFixedWithoutRounding = (num: number, digits?: number) => {
  try {
    const re = new RegExp("^-?\\d+(?:.\\d{0," + (digits || 3) + "})?");
    // @ts-ignore
    return num.toString().match(re)[0];
  } catch (error) {
    console.error(
      `Failed to convert '${num}' to string with fixed digits in fraction`,
      error
    );
    return "NaN";
  }
};
