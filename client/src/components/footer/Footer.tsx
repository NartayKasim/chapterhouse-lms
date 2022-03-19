import classes from "./Footer.module.css";

export default function Footer() {
   return (
      <footer>
         <div className={classes.footerInner}>
            <div className={classes.demoWarning}>
               this is a web design and development project not intended to be
               used as a true learning management platform.
            </div>
            <div className={classes.builtBy}>Built by Nartay Kasim</div>
            <div className={classes.content}>
               <div className={classes.contentLink}>Portfolio</div>
               <div className={classes.contentLink}>GitHub</div>
               <div className={classes.contentLink}>LinkedIn</div>
            </div>
         </div>
      </footer>
   );
}
