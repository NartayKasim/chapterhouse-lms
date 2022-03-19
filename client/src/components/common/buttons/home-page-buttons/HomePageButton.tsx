import classes from "./HomePageButton.module.css";

interface HomePageButtonProps {
   content: string;
   icon?: string;
   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function HomePageButton({
   content,
   icon,
   onClick,
}: HomePageButtonProps) {
   return (
      <button className={classes.button} onClick={onClick}>
         {content}
         {icon && <img src={icon} alt="" />}
      </button>
   );
}
