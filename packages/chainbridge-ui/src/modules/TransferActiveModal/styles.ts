import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";

export const useStyles = makeStyles(
  ({ animation, constants, palette, typography }: ITheme) =>
    createStyles({
      root: {
        width: "100%",
      },
      inner: {
        width: "100% !important",
        maxWidth: "unset !important",
        display: "flex",
        flexDirection: "row",
        padding: `${constants.generalUnit * 5}px ${
          constants.generalUnit * 3.5
        }px`,
        bottom: 0,
        top: "unset !important",
        transform: "unset !important",
        left: "0 !important",
        border: "none",
        borderRadius: 0,
        transitionDuration: `${animation.transform}ms`,
      },
      heading: {
        marginBottom: constants.generalUnit,
        whiteSpace: "nowrap",
      },
      stepIndicator: {
        ...typography.h4,
        height: 40,
        width: 40,
        marginRight: constants.generalUnit * 2,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: `1px solid ${palette.additional["transactionModal"][2]}`,
        color: palette.additional["transactionModal"][3],
        "& svg": {
          height: 20,
          width: 20,
          display: "block",
        },
      },
      content: {
        display: "flex",
        flexDirection: "column",
      },
      buttons: {
        // display: "flex",
        // flexDirection: "row",
        marginTop: constants.generalUnit * 5,
        "& > *": {
          textDecoration: "none",
          marginRight: constants.generalUnit,
        },
      },
      button: {
        borderColor: `${palette.additional["gray"][8]} !important`,
        color: `${palette.additional["gray"][8]} !important`,
        textDecoration: "none",
        "&:hover": {
          borderColor: `${palette.additional["gray"][8]} !important`,
          backgroundColor: `${palette.additional["gray"][8]} !important`,
          color: `${palette.common.white.main} !important`,
          textDecoration: "none",
        },
      },
      initCopy: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "& > *:first-child": {
          marginTop: constants.generalUnit * 3.5,
          marginBottom: constants.generalUnit * 8,
        },
      },
      sendingCopy: {},
      vote: {
        display: "flex",
        flexDirection: "row",
        marginTop: constants.generalUnit,
        "& > *": {
          "&:first-child": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 240,
          },
          "&:last-child": {
            marginLeft: constants.generalUnit * 3.5,
            fontStyle: "italic",
          },
        },
      },
      warning: {
        marginTop: constants.generalUnit * 3.5,
        display: "block",
        fontWeight: 600,
      },
      receipt: {
        marginTop: constants.generalUnit * 3.5,
        marginBottom: constants.generalUnit * 8,
      },
      weighted: {
        fontWeight: 600,
      },
      progress: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        "& > *": {
          borderRadius: "0 !important",
          "&  >  *": {
            borderRadius: "0 !important",
            background: `${palette.additional["transactionModal"][1]} !important`,
          },
        },
      },
    })
);
