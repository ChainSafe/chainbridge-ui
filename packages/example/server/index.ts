import express, { Application } from "express";
import cors from "cors";

import { SSM } from "@aws-sdk/client-ssm";

const PORT = process.env.PORT || 8000;

const app: Application = express();
app.use(cors());

const ssm = new SSM({
  region: "us-east-2",
});

const getConfigFromSSM = async () => {
  try {
    const data = await ssm.getParameter({
      Name: "/chainbridge/chainbridge-ui-local",
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
  }
};

app.get("/config", (req, res) => {
  getConfigFromSSM().then((config) => {
    res.json(config);
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
