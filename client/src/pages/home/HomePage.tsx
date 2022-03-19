import { useRef } from "react";
import {
   teachContent,
   trainContent,
   learnContent,
} from "../../components/home-sections/section-content";

import Hero from "../../components/home-sections/hero/Hero";
import HomePageNavigation from "../../components/home-sections/navigation/HomePageNavigation";
import LeftSection from "../../components/home-sections/left/LeftSection";
import RightSection from "../../components/home-sections/right/RightSection";
import HomeFooter from "../../components/home-sections/home-footer/HomeFooter";

import teach from "../../assets/teach.png";
import train from "../../assets/train.png";
import learn from "../../assets/learn.png";
import classes from "./HomePage.module.css";

export default function HomePage() {
   const contentRef = useRef<HTMLDivElement>(null);

   const onNavigationBarClick = () => {
      if (contentRef.current) {
         return contentRef.current.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <div className={classes.homePage}>
         <div className={classes.heroWrapper}>
            <Hero />
         </div>

         <div className={classes.navigation}>
            <HomePageNavigation onClick={onNavigationBarClick} />
         </div>

         <div className={classes.contentSections} ref={contentRef}>
            <div className={classes.sectionWrapper} id={classes.lightBlue}>
               <LeftSection
                  graphic={teach}
                  header={"teach"}
                  content={teachContent}
               />
            </div>
            <div className={classes.sectionWrapper} id={classes.yellow}>
               <RightSection
                  graphic={train}
                  header={"train"}
                  content={trainContent}
               />
            </div>
            <div className={classes.sectionWrapper} id={classes.blue}>
               <LeftSection
                  graphic={learn}
                  header={"learn"}
                  content={learnContent}
               />
            </div>
         </div>

         <div className={classes.homeFooterWrapper}>
            <HomeFooter />
         </div>
      </div>
   );
}
