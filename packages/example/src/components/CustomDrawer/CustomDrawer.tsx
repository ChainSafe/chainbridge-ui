import React from "react";
import { Drawer, IDrawerProps } from "@chainsafe/common-components";
import clsx from "clsx";
import { useStyles } from "./styles";

interface ICustomDrawerProps extends IDrawerProps {}

const CustomDrawer: React.FC<ICustomDrawerProps> = ({
  children,
  className,
  ...rest
}: ICustomDrawerProps) => {
  const classes = useStyles();

  return (
    <Drawer
      classNames={{
        backdrop: classes.backdrop,
      }}
      className={clsx(classes.root, className)}
      {...rest}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
