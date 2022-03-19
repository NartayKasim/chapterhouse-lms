import { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { useSelector, useDispatch } from "react-redux";
import { addModuleContent } from "../../../services/modulesSlice";
import { RootState } from "../../../app/store";

import ModuleComposer from "../module-composer/ModuleComposer";
import CourseButton from "../../common/buttons/course-buttons/CourseButton";

import classes from "./ModuleContent.module.css";

interface ModuleContentProps {
   authorView: boolean;
   module_content: string;
   module_id: number;
   course_id: number;
}

export default function ModuleContent({
   authorView,
   module_content,
   module_id,
   course_id,
}: ModuleContentProps) {
   const [displayState, setDisplayState] = useState(false);
   const [moduleContent, setModuleContent] = useState("");
   const [errorState, setErrorState] = useState("");
   const dispatch = useDispatch();
   const user_id = useSelector((state: RootState) => state.user.user_id);

   const onModuleContentSave = async () => {
      if (user_id && moduleContent.length > 0) {
         await dispatch(
            addModuleContent({
               module_id,
               module_content: moduleContent,
               user_id,
            })
         );
         setDisplayState(false);
      }
      setErrorState("Please enter valid module content.");
   };

   useEffect(() => {
      setModuleContent(module_content);
      if (errorState.length > 0) {
         setTimeout(() => setErrorState(""), 3000);
      }
   }, [module_content, errorState]);

   return (
      <div className={classes.moduleContent}>
         {!displayState ? (
            <span>
               {moduleContent.length === 0
                  ? "There is no content currently set for this module."
                  : ReactHtmlParser(moduleContent)}
            </span>
         ) : (
            <ModuleComposer
               moduleContent={moduleContent}
               onChange={setModuleContent}
            />
         )}
         {authorView && (
            <div className={classes.courseDescriptionControls}>
               {!displayState && (
                  <CourseButton
                     content={"Edit Content"}
                     onClick={() => setDisplayState(!displayState)}
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
                     content={"Save"}
                     onClick={onModuleContentSave}
                  />
               )}
            </div>
         )}
      </div>
   );
}
