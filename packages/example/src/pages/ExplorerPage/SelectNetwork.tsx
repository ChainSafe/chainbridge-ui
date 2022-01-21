import React, { useState } from "react";
import {
  EvmBridgeConfig,
  SubstrateBridgeConfig,
} from "@chainsafe/chainbridge-ui-core";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type SelectNetworkProp = {
  className?: string;
  value?: string;
  onChange?: any;
  chains: (EvmBridgeConfig | SubstrateBridgeConfig)[];
};

export default function SelectNetwork({
  className,
  onChange,
  value,
  chains,
}: SelectNetworkProp) {
  return (
    <Select
      defaultValue=""
      className={className}
      onChange={(e: SelectChangeEvent) => {
        onChange(Number(e.target.value));
      }}
      value={value}
      placeholder="Select network"
      disabled={!chains.length}
    >
      {chains.map(({ domainId, name }) => (
        <MenuItem key={domainId} value={String(domainId)}>
          {name}
        </MenuItem>
      ))}
    </Select>
  );
}
