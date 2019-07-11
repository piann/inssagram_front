import {gql} from "apollo-boost";


export const SEARCH = gql`

query search($term:String!){
    searchPost(term:$term){
        files{
            url
        }
        id
        likeCount
        commentCount
    }
    searchUser(term:$term){
        id
        avatar
        userName
        isFollowing
        isSelf
    }
}

`;

