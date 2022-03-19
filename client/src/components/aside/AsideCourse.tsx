import { v4 as uuidv4 } from "uuid";
import { AsideProps } from "./Aside";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useLocation, useNavigate } from "react-router";

import classes from "./Aside.module.css";

export default function AsideCourse({ course_id }: AsideProps) {
   const modules = useSelector((state: RootState) => state.modules.modules);

   const parsedModuleID = useLocation().search.match(/module_id=([^&]*)/) || [];
   const module_id = parseInt(parsedModuleID[1]);

   const navigate = useNavigate();

   const onItemClick = (moduleID: number) => {
      navigate(
         `/courses/?course_id=${course_id}/modules/?module_id=${moduleID}`
      );
   };

   return (
      <div className={classes.tableOfContents}>
         <div className={classes.tableOfContentsHeader}>Table of Contents</div>
         <div className={classes.tableOfContentsInner}>
            {modules &&
               modules.map((module) => {
                  const currentLocation =
                     module.module_id === module_id
                        ? classes.currentLocation
                        : classes.none;
                  return (
                     <span
                        key={uuidv4()}
                        className={classes.tableOfContentsItem}
                        id={currentLocation}
                        onClick={() => onItemClick(module.module_id)}
                     >
                        {module.module_title}
                     </span>
                  );
               })}
         </div>
      </div>
   );
}
