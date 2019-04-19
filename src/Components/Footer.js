import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-self: center;
  align-self:flex-end;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  margin: 25px 0px;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${props => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
  margin-left: 50px;
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">about me</Link>
      </ListItem>
      <ListItem>
        <Link href="#">support</Link>
      </ListItem>
    </List>
    <Copyright>Inssagram {new Date().getFullYear()} &copy;</Copyright>
  </Footer>
);