import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Input from "./Input";
import userInput from "../Hooks/useInput";
import {HeartEmpty, User, Compass} from "./Icons";

const Header = styled.header`
    ${props => props.theme.whiteBox}
    width: 100%;
    border: 0;
    margin-bottom: 40px;
    border-radius: 0px;
    padding: 15px 5px;
    background-color:white;
`;

const HeaderWrapper = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    max-width: ${props => props.theme.maxWidth};
    
`

const HeaderColumn = styled.div`
    margin-left : 10px;
    &:nth-child(2) {
    justify-self: center;
    
    }


`
// eslint-disable-next-line 
const SearchInput = styled(Input)`
    background-color : ${props => props.theme.bgColor};
    
    padding: 0px;
    height:30px;
    text-align: center;
    font-size:14px;
    border-radius:3px;
    &::placeholder{
        opacity:0.75;
        font-weight:200;
    }
    
    

`

const HeaderLink = styled(Link)`
  margin-right:8px;
  &:not(:last-child){
      margin-right:min(15px,5vw);
  }
`


export default () => {

    const search = userInput("");
    return(
        <Header>
            <HeaderWrapper>
                <HeaderColumn>
                <Link to="/">
                    <img src="https://www.showcasecinemas.co.uk/images/insider-logo.svg" width="55" height="55" alt=""/>
                </Link>
                </HeaderColumn>
                <HeaderColumn>
                    <form>
                        <SearchInput {...search} placeholder="search" maxLength="12"/>
                    </form>
                </HeaderColumn>
                <HeaderColumn>
                    <HeaderLink to="/notifications">
                        <Compass />
                        
                    </HeaderLink>
                    <HeaderLink to="/notifications">
                        <HeartEmpty />
                        
                    </HeaderLink>
                    <HeaderLink to="/notifications">
                        <User />
                        
                    </HeaderLink>
                </HeaderColumn>
            
            </HeaderWrapper>
        </Header>
    )
}