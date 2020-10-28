import React from "react";

import { makeStyles, createStyles } from "@imploy/common-themes";
import { IModalProps, Modal } from "@imploy/common-components";
import clsx from "clsx";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

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
