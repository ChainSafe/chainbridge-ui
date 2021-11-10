import { makeStyles, createStyles } from "@chainsafe/common-theme";

export const useStyles = makeStyles(() =>
  createStyles({
    transferDetailViewContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  })
);
