import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";

interface ITokenSelectInput {
  className: any;
  label?: any;
  name: any;
  tokens: Tokens;
  rules?: any;
  disabled: any;
  options: any;
  placeholder?: any;
  setValue?: any;
  control?: any;
  value?: any;
  onChange?: (value: any) => void;
}

const TokenSelectInput: React.FC<ITokenSelectInput> = (
  props: ITokenSelectInput
) => {
  const {
    className,
    label,
    name,
    tokens,
    control,
    rules,
    disabled,
    options,
    setValue,
    value,
    onChange,
  } = props;

  const handleChange = (event: SelectChangeEvent) => {
    onChange && onChange(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          mr: 4,
        }}
      >
        <FormControl disabled={disabled}>
          <InputLabel id="token-select-label">Token</InputLabel>
          <Select value={value} label="token" onChange={handleChange}>
            {options.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
};

export default TokenSelectInput;
