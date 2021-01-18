import React, { useState } from "react";
import { makeStyles, createStyles } from "@chainsafe/common-theme";
import { useField } from "formik";

import {
  TokenInfo,
  Tokens,
} from "@chainsafe/web3-context/dist/context/tokensReducer";

import DropdownSelect, {
  OptionType,
  ICustomDropdownProps,
} from "./DropdownSelector";

interface ITokenSelectInput extends ICustomDropdownProps {
  tokens: Tokens;
  options: OptionType[];
  sync?: (value: string) => void;
  name: string;
  label: string;
  className: string;
  disabled?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    balance: {
      fontSize: 12,
      position: "absolute",
      padding: 3,
    },
  })
);

const TokenSelectInput: React.FC<ITokenSelectInput> = ({
  className,
  name,
  tokens,
  sync,
  options,
  disabled,
  onChange,
  ...rest
}: ITokenSelectInput) => {
  const [selectedToken, setSelectedToken] = useState<TokenInfo>();

  const classes = useStyles();
  const [, , helpers] = useField(name);

  return (
    <>
      <DropdownSelect
        label={"Selected Token"}
        options={options}
        disabled={disabled}
        onChange={(option) => {
          sync && sync(option.value);
          setSelectedToken(tokens[option.value]);
          helpers.setValue(option.value);
        }}
      ></DropdownSelect>
      <span className={classes.balance}>Balance {selectedToken?.balance}</span>
    </>
  );
};

export default TokenSelectInput;
