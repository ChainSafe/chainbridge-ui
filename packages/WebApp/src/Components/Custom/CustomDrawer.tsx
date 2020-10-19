import React, { ReactNode } from "react";

import { makeStyles, ITheme, createStyles } from "@imploy/common-themes";
import { Drawer, IDrawerProps } from "@imploy/common-components";
import clsx from "clsx";

const useStyles = makeStyles(({}: ITheme) =>
  createStyles({
    root: {},
  })
);

interface ICustomDrawerProps extends IDrawerProps {}

const CustomDrawer: React.FC<ICustomDrawerProps> = ({
  children,
  className,
  ...rest
}: ICustomDrawerProps) => {
  const classes = useStyles();

  return (
    <Drawer className={clsx(classes.root, className)} {...rest}>
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
