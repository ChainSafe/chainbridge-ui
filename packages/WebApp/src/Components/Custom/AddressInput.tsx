import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

import { makeStyles, createStyles } from "@imploy/common-themes";
import {
  CheckboxInput,
  FormikTextInputProps,
  TextInput,
} from "@imploy/common-components";
import clsx from "clsx";
import { useField } from "formik";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

interface IAddressInput extends FormikTextInputProps {
  senderAddress: string;
  classNames?: {
    input?: string;
  };
}

const AddressInput: React.FC<IAddressInput> = ({
  classNames,
  senderAddress,
  className,
  inputVariant = "default",
  type = "text",
  placeholder,
  name,
  size,
  label,
  labelClassName,
  captionMessage,
}: IAddressInput) => {
  const classes = useStyles();
  const [field, meta, helpers] = useField(name);

  const [stored, setStored] = useState<string>("");

  const toggleReceiver = useCallback(() => {
    if (stored === "") {
      setStored(field.value);
      helpers.setValue(senderAddress);
    } else {
      helpers.setValue(stored);
      setStored("");
    }
  }, [helpers, field, senderAddress, stored, setStored]);

  useEffect(() => {
    // Used to ensure value if address changes for some reason
    if (stored !== "" && stored !== senderAddress) {
      setStored(senderAddress);
    }
  }, [senderAddress, stored]);

  return (
    <section className={clsx(classes.root, className)}>
      <div>
        <TextInput
          label={label ? label : field.name}
          inputVariant={inputVariant}
          disabled={stored !== ""}
          type={type}
          size={size}
          className={classNames?.input}
          labelClassName={labelClassName}
          name={field.name}
          value={field.value}
          placeholder={placeholder}
          captionMessage={
            meta.error ? `${meta.error}` : captionMessage && captionMessage
          }
          state={meta.error ? "error" : undefined}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            helpers.setValue(e.target?.value);
          }}
        />
      </div>
      <div>
        <CheckboxInput
          label="I want to send funds to my address"
          value={stored !== ""}
          onChange={() => toggleReceiver()}
        />
      </div>
    </section>
  );
};

export default AddressInput;
