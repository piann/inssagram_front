import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import {HashRouter as Router} from "react-router-dom";
import Routes from "./Router";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";
import styled from "styled-components";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width:100%;
`

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return(
    <ThemeProvider theme={Theme}>
    <>
      <GlobalStyles />
      <Router>
        <>
        <Header/>
        <Wrapper>
          <Routes isLoggedIn={isLoggedIn} />
          <Footer/>
        </Wrapper>
        </>
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
    </>
    </ThemeProvider>
)
};