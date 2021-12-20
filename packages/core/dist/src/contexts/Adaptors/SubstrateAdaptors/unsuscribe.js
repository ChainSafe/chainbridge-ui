"use strict";
exports.__esModule = true;
var unsuscribe = function (api, tokensDispatch, setDepositVotes, setTransactionStatus, destinationChainConfig, depositVotes) {
    var unsubscribe = api.query.system.events(function (events) {
        console.log("----- Received " + events.length + " event(s): -----");
        // loop through the Vec<EventRecord>
        events.forEach(function (record) {
            // extract the phase, event and the event types
            var event = record.event, phase = record.phase;
            var types = event.typeDef;
            // show what we are busy with
            console.log(event.section + ":" + event.method + "::" + "phase=" + phase.toString());
            console.log(event.meta.documentation.toString());
            // loop through each of the parameters, displaying the type and data
            event.data.forEach(function (data, index) {
                console.log(types[index].type + ";" + data.toString());
            });
            if (event.section ===
                destinationChainConfig
                    .chainbridgePalletName &&
                event.method === "VoteFor") {
                setDepositVotes(depositVotes + 1);
                tokensDispatch({
                    type: "addMessage",
                    payload: {
                        address: "Substrate Relayer",
                        signed: "Confirmed"
                    }
                });
            }
            if (event.section ===
                destinationChainConfig
                    .chainbridgePalletName &&
                event.method === "ProposalApproved") {
                setDepositVotes(depositVotes + 1);
                setTransactionStatus("Transfer Completed");
            }
        });
    });
    return unsubscribe;
};
exports["default"] = unsuscribe;
//# sourceMappingURL=unsuscribe.js.map