import React from 'react';
import { makeStyles, createStyles, ITheme } from '@chainsafe/common-theme';

const useStyles = makeStyles(({ constants }: ITheme) =>
  createStyles({
    root: {
      padding: constants.generalUnit * 6,
      position: 'relative',
    },
  }),
);

const ExplorerPage = (): JSX.Element => {
  const classes = useStyles();

  return <article className={classes.root}>Explorer</article>;
};
export default ExplorerPage;
