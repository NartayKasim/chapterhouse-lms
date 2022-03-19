import classes from "./HeroButton.module.css";

interface HeroButtonProps {
   content: string;
   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function HeroButton({ content, onClick }: HeroButtonProps) {
   return (
      <button className={classes.heroButton} onClick={onClick}>
         {content}
      </button>
   );
}
