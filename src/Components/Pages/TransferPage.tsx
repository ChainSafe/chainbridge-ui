import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, ITheme } from '@chainsafe/common-theme';
import {
  Button,
  Typography,
  QuestionCircleSvg,
  SelectInput,
} from '@chainsafe/common-components';
import { Form, Formik } from 'formik';
import clsx from 'clsx';
import { object, string } from 'yup';
import { utils } from 'ethers';
import AboutDrawer from '../../Modules/AboutDrawer';
import ChangeNetworkDrawer from '../../Modules/ChangeNetworkDrawer';
import PreflightModalTransfer from '../../Modules/PreflightModalTransfer';
import AddressInput from '../Custom/AddressInput';
import TransferActiveModal from '../../Modules/TransferActiveModal';
import { useChainbridge } from '../../Contexts/ChainbridgeContext';
import TokenInput from '../Custom/TokenInput';
import FeesFormikWrapped from './FormikContextElements/Fees';
import { useNetworkManager } from '../../Contexts/NetworkManagerContext';
import NetworkUnsupportedModal from '../../Modules/NetworkUnsupportedModal';
import { isValidSubstrateAddress } from '../../Utils/Helpers';
import { useHomeBridge } from '../../Contexts/HomeBridgeContext';

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      padding: constants.generalUnit * 6,
      position: 'relative',
    },
    walletArea: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginBottom: '28px',
    },
    connectButton: {
      width: '160px',
      fontSize: '16px',
      height: '40px',
    },
    connecting: {
      textAlign: 'center',
      marginBottom: constants.generalUnit * 2,
    },
    connected: {
      width: '100%',
      '& > *:first-child': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      },
    },
    changeButton: {
      fontSize: '16px',
      cursor: 'pointer',
    },
    networkName: {
      borderRadius: 2,
      color: palette.additional.gray[9],
      marginTop: constants.generalUnit,
      marginBottom: constants.generalUnit,
      fontWeight: 800,
    },
    formArea: {
      '&.disabled': {
        opacity: 0.4,
      },
    },
    currencySection: {
      marginBottom: `${constants.generalUnit * 3}px`,
    },
    tokenInputArea: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
    },
    tokenInput: {
      width: '100%',
      margin: 0,
      '& > div': {
        height: 32,
      },
      '& span:last-child.error': {
        position: 'absolute',
      },
      '& span': {
        fontSize: '14px',
      },
    },
    maxButton: {
      height: 32,
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      left: -1,
      color: palette.additional.gray[8],
      backgroundColor: palette.additional.gray[3],
      borderColor: palette.additional.gray[6],
      '&:hover': {
        borderColor: palette.additional.gray[6],
        backgroundColor: palette.additional.gray[7],
        color: palette.common.white.main,
      },
      '&:focus': {
        borderColor: palette.additional.gray[6],
      },
    },
    currencySelector: {
      width: 120,
      '& *': {
        cursor: 'pointer',
      },
    },
    token: {},
    address: {
      margin: 0,
      marginBottom: constants.generalUnit * 3,
    },
    addressInput: {
      '& span': {
        fontSize: '14px',
      },
    },
    generalInput: {
      '& > span': {
        marginBottom: constants.generalUnit,
      },
    },
    faqButton: {
      cursor: 'pointer',
      height: 20,
      width: 20,
      marginTop: constants.generalUnit * 5,
      fill: `${palette.additional.transferUi[1]} !important`,
    },
    tokenItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      '& img, & svg': {
        display: 'block',
        height: 14,
        width: 14,
        marginRight: 10,
      },
      '& span': {
        minWidth: `calc(100% - 30px)`,
        textAlign: 'right',
      },
    },
    fees: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: constants.generalUnit,
      '& > *': {
        display: 'block',
        width: '50%',
        color: palette.additional.gray[8],
        marginBottom: constants.generalUnit / 2,
        '&:nth-child(even)': {
          textAlign: 'right',
        },
      },
    },
    accountSelector: {
      marginBottom: 24,
    },
    network: {
      fontSize: '16px',
    },
  }),
);

