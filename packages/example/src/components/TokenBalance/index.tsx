import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

interface ITokenBalanceInput {
  balance?: number;
}

const TokenSelectInput: React.FC<ITokenBalanceInput> = (
  props: ITokenBalanceInput
) => {
  const { balance } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormControl fullWidth disabled={true}>
        <TextField
          disabled={true}
          fullWidth
          variant="standard"
          label="Balance"
          helperText=" "
          value={balance}
        />
      </FormControl>
    </Box>
  );
};

export default TokenSelectInput;
