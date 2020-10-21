import { createTheme } from "@imploy/common-themes";

export const lightTheme = createTheme({
  globalStyling: {
    backgroundColor: "#E8E8E8",
  },
  themeConfig: {
    overrides: {
      Button: {
        variants: {
          primary: {
            active: {
              color: "#262626",
              "& svg": {
                fill: "#262626",
              },
            },
            hover: {
              color: "#262626",
              "& svg": {
                fill: "#262626",
              },
            },
            focus: {
              color: "#262626",
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
