import express, { Application } from "express";
import cors from "cors";

import { SSM } from "@aws-sdk/client-ssm";

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';
const SSM_PARAMETER_NAME = process.env.SSM_PARAMETER_NAME

const app: Application = express();
app.use(cors());

const ssm = new SSM({
  region: "us-east-2",
});

const getConfigFromSSM = async () => {
  try {
    const data = await ssm.getParameter({
      Name: SSM_PARAMETER_NAME,
      WithDecryption: true,
    });
    const rawResponse = data.Parameter?.Value;
    if (rawResponse) {
      const parsedResponse = JSON.parse(rawResponse);
      return parsedResponse;
    }
  } catch (e) {
    console.warn("AWS SSM request failed");
    console.error(e);
    return {error: e}
  }
};

app.get("/config", (req, res) => {
  getConfigFromSSM().then((config) => {
    res.json(config);
  });
});

app.get("/health",  (req, res) => {
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://${HOST}:${PORT}`);
});
