import React, { useEffect, useState } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface ISelectDestinationNetwork {
  disabled?: boolean;
  label?: string;
  options?: any;
  onChange?: any;
  value?: number;
}

const SelectDestinationNetwork: React.FC<ISelectDestinationNetwork> = ({
  disabled,
  label,
  options,
  onChange,
  value,
}: ISelectDestinationNetwork) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };
  return (
    <FormControl sx={{ my: 2 }} fullWidth disabled={disabled}>
      <InputLabel id="select-destination-network-label">{label}</InputLabel>
      <Select
        labelId="select-destination-network-label"
        id="select-destination-network"
        onChange={handleChange}
        label={label}
        value={typeof value !== 'undefined' ? value.toString() : ""}
      >
        {options.map((option: { label: any; value: any }) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDestinationNetwork;
