import React from "react";

import { Typography } from "@chainsafe/common-components";
import { useFormikContext } from "formik";
import { toFixedWithoutRounding } from "../../../Utils/Helpers";

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
      {symbol !== undefined && (
        <>
          <Typography component="p">Transfer Amount</Typography>
          <Typography component="p">
            {toFixedWithoutRounding(
              Number((values as Record<string, any>)[amountFormikName])
            )}{" "}
            {symbol}
          </Typography>
        </>
      )}
    </section>
  );
};

export default FeesFormikWrapped;
