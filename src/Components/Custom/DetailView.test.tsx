import React from "react";
import { ThemeSwitcher } from "@chainsafe/common-theme";
import { render } from "@testing-library/react";
import { lightTheme } from "../../Themes/LightTheme";
import { computeTransferDetails } from "../../Utils/Helpers";
import { testResponse } from "../../Utils/TestUtils";
import DetailView from "./DetailView";

describe("DetailView", () => {
  beforeEach(() => {
    Object.defineProperty(window, "crypto", {
      value: {
        getRandomValues: jest.fn(() => [
          137,
          128,
          88,
          251,
          102,
          102,
          253,
          87,
          130,
          17,
          148,
          65,
          131,
          197,
          26,
          77,
          214,
          94,
          216,
          178,
        ]),
      },
    });
    // NOTE: this is here because of the Blockies component
    Object.defineProperty(window.HTMLCanvasElement.prototype, "getContext", {
      value: jest.fn(() => ({
        fillRect: jest.fn(),
      })),
    });
  });
  it("renders correctly and match Snapshot", () => {
    const { container } = render(
      <ThemeSwitcher themes={{ light: lightTheme }}>
        <DetailView
          active={true}
          transferDetails={computeTransferDetails(testResponse[0] as any)}
          handleClose={jest.fn()}
          classes={{
            transferDetailContainer: "",
            transferDetailSection: "",
            headerSection: "",
            colTitles: "",
            accountAddress: "",
            addressDetailView: "",
            fromAddressDetails: "",
            proposalStatusPill: "",
            sentAndFromSection: "",
            fromDetailView: "",
            bridgeSection: "",
            transactionHashSection: "",
            transferTimeline: "",
            toDetailView: "",
            avatar: "",
            amountSent: "",
            closeButton: "",
            statusSection: "",
            transferDetails: "",
          }}
        />
      </ThemeSwitcher>
    );
    expect(container).toMatchSnapshot();
  });
});
