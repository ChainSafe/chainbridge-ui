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

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 700;
`;

const SubTitle = styled.h3`
  font-weight: 400;
  font-size: 20px;
  margin: 10px 0;
`;

const Instruction = styled.h3`
  font-weight: 400;
  margin: 20px 0;
  color: #424242;
`;

const Step = styled.h2`
  font-weight: 700;
  margin: 20px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

function Tutorials() {
  return (
    <Container>
      <AppHeader showViewTransfer={true} />
      <Content>
        <Section>
          <Title>Getting Started: Set up your MetaMask wallet</Title>
          <SubTitle>
            Setting Up and Funding Your Avalanche Wallet with AVAX
          </SubTitle>
          <Instruction>
            If you already have an Avalanche Wallet and AVAX tokens, skip this
            step and move to “Setting Up Metamask with Avalanche”.
          </Instruction>
          <Step>Step 1 - Create an Avalanche Wallet </Step>
          <Instruction>
            Create an Avalanche Wallet by visiting{" "}
            <Anchor href="https://wallet.avax.network/">
              https://wallet.avax.network/
            </Anchor>
            , clicking on “Create New Wallet”, and following the subsequent
            instructions.
          </Instruction>
          <Step>Step 2 - Get AVAX</Step>
          <Instruction>
            You can get AVAX from any of the support exchanges found on{" "}
            <Anchor href="https://coinmarketcap.com/currencies/avalanche/markets/">
              CoinMarketCap
            </Anchor>
            .
          </Instruction>
          <Step>Step 3 - Transfer to Your Avalanche Wallet</Step>
          <Instruction>
            Once you have AVAX, send AVAX to your Avalanche Wallet that was
            created in Step 1. Find your wallet address that starts with
            “x-avax1” on your Avalanche Wallet. Now that you have AVAX, you may
            proceed to Setting up Metamask and Funding your Avalanche Address.
          </Instruction>
          <SubTitle>Setting Up MetaMask with Avalanche</SubTitle>
          <Anchor href="https://metamask.io/">Download MetaMask</Anchor>
          <Step>Step 1 - Open up your MetaMask Wallet</Step>
          <Instruction>
            We will use MetaMask to connect to the bridge. Open the extension
            and login (or register if you’re a new user).
          </Instruction>
          <Step>Step 2 - Connect Metamask to Avalanche</Step>
          <Instruction>
            Click the drop-down menu and select “Custom RPC.”{" "}
          </Instruction>
          <Image src={image4}></Image>
          <Instruction>
            Enter the following settings into the respective fields:
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

          <Title>
            Use the Avalanche-Ethereum Bridge to Fund Your Avalanche Address
            From Ethereum
          </Title>
          <Instruction>
            If you have Ethereum or Ethereum ERC-20 tokens, you can use the
            Avalanche-Ethereum bridge to bring them to Avalanche. The bridge
            allows you to transfer assets between both blockchain networks,
            which can be seen in the figure below.
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
            <Image src={image5}></Image>
            <ListItem>
              Select “Connect Metamask” and sign into your wallet
            </ListItem>
            <ListItem>
              Select the “Ethereum Mainnet” network on your MetaMask wallet
            </ListItem>
            <Image src={image2}></Image>
            <ListItem>
              Select Ethereum, enter the amount you would like to wrap and then
              select “Wrap Token”.{" "}
              <strong>Learn more about what wrapping means</strong>{" "}
              <Anchor href="https://support.avalabs.org/en/articles/4623667-what-is-weth-or-wrapped-eth">
                here
              </Anchor>
              .
            </ListItem>
            <Image src={image1}></Image>
            <ListItem>Select “Transfer”</ListItem>
            <Image src={image3}></Image>
            <ListItem>Select the Destination Network as “Avalanche”</ListItem>
            <ListItem>
              Select WETH as the token you want to transfer to Avalanche
            </ListItem>
            <ListItem>Enter the amount of WETH you want to transfer</ListItem>
            <ListItem>
              Enter the destination address, which can be found in your MetaMask
              wallet. If you want to send the funds to your current wallet, you
              may click “I want to send funds to my address”.
            </ListItem>
            <Image src={image6}></Image>
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
              Access the bridge portal:{" "}
              <Anchor href="https://aeb.xyz/#/transfer">here</Anchor>
            </ListItem>
            <ListItem>Select “Transfer”</ListItem>
            <Image src={image3}></Image>
            <ListItem>
              Select “Connect Metamask” and sign into your wallet
            </ListItem>
            <ListItem>
              Select “Ethereum Mainnet” network on your Metamask wallet
            </ListItem>
            <Image src={image2}></Image>
            <ListItem>Select the Destination Network as “Avalanche”</ListItem>
            <ListItem>
              Select the ERC-20 token that you would like to transfer
            </ListItem>
            <ListItem>Enter the amount of the ERC-20 token</ListItem>
            <ListItem>
              Enter the destination address, which can be found in your
              Avalanche wallet. If you want to send the funds to your current
              wallet, you may click “I want to send funds to my address”.
            </ListItem>
            <Image src={image8}></Image>
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
