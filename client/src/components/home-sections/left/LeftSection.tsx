import HomePageButton from "../../common/buttons/home-page-buttons/HomePageButton";

import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toggleDemo } from "../../../services/demoSlice";

import classes from "./LeftSection.module.css";
import { useEffect } from "react";

export interface SectionProps {
   graphic: string;
   header: string;
   content: string[];
}

export default function LeftSection({
   graphic,
   header,
   content,
}: SectionProps) {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onSeeDemoClick = () => {
      dispatch(toggleDemo("trainer"));
      navigate("/courses/?course_id=12");
   };

   return (
      <section className={classes.leftSection}>
         <div className={classes.left}>
            <img src={graphic} alt="" className={classes.graphic} />
         </div>
         <div className={classes.right}>
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
      </section>
   );
}
