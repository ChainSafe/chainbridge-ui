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
import { DepositRecord } from "../../Contexts/Reducers/TransfersReducer";
import {
  formatTransferDate,
  formatAmount,
  shortenAddress,
  getIcon,
  getRandomSeed,
  getProposalStatus,
} from "../../Utils/Helpers";
import { ReactComponent as HashTxIcon } from "../../media/Icons/hashTx.svg";

type DetailView = {
  active: boolean;
  transferDetails: DepositRecord | undefined;
  handleClose: () => void;
  classes: Record<
    | "transferDetailContainer"
    | "transferDetails"
    | "closeButton"
    | "transferDetailSection"
    | "headerSection"
    | "statusSection"
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
    | "transferTimeline",
    string
  >;
};

const DetailView = ({
  active,
  transferDetails,
  handleClose,
  classes,
}: DetailView) => {
  const FromChainIcon = getIcon(transferDetails?.fromChainId);
  const ToChainIcon = getIcon(transferDetails?.toChainId);
  return (
    (transferDetails && (
      <Modal
        active={active}
        // setActive={setActive}
        className={classes.transferDetailContainer}
        maxWidth="md"
      >
        <section className={classes.transferDetails}>
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
              <span>{formatTransferDate(transferDetails?.timestamp)}</span>
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
                    <span className={classes.fromAddressDetails}>
                      {shortenAddress(transferDetails?.fromAddress ?? "")}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <Typography variant="body1" className={classes.colTitles}>
                  Status
                </Typography>
                <p className={classes.proposalStatusPill}>
                  {getProposalStatus(
                    transferDetails?.proposalEvents[0].proposalStatus
                  )}
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
                    {formatAmount(transferDetails?.amount?.toNumber())} Ether
                  </p>
                </div>
              </div>
              <div className={classes.fromDetailView}>
                <Typography variant="body1" className={classes.colTitles}>
                  From
                </Typography>
                <div>
                  <span>
                    <SvgIcon>
                      <FromChainIcon />
                    </SvgIcon>
                  </span>
                  <span>{transferDetails?.fromNetworkName}</span>
                </div>
              </div>
              <div className={classes.toDetailView}>
                <Typography variant="body1" className={classes.colTitles}>
                  To
                </Typography>
                <div>
                  <span>
                    <SvgIcon>
                      <ToChainIcon />
                    </SvgIcon>
                  </span>
                  <span>{transferDetails?.toNetworkName}</span>
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
                  <span>
                    <SvgIcon>
                      <HashTxIcon />
                    </SvgIcon>
                    {shortenAddress(transferDetails?.depositTransactionHash!)}
                  </span>
                </div>
              </div>
            </section>
            {/* <hr /> */}
            {/* Transfer timeline section */}
            {/* <section className={classes.transferTimeline}>
            <div>
              <Typography variant="h2" component="h2">
                Transfer Timeline
              </Typography>
            </div>
          </section> */}
          </section>
        </section>
      </Modal>
    )) || <></>
  );
};

export default DetailView;
