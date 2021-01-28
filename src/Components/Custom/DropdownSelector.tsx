import React, { useEffect, useRef, useState, createRef } from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import classNames from "classnames";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
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
  allowSearch?: boolean;
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
      overflow: "scroll",
      maxHeight: 300,
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
    searchInput: {
      height: 45,
      border: "none",
      boxShadow: constants.dropShadowStyle as string,
      borderRadius: constants.inputSelectorBorderRadius as string,
      backgroundColor: "white",
      width: "100%",
      paddingLeft: 20,
      "&:focus": {
        outline: "none",
      },
    },
  })
);

const defaultTokensToDisplay = new Set([
  //eth tokens
  "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
  "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
  "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  "0x9dEbca6eA3af87Bf422Cea9ac955618ceb56EfB4",
  "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
  // avalanche tokens
  "0xdF3aCC3460965996FF496Cb9D0CF9E6859545a86",
  "0x2DCA6503946d29Ca8d1C87A247ef122652B03c0e",
  "0x217446Ce09AA183a9034f4FF20d31b9268427187",
  "0x44fC678eb98c47b2b0564b455132c91b781a62d4",
  "0x55212B038624D9FaB4D1A65e23f7744d5f0D014A",
  "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
  "0x2400EA5E0f56D6f8bF14c1c52EebAdE24b4542f3",
  "0x3a755C20913b9bE05Da94f72A4027B9755b4fF85",
  "0x6D3D97E8Dedc637c2AE327e4E370cc29da6111ad",
]);

function filterToDefaultTokens(option: OptionType) {
  return defaultTokensToDisplay.has(option.value);
}

export const DropdownSelect = ({
  label,
  className,
  value,
  onChange,
  options,
  allowSearch = false,
  disabled = false,
  comporator = function (val1, val2) {
    return val1 === val2;
  },
}: ICustomDropdownProps) => {
  const classes = useStyles();
  const [isOpen, setOpenState] = useState(false);
  const [isDisabled] = useState(false);
  const node = useRef<HTMLDivElement>();
  const ref = createRef<HTMLInputElement>();

  const [selectedItem, setSelectedItem] = useState<OptionType>({
    label: "",
  } as any);

  const [availableOptions, setAvailableOptions] = useState(
    options.filter(filterToDefaultTokens)
  );
  const [query, setQuery] = useState("");

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

  useEffect(() => {
    setAvailableOptions(
      query
        ? options.filter((option) => {
            return option.label.toLowerCase().includes(query.toLowerCase());
          })
        : options.filter(filterToDefaultTokens)
    );
  }, [query]);

  useEffect(() => {
    ref?.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    setAvailableOptions(options.filter(filterToDefaultTokens));
  }, [options]);

  useOnClickOutside(node, isOpen ? () => setOpenState(false) : undefined);

  return (
    <button
      ref={node as any}
      onMouseDown={(evt) => {
        if (!evt.currentTarget.contains(evt.target as any)) {
          setOpenState(!isOpen);
        } else {
          setOpenState(true);
        }
      }}
      type="button"
      disabled={isDisabled}
      className={classNames(classes.container, "container", className)}
    >
      <span className={classNames(classes.label, "label")}>{label}</span>
      {allowSearch && isOpen ? (
        <input
          className={classNames(classes.searchInput)}
          type="text"
          onChange={(el) => setQuery(el.currentTarget.value)}
          ref={ref}
        ></input>
      ) : (
        <span className={classNames(classes.selectedBox, "selected")}>
          {selectedItem.icon ? (
            <img className={classes.icon} src={selectedItem.icon} alt="" />
          ) : (
            ""
          )}
          <span className="label">{selectedItem.label}</span>
        </span>
      )}
      <div
        className={classNames(classes.items, "items", {
          open: isOpen,
        })}
      >
        {availableOptions.map((option) => {
          return (
            <div
              className={classNames(classes.item, "item")}
              key={option.label}
              onClick={() => {
                setOpenState(false);
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
