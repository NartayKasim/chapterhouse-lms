import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModules } from "../../../services/modulesSlice";
import { editModuleTitle } from "../../../services/modulesSlice";
import { RootState } from "../../../app/store";

import CourseButton from "../../common/buttons/course-buttons/CourseButton";

import classes from "./ModuleTitle.module.css";

interface ModuleTitleProps {
   module_id: number;
   module_title: string;
   authorView: boolean;
   course_id: number;
}

export default function ModuleTitle({
   module_id,
   module_title,
   authorView,
   course_id,
}: ModuleTitleProps) {
   const [displayState, setDisplayState] = useState(false);
   const [moduleTitle, setModuleTitle] = useState(module_title || "");
   const [errorState, setErrorState] = useState("");

   const user_id = useSelector((state: RootState) => state.user.user_id);
   const dispatch = useDispatch();

   const onEditTitleSubmit = async () => {
      setErrorState("");
      if (moduleTitle.length > 0 && user_id !== null) {
         await dispatch(
            editModuleTitle({ module_id, module_title: moduleTitle, user_id })
         );
         await dispatch(getModules(course_id));
         setDisplayState(false);
      } else {
         setDisplayState(false);
         setErrorState("Course titles must be at least one character long.");
      }
   };

   useEffect(() => {
      if (errorState.length > 0) {
         setTimeout(() => setErrorState(""), 3000);
      }
   }, [errorState]);

   return (
      <div className={classes.courseTitle}>
         {!displayState ? (
            <div className={classes.title}>{module_title}</div>
         ) : (
            <div className={classes.inputWrapper}>
               <input
                  value={moduleTitle || ""}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  placeholder="course title"
                  type="text"
                  className={classes.input}
               />
            </div>
         )}
         {authorView && (
            <div className={classes.titleControls}>
               {!displayState && (
                  <CourseButton
                     content={"Edit Module Title"}
                     onClick={() => setDisplayState(!displayState)}
                  />
               )}
               {displayState && (
                  <CourseButton
                     content={"Submit"}
                     onClick={onEditTitleSubmit}
                  />
               )}
               {displayState && (
                  <CourseButton
                     content={"Cancel"}
                     onClick={() => setDisplayState(false)}
                  />
               )}
            </div>
         )}
         {errorState.length > 0 && (
            <span className={classes.error}>{errorState}</span>
         )}
      </div>
   );
}
