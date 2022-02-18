import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { useFormikContext } from "formik";

interface IFeesFormikWrapped {
  className?: string;
  symbol?: string;
  fee?: number;
  feeSymbol?: string;
  amountFormikName: string;
  amount?: number;
}

const FeesFormikWrapped: React.FC<IFeesFormikWrapped> = ({
  className,
  symbol,
  fee,
  feeSymbol,
  amountFormikName,
  amount,
}: IFeesFormikWrapped) => {
  // const { values } = useFormikContext();

  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {fee !== undefined && feeSymbol !== undefined && (
          <>
            <Typography component="p">Bridge Fee</Typography>
            <Typography component="p">
              {fee} {feeSymbol}
            </Typography>
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {symbol !== undefined && (
          <>
            <Typography component="p">Transfer Amount:</Typography>
            <Typography component="p">
              {Number(amount)?.toFixed(3)} {symbol}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default FeesFormikWrapped;
