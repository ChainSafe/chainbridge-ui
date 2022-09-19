import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";

export const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) =>
  createStyles({
    root: {
      position: "absolute",
      zIndex: zIndex?.blocker,
      "& li": {
        position: "relative",
        padding: `${constants.generalUnit}px 0 ${constants.generalUnit}px ${
          constants.generalUnit * 8
        }px`,
        "&:before": {
          content: "''",
          display: "block",
          backgroundColor: palette.additional["gray"][2],
          height: constants.generalUnit,
          width: constants.generalUnit,
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          left: constants.generalUnit * 4,
          transform: "translate(-50%, -50%)",
        },
      },
    },
    subtitle: {
      margin: `${constants.generalUnit * 2}px 0`,
    },
    agreement: {
      margin: `${constants.generalUnit * 2}px 0`,
    },
    startButton: {
      backgroundColor: palette.additional["preflight"][1],
      color: palette.additional["preflight"][2],
      marginBottom: constants.generalUnit * 2,
    },
    backdrop: {
      position: "absolute",
      zIndex: zIndex?.layer4,
    },
  })
);
