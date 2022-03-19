import { createCourse } from "../../services/userSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useState } from "react";

import classes from "./Welcome.module.css";

const welcomeWrapper = {
   initial: { opacity: 1 },
   animate: { opacity: 1 },
   exit: { opacity: 0, transition: { duration: 0.5 } },
};

const row1 = {
   initial: {
      width: 0,
      opacity: 0,
   },
   animate: {
      width: "auto",
      opacity: 1,
      transition: { duration: 0.5, ease: "easeIn" },
   },
};

const row2 = {
   initial: {
      display: "none",
      height: 0,
      opacity: 0,
      y: 0,
   },
   animate: {
      display: "flex",
      height: "auto",
      opacity: 1,
      transition: {
         duration: 0.35,
         ease: "easeIn",
         delay: 1,
      },
   },
};

const splash = {
   initial: {
      y: 0,
   },
   animate: {
      y: "-80px",
      transition: { duration: 0.5, delay: 1 },
   },
};

const newCourse = {
   initial: { opacity: 0 },
   animate: { opacity: 1, transition: { duration: 0.5, delay: 2.2 } },
};

export default function Welcome() {
   const [courseName, setCourseName] = useState("");

   const dispatch = useDispatch();

   const onCreateCourseClick = async () => {
      if (courseName.length > 0) {
         await dispatch(createCourse(courseName));
      }
   };

   return (
      <motion.div
         variants={welcomeWrapper}
         initial="initial"
         animate="animate"
         exit="exit"
         className={classes.welcomeWrapper}
      >
         <div className={classes.welcome}>
            <motion.div
               variants={splash}
               initial="initial"
               animate="animate"
               className={classes.splash}
            >
               <motion.div
                  variants={row1}
                  initial="initial"
                  animate="animate"
                  className={classes.row1}
               >
                  Welcome,
               </motion.div>
               <motion.div
                  variants={row2}
                  initial="initial"
                  animate="animate"
                  className={classes.row2}
               >
                  Let's get started on your <div>first course</div>
               </motion.div>
            </motion.div>
            <motion.div
               variants={newCourse}
               initial="initial"
               animate="animate"
               className={classes.newCourse}
            >
               <input
                  className={classes.courseInput}
                  value={courseName}
                  type="text"
                  placeholder="Enter your new course's title here."
                  onChange={(e) => setCourseName(e.target.value)}
               />
               <button
                  className={classes.createButton}
                  onClick={onCreateCourseClick}
               >
                  Create Course
               </button>
            </motion.div>
         </div>
      </motion.div>
   );
}
