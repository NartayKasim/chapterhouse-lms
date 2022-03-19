import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { addCourseDescription } from "../../../services/userSlice";

import CourseButton from "../../common/buttons/course-buttons/CourseButton";

import classes from "./CourseDescription.module.css";

interface CourseTitleProps {
   course_description: string;
   authorView: boolean;
   course_id: number;
}

const useDescriptionUtil = (authorView: boolean, description: string) => {
   // IF USER IS AUTHOR OF THIS COURSE, BUT THERE IS NO DESCRIPTION:

   if (authorView && description.length === 0) {
      return "There is no description currently set for this course. To set a description for this course, click on 'Edit Description'";
   }
   return description;
};

export default function CourseDescription({
   course_description,
   authorView,
   course_id,
}: CourseTitleProps) {
   const formatDescription = useDescriptionUtil(authorView, course_description);
   const [displayState, setDisplayState] = useState(false);
   const [courseDescription, setCourseDescription] =
      useState(formatDescription);
   const [errorState, setErrorState] = useState("");

   const user_id = useSelector((state: RootState) => state.user.user_id);
   const dispatch = useDispatch();

   const onAddDescriptionClick = async () => {
      setErrorState("");
      if (
         courseDescription.length > 0 &&
         !courseDescription.includes("Edit Description") &&
         user_id
      ) {
         await dispatch(
            addCourseDescription({
               course_id,
               course_description: courseDescription,
               user_id,
            })
         );
         setDisplayState(false);
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
            Course Description
         </div>
         {!displayState && (
            <div className={classes.descriptionContent}>
               {courseDescription}
            </div>
         )}
         {displayState && (
            <textarea
               className={classes.textArea}
               onChange={(e) => setCourseDescription(e.target.value)}
               placeholder={"Course description"}
               value={
                  courseDescription.includes("Edit Description")
                     ? ""
                     : courseDescription
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
