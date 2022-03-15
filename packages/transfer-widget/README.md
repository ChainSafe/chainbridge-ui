# ChainBridgeUI widget example

This package provides a minimal implementation of the ChainBridgeUI transfer form

## How to use

### ChainBridgeUI with integrated connection logic

widget with integrated [onboardjs](https://docs.blocknative.com/onboard)

```jsx
import Widget from "chainbridge-ui-transfer-widget-unstable";
const App: React.FC<{}> = () => {

  // Your ChainBridgeUI config
  const runtimeConfig = {...}

  return (
    <Widget config={runtimeConfig} />
  );
};
```
### ChainBridgeUI with standard web3 provider

Widget with standard web3 provider passing as an argument. Could be useful if you have your own web3 connection logic in your application

```jsx
import React, { useEffect, useState } from "react";
import Widget from "chainbridge-ui-transfer-widget-unstable";

const App: React.FC<{}> = () => {
  const [provider, setProvider] = useState()

  // Your ChainBridgeUI config
  const runtimeConfig = {...}

  //init the provider
  useEffect(() => {
    setProvider(window.ethereum)
  }, [])

  return (
    <Widget config={runtimeConfig} externalProviderSource={provider} useExternalProvider={true} />
  );
};
```
