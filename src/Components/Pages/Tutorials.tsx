import React from "react";
import styled from "styled-components";

import AppHeader from "../../Layouts/AppHeader";
import image1 from "../../assets/tutorial_images/image1.png";
import image2 from "../../assets/tutorial_images/image2.png";
import image3 from "../../assets/tutorial_images/image3.png";
import image4 from "../../assets/tutorial_images/image4.png";
import image5 from "../../assets/tutorial_images/image5.png";
import image6 from "../../assets/tutorial_images/image6.png";
import image7 from "../../assets/tutorial_images/image7.png";
import image8 from "../../assets/tutorial_images/image8.png";
import image11 from "../../assets/tutorial_images/image11.png";
import image12 from "../../assets/tutorial_images/image12.png";
import image10 from "../../assets/tutorial_images/image10.png";
import image13 from "../../assets/tutorial_images/image13.png";
import logo from "../../assets/AEB_Red_GradientLight.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Title = styled.h1`
  font-weight: 700;
`;

const SubTitle = styled.h3`
  font-weight: 400;
  font-size: 18px;
  margin: 10px 0;
`;

const Instruction = styled.h3`
  font-weight: 400;
  margin: 20px 0;
  color: #424242;
  line-height: 23px;
`;

const Step = styled.h2`
  font-weight: 700;
  margin: 20px 0;
  font-size: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 250px;
`;

const Section = styled.section`
  max-width: 720px;
`;

const Image = styled.img``;

const Anchor = styled.a`
  color: #e92526;
  text-decoration: none;
`;
const List = styled.ul`
  max-width: 720px;
  padding-left: 20px;
`;
const ListItem = styled.li`
  margin: 10px 0;
  line-height: 23px;
`;

const GroupHorizontal = styled.div`
  display: flex;
`;

const GroupVertical = styled.div`
  display: flex;
  flex-direction: column;
