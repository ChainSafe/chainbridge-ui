import * as yup from "yup";
import { utils } from "ethers";

import { isValidSubstrateAddress } from "../../utils/Helpers";
import { BridgeConfig } from "@chainsafe/chainbridge-ui-core";
import { PreflightDetails } from "./TransferPage";

type MakeValidationSchemaOptions = {
  homeConfig: BridgeConfig | undefined;
  tokens: any;
  destinationChainConfig: any;
  preflightDetails: PreflightDetails;
  bridgeFee: any;
  checkSupplies: any;
};
export default function makeValidationSchema({
  preflightDetails,
  tokens,
  bridgeFee,
  homeConfig,
  destinationChainConfig,
  checkSupplies,
}: MakeValidationSchemaOptions) {
  const selectedToken = homeConfig?.tokens.find(
    (token) => token.address === preflightDetails.token
  );
  const DECIMALS =
    selectedToken && selectedToken.decimals ? selectedToken.decimals : 18;

  const REGEX =
    DECIMALS > 0
      ? new RegExp(`^[0-9]{1,18}(.[0-9]{1,${DECIMALS}})?$`)
      : new RegExp(`^[0-9]{1,18}?$`);
  const validationSchema = yup.object().shape({
    tokenAmount: yup
      .string()
      .test("Token selected", "Please select a token", (value) => {
        if (
          !!value &&
          preflightDetails &&
          tokens[preflightDetails.token] &&
          tokens[preflightDetails.token].balance !== undefined
        ) {
          return true;
        } else {
          return false;
        }
      })
      .test("InputValid", "Input invalid", (value) => {
        try {
          return REGEX.test(`${value}`);
        } catch (error) {
          console.error(error);
          return false;
        }
      })
      .test("Max", "Insufficent funds", (value) => {
        if (
          value &&
          preflightDetails &&
          tokens[preflightDetails.token] &&
          tokens[preflightDetails.token].balance
        ) {
          if (homeConfig?.type === "Ethereum") {
            return parseFloat(value) <= tokens[preflightDetails.token].balance;
          } else {
            return (
              parseFloat(value + (bridgeFee || 0)) <=
              tokens[preflightDetails.token].balance
            );
          }
        }
        return false;
      })
      .test(
        "Bridge Supplies",
        "Not enough tokens on the destination chain. Please contact support.",
        async (value) => {
          if (checkSupplies && destinationChainConfig && value) {
            const supplies = await checkSupplies(
              parseFloat(value),
              preflightDetails.token,
              destinationChainConfig.domainId
            );
            return Boolean(supplies);
          }
          return false;
        }
      )
      .test("Min", "Less than minimum", (value) => {
        if (value) {
          return parseFloat(value) > 0;
        }
        return false;
      })
      .required("Please set a value"),
    token: yup.string().required("Please select a token"),
    receiver: yup
      .string()
      .test("Valid address", "Please add a valid address", (value) => {
        if (destinationChainConfig?.type === "Substrate") {
          return isValidSubstrateAddress(value as string);
        }
        return utils.isAddress(value as string);
      })
      .required("Please add a receiving address"),
  });
  return validationSchema;
}
