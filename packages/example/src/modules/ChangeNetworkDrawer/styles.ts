import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";

export const useStyles = makeStyles(({ constants }: ITheme) =>
  createStyles({
    root: {},
    buttons: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      "& > *": {
        marginTop: constants.generalUnit * 2,
        marginRight: constants.generalUnit,
        textDecoration: "none",
      },
    },
    paragraph: {
      margin: `${constants.generalUnit * 3}px 0`,
    },
  })
);