`;

function Tutorials() {
  return (
    <Container>
      <AppHeader showViewTransfer={true} />
      <Content>
        <Section>
          <Title>Considerations</Title>
          <SubTitle>
            <strong>Fees</strong>
          </SubTitle>
          <Instruction>
            MetaMask displays the gas fee dollar amount in ETH equivalent on
            Avalanche, however, the token used for gas is AVAX when using the
            Avalanche network. To calculate the true dollar equivalent, you will
            have to multiply the units of AVAX used * the current market price
            of AVAX.
          </Instruction>
          <SubTitle>
            <strong>Bridge</strong>
          </SubTitle>
          <Instruction>
            You must have AVAX in your Avalanche wallet to make a transaction
            after you transfer any asset from Ethereum.
          </Instruction>
          <SubTitle>
            <strong>Wallet</strong>
          </SubTitle>
          <Instruction>
            You can use the same wallet address on Ethereum with Avalanche.
          </Instruction>
          <Title>Getting Started: Set up your MetaMask wallet</Title>
          <SubTitle>
            Setting Up and Funding Your Avalanche Wallet with AVAX
          </SubTitle>
          <SubTitle>
            <strong>
              Reminder: in order to use MetaMask on Avalanche, you will need
              AVAX to cover gas fees to execute transactions
            </strong>
          </SubTitle>
          <Instruction>
            If you already have an Avalanche Wallet and AVAX tokens, skip this
            step and move to <strong>Set Up MetaMask with Avalanche</strong>.
          </Instruction>
          <Step>Step 1 - Create an Avalanche Wallet </Step>
          <Instruction>
            Create an Avalanche Wallet by visiting{" "}
            <Anchor href="https://wallet.avax.network/">
              https://wallet.avax.network/
            </Anchor>
            , selecting “Create New Wallet”, and following the subsequent
            instructions.
          </Instruction>
          <Step>Step 2 - Get AVAX</Step>
          <Instruction>
            You can get AVAX from any of the supported exchanges found on{" "}
            <Anchor href="https://coinmarketcap.com/currencies/avalanche/markets/">
              CoinMarketCap
            </Anchor>
            .
          </Instruction>
          <Step>Step 3 - Transfer to Your Avalanche Wallet</Step>
          <Instruction>
            Once you have AVAX, send AVAX to your Avalanche Wallet that was
            created in Step 1. Find your wallet address that starts with
            “x-avax1” on your Avalanche Wallet.
          </Instruction>
          <Instruction>
            Now that you have AVAX, you can proceed to Set up MetaMask with
            Avalanche.
          </Instruction>
          <Title>Setting Up MetaMask with Avalanche</Title>
          <Step>Step 1 - Download Metamask</Step>
          <Anchor href="https://metamask.io/">Download MetaMask</Anchor>
          <Instruction>
            Install MetaMask as an extension to your browser. Note that the
            following browsers are supported: Chrome, FireFox, Brave, and Edge.
          </Instruction>
          <Step>Step 2 - Create a Wallet or Import an Existing Wallet</Step>
          <Instruction>
            This is where you have to create or import an existing Ethereum
            wallet. If you don’t have an existing Ethereum wallet, please select
            “Create a Wallet”. Always keep your Mnemonic and password to
            yourself and make sure to write it down.{" "}
            <strong>
              Note: This is the wallet that will be used to conduct transactions
              on Avalanche
            </strong>
            .
          </Instruction>
          <Step>Step 3 - Connect MetaMask to Avalanche</Step>
          <Instruction>
            Select the drop-down menu and select “Custom RPC.”
          </Instruction>
          <GroupHorizontal>
            <Image src={image4}></Image>
            <GroupVertical style={{ marginLeft: "10px" }}>
              <Instruction>
                <strong>
                  Enter the following settings into the respective fields:
                </strong>
              </Instruction>
              <List style={{ listStyle: "disc" }}>
                <ListItem>
                  <strong>Network Name:</strong> Avalanche Mainnet
                </ListItem>
                <ListItem>
                  <strong>New RPC URL:</strong>{" "}
                  <Anchor>https://api.avax.network/ext/bc/C/rpc</Anchor>
                </ListItem>
                <ListItem>
                  <strong>ChainID:</strong> 0xa86a
                </ListItem>
                <ListItem>
                  <strong>Symbol:</strong> AVAX
                </ListItem>
                <ListItem>
                  <strong>Explorer:</strong>{" "}
                  <Anchor>https://cchain.explorer.avax.network/</Anchor>
                </ListItem>
              </List>
            </GroupVertical>
          </GroupHorizontal>
          <Title>Fund Your MetaMask Connected to Avalanche </Title>
          <SubTitle>
            Send AVAX to Your MetaMask Wallet Connected to Avalanche
          </SubTitle>
          <Step>
            Step 1: Go to{" "}
            <Anchor href="https://wallet.avax.network/">
              https://wallet.avax.network/
            </Anchor>
            , and access your Avalanche Wallet.
          </Step>
          <Step>
            Step 2: On the left, there is a list of options. Select
            “Cross-Chain”
          </Step>
          <Image src={image11}></Image>
          <Step>
            Step 3: Select the “C Chain (Contract)” as the destination chain
          </Step>
          <Image src={image10}></Image>
          <Step>
            Step 4: Enter the amount you would like to transfer, and then select
            confirm
          </Step>
          <Step>
            Step 5: Send the AVAX from your Avalanche wallet to your MetaMask
            wallet.
          </Step>
          <List style={{ listStyle: "decimal" }}>
            <ListItem>Select "send"</ListItem>
            <Image src={image11}></Image>
            <ListItem>Select “C Contract” as the Source Chain"</ListItem>
            <Image src={image12}></Image>
            <ListItem>
              Enter your MetaMask wallet address by copying and pasting it into
              the “To Address” field on your Avalanche wallet.
            </ListItem>
            <Image src={image13}></Image>
            <ListItem>Confirm and finalize the transaction.</ListItem>
          </List>
          <Instruction>
            <strong>
              Congratulations! You now have AVAX on your MetaMask wallet and can
              start using Avalanche.
            </strong>
          </Instruction>
          <Title>
            Use the Avalanche-Ethereum Bridge to Fund Your Avalanche Address
            From Ethereum
          </Title>
          <Instruction>
            If you have Ethereum (ETH) or Ethereum ERC-20 tokens, you can use
            the Avalanche-Ethereum bridge to bring them to Avalanche. The
            diagram below illustrates how ETH and ERC-20 tokens are bridged
            between Avalanche and Ethereum to use Dapps.
          </Instruction>
          <Image style={{ maxWidth: "720px" }} src={image7}></Image>
          <Instruction>
            <strong>Transferring Ethereum (ETH) to Avalanche</strong>
          </Instruction>
          <List style={{ listStyle: "decimal" }}>
            <ListItem>
              Access the bridge portal{" "}
              <Anchor href="https://aeb.xyz/#/transfer">here</Anchor>
            </ListItem>
            <ListItem>Select “Wrap Token”</ListItem>
            <Image style={{ margin: "20px 0" }} src={image5}></Image>
            <ListItem>
              Select “Connect Metamask” and sign into your wallet
            </ListItem>
            <ListItem>
              Select the “Ethereum Mainnet” network on your MetaMask wallet
            </ListItem>
            <Image style={{ margin: "20px 0" }} src={image2}></Image>
            <ListItem>
              Select Ethereum, enter the amount you would like to wrap and then
              select “Wrap Token”.{" "}
              <strong>Learn more about what wrapping means</strong>{" "}
              <Anchor href="https://support.avalabs.org/en/articles/4623667-what-is-weth-or-wrapped-eth">
                here
              </Anchor>
              .
            </ListItem>
            <Image style={{ margin: "20px 0" }} src={image1}></Image>
            <ListItem>Select “Transfer”</ListItem>
            <Image style={{ margin: "20px 0" }} src={image3}></Image>
            <ListItem>Select the Destination Network as “Avalanche”</ListItem>
            <ListItem>
              Select WETH as the token you want to transfer to Avalanche
            </ListItem>
            <ListItem>Enter the amount of WETH you want to transfer</ListItem>
            <ListItem>
              Enter the destination address, which can be found on your MetaMask
              wallet or you may select the checkbox “I want to send funds to my
              address”. <strong>Note that the address starts with “0x”</strong>.
            </ListItem>
            <Image style={{ margin: "20px 0" }} src={image6}></Image>
            <ListItem>Select “Start Transfer”</ListItem>
          </List>
          <Instruction>
            <strong>
              Congratulations! Now you officially have your WETH on Avalanche.
            </strong>
          </Instruction>
          <Title>Transferring Ethereum ERC-20s to Avalanche</Title>
          <List style={{ listStyle: "decimal" }}>
            <ListItem>
              Access the bridge portal{" "}
              <Anchor href="https://aeb.xyz/#/transfer">here</Anchor>
            </ListItem>
            <ListItem>Make sure you are on the “Transfer” tab</ListItem>
            <Image style={{ margin: "20px 0" }} src={image3}></Image>
            <ListItem>
              Select “Connect Metamask” and sign into your wallet
            </ListItem>
            <ListItem>
              Select “Ethereum Mainnet” network on your Metamask wallet
            </ListItem>
            <Image style={{ margin: "20px 0" }} src={image2}></Image>
            <ListItem>Select the Destination Network as “Avalanche”</ListItem>
            <ListItem>
              Select the ERC-20 token that you would like to transfer
            </ListItem>
            <ListItem>Enter the amount of the ERC-20 token</ListItem>
            <ListItem>
              Enter the destination address, which can be found in your
              Avalanche wallet. If you want to send the funds to your current
              wallet, you may select “I want to send funds to my address”.{" "}
              <strong>Note that the address starts with “0x”</strong>.
            </ListItem>
            <Image style={{ margin: "20px 0" }} src={image8}></Image>
            <ListItem>Select “Start Transfer”</ListItem>
          </List>
          <Instruction>
            <strong>
              Congratulations! Now you officially have your ERC-20 on Avalanche.
            </strong>
          </Instruction>
        </Section>
      </Content>
    </Container>
  );
}

export default Tutorials;
