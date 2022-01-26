# Chainbridge basic example

This package demonstrate basic usage and implementation of our context providers for bridge purposes

## Install and usage

You can run this locally. If you installed all the dependencies on the root of the repository, you can run `yarn start`. If not, run `yarn` and then `yarn start` to run it locally.

Also from the root of the project you can run `yarn start:basic` and it would run the basic example implementation.

## Runtime config

The `config` folder provides an example of the runtime config that this UI uses. This config is appended to the window object and is globally present through the application lifecycle. You can define your own runtime config with different addresses for the contract as well as different RPC url's.
