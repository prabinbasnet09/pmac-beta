import { useState, useEffect, useContext } from "react";
import Checklist from "@/components/Checklist";
import { ActiveUser } from "@/pages/_app";

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
          {/* calendar */}
        </div>
      </div>
    </div>
  );
}
