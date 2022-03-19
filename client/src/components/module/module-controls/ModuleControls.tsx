import CourseButton from "../../common/buttons/course-buttons/CourseButton";

import classes from "./ModuleControls.module.css";

interface ModuleControlsProps {
   setDisplayState: () => void;
}

export default function ModuleControls({
   setDisplayState,
}: ModuleControlsProps) {
   return (
      <div className={classes.moduleControls}>
         <CourseButton
            content={"Delete Module"}
            onClick={() => setDisplayState()}
         />
      </div>
   );
}
