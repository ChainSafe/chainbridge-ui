import { createStyles, ITheme, makeStyles } from "@imploy/common-themes";
import clsx from "clsx";
import React from "react";
import LoaderSVG from "./loader.svg";

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {},
  })
);

interface ILoader {
  className?: string;
}

export const Loader: React.FC<ILoader> = ({ className }: ILoader) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <LoaderSVG />
    </div>
  );
};
