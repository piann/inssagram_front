
import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter"
import { LOG_IN, CREATE_ACCOUNT, LOCAL_LOG_IN, CONFIRM_SECRET } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {css} from "glamor";


export default () => {
    const toastOpt = {hideProgressBar:true, className: css({
        background: "#efeff2 !important",
        color:"#a1887f",
        fontSize:13
    })};

    const [action, setAction] = useState("logIn");
    const userName = useInput("");
    //const password = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    const secret = useInput("");
    const requestSecretMutation = useMutation(LOG_IN, {
        variables:{ email:email.value },
        update:(_, {data}) => {
            const {requestSecret} = data;
            if(!requestSecret){
                toast.error("Not Valid Email. Sign Up First!",toastOpt);
                setTimeout(()=>setAction("signUp"), 2000)
            } else {
                toast.error("Sending Email now. Check your email to get login secret",toastOpt);
            }
        } 
        }
        );
    const createAccountMutation = useMutation(CREATE_ACCOUNT, {
        variables:{
            userName:userName.value,
            firstName:firstName.value,
            lastName:lastName.value,
            email:email.value},
        update: (_, {data}) => {
            const {createAccount} = data;
            if(!createAccount){
                toast.error("Fail to create account.",toastOpt);
            } else {
                toast.error("Account created. Log in now!",toastOpt);
                setTimeout(()=>setAction("logIn"), 2000)
            
            }
        }
    });
    const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
        variables: {
          email: email.value,
          secret: secret.value
        }
      });
      const localLogInMutation = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
      e.preventDefault();
      if(action === "logIn"){
          if(email !== ""){
              try{

                const { data: { requestSecret }} = await requestSecretMutation();
                console.log(requestSecret)
                if (!requestSecret) {
                    toast.error("You dont have an account yet, create one",toastOpt);
                    setTimeout(() => setAction("signUp"), 3000);
                  } else {
                    toast.success("Check your inbox for your login secret",toastOpt);
                    setAction("confirm");
                  }
              } catch {
                  toast.error("Fail to login. Try again",toastOpt)
              }
          } else{
            toast.error("Email field is required!.",toastOpt)
          }

      } else if(action === "signUp") {
        if(userName.value !== ""&& 
           firstName.value !== ""&& 
           lastName.value !== ""&& 
           email.value !== ""){
               try{
                   await createAccountMutation();
               } catch{
                toast.error("Fail to create account. Try again",toastOpt);
               }
           } else {
             toast.error("Please fill out all field.",toastOpt);
           }
      } else if (action === "confirm") {
        if (secret.value !== "") {
          try {
            const {
              data: { confirmSecret: token }
            } = await confirmSecretMutation();
            if (token !== "" && token !== undefined) {
              localLogInMutation({ variables: { token } });
            } else {
              throw Error();
            }
          } catch {
            toast.error("Cant confirm secret,check again");
          }
        }
      }
    };
  

  return (
        <AuthPresenter 
         setAction={setAction}
         action={action}
         userName={userName}
        
         firstName={firstName}
         lastName={lastName}
         email={email}
         onSubmit={onSubmit}
         secret={secret}
         /> 
  );
};