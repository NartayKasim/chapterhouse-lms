import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../app/store";
import { Module } from "../../../services/modulesSlice";
import { deleteCourse } from "../../../services/userSlice";
import { useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";

import CourseTitle from "../course-title/CourseTitle";
import CourseDescription from "../course-description/CourseDescription";
import CourseControls from "../course-controls/CourseControls";
import ModuleCard from "../../module/module-card/ModuleCard";
import Modal from "../../common/modals/Modal";

import classes from "./CourseDisplay.module.css";
import { toggleDemo } from "../../../services/demoSlice";

interface CourseDisplayProps {
   modules: Module[];
   authorView: boolean;
   course_id: number;
}

export default function CourseDisplay({
   modules,
   authorView,
   course_id,
}: CourseDisplayProps) {
   const [displayState, setDisplayState] = useState(false);

   const navigate = useNavigate();

   const dispatch = useDispatch();
   const user_id = useSelector((state: RootState) => state.user.user_id);
   const course = useSelector((state: RootState) =>
      state.user.courses.filter((course) => course.course_id === course_id)
   )[0];

   let courseTitle;
   let courseDescription;

   if (course) {
      courseTitle = course.course_title;
      courseDescription = course.course_description;
   } else {
      courseTitle = modules[0].course_title;
      courseDescription = modules[0].course_description;
   }

   const onCourseDeleteClick = async () => {
      setDisplayState(false);
      if (user_id) {
         await dispatch(deleteCourse({ course_id, user_id }));
         navigate(`/dashboard`);
      }
   };

   const toggleModal = () => {
      setDisplayState(!displayState);
   };

   useEffect(() => {
      window.scroll({ top: 0, behavior: "smooth" });
   }, []);

   return (
      <div className={classes.courseDisplay}>
         {authorView && <CourseControls setDisplayState={toggleModal} />}

         <CourseTitle
            authorView={authorView}
            course_title={courseTitle}
            course_id={course_id}
         />

         <CourseDescription
            authorView={authorView}
            course_description={courseDescription}
            course_id={course_id}
         />

         <div className={classes.courseModules}>
            <div className={classes.modulesHeader}>course modules</div>
            {modules.length === 0 && (
               <span style={{ paddingLeft: "2rem" }}>
                  There are no modules currently attached to this course. To
                  create a module, click on 'Create Module' on the left-hand
                  side of the page.
               </span>
            )}
            <div className={classes.modules}>
               {modules &&
                  modules.length > 0 &&
                  modules.map((mod) => (
                     <ModuleCard
                        {...mod}
                        authorView={authorView}
                        key={uuidv4()}
                     />
                  ))}
            </div>
         </div>
         {displayState && (
            <Modal
               prompt="Delete course?"
               cancel="cancel"
               cancelFunc={toggleModal}
               confirm="confirm delete"
               confirmFunc={onCourseDeleteClick}
               removeInput={true}
            />
         )}
      </div>
   );
}
