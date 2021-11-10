import React, { useEffect, useState } from "react";
import { useField } from "formik";
import {
  IFormikSelectInputProps,
  FormikSelectInput,
} from "@chainsafe/common-components";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";

interface ITokenSelectInput extends IFormikSelectInputProps {
  tokens: Tokens;
  sync?: (value: string) => void;
}

const TokenSelectInput: React.FC<ITokenSelectInput> = ({
  className,
  label,
  name,
  tokens,
  sync,
  ...rest
}: ITokenSelectInput) => {
  const [field, , helpers] = useField(name);
  const labelParsed = tokens[field.value]
    ? `${label} ${tokens[field.value]?.balance} ${tokens[field.value]?.symbol}`
    : "Please select token";

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

  useEffect(() => {
    // If there is only one token, auto select
    if (Object.keys(tokens).length === 1 && field.value === "") {
      helpers.setValue(Object.keys(tokens)[0]);
    }
  }, [tokens, helpers, field.value]);

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
