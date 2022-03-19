import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../../app/store";
import {
   getModules,
   Module,
   moveModule,
   NewModule,
} from "../../../services/modulesSlice";
import Up from "../../common/buttons/module-card-buttons/Up";
import Down from "../../common/buttons/module-card-buttons/Down";

import classes from "./ModuleCard.module.css";

interface ModuleCardProps {
   course_id: number;
   module_id: number;
   module_order: number;
   module_title: string;
   module_description: string;
   authorView: boolean;
}

export default function ModuleCard({
   course_id,
   module_id,
   module_order,
   module_title,
   module_description,
   authorView,
}: ModuleCardProps) {
   const dispatch = useDispatch();
   const modules =
      useSelector((state: RootState) => state.modules.modules) || [];
   const moduleIndex =
      modules.findIndex((mod: Module) => mod.module_id === module_id) || 0;
   const currentModule = modules[moduleIndex];
   const moduleBefore = modules[moduleIndex - 1];
   const moduleAfter = modules[moduleIndex + 1];

   const navigate = useNavigate();

   const onModuleUpClick = async () => {
      const targetModule: NewModule = {
         course_id: course_id,
         module_title: module_title,
         module_id: module_id,
         module_order: moduleBefore.module_order,
      };
      const replacedModule: NewModule = {
         course_id: course_id,
         module_title: currentModule.module_title,
         module_id: moduleBefore.module_id,
         module_order: currentModule.module_order,
      };
      const moduleArr: NewModule[] = [targetModule, replacedModule];
      await dispatch(moveModule(moduleArr));
      await dispatch(getModules(course_id));
   };

   const onModuleDownClick = async () => {
      const targetModule: NewModule = {
         course_id: course_id,
         module_title: module_title,
         module_id: module_id,
         module_order: moduleAfter.module_order,
      };
      const replacedModule: NewModule = {
         course_id: course_id,
         module_title: moduleAfter.module_title,
         module_id: moduleAfter.module_id,
         module_order: currentModule.module_order,
      };
      const moduleArr: NewModule[] = [targetModule, replacedModule];
      await dispatch(moveModule(moduleArr));
      await dispatch(getModules(course_id));
   };

   const onModuleClick = () => {
      navigate(
         `/courses/?course_id=${course_id}/modules/?module_id=${module_id}`
      );
   };

   return (
      <div className={classes.moduleCard}>
         <div className={classes.moduleCardInner} onClick={onModuleClick}>
            <div className={classes.header}>{module_title}</div>
            <div className={classes.body}>{module_description}</div>
         </div>

         {authorView && (
            <div className={classes.moduleControls}>
               {moduleIndex !== 0 && <Up onClick={onModuleUpClick} />}
               {modules && moduleIndex !== modules.length - 1 && (
                  <Down onClick={onModuleDownClick} />
               )}
            </div>
         )}
      </div>
   );
}
