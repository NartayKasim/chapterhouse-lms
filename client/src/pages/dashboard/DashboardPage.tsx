import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

import LocalNavigation from "../../components/local-navigation/LocalNavigation";
import Aside from "../../components/aside/Aside";
import FAQ from "../../components/faq/FAQ";
import Welcome from "../../components/dashboard-welcome/Welcome";
import Dashboard from "../../components/dashboard/Dashboard";

import classes from "./DashboardPage.module.css";

export default function DashboardPage() {
   const courses = useSelector((state: RootState) => state.user.courses);
   return (
      <div className="page">
         <div className="page__top">
            <LocalNavigation isAuthor={true} />
         </div>
         <div className="page__bottom">
            <div className="hide-when-mobile">
               <Aside />
            </div>
            {!courses || courses.length === 0 ? <Welcome /> : <Dashboard />}

            <div className="hide-when-tablet">
               <FAQ />
            </div>
         </div>
      </div>
   );
}
