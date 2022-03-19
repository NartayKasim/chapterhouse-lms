import HomePageButton from "../../common/buttons/home-page-buttons/HomePageButton";

import { SectionProps } from "../left/LeftSection";
import { v4 as uuidv4 } from "uuid";
import { toggleDemo } from "../../../services/demoSlice";
import { useDispatch } from "react-redux";

import classes from "./RightSection.module.css";
import { useNavigate } from "react-router";

export default function RightSection({
   graphic,
   header,
   content,
}: SectionProps) {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onSeeDemoClick = () => {
      dispatch(toggleDemo("trainer"));
      navigate("/courses/?course_id=17");
   };

   return (
      <section className={classes.rightSection}>
         <div className={classes.left}>
            <div className={classes.header}>{header}</div>
            {content.map((str) => (
               <div className={classes.contentRow} key={uuidv4()}>
                  <div>&#8226;</div>
                  {str}
               </div>
            ))}
            <div className={classes.buttons}>
               <HomePageButton content="See Demo" onClick={onSeeDemoClick} />
            </div>
         </div>
         <div className={classes.right}>
            <img src={graphic} alt="" className={classes.graphic} />
         </div>
      </section>
   );
}
