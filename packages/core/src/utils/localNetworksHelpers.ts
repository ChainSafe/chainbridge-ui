import { Erc20DetailedFactory } from "../Contracts/Erc20DetailedFactory";
import { BigNumber as BN } from "bignumber.js";
import { BigNumber, ethers, utils, providers } from "ethers";
import {
  Actions,
  LocalWeb3State,
  TokenInfo,
} from "../contexts/localWeb3Context/types";
import { API as OnboardAPI } from "bnc-onboard/dist/src/interfaces";
import { Erc20Detailed } from "../Contracts/Erc20Detailed";

export const refreshGasPrice = async (
  dispatcher: (action: Actions) => void,
  ethGasStationApiKey: string,
  gasPriceSetting: any
) => {
  try {
    let gasPrice;
    if (ethGasStationApiKey) {
      const ethGasStationResponse = await (
        await fetch(
          `https://ethgasstation.info/api/ethgasAPI.json?api-key=${ethGasStationApiKey}`
        )
      ).json();
      gasPrice = ethGasStationResponse[gasPriceSetting] / 10;
    } else {
      const etherchainResponse = await (
        await fetch("https://www.etherchain.org/api/gasPriceOracle")
      ).json();
      gasPrice = Number(etherchainResponse[gasPriceSetting]);
    }

    const newGasPrice = !isNaN(Number(gasPrice)) ? Number(gasPrice) : 65;
    //@ts-ignore
    dispatcher({ type: "setGasPrice", payload: newGasPrice });
  } catch (error) {
    console.log(error);
    console.log("Using 65 gwei as default");
    //@ts-ignore
    dispatcher({ type: "setGasPrice", payload: 65 });
  }
};

export const checkIsReady = async (
  onboard: OnboardAPI,
  dispatcher: (action: Actions) => void
) => {
  const isReady = await onboard?.walletCheck();
  dispatcher({
    type: "setIsReady",
    payload: !!isReady,
  });
  if (!isReady) {
    dispatcher({
      type: "setBalance",
      payload: 0,
    });
  }
  return !!isReady;
};

export const resetOnboard = (
  dispatcher: (action: Actions) => void,
  onboard: OnboardAPI
) => {
  localStorage.setItem("onboard.selectedWallet", "");
  dispatcher({
    type: "setIsReady",
    payload: false,
  });
  onboard?.walletReset();
};

export const checkBalanceAndAllowance = async (
  token: Erc20Detailed,
  decimals: number,
  dispatcher: (action: Actions) => void,
  address: string,
  spenderAddress: string | undefined
) => {
  if (address) {
    const bal = await token.balanceOf(address);
    const balance = Number(utils.formatUnits(bal, decimals));
    const balanceBN = new BN(bal.toString()).shiftedBy(-decimals);
    let spenderAllowance = 0;
    if (spenderAddress) {
      spenderAllowance = Number(
        utils.formatUnits(
          BigNumber.from(await token.balanceOf(address)),
          decimals
        )
      );
    }

    dispatcher({
      type: "updateTokenBalanceAllowance",
      payload: {
        id: token.address,
        spenderAllowance: spenderAllowance,
        balance: balance,
        balanceBN,
      },
    });
  }
};

export const getTokenData = async (
  networkTokens: any,
  dispatcher: (action: Actions) => void,
  state: LocalWeb3State,
  spenderAddress: string | undefined
) => {
  let tokenContracts: Array<Erc20Detailed> = [];
  networkTokens.forEach(async (token: any) => {
    const signer = await state.provider.getSigner();
    const tokenContract = Erc20DetailedFactory.connect(token.address, signer);

    const newTokenInfo: TokenInfo = {
      decimals: 0,
      balance: 0,
      balanceBN: new BN(0),
      imageUri: token.imageUri,
      name: token.name,
      symbol: token.symbol,
      spenderAllowance: 0,
      allowance: tokenContract.allowance,
      approve: tokenContract.approve,
      transfer: tokenContract.transfer,
    };

    if (!token.name) {
      try {
        const tokenName = await tokenContract.name();
        newTokenInfo.name = tokenName;
      } catch (error) {
        console.log(
          "There was an error getting the token name. Does this contract implement ERC20Detailed?"
        );
      }
    }
    if (!token.symbol) {
      try {
        const tokenSymbol = await tokenContract.symbol();
        newTokenInfo.symbol = tokenSymbol;
      } catch (error) {
        console.error(
          "There was an error getting the token symbol. Does this contract implement ERC20Detailed?"
        );
      }
    }

    try {
      const tokenDecimals = await tokenContract.decimals();
      newTokenInfo.decimals = tokenDecimals;
    } catch (error) {
      console.error(
        "There was an error getting the token decimals. Does this contract implement ERC20Detailed?"
      );
    }

    dispatcher({
      type: "addToken",
      payload: { id: token.address, token: newTokenInfo },
    });

    checkBalanceAndAllowance(
      tokenContract,
      newTokenInfo.decimals,
      dispatcher,
      state.address,
      spenderAddress
    );

    const filterTokenApproval = tokenContract.filters.Approval(
      state.address,
      null,
      null
    );
    const filterTokenTransferFrom = tokenContract.filters.Transfer(
      state.address,
      null,
      null
    );
    const filterTokenTransferTo = tokenContract.filters.Transfer(
      null,
      state.address,
      null
    );

    tokenContract.on(filterTokenApproval, () =>
      checkBalanceAndAllowance(
        tokenContract,
        newTokenInfo.decimals,
        dispatcher,
        state.address,
        spenderAddress
      )
    );
    tokenContract.on(filterTokenTransferFrom, () =>
      checkBalanceAndAllowance(
        tokenContract,
        newTokenInfo.decimals,
        dispatcher,
        state.address,
        spenderAddress
      )
    );
    tokenContract.on(filterTokenTransferTo, () =>
      checkBalanceAndAllowance(
        tokenContract,
        newTokenInfo.decimals,
        dispatcher,
        state.address,
        spenderAddress
      )
    );
    tokenContracts.push(tokenContract);
  });
};

export const signMessage = async (
  message: string,
  provider: providers.Web3Provider
) => {
  if (!provider) return Promise.reject("The provider is not yet initialized");

  const data = ethers.utils.toUtf8Bytes(message);
  const signer = await provider.getSigner();
  const addr = await signer.getAddress();
  const sig = await provider.send("personal_sign", [
    ethers.utils.hexlify(data),
    addr.toLowerCase(),
  ]);
  return sig;
};
