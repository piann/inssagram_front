import {gql} from "apollo-boost";

export const LOG_IN = gql`
 mutation requestSecret($email: String!){
     requestSecret(email:$email)
 }
`;

export const CREATE_ACCOUNT = gql`
    mutation createAccount(
     $userName:String!
     $email:String!
     $firstName:String
     $lastName:String
     $bio:String
    ){
     createAccount(
     userName:$userName
     email:$email
     firstName:$firstName
     lastName:$lastName
     bio:$bio
    )
 }
`

 export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
