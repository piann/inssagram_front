
import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter"
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
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
    })

  const onSubmit = async (e) => {
      e.preventDefault();
      if(action === "logIn"){
          if(email !== ""){
              try{

                  await requestSecretMutation();
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
      }
  }

  return (
        <AuthPresenter 
         setAction={setAction}
         action={action}
         userName={userName}
        
         firstName={firstName}
         lastName={lastName}
         email={email}
         onSubmit={onSubmit}
         /> 
  );
};