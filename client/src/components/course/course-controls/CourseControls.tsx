import CourseButton from "../../common/buttons/course-buttons/CourseButton";

import classes from "./ModuleControls.module.css";

interface CourseControlProps {
   setDisplayState: () => void;
}

export default function CourseControls({
   setDisplayState,
}: CourseControlProps) {
   return (
      <div className={classes.moduleControls}>
         <CourseButton
            content={"Delete Course"}
            onClick={() => setDisplayState()}
         />
      </div>
   );
}
