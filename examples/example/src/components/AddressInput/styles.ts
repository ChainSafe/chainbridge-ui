import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";

export const useStyles = makeStyles(({ constants }: ITheme) =>
  createStyles({
    root: {},
    input: {
      margin: 0,
      width: "100%",
    },
    label: {
      marginBottom: constants.generalUnit,
    },
    checkbox: {
      marginTop: constants.generalUnit * 3,
    },
  })
);
