import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React from "react";
import clsx from "clsx";
import { Typography } from "@chainsafe/common-components";
import { shortenAddress } from "../Utils/Helpers";
import { useWeb3 } from "@chainsafe/web3-context";
import { useChainbridge } from "../Contexts/ChainbridgeContext";

import ChainBridgeLogo from "../assets/ChainBridge.svg";
import AvaEthBridgeLogo from "../assets/Avalanche_EthereumBridge.svg";

const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) => {
  return createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      padding: `${constants.generalUnit * 4}px ${constants.generalUnit * 6}px`,
      width: "100%",
      top: 0,
      left: 0,
      backgroundColor: palette.additional["header"][1],
      color: palette.additional["header"][2],
      alignItems: "center",
      zIndex: zIndex?.layer2,
    },
    left: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-end",
    },
    logo: {
      marginRight: `${constants.generalUnit}px`,
    },
    subLogo: {
      height: `${constants.generalUnit * 5}px`,
      marginTop: `${constants.generalUnit * 2}px`,
    },
    semiBold: {
      fontWeight: 500,
      color: palette.additional["gray"][9],
    },
    state: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    indicator: {
      display: "block",
      height: 10,
      width: 10,
      borderRadius: "50%",
      backgroundColor: palette.additional["green"][6],
      marginRight: constants.generalUnit,
    },
    address: {
      marginRight: constants.generalUnit,
    },
    network: {},
  });
});

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
  const classes = useStyles();
  const { isReady, address } = useWeb3();
  const { homeChain } = useChainbridge();
  return (
    <header className={clsx(classes.root)}>
      <div>
        <div className={classes.left}>
          <img src={ChainBridgeLogo} className={classes.logo} />
          <Typography variant="h4" className={classes.semiBold}>
            TokenSwap
          </Typography>
        </div>
        <div>
          <img src={AvaEthBridgeLogo} className={classes.subLogo} />
        </div>
      </div>
      <section className={classes.state}>
        {!isReady ? (
          <Typography variant="h5">No wallet connected</Typography>
        ) : (
          <>
            <div className={classes.indicator}></div>
            <Typography variant="h5" className={classes.address}>
              {address && shortenAddress(address)}
            </Typography>
            <Typography variant="h5" className={classes.address}>
              connected to <strong>{homeChain?.name}</strong>
            </Typography>
          </>
        )}
      </section>
    </header>
  );
};

export default AppHeader;
