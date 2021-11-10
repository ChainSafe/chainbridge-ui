import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import { Drawer, IDrawerProps } from "@chainsafe/common-components";
import clsx from "clsx";

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      backgroundColor: `${palette.additional["gray"][9]} !important`,
      color: palette.common.white.main,
      border: "none",
      padding: `${constants.generalUnit * 3}px ${constants.generalUnit * 4}px`,
    },
    backdrop: {
      backgroundColor: `${palette.additional["gray"][9]} !important`,
      opacity: `0.6 !important`,
    },
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
