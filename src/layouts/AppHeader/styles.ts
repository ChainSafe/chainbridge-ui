import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";

export const useStyles = makeStyles(
  ({ constants, palette, zIndex, breakpoints }: ITheme) => {
    return createStyles({
      root: {
        display: "flex",
        // position: "fixed",
        justifyContent: "space-between",
        padding: `${constants.generalUnit * 2}px ${
          constants.generalUnit * 4
        }px`,
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: palette.additional["header"][1],
        borderBottom: `1px solid ${palette.additional["header"][3]}`,
        color: palette.additional["header"][2],
        alignItems: "center",
        zIndex: zIndex?.layer2,
        [breakpoints.down("sm")]: {
          flexDirection: "column",
        },
      },
      left: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        [breakpoints.down("sm")]: {
          display: "flex",
          flexDirection: "column",
        },
      },
      logo: {
        height: constants.generalUnit * 5,
        width: constants.generalUnit * 5,
        "& svg, & img": {
          maxHeight: "100%",
          maxWidth: "100%",
        },
      },
      state: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      indicator: {
        display: "block",
        height: 10,
        width: 10,
        borderRadius: "50%",
        backgroundColor: palette.additional["green"][6],
        marginRight: constants.generalUnit,
      },
      address: {
        marginRight: constants.generalUnit,
      },
      network: {},
      accountInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      mainInfo: {
        display: "flex",
        flexDirection: "column",
      },
      mainTitle: {},
      headerLinks: {
        marginLeft: 49,
        display: "flex",
        [breakpoints.down("sm")]: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginLeft: "unset",
          alignItems: "center",
          width: "100%",
          "& > a:last-child": {
            marginLeft: 5,
          },
        },
      },
      link: {
        marginLeft: 46,
        textDecoration: "none",
        [breakpoints.down("sm")]: {
          marginLeft: "unset",
        },
      },
      linkTitle: {
        fontSize: 16,
      },
    });
  }
);
