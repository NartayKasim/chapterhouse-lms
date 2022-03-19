import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { createCourse } from "../../services/userSlice";
import { createModule, getModules } from "../../services/modulesSlice";

import AsideInstructor from "./AsideInstructor";
import AsideAuthor from "./AsideAuthor";
import AsideCourse from "./AsideCourse";
import FAQ from "../faq/FAQ";
import Modal from "../common/modals/Modal";

import classes from "./Aside.module.css";
import { RootState } from "../../app/store";

export interface AsideProps {
   course_id?: number;
   isAuthor?: boolean;
}

export default function Aside({ course_id, isAuthor }: AsideProps) {
   const [showModal, setShowModal] = useState(false);

   const dispatch = useDispatch();
   const modules = useSelector((state: RootState) => state.modules.modules);
   const location = useLocation().pathname;
   const locationIsDashboard = location === "/dashboard";

   const onCreateCourseClick = async (courseTitle: string) => {
      if (courseTitle.length > 0) {
         await dispatch(createCourse(courseTitle));
         toggleModal();
      }
   };

   const onCreateModuleClick = async (moduleTitle: string) => {
      if (moduleTitle.length > 0) {
         if (course_id) {
            if (modules) {
               let lastInOrder;
               if (modules.length) {
                  lastInOrder = modules[modules.length - 1].module_order + 1;
               } else lastInOrder = 1;
               await dispatch(
                  createModule({
                     course_id,
                     module_title: moduleTitle,
                     module_order: lastInOrder,
                  })
               );
               await dispatch(getModules(course_id));
               return toggleModal();
            }
         }
      }
   };

   const toggleModal = () => {
      setShowModal(!showModal);
   };

   return (
      <div className={classes.aside}>
         <div className={classes.asideInner}>
            {locationIsDashboard && (
               <AsideInstructor toggleModal={toggleModal} />
            )}

            {!locationIsDashboard && isAuthor && (
               <AsideAuthor toggleModal={toggleModal} />
            )}

            {!locationIsDashboard && <AsideCourse course_id={course_id} />}

            {(locationIsDashboard || isAuthor) && (
               <div className="hide-when-desktop">
                  <FAQ />
               </div>
            )}
         </div>
         {showModal && locationIsDashboard && (
            <Modal
               prompt="enter new course title below"
               placeholder="course title"
               cancel="cancel"
               cancelFunc={toggleModal}
               confirm="create course"
               confirmFunc={onCreateCourseClick}
            />
         )}

         {showModal && !locationIsDashboard && isAuthor && (
            <Modal
               prompt="enter new module title below"
               placeholder="module title"
               cancel="cancel"
               cancelFunc={toggleModal}
               confirm="create module"
               confirmFunc={onCreateModuleClick}
            />
         )}
      </div>
   );
}
