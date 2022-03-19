import DefaultInput from "../common/inputs/default/DefaultInput";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { acquireUser } from "../../services/userSlice";
import { useNavigate } from "react-router";

import logoIcon from "../../assets/logoIcon.svg";

import classes from "./SignUp.module.css";

export default function SignUp() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [verifyPassword, setVerifyPassword] = useState("");
   const [errorState, setErrorState] = useState("");

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onSignUpClick = async () => {
      if (password !== verifyPassword)
         return setErrorState("Password mismatch");
      try {
         const response = await axios.post("/api/user/register", {
            email,
            password,
         });
         dispatch(acquireUser({ user_id: response.data.user_id, courses: [] }));
         navigate("/dashboard");
      } catch (e) {
         const error = e as AxiosError;
         setErrorState(error.response?.data);
      }
   };

   return (
      <div className={classes.signUp}>
         <div className={classes.header}>
            <img src={logoIcon} className={classes.logoIcon} alt="" />
            chapterhouse
         </div>
         <div className={classes.body}>
            <DefaultInput
               label={"Email Address"}
               name={"sign-up-email"}
               placeholder={"email"}
               value={email}
               type={"text"}
               onChange={setEmail}
               direction={"column"}
            />
            <DefaultInput
               label={"Password"}
               name={"password-1"}
               placeholder={"password"}
               value={password}
               type={"password"}
               onChange={setPassword}
               direction={"column"}
            />
            <DefaultInput
               label={"Repeat Password"}
               name={"password-2"}
               placeholder={"repeat password"}
               value={verifyPassword}
               type={"password"}
               onChange={setVerifyPassword}
               direction={"column"}
            />
            <div className={classes.footerError}>
               {errorState.length > 0 && errorState}
            </div>
            <div className={classes.footerButtons}>
               <button className={classes.button} onClick={onSignUpClick}>
                  Sign Up
               </button>
            </div>
         </div>
      </div>
   );
}
