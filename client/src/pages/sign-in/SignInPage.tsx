import SignIn from "../../components/sign-in/SignIn";

import classes from "./SignInPage.module.css";

export default function SignInPage() {
   return (
      <div className={classes.signInPage}>
         <SignIn />
      </div>
   );
}
