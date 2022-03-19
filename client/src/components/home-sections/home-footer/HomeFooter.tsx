import { useNavigate } from "react-router";

import classes from "./HomeFooter.module.css";

export default function HomeFooter() {
   const navigate = useNavigate();
   return (
      <section className={classes.homeFooter}>
         <div className={classes.button} onClick={() => navigate("/signin")}>
            sign in
         </div>
         <div className={classes.button} onClick={() => navigate("/signup")}>
            join now
         </div>
      </section>
   );
}
