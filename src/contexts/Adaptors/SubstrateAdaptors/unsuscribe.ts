import { ApiPromise } from "@polkadot/api";
import {
  BridgeConfig,
  SubstrateBridgeConfig,
} from "../../../chainbridgeConfig";
import {
  AddMessageAction,
  ResetAction,
  TxIsDone,
} from "../../../reducers/TransitMessageSubstrateReduce";

const unsuscribe = (
  api: ApiPromise,
  tokensDispatch: (value: AddMessageAction | ResetAction | TxIsDone) => void,
  setDepositVotes: (input: number) => void,
  setTransactionStatus: (
    message:
      | "Initializing Transfer"
      | "In Transit"
      | "Transfer Completed"
      | "Transfer Aborted"
      | undefined
  ) => void,
  destinationChainConfig: BridgeConfig | undefined,
  depositVotes: number
) => {
  const unsubscribe = api.query.system.events((events) => {
    console.log("----- Received " + events.length + " event(s): -----");
    // loop through the Vec<EventRecord>
    events.forEach((record) => {
      // extract the phase, event and the event types
      const { event, phase } = record;
      const types = event.typeDef;
      // show what we are busy with
      console.log(
        event.section + ":" + event.method + "::" + "phase=" + phase.toString()
      );
      console.log(event.meta.documentation.toString());
      // loop through each of the parameters, displaying the type and data
      event.data.forEach((data, index) => {
        console.log(types[index].type + ";" + data.toString());
      });

      if (
        event.section ===
          (destinationChainConfig as SubstrateBridgeConfig)
            .chainbridgePalletName &&
        event.method === "VoteFor"
      ) {
        setDepositVotes(depositVotes + 1);
        tokensDispatch({
          type: "addMessage",
          payload: {
            address: "Substrate Relayer",
            signed: "Confirmed",
          },
        });
      }

      if (
        event.section ===
          (destinationChainConfig as SubstrateBridgeConfig)
            .chainbridgePalletName &&
        event.method === "ProposalApproved"
      ) {
        setDepositVotes(depositVotes + 1);
        setTransactionStatus("Transfer Completed");
      }
    });
  });
  return unsubscribe;
};

export default unsuscribe;