type PreflightDetails = {
  tokenAmount: number;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const TransferPage = (): JSX.Element => {
  const classes = useStyles();
  const { walletType, setWalletType } = useNetworkManager();

  const {
    deposit,
    transactionStatus,
    resetDeposit,
    bridgeFee,
    tokens,
    isReady,
    homeConfig,
    destinationChainConfig,
    address,
  } = useChainbridge();

  const { accounts, selectAccount } = useHomeBridge();
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [changeNetworkOpen, setChangeNetworkOpen] = useState<boolean>(false);
  const [preflightModalOpen, setPreflightModalOpen] = useState<boolean>(false);

  const [preflightDetails, setPreflightDetails] = useState<PreflightDetails>({
    receiver: '',
    token: '',
    tokenAmount: 0,
    tokenSymbol: '',
  });

  useEffect(() => {
    if (walletType !== 'select' && walletConnecting === true) {
      setWalletConnecting(false);
    } else if (walletType === 'select') {
      setWalletConnecting(true);
    }
  }, [walletType, walletConnecting]);

  const DECIMALS =
    preflightDetails && tokens[preflightDetails.token]
      ? tokens[preflightDetails.token].decimals
      : 18;

  const REGEX =
    DECIMALS > 0
      ? new RegExp(`^[0-9]{1,18}(.[0-9]{1,${DECIMALS}})?$`)
      : new RegExp(`^[0-9]{1,18}?$`);

  const transferSchema = object().shape({
    tokenAmount: string()
      .test('Token selected', 'Please select a token', value => {
        if (
          !!value &&
          preflightDetails &&
          tokens[preflightDetails.token] &&
          tokens[preflightDetails.token].balance !== undefined
        ) {
          return true;
        }
        return false;
      })
      .test('InputValid', 'Input invalid', value => {
        try {
          return REGEX.test(`${value}`);
        } catch (error) {
          console.error(error);
          return false;
        }
      })
      .test('Max', 'Insufficent funds', value => {
        if (
          value &&
          preflightDetails &&
          tokens[preflightDetails.token] &&
          tokens[preflightDetails.token].balance
        ) {
          if (homeConfig?.type === 'Ethereum') {
            return parseFloat(value) <= tokens[preflightDetails.token].balance;
          }
          return (
            parseFloat(value + (bridgeFee || 0)) <=
            tokens[preflightDetails.token].balance
          );
        }
        return false;
      })
      .test('Min', 'Less than minimum', value => {
        if (value) {
          return parseFloat(value) > 0;
        }
        return false;
      })
      .required('Please set a value'),
    token: string().required('Please select a token'),
    receiver: string()
      .test('Valid address', 'Please add a valid address', value => {
        if (destinationChainConfig?.type === 'Substrate') {
          return isValidSubstrateAddress(value as string);
        }
        return utils.isAddress(value as string);
      })
      .required('Please add a receiving address'),
  });

  const ConnectButton = () => {
    if (!isReady) {
      return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            className={classes.connectButton}
            fullsize
            onClick={() => {
              setWalletType('Ethereum');
            }}
          >
            Bridge to wCFG
          </Button>
          <Button
            className={classes.connectButton}
            fullsize
            onClick={() => {
              setWalletType('Substrate');
            }}
          >
            Bridge to CFG
          </Button>
        </div>
      );
    }

    if (walletConnecting) {
      return (
        <section className={classes.connecting}>
          <Typography component="p" variant="h5">
            This app requires access to your wallet, <br />
            please login and authorize access to continue.
          </Typography>
        </section>
      );
    }

    return (
      <section className={classes.connected}>
        <div>
          <Typography variant="body1" className={classes.network}>
            Network: <strong>{homeConfig?.name}</strong>
          </Typography>
          <Typography
            className={classes.changeButton}
            variant="body1"
            onClick={() => setChangeNetworkOpen(true)}
          >
            Change
          </Typography>
        </div>
      </section>
    );
  };

  return (
    <article className={classes.root}>
      <div
        style={{
          marginBottom: '48px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h1">Token Bridge</Typography>
      </div>
      <div className={classes.walletArea}>
        <ConnectButton />
      </div>
      {isReady &&
        walletType === 'Substrate' &&
        accounts &&
        accounts.length > 0 && (
          <div>
            <section className={classes.accountSelector}>
              <SelectInput
                label="Select account"
                className={classes.generalInput}
                options={accounts.map((acc, i) => ({
                  label: acc.address,
                  value: i,
                }))}
                onChange={value => selectAccount && selectAccount(value)}
                value={accounts.findIndex(v => v.address === address)}
                placeholder="Select an account"
              />
            </section>
          </div>
        )}
      <Formik
        initialValues={{
          tokenAmount: 0,
          token: '',
          receiver: '',
        }}
        validateOnChange={false}
        validationSchema={transferSchema}
        onSubmit={values => {
          setPreflightDetails({
            ...values,
            tokenSymbol: tokens[values.token].symbol || '',
          });
          setPreflightModalOpen(true);
        }}
      >
        <Form
          className={clsx(classes.formArea, {
            disabled: !homeConfig || !address,
          })}
        >
          <section className={classes.currencySection}>
            <TokenInput
              classNames={{
                input: clsx(classes.tokenInput, classes.generalInput),
              }}
              disabled={!destinationChainConfig}
              name="tokenAmount"
              label="I want to send"
            />
          </section>
          <section>
            <AddressInput
              disabled={!destinationChainConfig}
              name="receiver"
              label="Destination Address"
              placeholder="Please enter the receiving address"
              className={classes.address}
              classNames={{
                input: classes.addressInput,
              }}
              senderAddress={`${address}`}
              sendToSameAccountHelper={
                destinationChainConfig?.type === homeConfig?.type
              }
            />
          </section>
          <FeesFormikWrapped
            amountFormikName="tokenAmount"
            className={classes.fees}
            fee={bridgeFee}
            feeSymbol={homeConfig?.nativeTokenSymbol}
            symbol={
              preflightDetails && tokens[preflightDetails.token]
                ? tokens[preflightDetails.token].symbol
                : undefined
            }
          />
          <section>
            <Button
              style={{ fontSize: '16px', height: '40px' }}
              type="submit"
              fullsize
              variant="primary"
            >
              Start transfer
            </Button>
          </section>
          <section>
            <QuestionCircleSvg
              onClick={() => setAboutOpen(true)}
              className={classes.faqButton}
            />
          </section>
        </Form>
      </Formik>
      <AboutDrawer open={aboutOpen} close={() => setAboutOpen(false)} />
      <ChangeNetworkDrawer
        open={changeNetworkOpen}
        close={() => setChangeNetworkOpen(false)}
      />
      <PreflightModalTransfer
        open={preflightModalOpen}
        close={() => setPreflightModalOpen(false)}
        receiver={preflightDetails?.receiver || ''}
        sender={address || ''}
        start={() => {
          setPreflightModalOpen(false);
          preflightDetails &&
            deposit(
              preflightDetails.tokenAmount,
              preflightDetails.receiver,
              preflightDetails.token,
            );
        }}
        sourceNetwork={homeConfig?.name || ''}
        targetNetwork={destinationChainConfig?.name || ''}
        tokenSymbol={preflightDetails?.tokenSymbol || ''}
        value={preflightDetails?.tokenAmount || 0}
      />
      <TransferActiveModal open={!!transactionStatus} close={resetDeposit} />
      {/* This is here due to requiring router */}
      <NetworkUnsupportedModal />
    </article>
  );
};
export default TransferPage;
