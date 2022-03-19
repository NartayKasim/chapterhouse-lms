import classes from "./ModuleCardButtons.module.css";

interface UpProps {
   onClick: () => void;
}

export default function Up({ onClick }: UpProps) {
   return (
      <div className={classes.moveButton} onClick={onClick}>
         <span>Move Module Up</span>
      </div>
   );
}
