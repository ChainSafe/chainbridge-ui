import React from "react";
import styled from "styled-components";

import AppHeader from "../../Layouts/AppHeader";
import mm1 from "../../assets/faq_images/mm_1.png";
import mm2 from "../../assets/faq_images/mm_2.png";
import mm3 from "../../assets/faq_images/mm_3.png";
import mm4 from "../../assets/faq_images/mm_4.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Title = styled.h1`
  font-weight: 700;
`;

const SubTitle = styled.h2`
  font-weight: 700;
  margin: 60px 0 20px;
  font-size: 20px;
  line-height: 1.25em;
`;

const Instruction = styled.p`
  font-weight: 400;
  margin: 20px 0;
  color: #424242;
  line-height: 23px;
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
  color: #424242;
`;

function FAQ() {
  return (
    <Container>
      <AppHeader showViewTransfer={true} />
      <Content>
        <Section>
          <Title>Frequently Asked Questions</Title>

          <SubTitle id="move-avax-to-ethereum">
            Can I move AVAX to Ethereum?
          </SubTitle>
          <Instruction>
            Yes, you can do this by wrapping AVAX into WAVAX. Then proceed with
            transferring it to Ethereum.
          </Instruction>

          <SubTitle id="what-is-wavax">What is WAVAX and WETH?</SubTitle>
          <Instruction>
            WAVAX and WETH are the ERC-20 token forms of AVAX and ETH
            respectively. They allow the Avalanche and Ethereum native tokens to
            be transferred and used on either network. Learn more about wrapping{" "}
            <Anchor
              href="https://support.avalabs.org/en/articles/4623667-what-is-weth-or-wrapped-eth"
              target="_blank"
            >
              here
            </Anchor>
            .
          </Instruction>

          <SubTitle id="why-eth-on-avalanche">
            Why do I get ETH on Avalanche and AVAX on Ethereum?
          </SubTitle>
          <Instruction>
            There is no concept of WAVAX on Ethereum, only AVAX. Similarly,
            there is only ETH, not WETH on Avalanche. This is because neither
            token exists as a native token on it’s non-native chain, but rather
            only as an ERC-20.
          </Instruction>

          <SubTitle id="fee-displays">
            Why are my fees displayed in ETH on MetaMask?
          </SubTitle>
          <Instruction>
            MetaMask is originally built for Ethereum and does not support the
            native tokens of other blockchain networks. The ETH units displayed
            are actually AVAX units. Therefore, to get the true cost of
            transactions, you need to multiply the units by the current market
            rate of AVAX.
          </Instruction>

          <SubTitle id="wrapped-eth-failures">
            Why do I keep getting failures wrapping my ETH?
          </SubTitle>
          <Instruction>
            You can’t wrap all of your ETH, as you need to use some ETH to pay
            for the on-chain wrapping transaction.
            <strong>
              You should also leave enough ETH in your wallet to pay for the
              bridge fee!
            </strong>
          </Instruction>

          <SubTitle id="eth-wallet-on-avalanche">
            Am I able to use my Ethereum wallet on Avalanche?
          </SubTitle>
          <Instruction>
            Yes - that is the power of Avalanche! It allows you to use your same
            wallet that you use on Ethereum.
          </Instruction>

          <SubTitle id="metamask-pending-tx-error">
            MetaMask is giving me an error and my transaction is still pending.
          </SubTitle>
          <Instruction>
            If you have a pending transaction that has not finalized, you can
            try the following:
          </Instruction>
          <List style={{ listStyle: "decimal" }}>
            <ListItem>Click on your MetaMask extension</ListItem>

            <ListItem>
              Select the asset where you have a pending transaction
            </ListItem>
            <Image
              style={{ margin: "20px 0" }}
              src={mm1}
              alt="image of asset list in Metamask application"
            ></Image>

            <ListItem>Cancel the pending transaction</ListItem>

            <ListItem>Select your account in the top right</ListItem>
            <Image
              style={{ margin: "20px 0" }}
              src={mm2}
              alt="image of account selection menu in Metamask application"
            ></Image>

            <ListItem>Select “Settings”</ListItem>

            <ListItem>Select “Advanced”</ListItem>

            <ListItem>
              Select “Reset Account” and then confirm with the “Reset” button
            </ListItem>
            <Image
              style={{ margin: "20px 0" }}
              src={mm3}
              alt="image of Reset Account button in advanced settings of Metamask application"
            ></Image>

            <ListItem>
              Make sure you are on the right network, which can be found on the
              dropdown
            </ListItem>
            <Image
              style={{ margin: "20px 0" }}
              src={mm4}
              alt="image of network selection menu, where 'Avalanche Mainnet' is selected, in Metamask application"
            ></Image>

            <ListItem>
              Resend the transaction again. If you are still having trouble,
              please feel free to go to the{" "}
              <Anchor href="https://chat.avalabs.org/" target="_blank">
                Avalanche discord channel
              </Anchor>
              .
            </ListItem>
          </List>

          <SubTitle id="aborted-errors">
            I keep getting transfer aborted errors even though I have enough ETH
            in my wallet and have reset my Metamask account, how do I fix this?
          </SubTitle>
          <Instruction>
            If you are sending an amount with high granularity, try reducing the
            amount to a smaller number of decimals.
          </Instruction>
        </Section>
      </Content>
    </Container>
  );
}

export default FAQ;
