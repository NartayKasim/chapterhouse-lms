import classes from "./CourseButton.module.css";

interface CourseButtonProps {
   content: string;
   onClick: () => void;
}

export default function CourseButton({ content, onClick }: CourseButtonProps) {
   return (
      <button className={classes.courseButton} onClick={onClick}>
         {content}
      </button>
   );
}
