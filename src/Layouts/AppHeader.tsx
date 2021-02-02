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

import { NavLink as Link } from "react-router-dom";
import ChainBridgeLogo from "../assets/AEB_Red_GradientLight.svg";
import Toggle from "../Components/Custom/Toggle";
import useMedia from "use-media";

const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) => {
  const getConnectionStyles = (color: string) => ({
    borderRadius: 35,
    boxShadow: constants.dropShadowStyle as string,
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
      backgroundColor: color,
      borderRadius: "50%",
    },
    [`@media (max-width: ${1000}px)`]: {
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      padding: "10px 15px 10px 45px",
      "&:before": {
        left: "-1px",
        width: 20,
        height: 20,
      },
    },
  });

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
      marginBottom: 30,
    },
    left: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    logo: {
      marginRight: `${constants.generalUnit}px`,
      height: 60,
      marginBottom: 5,
      whiteSpace: "nowrap",
    },
    subLogo: {
      color: "##212121",
      fontSize: 15,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
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
      marginRight: "30px",
    },
    viewTutorials: {
      borderRadius: "35px",
      boxShadow: constants.dropShadowStyle as string,
      padding: "12px 15px 12px 15px",
      fontSize: "13px",
      position: "relative",
      whiteSpace: "nowrap",
      backgroundColor: "white",
      textDecoration: "none",
      textAlign: "center",
      marginRight: 30,
      fontFamily: "Inter",
    },
    viewTutorialsMenu: {
      fontSize: "13px",
      textDecoration: "none",
      marginLeft: 46,
      fontFamily: "Inter",
    },
    toggleLabel: {
      fontSize: 13,
    },
    notConnectedIndicator: {
      ...(getConnectionStyles(palette.additional["red"][6]) as any),
    },
    isConnectedIndicator: {
      ...(getConnectionStyles(palette.additional.indicatorGreen[1]) as any),
    },
  });
});

interface IAppHeader {
  showViewTransfer: boolean;
}

const AppHeader: React.FC<IAppHeader> = ({ showViewTransfer = false }) => {
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
          <p>AEB | Avalanche - Ethereum Bridge</p>
        </div>
      </div>
      {isLessThan1000px ? (
        <>
          <span className="header-hamburger-menu">
            <HamburgerMenu
              onClick={handleClick}
              variant={"default"}
            ></HamburgerMenu>
          </span>
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
                labelClassName={classes.toggleLabel}
                label="Night Mode"
                value={isDarkTeme}
                onChange={() => {
                  const isDark = !isDarkTeme;
                  document.body.className = isDark ? `dark-theme` : ``;
                  setDarkTheme(isDark);
                }}
              />
            </MenuItem>
            <MenuItem>
              {!showViewTransfer ? (
                <Link className={classes.viewTutorialsMenu} to={"/tutorials"}>
                  View Tutorials
                </Link>
              ) : (
                <Link className={classes.viewTutorialsMenu} to={"/transfer"}>
                  View App
                </Link>
              )}
            </MenuItem>
          </Menu>
        </>
      ) : (
        <section className={classes.state}>
          {!showViewTransfer ? (
            <Link className={classes.viewTutorials} to={"/tutorials"}>
              View Tutorials
            </Link>
          ) : (
            <Link className={classes.viewTutorials} to={"/transfer"}>
              View App
            </Link>
          )}
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
          {/* <Toggle
            label="Night Mode"
            value={isDarkTeme}
            onChange={() => {
              const isDark = !isDarkTeme;
              document.body.className = isDark ? `dark-theme` : ``;
              setDarkTheme(isDark);
            }}
          /> */}
        </section>
      )}
    </header>
  );
};

export default AppHeader;
