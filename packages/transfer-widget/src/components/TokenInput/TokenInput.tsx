import React from "react";
import { useController } from "react-hook-form";
// import { Button, FormikTextInput } from "@chainsafe/common-components";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";

interface ITokenInput {
  disabled?: boolean;
  label: string;
  name: string;
  tokens: Tokens;
  tokenSelectorKey: string;
  classNames?: {
    input?: string;
    button?: string;
  };
  setValue?: any;
  control?: any;
}

const TokenInput: React.FC<ITokenInput> = ({
  classNames,
  disabled,
  label,
  tokens,
  tokenSelectorKey,
  name,
  setValue,
  control,
}: ITokenInput) => {
  const { field, fieldState } = useController({ name, control });
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        disabled={disabled}
        error={!!fieldState.error}
        fullWidth
        helperText={fieldState.error ? fieldState.error.message : undefined}
        className={classNames?.input}
        label={label}
        {...field}
        InputProps={{
          endAdornment: (
            <Button
              disabled={disabled || !tokens[tokenSelectorKey]}
              className={classNames?.button}
              onClick={() => {
                setValue(name, tokens[tokenSelectorKey].balance);
              }}
              variant="outlined"
              type="button"
            >
              MAX
            </Button>
          ),
        }}
      />
    </Box>
  );
};

export default TokenInput;
