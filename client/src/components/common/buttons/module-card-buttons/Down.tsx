import classes from "./ModuleCardButtons.module.css";

interface DownProps {
   onClick: () => void;
}

export default function Down({ onClick }: DownProps) {
   return (
      <div className={classes.moveButton} onClick={onClick}>
         <span>Move Module Down</span>
      </div>
   );
}
