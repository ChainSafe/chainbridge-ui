import * as yup from "yup";

import { BridgeConfig } from "../../chainbridgeConfig";
import { TokenConfig } from "../../chainbridgeConfig";

type MakeWrapValidationSchemaOptions = {
  homeChainConfig: BridgeConfig | undefined;
  tokens: any;
  action: "wrap" | "unwrap";
  nativeTokenBalance?: number;
  wrapTokenConfig?: TokenConfig;
};
export default function makeValidationSchema({
  tokens,
  homeChainConfig,
  action,
  nativeTokenBalance,
  wrapTokenConfig,
}: MakeWrapValidationSchemaOptions) {
  const REGEX =
    homeChainConfig?.decimals && homeChainConfig.decimals > 0
      ? new RegExp(`^[0-9]{1,18}(.[0-9]{1,${homeChainConfig.decimals}})?$`)
      : new RegExp(`^[0-9]{1,18}?$`);

  const validationSchema = yup.object().shape({
    tokenAmount: yup
      .string()
      .matches(REGEX, "Input invalid")
      .test("Min", "Less than minimum", (value) => {
        if (value) {
          return parseFloat(value) > 0;
        }
        return false;
      })
      .test("Max", "Insufficent funds", (value) => {
        return action === "wrap"
          ? nativeTokenBalance &&
            value &&
            parseFloat(value) <= nativeTokenBalance
            ? true
            : false
          : tokens[wrapTokenConfig?.address || "0x"].balance &&
            value &&
            parseFloat(value) <=
              tokens[wrapTokenConfig?.address || "0x"]?.balance
          ? true
          : false;
      })
      .required("Please set a value"),
  });
  return validationSchema;
}
