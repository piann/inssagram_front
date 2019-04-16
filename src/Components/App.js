import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Router from "./Router";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";


const QUERY = gql`
  {
    isLoggedIn @client
  }
`;


export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  console.log(isLoggedIn);

  return(
    <ThemeProvider theme={Theme}>
    <>
      <GlobalStyles />
      <Router isLoggedIn={isLoggedIn} />
    </>
    </ThemeProvider>
)
};