import { transfersReducer } from "../contexts/Reducers/TransfersReducer";
import { computeTransferDetails } from "./Helpers";
import {
  testResponse,
  runtimeTestingConfig,
  canceledTransfer,
} from "./TestUtils";

describe("ComputeTransfersDetails", () => {
  it("should return one transfer with the details needed", () => {
    const expectedKeys = [
      "id",
      "formatedTransferDate",
      "fromAddress",
      "formatedAmount",
      "fromNetworkName",
      "toNetworkName",
      "depositTransactionHash",
      "fromDomainId",
      "toDomainId",
      "voteEvents",
      "proposalEvents",
      "proposalStatus",
      "timelineMessages",
      "fromChain",
      "toChain",
      "pillColorStatus",
    ];

    const transferDetails = computeTransferDetails(
      testResponse.transfers[1] as any,
      runtimeTestingConfig.CHAINBRIDGE.chains as any
    );
    const keys = Object.keys(transferDetails);
    expect(keys).toEqual(expectedKeys);
  });

  it("Should return timelineMessages with Transfer canceled, if proposal status is 4", () => {
    const transferDetails = computeTransferDetails(
      canceledTransfer as any,
      runtimeTestingConfig.CHAINBRIDGE.chains as any
    );

    const {
      timelineMessages: [head, , , tail],
    } = transferDetails;

    expect(tail.message).toBe("Transfer canceled");
  });

  it("Should return timelineMessages with Waiting for execution message if status is 2", () => {
    const tx = {
      ...canceledTransfer,
      status: 2,
    };

    const transferDetails = computeTransferDetails(
      tx as any,
      runtimeTestingConfig.CHAINBRIDGE.chains as any
    );

    const {
      timelineMessages: [head, , , tail],
    } = transferDetails;

    expect(tail.message).toBe("Waiting for execution");
  });

  it("Should return timelineMessages with Transfer executed message if status is 3", () => {
    const transferDetails = computeTransferDetails(
      testResponse.transfers[1] as any,
      runtimeTestingConfig.CHAINBRIDGE.chains as any
    );

    const { timelineMessages } = transferDetails;
    const lastMessage = timelineMessages[timelineMessages.length - 1];

    const lengthOfVoteEvents = testResponse.transfers[1].voteEvents.length;

    expect(timelineMessages.length).toEqual(lengthOfVoteEvents + 5);
    expect(lastMessage.message.includes("Transfer executed")).toBe(true);
  });

  it("Should return Deposit submitted if proposalEvents and voteEvents are empty", () => {
    const tx = {
      ...testResponse.transfers[1],
      status: 1,
      proposalEvents: [],
      voteEvents: [],
    };

    const transferDetails = computeTransferDetails(
      tx as any,
      runtimeTestingConfig.CHAINBRIDGE.chains as any
    );

    const { timelineMessages } = transferDetails;

    expect(timelineMessages[0].message).toBe("Deposit submitted");
  });

  it("Should return a Waiting for more votes as last message if there is one proposalEvent", () => {
    const tx = {
      ...testResponse.transfers[1],
      status: 1,
      proposalEvents: [testResponse.transfers[1].proposalEvents[0] as any],
    };

    const transferDetails = computeTransferDetails(
      tx as any,
      runtimeTestingConfig.CHAINBRIDGE.chains as any
    );

    const { timelineMessages } = transferDetails;

    const lastMessage = timelineMessages[timelineMessages.length - 1];

    expect(lastMessage.message).toBe("Waiting for more votes");
  });
});
