import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import ConnectToMetamask from "./ConnectToMetamask";
import ConnectToWalletConnect from "./ConnectToWalletConnect";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function ConnectionDialog({
  dispatcher,
  open,
  handleClose,
}: {
  dispatcher: any;
  open: boolean;
  handleClose: any;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Connect to a wallet
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ width: 300 }}>
          <Typography gutterBottom>
            <ConnectToMetamask
              dispatcher={dispatcher}
              handleClose={handleClose}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Typography>
          <Typography gutterBottom>
            <ConnectToWalletConnect
              dispatcher={dispatcher}
              handleClose={handleClose}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
