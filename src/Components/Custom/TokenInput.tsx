import React from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";

import { useField, useFormikContext } from "formik";
import { Button, FormikTextInput } from "@chainsafe/common-components";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";

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
          border: "none",
          height: "100%",
          backgroundColor: "white !important",
          boxShadow: "0px 1px 20px 0px #bdbdbd5e",
          fontSize: `${constants.inputSelectorFontSize as any}px !important`,
          borderRadius: 15,
          fontWeight: 600,
        },
      },
      "& span:last-child.error": {
        position: "absolute",
      },
    },
    maxButton: {
      backgroundColor: "white !important",
      border: "none",
      position: "absolute",
      right: 0,
      top: 23,
      bottom: 0,
      fontSize: constants.inputSelectorFontSize as any,
      borderRadius: 15,
      color: "black",
    },
    formLabel: {
      fontWeight: 600,
    },
  })
);

interface ITokenInput {
  disabled?: boolean;
  label: string;
  name: string;
  tokens: Tokens;
  tokenSelectorKey: string;
}

const TokenInput: React.FC<ITokenInput> = ({
  disabled,
  label,
  tokens,
  tokenSelectorKey,
  name,
}: ITokenInput) => {
  const [, , helpers] = useField(name);
  const classes = useStyles();
  const { values } = useFormikContext();

  return (
    <span className={classes.container}>
      <FormikTextInput
        className={classes.input}
        disabled={disabled}
        name={name}
        label={label}
        labelClassName={classes.formLabel}
      />
      <Button
        disabled={
          disabled || !tokens[(values as Record<string, any>)[tokenSelectorKey]]
        }
        className={classes.maxButton}
        onClick={() => {
          helpers.setValue(
            tokens[(values as Record<string, any>)[tokenSelectorKey]].balance
          );
        }}
        variant="outline"
        type="button"
      >
        MAX
      </Button>
    </span>
  );
};

export default TokenInput;
