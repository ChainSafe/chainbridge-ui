import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type MyAllSwitchProps = {
  onSwitchChange: any;
  switchValue: string;
};

export default function MyAllSwitch({
  onSwitchChange,
  switchValue,
}: MyAllSwitchProps) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={switchValue}
      exclusive
      onChange={onSwitchChange}
    >
      <ToggleButton sx={{ p: "15px" }} value="my">
        My
      </ToggleButton>
      <ToggleButton sx={{ p: "15px" }} value="all">
        All
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
