import React from "react";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery, useMutation } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";

const GET_USER = gql`
  query getUser($userName: String!) {
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

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(({ match: { params: { userName } } }) => {
  const { data, loading } = useQuery(GET_USER, { variables: { userName } });
  const logOut = useMutation(LOG_OUT);
  return <ProfilePresenter loading={loading} logOut={logOut} data={data} />;
});