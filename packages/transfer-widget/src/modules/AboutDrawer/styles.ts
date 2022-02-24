import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";

export const useStyles = makeStyles(({ constants }: ITheme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "& *": {
        marginRight: constants.generalUnit,
        textDecoration: "none",
      },
    },
  })
);
