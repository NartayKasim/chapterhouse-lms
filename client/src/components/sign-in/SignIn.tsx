import DefaultInput from "../../components/common/inputs/default/DefaultInput";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { acquireUser } from "../../services/userSlice";

import logoIcon from "../../assets/logoIcon.svg";

import classes from "./SignIn.module.css";

export default function SignIn() {
   const [email, setEmail] = useState("al@whitehouse.gov");
   const [password, setPassword] = useState("nartay");
   const [errorState, setErrorState] = useState("");

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onSignInClick = async () => {
      if (email.length === 0 || password.length === 0) {
         return setErrorState("Please enter an email and password.");
      }
      try {
         const response = await axios.post("/api/user/login", {
            email,
            password,
         });
         dispatch(
            acquireUser({
               user_id: response.data.user_id,
               courses: response.data.courses || [],
            })
         );
         navigate("/dashboard");
      } catch (e) {
         const error = e as AxiosError;
         setErrorState(error.response?.data);
      }
   };

   return (
      <div className={classes.signIn}>
         <div className={classes.header}>
            <img src={logoIcon} className={classes.logoIcon} alt="" />
            chapterhouse
         </div>
         <div className={classes.body}>
            <div className={classes.demo}>Demo Account Info:</div>
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

            <div className={classes.footerError}>
               {errorState.length > 0 && errorState}
            </div>
            <div className={classes.footerButtons}>
               <button className={classes.button} onClick={onSignInClick}>
                  Sign In
               </button>
            </div>
         </div>
      </div>
   );
}
