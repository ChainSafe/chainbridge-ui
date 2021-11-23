import React from "react";
import {
  Button,
  ExclamationCircleSvg,
  ProgressBar,
  Typography,
} from "@chainsafe/common-components";
import { CustomModal } from "../../components";
import { useChainbridge } from "../../contexts/ChainbridgeContext/ChainbridgeContext";
import { useHomeBridge } from "../../contexts/HomeBridgeContext";
import { useDestinationBridge } from "../../contexts/DestinationBridgeContext";

import { EvmBridgeConfig } from "../../chainbridgeConfig";
import { useStyles } from "./styles";

interface ITransferActiveModalProps {
  open: boolean;
  close: () => void;
  handleClick: (txHash: string) => void;
}

const TransferActiveModal: React.FC<ITransferActiveModalProps> = ({
  open,
  close,
  handleClick,
}: ITransferActiveModalProps) => {
  const classes = useStyles();
  const {
    transactionStatus,
    relayerThreshold,
    homeConfig,
    destinationChainConfig,
    depositAmount,
    selectedToken,
    tokens,
  } = useChainbridge();
  const { homeTransferTxHash } = useHomeBridge();
  const {
    transferTxHash,
    depositVotes,
    inTransitMessages,
  } = useDestinationBridge();
  const tokenSymbol = selectedToken && tokens[selectedToken]?.symbol;
  return (
    <CustomModal
      className={classes.root}
      injectedClass={{
        inner: classes.inner,
      }}
      active={open}
    >
      <ProgressBar
        className={classes.progress}
        size="small"
        variant="primary"
        progress={transactionStatus !== "Transfer Completed" ? -1 : 100}
      />
      <section>
        <div className={classes.stepIndicator}>
          {transactionStatus === "Initializing Transfer" ? (
            "1"
          ) : transactionStatus === "In Transit" ? (
            "2"
          ) : transactionStatus === "Transfer Completed" ? (
            "3"
          ) : (
            <ExclamationCircleSvg />
          )}
        </div>
      </section>
      <section className={classes.content}>
        <Typography className={classes.heading} variant="h3" component="h3">
          {transactionStatus === "Initializing Transfer"
            ? "Initializing Transfer"
            : transactionStatus === "In Transit"
            ? `In Transit (${
                depositVotes < (relayerThreshold || 0)
                  ? `${depositVotes}/${relayerThreshold} signatures needed`
                  : "Executing proposal"
              })`
            : transactionStatus === "Transfer Completed"
            ? "Transfer completed"
            : "Transfer aborted"}
        </Typography>
        {transactionStatus === "Initializing Transfer" ? (
          <div className={classes.initCopy}>
            <Typography>Deposit pending...</Typography>
            <Typography className={classes.weighted}>
              This should take a few minutes.
              <br />
              Please do not refresh or leave the page.
            </Typography>
          </div>
        ) : transactionStatus === "In Transit" ? (
          <>
            <div className={classes.sendingCopy}>
              {inTransitMessages &&
                inTransitMessages.transitMessage.map((m, i) => {
                  if (typeof m === "string") {
                    return (
                      <Typography
                        className={classes.vote}
                        component="p"
                        key={i}
                      >
                        {m}
                      </Typography>
                    );
                  } else if (typeof m === "object" && m.message !== undefined) {
                    return (
                      <Typography
                        className={classes.vote}
                        component="p"
                        key={i}
                      >
                        {m.message}
                      </Typography>
                    );
                  } else {
                    return (
                      <Typography
                        className={classes.vote}
                        component="p"
                        key={i}
                      >
                        <span>Vote casted by {m.address}</span>
                        <span>{m.signed}</span>
                      </Typography>
                    );
                  }
                })}
              <Typography className={classes.warning}>
                This should take a few minutes. <br />
                Please do not refresh or leave the page.
              </Typography>
            </div>
            <section className={classes.buttons}>
              <Button
                onClick={() => {
                  homeConfig &&
                    (homeConfig as EvmBridgeConfig).blockExplorer &&
                    homeTransferTxHash &&
                    handleClick(homeTransferTxHash!);
                }}
                size="small"
                className={classes.button}
                variant="outline"
                // disabled={
                //   !destinationChain ||
                //   !destinationChain.blockExplorer ||
                //   !transferTxHash
                // }
              >
                View transaction
              </Button>
            </section>
          </>
        ) : transactionStatus === "Transfer Completed" ? (
          <>
            <Typography className={classes.receipt} component="p">
              Successfully transferred{" "}
              <strong>
                {depositAmount} {tokenSymbol}
                <br /> from {homeConfig?.name} to {destinationChainConfig?.name}
                .
              </strong>
            </Typography>
            <section className={classes.buttons}>
              <Button
                onClick={() => {
                  homeConfig &&
                    (homeConfig as EvmBridgeConfig).blockExplorer &&
                    homeTransferTxHash &&
                    handleClick(homeTransferTxHash!);
                }}
                size="small"
                className={classes.button}
                variant="outline"
                // disabled={
                //   !destinationChain ||
                //   !destinationChain.blockExplorer ||
                //   !transferTxHash
                // }
              >
                View transaction
              </Button>
              <Button
                size="small"
                className={classes.button}
                variant="outline"
                onClick={close}
              >
                Start new transfer
              </Button>
            </section>
          </>
        ) : (
          <>
            <Typography className={classes.receipt} component="p">
              Something went wrong and we could not complete your transfer.
            </Typography>
            {homeConfig &&
              (homeConfig as EvmBridgeConfig).blockExplorer &&
              homeTransferTxHash && (
                <Button
                  onClick={() =>
                    window.open(
                      `${
                        (homeConfig as EvmBridgeConfig).blockExplorer
                      }/${transferTxHash}`,
                      "_blank"
                    )
                  }
                  size="small"
                  className={classes.button}
                  variant="outline"
                  disabled
                >
                  View transaction
                </Button>
              )}
            <section className={classes.buttons}>
              <Button
                size="small"
                className={classes.button}
                variant="outline"
                onClick={close}
              >
                Start new transfer
              </Button>
              <a
                rel="noopener noreferrer"
                href={process.env.REACT_APP_SUPPORT_URL}
                target="_blank"
              >
                <Button variant="outline">
                  Ask a question on {process.env.REACT_APP_SUPPORT_SERVICE}
                </Button>
              </a>
            </section>
          </>
        )}
      </section>
    </CustomModal>
  );
};

export default TransferActiveModal;
