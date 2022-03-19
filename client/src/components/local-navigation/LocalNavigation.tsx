import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../services/userSlice";
import { createModule, getModules } from "../../services/modulesSlice";
import { RootState } from "../../app/store";
import { useState } from "react";

import Modal from "../common/modals/Modal";

import course from "../../assets/icons/course.png";
import dashboard from "../../assets/icons/dashboard.png";

import classes from "./LocalNavigation.module.css";

interface LocalNavigationProps {
   isAuthor: boolean;
}

export default function LocalNavigation({ isAuthor }: LocalNavigationProps) {
   const isLoggedIn = useSelector((state: RootState) => state.user.user_id);
   const modules = useSelector((state: RootState) => state.modules.modules);

   const location = useLocation().pathname;
   const parsedCourseID = useLocation().search.match(/course_id=([^&]*)/) || [];
   const course_id = parseInt(parsedCourseID[1]);

   const locationIsDashboard = location === "/dashboard";

   const navigate = useNavigate();

   const [showModal, setShowModal] = useState(false);

   const dispatch = useDispatch();

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
      <div className={classes.localNavigation}>
         {isLoggedIn && !locationIsDashboard && (
            <div
               className={classes.button}
               onClick={() => navigate("/dashboard")}
            >
               <img className={classes.icon} src={dashboard} alt="" />

               <span>Dashboard</span>
            </div>
         )}
         {!locationIsDashboard && parsedCourseID.length !== 0 && (
            <div
               className={classes.button}
               onClick={() => navigate(`/courses/?course_id=${course_id}`)}
            >
               <img className={classes.icon} src={course} alt="" />
               <span>Course</span>
            </div>
         )}

         <div className={classes.showIfMobile}>
            {locationIsDashboard && (
               <div
                  className={classes.button}
                  onClick={() => setShowModal(true)}
               >
                  <span>Create New Course</span>
               </div>
            )}
            {!locationIsDashboard && isAuthor && (
               <div
                  className={classes.button}
                  onClick={() => setShowModal(true)}
               >
                  <span>Create New Module</span>
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
         {showModal && !locationIsDashboard && (
            <Modal
               prompt="enter new module title below"
               placeholder="module title"
               cancel="cancel"
               cancelFunc={toggleModal}
               confirm="create course"
               confirmFunc={onCreateModuleClick}
            />
         )}
      </div>
   );
}
