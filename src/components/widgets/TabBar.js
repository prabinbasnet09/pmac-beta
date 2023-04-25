import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ActiveUser } from "@/pages/_app";
import { useContext } from "react";

export default function TabBar({ tabList }) {
  const [tabs, setTabs] = useState(tabList);
  
  const router = useRouter();
  const [isSidebar, setIsSidebar] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsSidebar(window.innerWidth < 740);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center">
        {isSidebar ? (
           <nav className="fixed left-0 top-1/2 transform -translate-y-1/2 h-80vh bg-ulm_maroon w-10 px-4 py-20 rounded-r-3xl">
           <ul className="space-y-20 flex flex-col justify-center items-center">
             {tabs &&
               tabs.map((tab, index) => (
                 <li
                   key={index}
                   className="transform rotate-90 origin-center"
                 >
                   <Link
                     href={tab.path}
                     className={`${
                       router.pathname === `${tab.path}`
                         ? "text-gold font-bold"
                         : "text-white font-bold hover:text-white"
                     } whitespace-nowrap`}
                   >
                     {tab.name}
                   </Link>
                 </li>
               ))}
           </ul>
         </nav>
         
        ) : (
          <nav className="w-3/4 pt-16 pb-2 py-sm:px-0">
            <ul className="flex justify-evenly space-x-1 rounded-xl bg-ulm_maroon p-4">
              {tabs &&
                tabs.map((tab, index) => (
                  <li key={index}>
                    <Link
                      href={tab.path}
                      className={`${"nav-link"} ${
                        router.pathname === `${tab.path}`
                          ? "bg-white shadow"
                          : "text-white hover:bg-white hover:text-black ;"
                      }`}
                    >
                      {tab.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
