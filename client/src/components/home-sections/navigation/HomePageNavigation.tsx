import arrowRightAlt from "../../../assets/icons/arrowRightAlt.png";
import classes from "./HomePageNavigation.module.css";

interface HomePageNavigationProps {
   onClick: () => void;
}

export default function HomePageNavigation({
   onClick,
}: HomePageNavigationProps) {
   return (
      <section className={classes.navigation}>
         <div className={classes.navLink} onClick={onClick}>
            <img src={arrowRightAlt} className={classes.icon} alt="" />
            For Educators
         </div>
         <div className={classes.navLink} onClick={onClick}>
            <img src={arrowRightAlt} className={classes.icon} alt="" />
            For Professional Training
         </div>
         <div className={classes.navLink} onClick={onClick}>
            <img src={arrowRightAlt} className={classes.icon} alt="" />
            For Students
         </div>
      </section>
   );
}
