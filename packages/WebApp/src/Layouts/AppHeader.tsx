import { createStyles, ITheme, makeStyles } from "@imploy/common-themes";
import React from "react";
import clsx from "clsx";
import { Typography } from "@imploy/common-components";

const useStyles = makeStyles(({ constants, palette }: ITheme) => {
  return createStyles({
    root: {
      display: "flex",
      position: "fixed",
      justifyContent: "space-between",
      padding: `${constants.generalUnit * 2}px ${constants.generalUnit * 4}px`,
      width: "100%",
      top: 0,
      left: 0,
      borderBottom: `1px solid ${palette.additional["gray"][6]}`,
      color: palette.additional["gray"][8],
      alignItems: "center",
    },
  });
});

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
  const classes = useStyles();

  return (
    <header className={clsx(classes.root)}>
      <Typography variant="h4">ChainBridge Token Swap</Typography>
      <Typography variant="h5">No wallet connected</Typography>
    </header>
  );
};

export default AppHeader;
