import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import types from "./bridgeTypes.json";

const keyring = new Keyring({ type: "sr25519" });
const wsProvider = new WsProvider("ws://127.0.0.1:9944");
const api = await ApiPromise.create({ provider: wsProvider, types: types });
const ALICE = keyring.addFromUri("//Alice");

const addRelayer = (relayer) => {
  return api.tx.sudo.sudo(api.tx.chainBridge.addRelayer(relayer));
};

const whitelistChain = (chainId) => {
  return api.tx.sudo.sudo(api.tx.chainBridge.whitelistChain(chainId));
};

const registerResource = (rId, method) => {
  return api.tx.sudo.sudo(api.tx.chainBridge.setResource(rId, method));
};

(async function () {
  let nonce = await api.rpc.system.accountNextIndex(ALICE.address);
  let txHash = await addRelayer(ALICE.address).signAndSend(ALICE, { nonce });
  console.log(`Added relayer ALICE in tx ${txHash}`);

  nonce = await api.rpc.system.accountNextIndex(ALICE.address);
  txHash = await whitelistChain(0).signAndSend(ALICE, { nonce });
  console.log(`Whitelisted chain 0 in tx ${txHash}`);

  nonce = await api.rpc.system.accountNextIndex(ALICE.address);
  txHash = await registerResource(
    "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
    "0x4578616d706c652e7472616e73666572"
  ).signAndSend(ALICE, { nonce });
  console.log(`Registered resource in tx ${txHash}`);

  await api.disconnect();
})();
