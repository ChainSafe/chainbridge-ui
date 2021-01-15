import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React, { useState } from "react";
import clsx from "clsx";
import { Typography } from "@chainsafe/common-components";
import { shortenAddress } from "../Utils/Helpers";
import { useWeb3 } from "@chainsafe/web3-context";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import classNames from "classnames";

import ChainBridgeLogo from "../assets/ChainBridge.svg";
import AvaEthBridgeLogo from "../assets/Avalanche_EthereumBridge.svg";
import Toggle from "../Components/Custom/Toggle";
import { start } from "repl";

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
      [`@media (max-width: ${constants.tabletMediaSize}px)`]: {
        flexDirection: "column",
        alignItems: "start",
      },
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
      [`@media (max-width: ${constants.tabletMediaSize}px)`]: {
        padding: "20px 0",
      },
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
    connectionIndicator: {
      marginRight: "60px",
    },
    notConnectedIndicator: {
      border: "solid 1px",
      borderRadius: "35px",
      padding: "10px 15px 10px 35px",
      fontSize: "13px",
      position: "relative",
      whiteSpace: "nowrap",
      "&:before": {
        content: "''",
        position: "absolute",
        top: "8px",
        left: "10px",
        width: "18px",
        height: "18px",
        display: "block",
        backgroundColor: palette.additional["red"][6],
        borderRadius: "50%",
      },
    },
    isConnectedIndicator: {
      border: "solid 1px",
      borderRadius: 35,
      padding: "10px 15px 10px 35px",
      position: "relative",
      "&:before": {
        content: "''",
        position: "absolute",
        top: 10,
        left: 10,
        width: 18,
        height: 18,
        display: "block",
        backgroundColor: palette.additional.indicatorGreen[1],
        borderRadius: "50%",
      },
    },
  });
});

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
  const classes = useStyles();
  const { isReady, address } = useWeb3();
  const { homeChain } = useChainbridge();
  const [isDarkTeme, setDarkTheme] = useState(false);

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
          <img
            src={AvaEthBridgeLogo}
            className={classNames(classes.subLogo, "ava-eth-logo")}
          />
        </div>
      </div>
      <section className={classes.state}>
        <span
          className={classNames(
            classes.connectionIndicator,
            "connected-indicator"
          )}
        >
          {!isReady ? (
            <Typography className={classes.notConnectedIndicator} variant="h5">
              No wallet connected
            </Typography>
          ) : (
            <span className={classes.isConnectedIndicator}>
              {/* <div className={classes.indicator}></div> */}
              <Typography variant="h5" className={classes.address}>
                {address && shortenAddress(address)}
              </Typography>
              <Typography variant="h5" className={classes.address}>
                connected to <strong>{homeChain?.name}</strong>
              </Typography>
            </span>
          )}
        </span>
        <Toggle
          className=""
          label="Night Mode"
          value={isDarkTeme}
          onChange={() => {
            const isDark = !isDarkTeme;
            document.body.className = isDark ? `dark-theme` : ``;
            setDarkTheme(isDark);
          }}
        />
      </section>
    </header>
  );
};

export default AppHeader;
