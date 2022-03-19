import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { v4 as uuidv4 } from "uuid";

import CourseCard from "../course/course-card/CourseCard";

import classes from "./Dashboard.module.css";

export default function Dashboard() {
   const courses = useSelector((state: RootState) => state.user.courses);
   return (
      <div className={classes.dashboard}>
         <div className={classes.header}>courses</div>
         {courses.map((course) => (
            <CourseCard
               key={uuidv4()}
               course_title={course.course_title}
               course_description={course.course_description}
               course_id={course.course_id}
            />
         ))}
      </div>
   );
}
