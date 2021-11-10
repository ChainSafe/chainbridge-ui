import React from "react";

import { useField, useFormikContext } from "formik";
import { Button, FormikTextInput } from "@chainsafe/common-components";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";

interface ITokenInput {
  disabled?: boolean;
  label: string;
  name: string;
  tokens: Tokens;
  tokenSelectorKey: string;
  classNames?: {
    input?: string;
    button?: string;
  };
}

const TokenInput: React.FC<ITokenInput> = ({
  classNames,
  disabled,
  label,
  tokens,
  tokenSelectorKey,
  name,
}: ITokenInput) => {
  const [, , helpers] = useField(name);

  const { values } = useFormikContext();
  return (
    <>
      <FormikTextInput
        className={classNames?.input}
        disabled={disabled}
        name={name}
        label={label}
      />
      <Button
        disabled={
          disabled || !tokens[(values as Record<string, any>)[tokenSelectorKey]]
        }
        className={classNames?.button}
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
    </>
  );
};

export default TokenInput;
