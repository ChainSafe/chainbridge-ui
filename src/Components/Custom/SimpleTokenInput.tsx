import React from "react";

import { useField } from "formik";
import { Button, FormikTextInput } from "@chainsafe/common-components";
import { makeStyles, createStyles } from "@chainsafe/common-theme";
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

const useStyles = makeStyles(({ constants }: any) =>
  createStyles({
    container: {
      position: "relative",
      marginBottom: "0 !important",
    },
    input: {
      "& input": {
        borderRadius: "15px !important",
      },
    },
    maxButton: {
      backgroundColor: "white !important",
      border: "none",
      position: "absolute",
      right: 0,
      top: "24px",
      left: "initial !important",
      margin: "auto",
      bottom: 0,
      fontSize: constants.inputSelectorFontSize as any,
      borderRadius: 15,
      color: "black",
      height: "85px !important",
    },
    label: {
      fontWeight: 700,
      marginBottom: "0 !important",
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
