import React from "react";
import styled from "styled-components";
import {Link, withRouter} from "react-router-dom";
import Input from "./Input";
import userInput from "../Hooks/useInput";
import {HeartEmpty, User, Compass, Logo} from "./Icons";
import { useQuery } from "react-apollo-hooks";
import {gql} from "apollo-boost";


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
    
    
`

const HeaderColumn = styled.div`
    margin-left :10px;

    &:first-child {
    margin-right:6vw;
    }

    &:nth-child(2) {
    justify-self: center;
    
    }


`
// eslint-disable-next-line 
const SearchInput = styled(Input)`
    background-color : ${props => props.theme.bgColor};
    
    padding: 0px;
    height:30px;
    width:230px;
    text-align: center;
    font-size:14px;
    border-radius:3px;
    &::placeholder{
        opacity:0.75;
        font-weight:200;
    }
    @media only screen and (max-width: 600px)
    {
    width:100px;
    font-size:12px;
    }

    

`;

const HeaderLink = styled(Link)`
  margin-right:13px;
  &:not(:last-child){
      margin-right:min(15px,5vw);
  }
`

export const MY_NAME = gql`
  {
    getMyProfile {
          userName
    }
  }
`;

export default withRouter(props => {
    
    const search = userInput("");
    const {data} = useQuery(MY_NAME);
    console.log(data);
    const onSearchSubmit = e =>{
        e.preventDefault();
        if(search.value!==""){
            props.history.push(`/search?term=${search.value}`)
        }
    }
    return(
        <Header>
            <HeaderWrapper>
                <HeaderColumn>
                <Link to="/">
                    <Logo/>
                </Link>
                </HeaderColumn>
                <HeaderColumn>
                    <form onSubmit={onSearchSubmit}>
                        <SearchInput {...search} placeholder="search" maxLength={15}/>
                    </form>
                </HeaderColumn>
                <HeaderColumn>
                    <HeaderLink to="/explore">
                        <Compass />
                        
                    </HeaderLink>
                    <HeaderLink to="/notifications">
                        <HeartEmpty />
                        
                    </HeaderLink>
                    {data.getMyProfile ?
                    <HeaderLink to={data.getMyProfile.userName}>
                        <User />    
                    </HeaderLink> :
                    <HeaderLink to="/#">
                        <User />    
                    </HeaderLink>} 
                </HeaderColumn>
            
            </HeaderWrapper>
        </Header>
    )
});