import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import classes from "./FAQ.module.css";

export default function Question({
   header,
   content,
}: {
   header: string;
   content: string;
}) {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <>
         <motion.header
            className={classes.section}
            initial={false}
            animate={{
               backgroundColor: isOpen
                  ? "rgba(255, 123, 0, 0.37)"
                  : "var(--cultured)",
            }}
            onClick={() => setIsOpen(!isOpen)}
         >
            {header}
         </motion.header>

         <AnimatePresence initial={false}>
            {isOpen && (
               <motion.section
                  className={classes.content}
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                     open: { opacity: 1, height: "auto" },
                     collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{
                     duration: 0.2,
                  }}
               >
                  {content}
               </motion.section>
            )}
         </AnimatePresence>
      </>
   );
}
