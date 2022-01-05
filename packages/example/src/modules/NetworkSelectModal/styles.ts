import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";

export const useStyles = makeStyles(
  ({ constants, palette, zIndex }: ITheme) => {
    return createStyles({
      root: {},
      slide: {
        borderRadius: constants.generalUnit / 2,
        padding: `${constants.generalUnit}px ${constants.generalUnit * 2}px`,
        "& > p": {
          marginTop: constants.generalUnit * 2,
          marginBottom: constants.generalUnit * 3,
          textAlign: "center",
        },
      },
      buttons: {
        marginBottom: constants.generalUnit * 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      },
    });
  }
);
