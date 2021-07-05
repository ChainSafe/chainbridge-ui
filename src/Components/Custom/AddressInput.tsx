import React from 'react';

import { makeStyles, createStyles, ITheme } from '@chainsafe/common-theme';
import { FormikTextInputProps, TextInput } from '@chainsafe/common-components';
import clsx from 'clsx';
import { useField } from 'formik';

const useStyles = makeStyles(({ constants }: ITheme) =>
  createStyles({
    root: {},
    input: {
      margin: 0,
      width: '100%',
    },
    label: {
      marginBottom: constants.generalUnit,
    },
    checkbox: {
      marginTop: constants.generalUnit * 3,
    },
  }),
);

interface IAddressInput extends FormikTextInputProps {
  senderAddress: string;
  classNames?: {
    input?: string;
  };
  sendToSameAccountHelper?: boolean;
}

const AddressInput: React.FC<IAddressInput> = ({
  classNames,
  className,
  inputVariant = 'default',
  type = 'text',
  placeholder,
  name,
  size,
  label,
  labelClassName,
  captionMessage,
  ...rest
}: IAddressInput) => {
  const classes = useStyles();
  const [field, meta, helpers] = useField(name);

  return (
    <section className={clsx(classes.root, className)}>
      <div>
        <TextInput
          {...rest}
          label={label || field.name}
          inputVariant={inputVariant}
          type={type}
          size={size}
          className={clsx(classNames?.input, classes.input)}
          labelClassName={clsx(labelClassName, classes.label)}
          name={field.name}
          value={field.value}
          placeholder={placeholder}
          captionMessage={
            meta.error ? `${meta.error}` : captionMessage && captionMessage
          }
          state={meta.error ? 'error' : undefined}
          onChange={helpers.setValue}
        />
      </div>
    </section>
  );
};

export default AddressInput;
