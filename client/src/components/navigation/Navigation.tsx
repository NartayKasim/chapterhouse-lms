import NavigationButton from "../common/buttons/navigation-buttons/NavigationButton";

import { useNavigate } from "react-router";

import home from "../../assets/icons/home.png";
import signIn from "../../assets/icons/signIn.png";
import signOff from "../../assets/icons/signOff.png";
import register from "../../assets/icons/register.png";

import classes from "./Navigation.module.css";

interface NavigationProps {
   isLoggedIn: boolean;
   location: string;
}

export default function Navigation({ isLoggedIn, location }: NavigationProps) {
   const navigate = useNavigate();

   return (
      <nav>
         <div className={classes.contentWrapper}>
            <div className={classes.left} onClick={() => navigate("/")}>
               chapterhouse
            </div>
            <div className={classes.right}>
               {isLoggedIn ? (
                  <NavigationButton
                     content="home"
                     icon={home}
                     navigateTarget="/dashboard"
                     isCurrentLocation={location === "/dashboard"}
                  />
               ) : (
                  <NavigationButton
                     content="home"
                     icon={home}
                     navigateTarget="/"
                     isCurrentLocation={location === "/"}
                  />
               )}

               {!isLoggedIn && (
                  <NavigationButton
                     content="sign in"
                     icon={signIn}
                     navigateTarget="/signin"
                     isCurrentLocation={location === "/signin"}
                  />
               )}

               {isLoggedIn && (
                  <NavigationButton
                     content="sign off"
                     icon={signOff}
                     navigateTarget="/"
                  />
               )}

               {!isLoggedIn && (
                  <NavigationButton
                     content="sign up"
                     icon={register}
                     navigateTarget="/signup"
                     isCurrentLocation={location === "/signup"}
                  />
               )}
            </div>
         </div>
      </nav>
   );
}
