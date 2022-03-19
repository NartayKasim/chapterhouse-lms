import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../../../services/userSlice";

import classes from "./NavigationButton.module.css";

interface NavigationButtonProps {
   content: string;
   icon: string;
   navigateTarget: string;
   isCurrentLocation?: boolean;
}

export default function NavigationButton({
   content,
   icon,
   navigateTarget,
   isCurrentLocation,
}: NavigationButtonProps) {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const onLogOutClick = async () => {
      await dispatch(logOutUser());
      return navigate("/");
   };

   return (
      <>
         {content !== "sign off" ? (
            <span
               className={classes.link}
               onClick={() => navigate(navigateTarget)}
               id={isCurrentLocation ? classes.currentLocation : classes.alt}
            >
               <img src={icon} alt="" className={classes.icon} />
               {content}
            </span>
         ) : (
            <span className={classes.link} onClick={onLogOutClick}>
               <img src={icon} alt="" className={classes.icon} />
               {content}
            </span>
         )}
      </>
   );
}
