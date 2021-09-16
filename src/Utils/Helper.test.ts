import { computeTransferDetails } from "./Helpers";
import { testResponse } from "./TestUtils";

describe("ComputeTransfersDetails", () => {
  it("should return one transfer with the details needed", () => {
    const expectedKeys = [
      "formatedTransferDate",
      "addressShortened",
      "proposalStatus",
      "formatedAmount",
      "fromNetworkName",
      "toNetworkName",
      "depositTxHashShortened",
      "fromChainId",
      "toChainId",
    ];

    const transferDetails = computeTransferDetails(testResponse[2] as any);
    const keys = Object.keys(transferDetails);
    expect(keys).toEqual(expectedKeys);
  });

  it("should return one transfer with proposal status equals to no status", () => {
    const txDetails = computeTransferDetails(testResponse[0] as any);
    const { proposalStatus } = txDetails;
    expect(proposalStatus).toBe("No status");
  });
});
