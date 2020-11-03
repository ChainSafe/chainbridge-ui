import React from "react";

import { makeStyles, createStyles, ITheme } from "@imploy/common-themes";
import clsx from "clsx";
import { useField } from "formik";
import {
  IFormikSelectInputProps,
  FormikSelectInput,
} from "@imploy/common-components";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";

const useStyles = makeStyles(({}: ITheme) =>
  createStyles({
    root: {},
  })
);

interface ITokenSelectInput extends IFormikSelectInputProps {
  tokens: Tokens;
}

const TokenSelectInput: React.FC<ITokenSelectInput> = ({
  className,
  label,
  name,
  tokens,
  ...rest
}: ITokenSelectInput) => {
  const classes = useStyles();
  const [field, meta, helpers] = useField(name);
  const labelParsed = tokens[field.value]
    ? `${label} ${tokens[field.value]?.balance} ${tokens[field.value]?.symbol}`
    : "Please select token";
  return (
    <FormikSelectInput
      name={name}
      className={clsx(classes.root, className)}
      label={labelParsed}
      {...rest}
    />
  );
};

export default TokenSelectInput;
