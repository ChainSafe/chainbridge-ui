import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React from "react";
import clsx from "clsx";
import { NavLink, Typography } from "@chainsafe/common-components";
import { shortenAddress } from "../Utils/Helpers";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import CereLogo from "../media/Icons/cere-icon.svg";

const useStyles = makeStyles(
  ({ constants, palette, zIndex, breakpoints }: ITheme) => {
    return createStyles({
      root: {
        fontFamily: "Sora, sans-serif",
        display: "flex",
        justifyContent: "space-between",
        padding: constants.generalUnit * 3.1,
        width: "100%",
        backgroundColor: "white",
        color: palette.additional["header"][2],
        alignItems: "center",
        zIndex: zIndex?.layer2,
        [breakpoints.down("sm")]: {
          flexDirection: "column",
        },
        alignContent: "center",
      },
      left: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      },
      logo: {
        height: constants.generalUnit * 5,
        width: constants.generalUnit * 5,
        "& svg, & img": {
          height: "100%",
          width: "100%",
        },
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
      accountInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      mainInfo: {
        display: "flex",
      },
      rightWrapper: {
        display: "flex",
      },
      link: {
        paddingRight: 10,
      },
      title: {
        paddingLeft: constants.generalUnit / 1.4,
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 30,
        color: "black",
      },
    });
  }
);

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
  const classes = useStyles();
  const { homeConfig, isReady, address } = useChainbridge();
  return (
    <header className={clsx(classes.root)}>
      <div className={classes.left}>
        {/* ADD LOGO HERE */}
        <div className={classes.logo}>
          <NavLink style={{ textDecoration: "none" }} to="/">
            <img src={CereLogo} alt="Cere Logo" />
          </NavLink>
        </div>
        <NavLink
          style={{ textDecoration: "none" }}
          className={classes.title}
          to="/"
        >
          <Typography variant="h4" className={classes.title}>
            Cere Bridge
          </Typography>
        </NavLink>
      </div>
      <div className={classes.rightWrapper}>
        <section className={classes.state}>
          {!isReady ? (
            <Typography variant="h5">No wallet connected</Typography>
          ) : (
            <>
              <div className={classes.mainInfo}>
                <div className={classes.accountInfo}>
                  <span className={classes.indicator} />
                  <Typography variant="h5" className={classes.address}>
                    {address && shortenAddress(address)}
                  </Typography>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </header>
  );
};

export default AppHeader;
