import { Module } from "../../../services/modulesSlice";

import LocalNavigation from "../../local-navigation/LocalNavigation";
import CourseDisplay from "../course-display/CourseDisplay";
import ModulePage from "../../../pages/module/ModulePage";
import Aside from "../../aside/Aside";
import FAQ from "../../faq/FAQ";

interface AuthorLayoutProps {
   course_id: number;
   module_id?: number;
   modules: Module[];
}

export default function AuthorLayout({
   course_id,
   module_id,
   modules,
}: AuthorLayoutProps) {
   return (
      <div className="page">
         <div className="page__top">
            <LocalNavigation isAuthor={true} />
         </div>
         <div className="page__bottom">
            <div className="hide-when-mobile">
               <Aside course_id={course_id} isAuthor={true} />
            </div>
            {!module_id ? (
               <CourseDisplay
                  authorView={true}
                  modules={modules}
                  course_id={course_id}
               />
            ) : (
               <ModulePage />
            )}
            <div className="hide-when-tablet">
               <FAQ />
            </div>
         </div>
      </div>
   );
}
