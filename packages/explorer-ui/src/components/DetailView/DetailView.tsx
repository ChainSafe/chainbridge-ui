import React from "react";
import {
  Modal,
  Typography,
  SvgIcon,
  Button,
  CrossOutlinedIcon,
  Avatar,
  Blockies,
} from "@chainsafe/common-components";
import clsx from "clsx";
import { TransferDetails } from "@chainsafe/chainbridge-ui-core";
import {
  getProposalStatus,
  getRandomSeed,
  getNetworkIcon,
} from "../../utils/Helpers";
import { ReactComponent as HashTxIcon } from "../../media/Icons/hashTx.svg";
import AddressOrLink from "../AddressOrLink/AddressOrLink";

type DetailView = {
  active: boolean;
  transferDetails: TransferDetails;
  handleClose: () => void;
  handleTimelineButtonClick: () => void;
  timelineButtonClicked: boolean;
  classes: Record<
    | "transferDetailContainer"
    | "transferDetails"
    | "closeButton"
    | "transferDetailSection"
    | "headerSection"
    | "statusSection"
    | "proposalStatus"
    | "accountAddress"
    | "avatar"
    | "proposalStatusPill"
    | "fromAddressDetails"
    | "addressDetailView"
    | "sentAndFromSection"
    | "amountSent"
    | "fromDetailView"
    | "toDetailView"
    | "bridgeSection"
    | "transactionHashSection"
    | "colTitles"
    | "transferTimeline"
    | "dot"
    | "greenDot"
    | "greyBar"
    | "messages"
    | "messageContainer"
    | "imageToken"
    | "timelineButton"
    | "timelineButtonClicked"
    | "transferDetailExpanded"
    | "transferDetailNotExpanded"
    | "messageCollapsed"
    | "messageNotCollapsed"
    | "buttonTimelineContainer"
    | "lastMessage"
    | "customGreyBar"
    | "time"
    | "secondElementGreybar"
    | "buttonTimelineContainerClicked"
    | "transferDetailExpandedDesktop"
    | "timelineSection"
    | "transferCancelColor"
    | "waitingForColor",
    string
  >;
};

