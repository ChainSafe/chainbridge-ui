import { createTheme } from "@imploy/common-themes";

export const lightTheme = createTheme({
  globalStyling: {
    body: {
      backgroundColor: "#F5F5F5",
    },
  },
  themeConfig: {
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
