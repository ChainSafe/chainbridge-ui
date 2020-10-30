import { createTheme } from "@imploy/common-themes";

export const lightTheme = createTheme({
  globalStyling: {
    body: {
      backgroundColor: "#F5F5F5",
    },
  },
  themeConfig: {
    palette: {
      additional: {
        general: {
          1: "#00A308", // Accents // ETC main
        },
        transferUi: {
          1: "#00A308", // FAQ button // ETC main
        },
        header: {
          1: "#191919", // Background // ETC black
          2: "#EDEDED", // Text color // ETC gray
          3: "#191919", // border // ETC black
        },
        preflight: {
          1: "#00A308", // Button bg color // ETC main
          2: "#EDEDED", // Button color //  ETC gray
        },
        transactionModal: {
          1: "#00A308", // border // ETC main
          2: "#00A308", // indicator border // ETC main
          3: "#00A308", // indicator text // ETC main
        },
      },
    },
    overrides: {
      CheckboxInput: {
        root: {
          alignItems: "center",
        },
      },
      Button: {
        variants: {
          primary: {
            root: {
              backgroundColor: "#262626",
              color: "#ffffff",
              border: `1px solid #262626`,
              "& svg": {
                fill: "#ffffff",
              },
            },
            active: {
              backgroundColor: "#ffffff",
              color: "#262626",
              "& svg": {
                fill: "#262626",
              },
            },
            hover: {
              backgroundColor: "#ffffff",
              color: "#262626",
              "& svg": {
                fill: "#262626",
              },
            },
            focus: {
              backgroundColor: "#ffffff",
              color: "#262626",
              "& svg": {
                fill: "#262626",
              },
            },
          },
          outline: {
            root: {
              backgroundColor: "transparent",
              color: "#ffffff",
              border: `1px solid #ffffff`,
              "& svg": {
                fill: "#ffffff",
              },
            },
            active: {
              backgroundColor: "#ffffff",
              color: "#262626",
              borderColor: "#ffffff",
              "& svg": {
                fill: "#262626",
              },
            },
            hover: {
              backgroundColor: "#ffffff",
              color: "#262626",
              borderColor: "#ffffff",
              "& svg": {
                fill: "#262626",
              },
            },
            focus: {
              backgroundColor: "#ffffff",
              color: "#262626",
              borderColor: "#ffffff",
              "& svg": {
                fill: "#262626",
              },
            },
          },
        },
      },
    },
  },
});
