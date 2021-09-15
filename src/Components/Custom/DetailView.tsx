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
import { TransferDetails } from "../../Contexts/Reducers/TransfersReducer";
import { getIcon, getRandomSeed } from "../../Utils/Helpers";
import { ReactComponent as HashTxIcon } from "../../media/Icons/hashTx.svg";

type DetailView = {
  active: boolean;
  transferDetails: TransferDetails;
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
    (!Object.values(transferDetails).includes("") && (
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
                    <span className={classes.fromAddressDetails}>
                      {transferDetails.addressShortened}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <Typography variant="body1" className={classes.colTitles}>
                  Status
                </Typography>
                <p className={classes.proposalStatusPill}>
                  {transferDetails.proposalStatus}
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
                  <p>{transferDetails.formatedAmount} Ether</p>
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
                    {transferDetails.depositTxHashShortened}
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
