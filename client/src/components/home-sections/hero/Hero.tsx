import { useNavigate } from "react-router";
import HeroButton from "../../common/buttons/home-page-buttons/HeroButton";

import logoIcon from "../../../assets/logoIcon.svg";

import classes from "./Hero.module.css";

export default function Hero() {
   const navigate = useNavigate();

   const onSignUpClick = () => {
      navigate("/signup");
   };

   return (
      <section className={classes.hero}>
         <div className={classes.left}>
            <div className={classes.header}>
               Your teaching journey starts here.
            </div>

            <div className={classes.subHeader}>
               Whether you're developing educational instruction or professional
               training material, Chapterhouse is the educational technology for
               you. Meet your learning management platform:
            </div>
            <div className={classes.action}>
               <HeroButton content={"Sign Up"} onClick={onSignUpClick} />
            </div>
         </div>
         <div className={classes.right}>
            <img src={logoIcon} className={classes.logoIcon} alt="" />
            <div className={classes.logoText}>chapterhouse lms</div>
         </div>
      </section>
   );
}
