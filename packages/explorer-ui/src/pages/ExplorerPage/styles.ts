import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";

export const useStyles = makeStyles(({ constants, breakpoints }: ITheme) =>
  createStyles({
    root: {
      padding: constants.generalUnit * 6,
      position: "relative",
    },
    mainContent: {
      display: "grid",
      gridTemplateRows: "repeat(1, 1fr)",
      width: "70%",
      [breakpoints.down("lg")]: {
        width: "80%",
      },
    },
    networkInfoContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    networkInfo: {
      display: "grid",
      gridColumn: "1/5",
      gridRow: "1",
      paddingRight: 15
    },
    networkSelection: {
      display: "flex",
      alignItems: "center",
      maxWidth: 600,
    },
    networkSelectorContainer: {
      display: "flex",
    },
    searchInput: {
      display: "grid",
      gridRow: "1",
      width: "50ch"
    },
    networkSelector: {
      marginLeft: 21,
      width: 327,
      "& > div > div": {
        lineHeight: 32,
        color: "#262626",
        "& > div > div": {
          fontSize: 24,
          fontWeight: 600,
        },
      },
    },
    explorerTableContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "100px",
    },
    explorerTable: {
      marginTop: 29,
      borderRadius: 4,
      border: "1px solid #B6B6B6",
      background: "#FAFAFA",
      minWidth: 955,
      width: "100%",
      height: "100%",
    },
    paginationPanel: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "25px 16px 0",
    },
    paginationButtons: {
      marginLeft: "10px",
    },
  })
);
