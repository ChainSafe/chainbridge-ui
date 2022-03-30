import React, {useEffect} from 'react';
import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Typography, Button } from '@mui/material'


export const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions))

const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames, useAccount } = hooks


const ConnectToMetamask = ({dispatcher, handleClose}: {dispatcher: any, handleClose: any}) => {
  const chainId = useChainId()
  const accounts = useAccounts()
  const account = useAccount()
  console.log("🚀 ~ file: ConnectToMetamask.tsx ~ line 13 ~ ConnectToMetamask ~ account", account)
  const error = useError()
  const isActivating = useIsActivating()
  const provider = useProvider()

  const isActive = useIsActive()


  useEffect(() => {
    if (isActive) {
      dispatcher({
        type: 'setAll', payload: {
          provider,
          accounts,
          isActive,
          chainId,
          address: account
        }
      })
      handleClose()
    }
  }, [isActive])

  return(<Button
    fullWidth
    variant="outlined"
    sx={{ textAlign: 'left'}}
    onClick={() => {
    metaMask.activate()
    // handleClose()
  }}> metamask</Button>)
}

export default ConnectToMetamask