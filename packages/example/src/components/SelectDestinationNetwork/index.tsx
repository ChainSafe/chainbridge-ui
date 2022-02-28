import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select, SelectChangeEvent
} from '@mui/material'

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
        value={value ? value.toString() : ""}
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
