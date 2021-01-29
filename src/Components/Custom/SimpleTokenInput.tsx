import React from "react";

import { useField } from "formik";
import { Button, FormikTextInput } from "@chainsafe/common-components";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import clsx from "clsx";

interface ITokenInput {
  disabled?: boolean;
  label: string;
  name: string;
  classNames?: {
    input?: string;
    button?: string;
  };
  max?: number;
}

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    container: {
      position: "relative",
      marginBottom: "0px !important",
    },
    input: {
      margin: 0,
      "& > div": {
        height: 85,
        "& input": {
          border: constants.borderStyle as any,
          height: "100%",
          backgroundColor: "white !important",

          fontSize: `${constants.inputSelectorFontSize as any}px !important`,
          borderRadius: 15,
          fontWeight: 400,
        },
      },
      "& span:last-child.error": {
        position: "absolute",
      },
    },
    maxButton: {
      backgroundColor: "transparent !important",
      border: "none",
      position: "absolute",
      right: 0,
      top: 23,
      bottom: 0,
      fontSize: constants.inputSelectorFontSize as any,
      borderRadius: 15,
      color: "black",
    },
    label: {
      fontWeight: 400,
    },
  })
);

const SimpleTokenInput: React.FC<ITokenInput> = ({
  classNames,
  disabled,
  label,
  name,
  max,
}: ITokenInput) => {
  const [, , helpers] = useField(name);
  const classes = useStyles();

  return (
    <span className={clsx(classes.container)}>
      <FormikTextInput
        className={clsx(classNames?.input, classes.input)}
        disabled={disabled}
        name={name}
        label={label}
        labelClassName={classes.label}
      />
      <Button
        disabled={disabled || !max}
        className={clsx(classNames?.button, classes.maxButton)}
        onClick={() => {
          helpers.setValue(max);
        }}
        variant="outline"
        type="button"
      >
        MAX
      </Button>
    </span>
  );
};

export default SimpleTokenInput;
