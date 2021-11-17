import React from "react";
import { IModalProps, Modal } from "@chainsafe/common-components";
import clsx from "clsx";
import { useStyles } from "./styles";

interface ICustomModalProps extends IModalProps {}

const CustomModal: React.FC<ICustomModalProps> = ({
  children,
  className,
  ...rest
}: ICustomModalProps) => {
  const classes = useStyles();

  return (
    <Modal className={clsx(classes.root, className)} {...rest}>
      {children}
    </Modal>
  );
};

export default CustomModal;
