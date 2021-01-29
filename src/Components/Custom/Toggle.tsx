import React from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import classNames from "classnames";

interface ICustomToggleProps {
  label: string;
  labelClassName?: string;
  toggleClassName?: string;
  value: boolean;
  onChange(val: boolean): void;
}

const useStyles = makeStyles(({ animation, constants, palette }: ITheme) =>
  createStyles({
    container: {
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
    },
    input: {
      display: "none",
    },
    label: {
      fontWeight: 400,
      fontSize: "16px",
      whiteSpace: "nowrap",
    },
    toggle: {
      display: "inline-block",
      width: "40px",
      minWidth: "40px",
      height: "20px",
      borderRadius: "10px",
      marginRight: "5px",
      position: "relative",
      boxShadow: constants.dropShadowStyle as string,
      backgroundColor: "white",
      "&:before": {
        content: "''",
        position: "absolute",
        display: "block",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "#BDBDBD",
        bottom: "0px",
        left: "-1px",
      },
      "&.selected": {
        "&:before": {
          left: "20px",
          backgroundColor: palette.additional.indicatorGreen[1],
        },
      },
    },
  })
);

export const Toggle = ({
  label,
  labelClassName,
  toggleClassName,
  value,
  onChange,
  ...rest
}: ICustomToggleProps) => {
  const classes = useStyles();

  return (
    <label className={classNames(classes.container, "container")}>
      <span
        className={classNames(
          classes.toggle,
          "toggle",
          { selected: value },
          toggleClassName
        )}
      ></span>
      <span className={classNames(classes.label, "label", labelClassName)}>
        {label}
      </span>

      <input
        className={classes.input}
        type="checkbox"
        checked={value}
        onChange={(evt) => onChange(evt.currentTarget.checked)}
      />
    </label>
  );
};

export default Toggle;
