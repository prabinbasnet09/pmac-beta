import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ActiveUser } from "@/pages/_app";
import { useContext } from "react";

export default function TabBar({tabList}){

    const [tabs, setTabs] = useState(tabList);


    const router = useRouter();
    return (
        <div className="flex items-center justify-center">
         
            <nav className="w-3/4 pt-16 pb-2 py- sm:px-0">
                <ul className="flex justify-evenly space-x-1 rounded-xl bg-bogold p-4">
                    {tabs && 
                    tabs.map((tab, index) => (
                        <li key={index}>
                            <Link href={tab.path}  className={`${"nav-link"} ${
                router.pathname === `${tab.path}` ? 'bg-white shadow' : 
                'text-white hover:bg-white hover:text-gold ;'
              }`} >
                       {tab.name}
                    </Link>
                    </li>
                    ))}
                </ul>
            </nav>
            </div>
    ) 
}