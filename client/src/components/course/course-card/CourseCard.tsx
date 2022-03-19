import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import classes from "./CourseCard.module.css";

interface CourseCardProps {
   course_title: string;
   course_description: string;
   course_id: number;
}

export default function CourseCard({
   course_title,
   course_description,
   course_id,
}: CourseCardProps) {
   const [showCopy, setShowCopy] = useState(false);
   const URL = `localhost:3000/courses/?course_id=${course_id}`;

   const navigate = useNavigate();

   const onCourseClick = () => {
      navigate(`/courses/?course_id=${course_id}`);
   };

   const onCopyURLClick = () => {
      navigator.clipboard.writeText(URL);
      setShowCopy(true);
   };

   useEffect(() => {
      if (showCopy) {
         setTimeout(() => {
            setShowCopy(false);
         }, 1500);
      }
   }, [showCopy]);

   return (
      <div className={classes.courseOuter}>
         <div className={classes.course} onClick={onCourseClick}>
            <div className={classes.title}>{course_title}</div>
            <div className={classes.description}>
               <div className={classes.descriptionHeader}>
                  Course Description
               </div>
               {course_description.length > 0
                  ? course_description
                  : "There is no description currently set for this course. Click here to set description."}
            </div>
         </div>

         <div className={classes.url} onClick={onCopyURLClick}>
            {!showCopy ? (
               <>
                  <span className={classes.urlHeader}>
                     Course URL (click to copy):
                  </span>
                  <span>{URL}</span>
               </>
            ) : (
               <span className={classes.copied}>URL copied!</span>
            )}
         </div>
      </div>
   );
}
