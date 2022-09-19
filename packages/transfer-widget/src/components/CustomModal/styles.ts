import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";

export const useStyles = makeStyles(({ constants }: ITheme) =>
  createStyles({
    root: {
      height: `100% !important`,
      borderTopLeftRadius: constants.generalUnit / 2,
      borderTopRightRadius: constants.generalUnit / 2,
      overflow: "hidden",
      position: "absolute",
    },
  })
);
