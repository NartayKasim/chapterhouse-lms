import Question from "./Question";

import classes from "./FAQ.module.css";

export default function FAQ() {
   return (
      <aside className={classes.faq}>
         Need some help?
         <Question
            header="New course creation"
            content={
               "To start a new course, locate the 'Create New Course' link on the left-hand side of your Dashboard."
            }
         />
         <Question
            header="New module creation"
            content={
               "From your dashboard course section, select the course within which you would like to create a new module. Then, locate 'Create New Module' on the left-hand side of the screen."
            }
         />
         <Question
            header="Publishing your course."
            content={
               "Your course is automatically published after you initialize a first module within it. You may access the course using the designated url provided to you on the dashboard"
            }
         />
      </aside>
   );
}
