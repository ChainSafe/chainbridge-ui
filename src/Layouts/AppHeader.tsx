import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React, { useState } from "react";
import clsx from "clsx";
import { Typography, HamburgerMenu } from "@chainsafe/common-components";
import { shortenAddress } from "../Utils/Helpers";
import { useWeb3 } from "@chainsafe/web3-context";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import classNames from "classnames";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import ChainBridgeLogo from "../assets/ChainBridge.svg";
import Toggle from "../Components/Custom/Toggle";
import useMedia from "use-media";

const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) => {
  return createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      top: 0,
      left: 0,
      color: palette.additional["header"][2],
      alignItems: "center",
      zIndex: zIndex?.layer2,
      padding: "15px 20px 10px 20px",
      borderBottom: "solid 1px black",
      marginBottom: 30,
    },
    left: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    logo: {
      marginRight: `${constants.generalUnit}px`,
      height: 20,
      marginBottom: 5,
      whiteSpace: "nowrap",
    },
    subLogo: {
      color: "##212121",
      fontSize: 15,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      fontWeight: 500,
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
      backgroundColor: "white",
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
      [`@media (max-width: ${1000}px)`]: {
        backgroundColor: "transparent",
        border: "none",
      },
    },
    isConnectedIndicator: {
      border: "solid 1px",
      borderRadius: 35,
      padding: "10px 15px 10px 35px",
      position: "relative",
      whiteSpace: "nowrap",
      backgroundColor: "white",
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
      [`@media (max-width: ${1000}px)`]: {
        backgroundColor: "transparent",
        border: "none",
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
  const isLessThan1000px = useMedia({ maxWidth: "1000px" });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={clsx(classes.root)}>
      <div className={classes.left}>
        <img
          src={ChainBridgeLogo}
          alt={"Chainbridge Logo"}
          className={classes.logo}
        />

        <div className={classNames(classes.subLogo, "ava-eth-logo")}>
          <p>Avalanche &#60;&#62; Ethereum Bridge</p>
        </div>
      </div>
      {isLessThan1000px ? (
        <>
          <HamburgerMenu
            onClick={handleClick}
            variant={"default"}
          ></HamburgerMenu>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <span
                className={classNames(
                  classes.connectionIndicator,
                  "connected-indicator"
                )}
              >
                {!isReady ? (
                  <Typography
                    className={classes.notConnectedIndicator}
                    variant="h5"
                  >
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
            </MenuItem>
            <MenuItem>
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
            </MenuItem>
          </Menu>
        </>
      ) : (
        <section className={classes.state}>
          <span
            className={classNames(
              classes.connectionIndicator,
              "connected-indicator"
            )}
          >
            {!isReady ? (
              <Typography
                className={classes.notConnectedIndicator}
                variant="h5"
              >
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
      )}
    </header>
  );
};

export default AppHeader;
