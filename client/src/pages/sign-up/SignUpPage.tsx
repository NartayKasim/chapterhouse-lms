import classes from "./SignUpPage.module.css";

import SignUp from "../../components/sign-up/SignUp";

export default function SignUpPage() {
   return (
      <div className={classes.signUpPage}>
         <SignUp />
      </div>
   );
}
