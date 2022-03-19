import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { addModuleDescription } from "../../../services/modulesSlice";
import { getModules } from "../../../services/modulesSlice";

import CourseButton from "../../common/buttons/course-buttons/CourseButton";

import classes from "./ModuleDescription.module.css";

interface CourseTitleProps {
   module_description: string;
   authorView: boolean;
   module_id: number;
   course_id: number;
}

export default function ModuleDescription({
   module_description,
   authorView,
   module_id,
   course_id,
}: CourseTitleProps) {
   const [displayState, setDisplayState] = useState(false);
   const [moduleDescription, setModuleDescription] =
      useState(module_description);
   const [errorState, setErrorState] = useState("");

   const user_id = useSelector((state: RootState) => state.user.user_id);
   const dispatch = useDispatch();

   const onAddDescriptionClick = async () => {
      setErrorState("");
      if (
         moduleDescription.length > 0 &&
         !moduleDescription.includes("Edit Description") &&
         user_id
      ) {
         await dispatch(
            addModuleDescription({
               module_id,
               module_description: moduleDescription,
               user_id,
            })
         );
         setDisplayState(false);
         await dispatch(getModules(course_id));
      } else {
         setDisplayState(false);
         setErrorState(
            "Course descriptions must be at least one character long."
         );
      }
   };

   useEffect(() => {
      if (errorState.length > 0) {
         setTimeout(() => setErrorState(""), 3000);
      }
   }, [errorState]);

   return (
      <div className={classes.courseDescription}>
         <div className={classes.courseDescriptionHeader}>
            Module Description
         </div>
         {!displayState && (
            <div className={classes.descriptionContent}>
               {module_description &&
                  module_description.length > 0 &&
                  module_description}
               {authorView &&
                  (!module_description || module_description.length === 0) && (
                     <span>
                        There is no description currently set for this module.
                        To set a description for this module, click on 'Edit
                        Description'"
                     </span>
                  )}
            </div>
         )}
         {displayState && (
            <textarea
               className={classes.textArea}
               onChange={(e) => setModuleDescription(e.target.value)}
               placeholder={"Course description"}
               value={
                  moduleDescription.includes("Edit Description")
                     ? ""
                     : moduleDescription
               }
            />
         )}
         {authorView && (
            <div className={classes.courseDescriptionControls}>
               {!displayState && (
                  <CourseButton
                     content={"Edit Description"}
                     onClick={() => setDisplayState(true)}
                  />
               )}
               {displayState && (
                  <CourseButton
                     content={"Cancel"}
                     onClick={() => setDisplayState(false)}
                  />
               )}
               {displayState && (
                  <CourseButton
                     content={"Submit"}
                     onClick={onAddDescriptionClick}
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
