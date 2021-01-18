import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import classNames from "classnames";
export interface OptionType {
  label: string;
  icon?: string;
  [key: string]: any;
}
export interface ICustomDropdownProps {
  label: string;
  className?: string;
  value?: OptionType;
  onChange?(val: OptionType): void;
  options: OptionType[];
  comporator?(val1: OptionType, val2: OptionType): boolean;
  disabled?: boolean;
}

const useStyles = makeStyles(({ animation, constants, palette }: ITheme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      width: "100%",
      position: "relative",
      padding: 0,
    },
    selectedBox: {
      display: "flex",
      height: constants.inputSelectorHeight as any,
      boxShadow: constants.dropShadowStyle as string,
      borderRadius: constants.inputSelectorBorderRadius as string,
      paddingLeft: 20,
      alignItems: "center",
      fontSize: constants.inputSelectorFontSize as any,
      fontWeight: 600,
      color: "#BFBFBF",
      width: "100%",
      textTransform: "uppercase",
    },
    items: {
      display: "none",
      position: "absolute",
      zIndex: 1,
      top: (constants.inputSelectorHeight as any) + 20,
      width: "100%",
      backgroundColor: "white",
      borderRadius: (constants.inputSelectorBorderRadius as number) - 5,
      boxShadow: constants.dropShadowStyle as string,
      "&.open": {
        display: "initial",
      },
    },
    item: {
      height: constants.inputSelectorHeight as any,
      display: "flex",
      alignItems: "center",
      paddingLeft: 20,
      fontSize: constants.inputSelectorFontSize as any,
      fontWeight: 600,
      color: "#BFBFBF",
      textTransform: "uppercase",
    },
    label: {
      ...(constants.headerTitleStyle as any),
      whiteSpace: "nowrap",
      marginBottom: 5,
    },
    icon: {
      height: constants.inputSelectorFontSize as any,
      marginRight: 5,
    },
  })
);
export const DropdownSelect = ({
  label,
  className,
  value,
  onChange,
  options,
  disabled = false,
  comporator = function (val1, val2) {
    return val1 === val2;
  },
}: ICustomDropdownProps) => {
  const classes = useStyles();
  const [isOpen, setOpenState] = useState(false);
  const [isDisabled] = useState(false);

  const [selectedItem, setSelectedItem] = useState<OptionType>({
    label: "",
  } as any);

  useEffect(() => {
    if (options.length === 1) {
      const selectedItem = options[0];
      setSelectedItem(selectedItem);
      onChange && onChange(selectedItem);
    } else if (options.length > 1 && value) {
      const selectedItem = options.find((option) => comporator(option, value));
      if (selectedItem) {
        setSelectedItem(selectedItem);
        onChange && onChange(selectedItem);
      }
    }
  }, [options]);

  return (
    <button
      onBlur={() => setOpenState(false)}
      onClick={() => {
        setOpenState(!isOpen);
      }}
      type="button"
      disabled={isDisabled}
      className={classNames(classes.container, "container", className)}
    >
      <span className={classNames(classes.label, "label")}>{label}</span>
      <span className={classNames(classes.selectedBox, "selected")}>
        {selectedItem.icon ? (
          <img className={classes.icon} src={selectedItem.icon} alt="" />
        ) : (
          ""
        )}
        <span className="label">{selectedItem.label}</span>
      </span>
      <div
        className={classNames(classes.items, "items", {
          open: isOpen && options.length > 1,
        })}
      >
        {options.map((option) => {
          return (
            <div
              className={classNames(classes.item, "item")}
              key={option.label}
              onClick={() => {
                setSelectedItem(option);
                onChange && onChange(option);
              }}
            >
              {option.icon ? (
                <img className={classes.icon} src={option.icon} alt="" />
              ) : (
                ""
              )}
              <span>{option.label}</span>
            </div>
          );
        })}
      </div>
    </button>
  );
};

export default DropdownSelect;
