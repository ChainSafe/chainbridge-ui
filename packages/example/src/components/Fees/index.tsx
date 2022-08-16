import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface IFeesFormikWrapped {
  className?: string;
  symbol?: string;
  fee?: number | string;
  feeSymbol?: string;
  amountFormikName: string;
  amount?: string;
}

const FeesFormikWrapped: React.FC<IFeesFormikWrapped> = ({
  className,
  symbol,
  fee,
  feeSymbol,
  amountFormikName,
  amount,
}: IFeesFormikWrapped) => {
  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {fee !== undefined && feeSymbol !== undefined && (
          <>
            <Typography component="p">Bridge Fee</Typography>
            <Typography component="p">
              {Number(fee).toFixed(8)} {feeSymbol}
            </Typography>
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {symbol !== undefined && (
          <>
            <Typography component="p">Transfer Amount:</Typography>
            <Typography component="p">
              {(Number(amount) + Number(fee)).toFixed(2)} {symbol}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default FeesFormikWrapped;
