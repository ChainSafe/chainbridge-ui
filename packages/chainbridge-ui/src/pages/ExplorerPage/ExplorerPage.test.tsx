import React from "react";
import { act, render, waitFor } from "@testing-library/react";
import { ThemeSwitcher } from "@chainsafe/common-theme";
import ExplorerPage from "./ExplorerPage";
import { ExplorerProvider } from "../Contexts/ExplorerContext/ExplorerContext";
import { lightTheme } from "../Themes/LightTheme";
import { runtimeTestingConfig, testResponse } from "../Utils/TestUtils";

jest.mock("../../Contexts/NetworkManagerContext.tsx", () => {
  const FakeNetworkManager = (children: any) => <>{children}</>;
  return {
    NetworkManagerProvider: FakeNetworkManager,
    useNetworkManager: jest.fn(),
  };
});

describe("ExplorerPage", () => {
  beforeEach(() => {
    Object.defineProperties(window, {
      __RUNTIME_CONFIG__: {
        value: {
          ...runtimeTestingConfig,
        },
      },
      crypto: {
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
      },
      fetch: {
        value: jest.fn(() => ({
          json: async () => testResponse,
        })),
        loadMore: jest.fn(),
      },
    });
    // NOTE: this is here because of the Blockies component
    Object.defineProperty(window.HTMLCanvasElement.prototype, "getContext", {
      value: jest.fn(() => ({
        fillRect: jest.fn(),
      })),
    });
  });
  it("renders correctly and match Snapshot", async () => {
    let theContainer: any;
    await act(async () => {
      const { container } = await render(
        <ThemeSwitcher themes={{ light: lightTheme }}>
          <ExplorerProvider>
            <ExplorerPage />
          </ExplorerProvider>
        </ThemeSwitcher>
      );
      theContainer = container;
    });
    await waitFor(() => {
      expect(theContainer).toMatchSnapshot();
    });
  });
});
