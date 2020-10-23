export const shortenAddress = (address: string) => {
  return `${address.substr(0, 6)}...${address.substr(address.length - 6, 6)}`;
};
