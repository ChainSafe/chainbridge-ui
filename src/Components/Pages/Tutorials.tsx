import React from "react";
import styled from "styled-components";

import ChainBridgeLogo from "../../assets/AEB_Red_GradientLight.svg";
import { NavLink } from "react-router-dom";
import { ROUTE_LINKS } from "../../App";
import AppHeader from "../../Layouts/AppHeader";

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
      <AppHeader showViewTransfer={true} />
      {/* <Header>
        <img src={ChainBridgeLogo} alt={"Chainbridge Logo"} />
        <HeaderLinks>
          <Link to={ROUTE_LINKS.Transfer}>Transfer</Link>
          <Link to={ROUTE_LINKS.Wrap}>Wrap</Link>
        </HeaderLinks>
      </Header> */}
      <Content>
        <Section>
          <></>
        </Section>
      </Content>
    </Container>
  );
}

export default Tutorials;