const DetailView = ({
  active,
  transferDetails,
  handleClose,
  classes,
  handleTimelineButtonClick,
  timelineButtonClicked,
}: DetailView) => {
  const { timelineMessages, fromChain, toChain } = transferDetails;

  return (
    (!Object.values(transferDetails).includes("") && (
      <Modal
        active={active}
        setActive={handleClose}
        className={classes.transferDetailContainer}
        maxWidth="md"
        closePosition="none"
      >
        <section
          className={clsx(
            classes.transferDetails,
            timelineButtonClicked
              ? classes.transferDetailExpanded
              : classes.transferDetailNotExpanded,
            timelineMessages.length > 3 && classes.transferDetailExpandedDesktop
          )}
        >
          <div className={classes.closeButton}>
            <Button onClick={handleClose}>
              <SvgIcon color="primary">
                <CrossOutlinedIcon />
              </SvgIcon>
            </Button>
          </div>
          {/* Address and status section */}
          <section className={classes.transferDetailSection}>
            <div className={classes.headerSection}>
              <span>{transferDetails?.formatedTransferDate}</span>
              <Typography variant="h2" component="h2">
                Transfer Summary
              </Typography>
            </div>

            <section className={classes.statusSection}>
              <div>
                <Typography variant="body1" className={classes.colTitles}>
                  Address
                </Typography>
                <div className={classes.accountAddress}>
                  <div className={classes.addressDetailView}>
                    <Avatar size="small" className={classes.avatar}>
                      <Blockies
                        seed={getRandomSeed()}
                        size={15}
                        color={"pink"}
                        bgColor={"white"}
                      />
                    </Avatar>
                    {fromChain?.blockExplorer ? (
                      <a
                        target="_blank"
                        className={classes.fromAddressDetails}
                        href={`${fromChain.blockExplorer}/address/${transferDetails.fromAddress}`}
                      >
                        {transferDetails.fromAddress}
                      </a>
                    ) : (
                      <span className={classes.fromAddressDetails}>
                        {transferDetails.fromAddress}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className={classes.proposalStatus}>
                <Typography variant="body1" className={classes.colTitles}>
                  Status
                </Typography>
                <p className={classes.proposalStatusPill}>
                  {getProposalStatus(transferDetails.proposalStatus)}
                </p>
              </div>
            </section>
            {/* Sent and From section */}
            <section className={classes.sentAndFromSection}>
              <div className={classes.amountSent}>
                <Typography variant="body1" className={classes.colTitles}>
                  Sent
                </Typography>
                <div>
                  <p>
                    {transferDetails.formatedAmount} {fromChain?.tokens[0].name}
                  </p>
                </div>
              </div>
              <div className={classes.fromDetailView}>
                <Typography variant="body1" className={classes.colTitles}>
                  From
                </Typography>
                <div>
                  <span>
                    <img
                      className={classes.imageToken}
                      src={getNetworkIcon(fromChain)}
                      alt="fromChain"
                    />
                  </span>
                  <span>{fromChain?.name}</span>
                </div>
              </div>
              <div className={classes.toDetailView}>
                <Typography variant="body1" className={classes.colTitles}>
                  To
                </Typography>
                <div>
                  <span>
                    <img
                      className={classes.imageToken}
                      src={getNetworkIcon(toChain)}
                      alt="fromChain"
                    />
                  </span>
                  <span>{toChain?.name}</span>
                </div>
              </div>
            </section>
            {/* Bridge section */}
            <section className={classes.bridgeSection}>
              <div>
                {/* <Typography variant="body1" className={classes.colTitles}>
                Bridge Fee
              </Typography>
              <span>{}</span> */}
              </div>
              <div>
                {/* <Typography variant="body1" className={classes.colTitles}>
                Network Fee
              </Typography>
              <span>{}</span> */}
              </div>
              <div className={classes.transactionHashSection}>
                <div>
                  <Typography variant="body1" className={classes.colTitles}>
                    Transaction Hash
                  </Typography>
                  {fromChain?.blockExplorer ? (
                    <a
                      target="_blank"
                      href={`${fromChain.blockExplorer}/tx/${transferDetails.depositTransactionHash}`}
                    >
                      <SvgIcon>
                        <HashTxIcon />
                      </SvgIcon>
                      {transferDetails.depositTransactionHash}
                    </a>
                  ) : (
                    <span>
                      <SvgIcon>
                        <HashTxIcon />
                      </SvgIcon>
                      {transferDetails.depositTransactionHash}
                    </span>
                  )}
                </div>
              </div>
            </section>
            <hr />
            {/* Transfer timeline section */}
            <section className={classes.transferTimeline}>
              <div>
                <Typography variant="h2" component="h2">
                  Transfer Timeline
                </Typography>
              </div>
              <div className={classes.timelineSection}>
                {timelineMessages.map((msg, idx, self) => {
                  if (idx === 1) {
                    return (
                      <>
                        <div className={classes.messageContainer}>
                          <p className={classes.messages}>
                            <span>
                              <div
                                className={clsx(classes.dot, classes.greenDot)}
                              />
                              {msg.message}
                              &nbsp;
                              <AddressOrLink
                                msg={msg}
                                blockExplorer={toChain?.blockExplorer}
                              />
                            </span>
                            <span className={classes.time}>{msg.time}</span>
                          </p>
                          <div
                            className={clsx(
                              classes.greyBar,
                              idx === 1 &&
                                !timelineButtonClicked &&
                                classes.secondElementGreybar
                            )}
                          />
                        </div>
                        <div
                          className={clsx(
                            classes.buttonTimelineContainer,
                            timelineButtonClicked &&
                              classes.buttonTimelineContainerClicked
                          )}
                        >
                          <hr />
                          <button
                            onClick={handleTimelineButtonClick}
                            className={clsx(
                              classes.timelineButton,
                              timelineButtonClicked &&
                                classes.timelineButtonClicked
                            )}
                          >
                            View full timeline
                          </button>
                        </div>
                      </>
                    );
                  } else if (idx === self.length - 1) {
                    return (
                      <div
                        className={clsx(
                          classes.messageContainer,
                          idx === timelineMessages.length - 1 &&
                            classes.lastMessage
                        )}
                      >
                        <p className={classes.messages}>
                          <span>
                            <div
                              className={clsx(classes.dot, classes.greenDot)}
                            />
                            {msg.message}
                            &nbsp;
                            <AddressOrLink
                              msg={msg}
                              blockExplorer={toChain?.blockExplorer}
                            />
                          </span>
                          <span className={classes.time}>{msg.time}</span>
                        </p>
                        {idx !== timelineMessages.length - 1 && (
                          <div className={classes.greyBar} />
                        )}
                      </div>
                    );
                  }
                  return (
                    <div
                      className={clsx(
                        classes.messageContainer,
                        timelineButtonClicked
                          ? classes.messageNotCollapsed
                          : classes.messageCollapsed,
                        idx === timelineMessages.length - 1 &&
                          classes.lastMessage
                      )}
                    >
                      <p className={classes.messages}>
                        <span
                          className={clsx(
                            transferDetails.proposalStatus === 4 &&
                              idx === timelineMessages.length - 1 &&
                              classes.transferCancelColor,
                            (transferDetails.proposalStatus === 1 ||
                              transferDetails.proposalStatus === 2) &&
                              idx === timelineMessages.length - 1 &&
                              classes.waitingForColor
                          )}
                        >
                          <div
                            className={clsx(classes.dot, classes.greenDot)}
                          />
                          {msg.message}
                          &nbsp;
                          <AddressOrLink
                            msg={msg}
                            blockExplorer={toChain?.blockExplorer}
                          />
                        </span>

                        <span className={classes.time}>{msg.time}</span>
                      </p>
                      {idx !== timelineMessages.length - 1 && (
                        <div className={classes.greyBar} />
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </section>
        </section>
      </Modal>
    )) || <></>
  );
};

export default DetailView;
