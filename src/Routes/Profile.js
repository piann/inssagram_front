import React from "react";
import {withRouter} from "react-router-dom";
//import styled from "styled-components";
import {gql} from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";

const GET_USER = gql`
    query getUser($userName: String!){
        getUser(userName:$userName){
            id
            avatar
            userName
            fullName
            isFollowing
            isSelf
            bio
            posts{
                id
                files{
                    url
                }
                likeCount
                commentCount
            }
            postsCount
            followingsCount
            followersCount
        }
    }

`;

export default withRouter(({match:{params:{userName}}}) => {
    const {data, loading} = useQuery(GET_USER, {variables:{userName}});
    if(loading){
        return <Loader/>;
    }
    console.log(data);
    return "profile"
})