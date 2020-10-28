# Chainbridge UI

## Table of Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
<!-- - [License](#license) -->

## Features

### Stack

- JS Framework: [React](https://github.com/facebook/react) + [Typescript](https://github.com/microsoft/TypeScript)
- Blockchain components: [Ethers.js](https://github.com/ethers-io/ethers.js/) + [web3-context](https://github.com/chainsafe/web3-context)
- Styling: [JSS](https://cssinjs.org/?v=v10.0.3) + [Imploy UI Styling](https://github.com/imploy/ui/packages/common-themes/)
- Forms & Validation: [Formik](https://jaredpalmer.com/formik) + [Yup](https://github.com/jquense/yup)
- Notifications: [Imploy UI Components](https://github.com/imploy/ui/packages/common-components/)

## Install

You will need a Github Personal Access token with `read:package` permissions. This can be obtained [here](https://github.com/settings/tokens)

- Run `nano ~/.bash_profile`
- Add the following line to the file `export GITHUB_PACKAGES_AUTH_TOKEN="YOUR_TOKEN_HERE"`
- Press `CTRL+X` to exit
- Run `source .bash_profile`

First, install dependancies:

```
yarn install
```

If you experience issues installing the @imploy packages due to authentication errors, restart your machine and try install again.

## Usage

### Development

For running a local instance use the command:

```
yarn start
```

### Build

To build the project across workspaces, at the root of the directory, run the command `yarn build`.
