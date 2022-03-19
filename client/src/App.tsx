import { useLocation, useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { useEffect } from "react";

import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/home/HomePage";
import SignInPage from "./pages/sign-in/SignInPage";
import SignUpPage from "./pages/sign-up/SignUpPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CoursePage from "./pages/course/CoursePage";
import ModulePage from "./pages/module/ModulePage";
import Footer from "./components/footer/Footer";

import "./styles/index.css";

function App() {
   const navigate = useNavigate();
   const location = useLocation().pathname;
   const isLoggedIn =
      useSelector((state: RootState) => state.user.user_id) !== null;

   useEffect(() => {
      if (isLoggedIn && (location === "/signup" || location === "/signin")) {
         navigate("/dashboard");
      }
   }, [navigate, location, isLoggedIn]);

   return (
      <div className="App">
         <Navigation isLoggedIn={isLoggedIn} location={location} />
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/courses/?course_id=:id" element={<CoursePage />} />
            {/* <Route path="/modules" element={<ModulePage />} /> */}
            <Route
               path="/courses/?course_id=:id/modules/?module_id=:module_id"
               element={<ModulePage />}
            />
         </Routes>
         {location !== "/signup" && location !== "/signin" && <Footer />}
      </div>
   );
}

export default App;
