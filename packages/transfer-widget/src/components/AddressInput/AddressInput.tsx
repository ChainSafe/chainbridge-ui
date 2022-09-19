import React, { useCallback, useState } from "react";
import { useController } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

interface IAddressInput {
  senderAddress: string;
  className?: any;
  placeholder: string;
  name: string;
  label: string;
  disabled: boolean;
  sendToSameAccountHelper?: boolean;
  control?: any;
  classNames?: any;
  setValue?: any;
}

const AddressInput: React.FC<IAddressInput> = ({
  senderAddress,
  placeholder,
  name,
  label,
  sendToSameAccountHelper = false,
  control,
  setValue,
  disabled,
  classNames,
  ...rest
}: IAddressInput) => {
  const { field, fieldState } = useController({ name, control });

  const [stored, setStored] = useState<string | undefined>();

  const toggleReceiver = useCallback(() => {
    setStored(field.value);
    setValue(name, senderAddress);
  }, [name, senderAddress, field, setStored, setValue]);

  return (
    <FormControl disabled={disabled} fullWidth>
      <>
        <TextField
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : undefined}
          fullWidth
          {...field}
          label={label}
          placeholder={placeholder}
          disabled={Boolean(disabled && !stored)}
          InputProps={{
            endAdornment: (
              !field.value && <Button
                disabled={Boolean(disabled && !stored)}
                sx={{minWidth: 'auto', background: "white", zIndex: 0}}
                onClick={() => toggleReceiver()}
                variant="outlined"
                type="button"
              >my&nbsp;address</Button>
            ),
          }}
        />
      </>
    </FormControl>
  );
};

export default AddressInput;
