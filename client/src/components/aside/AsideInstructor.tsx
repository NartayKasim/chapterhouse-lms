import plus from "../../assets/icons/plus.png";

import classes from "./Aside.module.css";

interface AsideInstructorProps {
   toggleModal: () => void;
}

export default function AsideInstructor({ toggleModal }: AsideInstructorProps) {
   return (
      <div className={classes.button} onClick={() => toggleModal()}>
         <img className={classes.icon} src={plus} alt="" />

         <span>Create New Course</span>
      </div>
   );
}
