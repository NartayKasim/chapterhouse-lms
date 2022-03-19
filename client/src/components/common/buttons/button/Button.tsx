import classes from "./Button.module.css";

interface ButtonProps {
   content: string;
   onClick: () => void;
}

export default function Button({ onClick, content }: ButtonProps) {
   return (
      <button className={classes.button} onClick={onClick}>
         {content}
      </button>
   );
}
