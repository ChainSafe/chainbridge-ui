import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";

export const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      backgroundColor: `${palette.additional["gray"][9]} !important`,
      color: palette.common.white.main,
      border: "none",
      padding: `${constants.generalUnit * 3}px ${constants.generalUnit * 4}px`,
    },
    backdrop: {
      backgroundColor: `${palette.additional["gray"][9]} !important`,
      opacity: `0.6 !important`,
    },
  })
);
