import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCourseTitle } from "../../../services/userSlice";
import { getModules } from "../../../services/modulesSlice";
import { RootState } from "../../../app/store";

import CourseButton from "../../common/buttons/course-buttons/CourseButton";

import classes from "./CourseTitle.module.css";

interface CourseTitleProps {
   course_title: string;
   authorView: boolean;
   course_id: number;
}

export default function CourseTitle({
   course_title,
   authorView,
   course_id,
}: CourseTitleProps) {
   const [displayState, setDisplayState] = useState(false);
   const [courseTitle, setCourseTitle] = useState(course_title || "");
   const [errorState, setErrorState] = useState("");

   const user_id = useSelector((state: RootState) => state.user.user_id);
   const dispatch = useDispatch();

   const onEditTitleSubmit = async () => {
      setErrorState("");
      if (courseTitle.length > 0 && user_id !== null) {
         await dispatch(
            editCourseTitle({ course_id, course_title: courseTitle, user_id })
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
            <div className={classes.title}>{course_title}</div>
         ) : (
            <div className={classes.inputWrapper}>
               <input
                  value={courseTitle || ""}
                  onChange={(e) => setCourseTitle(e.target.value)}
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
                     content={"Edit Course Title"}
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
