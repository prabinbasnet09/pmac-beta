import { useState, useEffect, useContext } from "react";
import Checklist from "@/components/widgets/Checklist";
import { ActiveUser } from "@/pages/_app";
import Header from "@/components/Header";

export default function Dashboard() {
  const activeUser = useContext(ActiveUser);
  return (
      <div className="flex items-center justify-center">
        <div className="w-3/4 px-2 sm:px-0">
          <div className={`${"nav-body"}`}>
            {/* Display all the checklist */}
            {activeUser.group[0] === "Student" ? (
              <Checklist activeUser={activeUser} />
            ) : null}
          </div>
        </div>
      </div>
  );
}
