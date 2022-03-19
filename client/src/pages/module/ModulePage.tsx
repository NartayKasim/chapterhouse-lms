import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import classes from "./ModulePage.module.css";
import ModuleDisplay from "../../components/module/module-display/ModuleDisplay";

export default function ModulePage() {
   // ACQUIRE course_id AND module_id FROM URL PARAMS:
   const parsedCourseID = useLocation().search.match(/course_id=([^&]*)/) || [];
   const parsedModuleID = useLocation().search.match(/module_id=([^&]*)/) || [];
   const course_id = parseInt(parsedCourseID[1]);
   const module_id = parseInt(parsedModuleID[1]);
   const module = useSelector((state: RootState) => {
      if (state.modules.modules) {
         const filter = state.modules.modules.filter(
            (module) => module.module_id === module_id
         );
         return filter[0];
      }
   });
   const user_id = useSelector((state: RootState) => state.user.user_id);
   let isAuthor = false;
   if (module && user_id === module.user_id) {
      isAuthor = true;
   }

   return (
      <div className={classes.modulePage}>
         {module && (
            <ModuleDisplay
               authorView={isAuthor}
               course_id={course_id}
               module_id={module_id}
               module_title={module.module_title}
               module_description={module.module_description}
               module_content={module.module_content}
            />
         )}
      </div>
   );
}
