import React from "react";
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import clsx from "clsx";

const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) => {
  return createStyles({
    root: {},
  });
});

const NetworkSelectModal = () => {
  const classes = useStyles();
  const { walletType, setWalletType, isReady } = useChainbridge();

  return (
    <section
      className={clsx(classes.root, {
        active: walletType != "unset" && !isReady,
      })}
    ></section>
  );
};

export default NetworkSelectModal;
