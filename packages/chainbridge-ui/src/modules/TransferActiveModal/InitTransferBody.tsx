import React from "react";

import Typography from "@mui/material/Typography";

export default function InitTransferBody({ classes }: { classes: any }) {
  return (
    <div className={classes.initCopy}>
      <Typography>Deposit pending...</Typography>
      <Typography className={classes.weighted}>
        This should take a few minutes.
        <br />
        Please do not refresh or leave the page.
      </Typography>
    </div>
  );
}
