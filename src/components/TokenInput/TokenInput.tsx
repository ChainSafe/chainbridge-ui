import React from "react";
import { useField, useFormikContext } from "formik";
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
}

const TokenInput: React.FC<ITokenInput> = ({
  classNames,
  disabled,
  label,
  tokens,
  tokenSelectorKey,
  name,
}: ITokenInput) => {
  // const [, , helpers] = useField(name);

  // const { values } = useFormikContext();
  return (
    <Box>
      <TextField
        helperText=" "
        className={classNames?.input}
        name={name}
        label={label}
      />
      {/* <Button
        // disabled={
        //   disabled || !tokens[(values as Record<string, any>)[tokenSelectorKey]]
        // }
        className={classNames?.button}
        // onClick={() => {
        //   setValue(
        //     tokens[(values as Record<string, any>)[tokenSelectorKey]].balance
        //   );
        // }}
        variant="outlined"
        type="button"
      >
        MAX
      </Button> */}
    </Box>
  );
};

export default TokenInput;
