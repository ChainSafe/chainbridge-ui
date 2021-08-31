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
    | "proposalStatusPill",
    string
  >;
};

const DetailView: React.FC<DetailView> = ({
  active,
  transferDetails,
  handleClose,
  classes,
}) => {
  const FromChainIcon = getIcon(transferDetails?.fromChainId);
  const ToChainIcon = getIcon(transferDetails?.toChainId);
  return (
    <Modal
      active={true}
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
        {/* Address and starus section */}
        <section className={classes.transferDetailSection}>
          <div className={classes.headerSection}>
            <span>{formatTransferDate(transferDetails?.timestamp)}</span>
            <Typography variant="h2">Transfer Summary</Typography>
          </div>

          <section className={classes.statusSection}>
            <div>
              <Typography variant="body1">Address</Typography>
              <div className={classes.accountAddress}>
                <Avatar size="small" className={classes.avatar}>
                  <Blockies
                    seed={getRandomSeed()}
                    size={15}
                    color={"pink"}
                    bgColor={"white"}
                  />
                </Avatar>
                <span>
                  {shortenAddress(transferDetails?.fromAddress ?? "")}
                </span>
              </div>
            </div>
            <div>
              <Typography variant="body1">Status</Typography>
              <p className={classes.proposalStatusPill}>
                {getProposalStatus(
                  transferDetails?.proposalEvents[0].proposalStatus
                )}
              </p>
            </div>
          </section>
          {/* Sent and From section */}
          <section>
            <div>
              <Typography variant="body1">Sent</Typography>
              {formatAmount(transferDetails?.amount?.toNumber())}
            </div>
            <div>
              <Typography variant="body1">From</Typography>
              <div>
                <span>
                  <SvgIcon>
                    <FromChainIcon />
                  </SvgIcon>
                </span>
                <span>{transferDetails?.fromNetworkName}</span>
              </div>
            </div>
            <div>
              <Typography variant="body1">To</Typography>
              <div>
                <span>
                  <SvgIcon>
                    <ToChainIcon />
                  </SvgIcon>
                  <span>{transferDetails?.toNetworkName}</span>
                </span>
              </div>
            </div>
          </section>
          {/* Bridge section */}
          <section>
            <div>
              <Typography variant="body1">Bridge Fee</Typography>
              <span>{}</span>
            </div>
          </section>
        </section>
      </section>
    </Modal>
  );
};

export default DetailView;
