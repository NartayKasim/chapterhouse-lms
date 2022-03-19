import ModulePage from "../../../pages/module/ModulePage";
import LocalNavigation from "../../local-navigation/LocalNavigation";
import CourseDisplay from "../course-display/CourseDisplay";
import Aside from "../../aside/Aside";
import { Module } from "../../../services/modulesSlice";

interface AuthorLayoutProps {
   course_id: number;
   module_id?: number;
   modules: Module[];
}

export default function StudentLayout({
   course_id,
   module_id,
   modules,
}: AuthorLayoutProps) {
   return (
      <div className="page">
         <div className="page__top">
            <LocalNavigation isAuthor={false} />
         </div>
         <div className="page__bottom--student">
            <div className="hide-when-mobile">
               <Aside course_id={course_id} isAuthor={false} />
            </div>
            {!module_id ? (
               <>
                  {modules.length > 0 ? (
                     <CourseDisplay
                        authorView={false}
                        modules={modules}
                        course_id={course_id}
                     />
                  ) : (
                     <h5>THIS COURSE IS CURRENTLY UNDER DEVELOPMENT</h5>
                  )}
               </>
            ) : (
               <ModulePage />
            )}
         </div>
      </div>
   );
}
