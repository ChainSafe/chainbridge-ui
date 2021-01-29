import React from "react";
import styled from "styled-components";

import ChainBridgeLogo from "../../assets/AEB_Red_GradientLight.svg";
import { NavLink } from "react-router-dom";
import { ROUTE_LINKS } from "../../App";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: white;
  display: flex;
  padding: 15px;
  justify-content: space-between;
`;
const HeaderLinks = styled.div`
  display: flex;
  align-items: center;
`;

const Link = styled(NavLink)`
  margin-right: 10px;
  text-decoration: none;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.section`
  max-width: 1024px;
`;

function Tutorials() {
  return (
    <Container>
      <Header>
        <img src={ChainBridgeLogo} alt={"Chainbridge Logo"} />
        <HeaderLinks>
          <Link to={ROUTE_LINKS.Transfer}>Transfer</Link>
          <Link to={ROUTE_LINKS.Wrap}>Wrap</Link>
        </HeaderLinks>
      </Header>
      <Content>
        <Section>
          <h1>This is tutorials</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Section>
      </Content>
    </Container>
  );
}

export default Tutorials;
