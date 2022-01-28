import React from "react";
import { ThemeSwitcher } from "@chainsafe/common-theme";
import { render } from "@testing-library/react";
import { lightTheme } from "../../themes/LightTheme";
import { computeTransferDetails } from "../../utils/Helpers";
import { runtimeTestingConfig, testResponse } from "../../utils/TestUtils";
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
          transferDetails={computeTransferDetails(
            testResponse.transfers[1] as any,
            runtimeTestingConfig.CHAINBRIDGE.chains as any
          )}
          handleTimelineButtonClick={jest.fn()}
          timelineButtonClicked={false}
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
            waitingForColor: "",
            transferCancelColor: "",
            timelineSection: "",
            transferDetailExpandedDesktop: "",
            buttonTimelineContainerClicked: "",
            secondElementGreybar: "",
            time: "",
            customGreyBar: "",
            lastMessage: "",
            buttonTimelineContainer: "",
            messageNotCollapsed: "",
            messageCollapsed: "",
            transferDetailNotExpanded: "",
            transferDetailExpanded: "",
            timelineButtonClicked: "",
            timelineButton: "",
            imageToken: "",
            messageContainer: "",
            messages: "",
            greyBar: "",
            greenDot: "",
            dot: "",
          }}
        />
      </ThemeSwitcher>
    );
    expect(container).toMatchSnapshot();
  });
});
