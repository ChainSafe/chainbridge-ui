import React, { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@chainsafe/common-theme";
import { useField } from "formik";
import {
  IFormikSelectInputProps,
  FormikSelectInput,
} from "@chainsafe/common-components";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import clsx from "clsx";

interface ITokenSelectInput extends IFormikSelectInputProps {
  tokens: Tokens;
  sync?: (value: string) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    input: {},
  })
);

const TokenSelectInput: React.FC<ITokenSelectInput> = ({
  className,
  label,
  name,
  tokens,
  sync,
  ...rest
}: ITokenSelectInput) => {
  const [field] = useField(name);
  const labelParsed = tokens[field.value]
    ? `${label} ${tokens[field.value]?.balance} ${tokens[field.value]?.symbol}`
    : "Token";

  const classes = useStyles();
  const [synced, setSynced] = useState();
  useEffect(() => {
    if (sync && field.value !== synced) {
      setSynced(field.value);
      if (field.value !== "") {
        sync(field.value);
      }
    }
    // eslint-disable-next-line
  }, [field]);

  return (
    <FormikSelectInput
      name={name}
      className={clsx(className, classes.input)}
      label={labelParsed}
      {...rest}
    />
  );
};

export default TokenSelectInput;
