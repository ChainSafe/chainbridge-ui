import React from "react";

import { Typography } from "@chainsafe/common-components";
import { useFormikContext } from "formik";

interface IFeesFormikWrapped {
  className?: string;
  symbol?: string;
  fee?: number;
  feeSymbol?: string;
  amountFormikName: string;
}

const FeesFormikWrapped: React.FC<IFeesFormikWrapped> = ({
  className,
  symbol,
  fee,
  feeSymbol,
  amountFormikName,
}: IFeesFormikWrapped) => {
  const { values } = useFormikContext();

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
