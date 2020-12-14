import React from "react";

import { useField } from "formik";
import { Button, FormikTextInput } from "@chainsafe/common-components";

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

const SimpleTokenInput: React.FC<ITokenInput> = ({
  classNames,
  disabled,
  label,
  name,
  max,
}: ITokenInput) => {
  const [, , helpers] = useField(name);

  return (
    <>
      <FormikTextInput
        className={classNames?.input}
        disabled={disabled}
        name={name}
        label={label}
      />
      <Button
        disabled={disabled || !max}
        className={classNames?.button}
        onClick={() => {
          helpers.setValue(max);
        }}
        variant="outline"
        type="button"
      >
        MAX
      </Button>
    </>
  );
};

export default SimpleTokenInput;
