import React from "react";

import { Typography } from "@chainsafe/common-components";
import { useFormikContext } from "formik";

interface IFeesFormikWrapped {
  className?: string;
  symbol?: string;
  fee?: number;
  feeSymbol?: string;
  networkFee?: number;
  networkFeeSymbol?: string;
  amountFormikName: string;
}

const FeesFormikWrapped: React.FC<IFeesFormikWrapped> = ({
  className,
  symbol,
  fee,
  feeSymbol,
  networkFee,
  networkFeeSymbol,
  amountFormikName,
}: IFeesFormikWrapped) => {
  const { values } = useFormikContext();
  const amount = Number(
    (values as Record<string, any>)[amountFormikName]
  )?.toFixed(3);

  let total = 0;
  if (fee !== undefined) total += fee;
  if (networkFee !== undefined) total += networkFee;

  return (
    <section className={className}>
      {fee !== undefined && feeSymbol !== undefined && (
        <>
          <Typography component="p">Bridge Fee</Typography>
          <Typography component="p">
            {fee} {feeSymbol}
          </Typography>
        </>
      )}
      {networkFee !== undefined && networkFeeSymbol !== undefined && (
        <>
          <Typography component="p">Network Fee</Typography>
          <Typography component="p">
            {networkFee} {networkFeeSymbol}
          </Typography>
        </>
      )}
      {networkFeeSymbol !== undefined && total > 0 && (
        <>
          <Typography component="p">Total:</Typography>
          <Typography component="p">
            {total.toFixed(5)} {networkFeeSymbol}
          </Typography>
        </>
      )}
      {symbol !== undefined && (
        <>
          <Typography component="p">Transfer Amount:</Typography>
          <Typography component="p">
            {Number((values as Record<string, any>)[amountFormikName])?.toFixed(
              3
            )}{" "}
            {symbol}
          </Typography>
        </>
      )}
    </section>
  );
};

export default FeesFormikWrapped;
