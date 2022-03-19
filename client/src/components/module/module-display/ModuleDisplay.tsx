import ModuleContent from "../module-content/ModuleContent";
import ModuleDescription from "../module-description/ModuleDescription";
import ModuleTitle from "../module-title/ModuleTitle";
import ModuleControls from "../module-controls/ModuleControls";
import Modal from "../../common/modals/Modal";

import classes from "./ModuleDisplay.module.css";
import { useDispatch } from "react-redux";
import { deleteModule } from "../../../services/modulesSlice";
import { useNavigate } from "react-router";
import { useState } from "react";

interface ModuleDisplayProps {
   authorView: boolean;
   course_id: number;
   module_id: number;
   module_title: string;
   module_description: string;
   module_content: string;
}

export default function ModuleDisplay({
   authorView,
   course_id,
   module_id,
   module_title,
   module_description,
   module_content,
}: ModuleDisplayProps) {
   const [displayState, setDisplayState] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onModuleDeleteClick = async () => {
      setDisplayState(false);
      await dispatch(deleteModule(module_id));
      navigate(`/courses/?course_id=${course_id}`);
   };

   const toggleModal = () => {
      setDisplayState(!displayState);
   };
   return (
      <div className={classes.moduleDisplay}>
         {authorView && <ModuleControls setDisplayState={toggleModal} />}
         <ModuleTitle
            authorView={authorView}
            module_id={module_id}
            module_title={module_title}
            course_id={course_id}
         />
         <ModuleDescription
            authorView={authorView}
            module_description={module_description}
            module_id={module_id}
            course_id={course_id}
         />
         <ModuleContent
            authorView={authorView}
            module_content={module_content}
            module_id={module_id}
            course_id={course_id}
         />
         {displayState && (
            <Modal
               prompt="Delete module?"
               cancel="cancel"
               cancelFunc={toggleModal}
               confirm="confirm delete"
               confirmFunc={onModuleDeleteClick}
               removeInput={true}
            />
         )}
      </div>
   );
}
