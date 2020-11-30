import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import { IModalProps, Modal } from "@chainsafe/common-components";
import clsx from "clsx";

const useStyles = makeStyles(({ constants }: ITheme) =>
  createStyles({
    root: {
      height: `100% !important`,
      borderTopLeftRadius: constants.generalUnit / 2,
      borderTopRightRadius: constants.generalUnit / 2,
      overflow: "hidden",
      position: "absolute",
    },
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
