import React from "react";
import { useField } from "formik";
import {
  IFormikSelectInputProps,
  FormikSelectInput,
} from "@imploy/common-components";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";

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
  const [field] = useField(name);
  const labelParsed = tokens[field.value]
    ? `${label} ${tokens[field.value]?.balance} ${tokens[field.value]?.symbol}`
    : "Please select token";
  return (
    <FormikSelectInput
      name={name}
      className={className}
      label={labelParsed}
      {...rest}
    />
  );
};

export default TokenSelectInput;
