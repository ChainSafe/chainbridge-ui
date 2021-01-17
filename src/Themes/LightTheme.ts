import { createTheme } from "@chainsafe/common-theme";
import { grey } from "@material-ui/core/colors";

const inputSelectorHeight = 45;
const inputSelectorFontSize = 16;
const inputSelectorBorderRadius = 15;
const dropShadowStyle = "0px 1px 20px 0px #bdbdbd5e";
const tabletMediaSize = 1200;
const smallMediaSize = 720;

const headerTitleStyle = {
  fontWeight: 600,
  fontSize: 12,
};

const networkNameStyle = {
  padding: `0 20px`,
  borderRadius: 15,
  color: "#212121",
  marginTop: 8,
  marginBottom: 20,
  fontWeight: 600,
  height: inputSelectorHeight,
  textTransform: "uppercase",
  alignItems: "center",
  display: "flex",
  boxShadow: dropShadowStyle,
  fontSize: inputSelectorFontSize,
};

const largeButtonStyle = {
  borderRadius: 30,
  height: 45,
  fontSize: 20,
  fontWeight: 700,
  border: "none",
  minHeight: 35,
  maxWidth: 400,
  minWidth: 300,
};

const pageRootStyles = {
  border: "solid #E0E0E0",
  margin: "10px",
  borderRadius: "13px",
  padding: 20,
  position: "relative",
  [`@media (max-width: ${tabletMediaSize}px)`]: {
    padding: 10,
  },
};

const walletArea = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};

const maxButton = {
  height: 32,
  borderBottomLeftRadius: 0,
  borderTopLeftRadius: 0,
  left: -1,
  color: grey[800],
  backgroundColor: grey[300],
  borderColor: grey[600],
  "&:hover": {
    borderColor: grey[600],
    backgroundColor: grey[700],
    color: "white",
  },
  "&:focus": {
    borderColor: grey[600],
  },
};

const tokenInputArea = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-around",
  paddingRight: 8,
};

const currencySection = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  margin: `24px 0`,
  maxWidth: 570,
};

const currencySelector = {
  width: 210,
  "& *": {
    cursor: "pointer",
  },
};

export const lightTheme = createTheme({
  globalStyling: {
    body: {
      backgroundColor: "#F5F5F5",
    },
  },
  themeConfig: {
    constants: {
      navItemHeight: 42,
      inputSelectorHeight,
      inputSelectorBorderRadius,
      dropShadowStyle,
      tabletMediaSize,
      smallMediaSize,
      headerTitleStyle,
      inputSelectorFontSize,
      largeButtonStyle,
      networkNameStyle,
      pageRootStyles,
      walletArea,
      maxButton,
      tokenInputArea,
      currencySection,
      currencySelector,
    },
    palette: {
      additional: {
        general: {
          1: "#85A5FF", // Accents //geekblue4
        },
        transferUi: {
          1: "#595959", // FAQ button // gray8
        },
        header: {
          1: "#F5F5F5", // Background
          2: "#595959", // Text color //gray8
          3: "#BFBFBF", // border // gray6
        },
        preflight: {
          1: "#85A5FF", // Button bg color
          2: "#262626", // Button color
        },
        transactionModal: {
          1: "#597EF7", // border //geekblue5
          2: "#85A5FF", // indicator border //geekblue4
          3: "#2F54EB", // indicator text //geekblue6
        },
        navLink: {
          1: "#1d1c27",
        },
        submitButton: {
          1: "#FF1267", // pink
        },
        indicatorGreen: {
          1: "#76ff03",
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
      Typography: {
        body1: {
          fontWeight: 700,
        },
      },
      SelectInput: {
        label: {
          fontWeight: 700,
        },
        container: {
          borderRadius: inputSelectorBorderRadius,
          height: inputSelectorHeight,
          display: "flex",
          justifyContent: "center",
          boxShadow: dropShadowStyle,
          backgroundColor: "white",
          borderColor: "transparent",
        },
        control: {
          borderRadius: inputSelectorBorderRadius,
          width: "100%",
          backgroundColor: "white",
        },
        indicatorsContainer: {
          "> span": {
            backgroundColor: "transparent",
          },
        },
        valueContainer: {
          // fontSize: 20,
          // left: 20,
          fontWeight: 400,
        },
        singleValue: {
          // fontSize: 20,
          fontWeight: 400,
          // left: 20,
          color: "black",
        },
      },
      TextInput: {
        input: {
          root: {
            height: "100%",
            borderRadius: inputSelectorBorderRadius,
            border: "none",
          },
        },
        inputArea: {
          size: {
            medium: {
              borderRadius: inputSelectorBorderRadius,
              backgroundColor: "transparent",
              boxShadow: dropShadowStyle,
              height: inputSelectorHeight,
            },
          },
        },
      },
    },
  },
});
