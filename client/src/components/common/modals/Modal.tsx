import { useState } from "react";

import classes from "./Modal.module.css";

interface ModalProps {
   prompt: string;
   placeholder?: string;
   cancel: string;
   cancelFunc: () => void;
   confirm: string;
   confirmFunc: (content: string) => void;
   removeInput?: boolean;
}

export default function Modal(props: ModalProps) {
   const {
      prompt,
      placeholder,
      cancel,
      cancelFunc,
      confirm,
      confirmFunc,
      removeInput,
   } = props;

   const [inputContent, setInputContent] = useState("");

   return (
      <div className={classes.modal} onClick={cancelFunc}>
         <div
            className={classes.modalInner}
            onClick={(e) => e.stopPropagation()}
         >
            <div className={classes.header}>{prompt}</div>
            {!removeInput && (
               <div className={classes.body}>
                  <input
                     className={classes.input}
                     type="text"
                     placeholder={placeholder}
                     value={inputContent}
                     onChange={(e) => setInputContent(e.target.value)}
                  />
               </div>
            )}
            <div className={classes.footer}>
               <button className={classes.button} onClick={cancelFunc}>
                  {cancel}
               </button>
               <button
                  className={classes.button}
                  onClick={() => confirmFunc(inputContent)}
               >
                  {confirm}
               </button>
            </div>
         </div>
      </div>
   );
}
