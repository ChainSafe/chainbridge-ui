import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React from "react";
import clsx from "clsx";
import { Typography } from "@chainsafe/common-components";
import { shortenAddress } from "../Utils/Helpers";
import { useWeb3 } from "@chainsafe/web3-context";
import { useChainbridge } from "../Contexts/ChainbridgeContext";

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
      backgroundColor: palette.additional["header"][1],
      borderBottom: `1px solid ${palette.additional["header"][3]}`,
      color: palette.additional["header"][2],
      alignItems: "center",
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
      marginRight: constants.generalUnit * 3,
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
  });
});

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
  const classes = useStyles();
  const { isReady, address } = useWeb3();
  const { homeChain } = useChainbridge();
  return (
    <header className={clsx(classes.root)}>
      <div className={classes.left}>
        {/* ADD LOGO HERE */}
        <div className={classes.logo}>
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.5455 12.4026L37.1429 20L20 37.1429L2.85714 20L20 2.85714L27.5974 10.4545L29.026 9.02597L20 0L0 20L20 40L40 20L30.974 10.974L29.5455 12.4026Z"
              fill="#00A308"
            />
            <path
              d="M15 23.5715L10 28.5715L11.4416 30L16.4416 25"
              fill="#00A308"
            />
            <path
              d="M10 11.4286L28.5714 30L30 28.5584L11.4416 10"
              fill="#00A308"
            />
          </svg>
        </div>
        <Typography variant="h4">ChainBridge Token Swap</Typography>
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
