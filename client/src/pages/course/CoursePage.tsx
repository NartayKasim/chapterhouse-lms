import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { clearModules, getModules } from "../../services/modulesSlice";
import { useEffect } from "react";

import AuthorLayout from "../../components/course/layouts/AuthorLayout";
import StudentLayout from "../../components/course/layouts/StudentLayout";

export default function CoursePage() {
   // ACQUIRE course_id AND/OR module_id FROM URL PARAMS:
   const parsedCourseID = useLocation().search.match(/course_id=([^&]*)/) || [];
   const parsedModuleID = useLocation().search.match(/module_id=([^&]*)/) || [];
   const course_id = parseInt(parsedCourseID[1]);
   const module_id = parseInt(parsedModuleID[1]);

   // ASSERT IF USER IS AUTHOR OF COURSE:
   const course = useSelector((state: RootState) =>
      state.user.courses.filter((course) => course.course_id === course_id)
   )[0];

   // SUBSCRIBE TO modules SLICE TO DISTRIBUTE COURSE MODULES:
   const modules = useSelector((state: RootState) => state.modules.modules);
   const dispatch = useDispatch();

   const loadModules = async () => {
      await dispatch(getModules(course_id));
   };

   useEffect(() => {
      loadModules();
      return () => {
         dispatch(clearModules());
      };
   }, []);

   return (
      <>
         {course ? (
            <AuthorLayout
               course_id={course_id}
               module_id={module_id}
               modules={modules || []}
            />
         ) : (
            <StudentLayout
               course_id={course_id}
               module_id={module_id}
               modules={modules || []}
            />
         )}
      </>
   );
}
