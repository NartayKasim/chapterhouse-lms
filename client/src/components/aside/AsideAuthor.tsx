import plus from "../../assets/icons/plus.png";

import classes from "./Aside.module.css";

interface AsideAuthorProps {
   toggleModal: () => void;
}

export default function AsideAuthor({ toggleModal }: AsideAuthorProps) {
   return (
      <div className={classes.button} onClick={() => toggleModal()}>
         <img className={classes.icon} src={plus} alt="" />
         <span>Create New Module</span>
      </div>
   );
}
