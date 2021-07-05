import React from 'react';

import { FormikTextInput } from '@chainsafe/common-components';

interface ITokenInput {
  disabled?: boolean;
  label: string;
  name: string;
  classNames?: {
    input?: string;
    button?: string;
  };
}

const TokenInput: React.FC<ITokenInput> = ({
  classNames,
  disabled,
  label,
  name,
}: ITokenInput) => (
  <FormikTextInput
    className={classNames?.input}
    disabled={disabled}
    name={name}
    label={label}
  />
);

export default TokenInput;
