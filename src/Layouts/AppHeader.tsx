import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React from "react";
import clsx from "clsx";
import { Typography } from "@chainsafe/common-components";
import { shortenAddress } from "../Utils/Helpers";
import { useChainbridge } from "../Contexts/ChainbridgeContext";

const useStyles = makeStyles(
  ({ constants, palette, zIndex, breakpoints }: ITheme) => {
    return createStyles({
      root: {
        display: "flex",
        position: "fixed",
        justifyContent: "space-between",
        padding: `${constants.generalUnit * 2}px ${
          constants.generalUnit * 4
        }px`,
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: palette.additional["header"][1],
        borderBottom: `1px solid ${palette.additional["header"][3]}`,
        color: palette.additional["header"][2],
        alignItems: "center",
        zIndex: zIndex?.layer2,
        [breakpoints.down("sm")]: {
          flexDirection: "column",
        },
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
        marginRight: constants.generalUnit,
        "& svg, & img": {
          maxHeight: "100%",
          maxWidth: "100%",
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
        flexDirection: "column",
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
          <img src="./favicon.png" alt="Astar" />
        </div>
        <Typography variant="h4">AstarBridge Token Swap</Typography>
      </div>
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
              <Typography variant="h5" className={classes.address}>
                <div>
                  <span>connected to </span>
                  <span>
                    <strong>{homeConfig?.name}</strong>
                  </span>
                </div>
              </Typography>
            </div>
          </>
        )}
      </section>
    </header>
  );
};

export default AppHeader;
