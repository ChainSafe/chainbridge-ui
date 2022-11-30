import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";

export const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      width: "100%",
    },
    inner: {
      width: "100% !important",
      maxWidth: "unset !important",
      borderRadius: "4px",
      display: "flex",
      flexDirection: "row",
      padding: `${constants.generalUnit * 6}px ${constants.generalUnit * 7}px`,
    },
    heading: {
      marginBottom: constants.generalUnit,
    },
    icon: {
      height: 20,
      width: 20,
      marginTop: constants.generalUnit * 0.8,
      marginRight: constants.generalUnit * 2,
      fill: palette.additional["gray"][7],
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      marginTop: constants.generalUnit * 5,
      "& > *": {
        textDecoration: "none",
        marginRight: constants.generalUnit,
      },
    },
    button: {
      borderColor: palette.additional["gray"][8],
      color: palette.additional["gray"][8],
      "&:hover": {
        borderColor: palette.additional["gray"][8],
        backgroundColor: palette.additional["gray"][8],
        color: palette.common.white.main,
      },
    },
  })
);
