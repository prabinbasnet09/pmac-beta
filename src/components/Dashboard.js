import { useState, useEffect, useContext } from "react";
import Checklist from "./widgets/Checklist";
import { ActiveUser } from "@/pages/_app";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const calendarEvents = [
  {
    id: "0",
    title: "Unavailable",
    start: "2023-04-29",
    end: "2023-04-24",
  },
  {
    id: "1",
    title: "Unavailable",
    start: "2023-04-26",
    end: "2023-04-26",
  },
  {
    id: "2",
    title: "Unavailable",
    start: "2023-04-25",
    end: "2023-04-25",
  },
];

export default function Dashboard() {
  const activeUser = useContext(ActiveUser);

  const [windowSize, setWindowSize] = useState({ width: undefined });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallScreen = windowSize.width < 700;

  const [eventDescription, setEventDescription] = useState(null);

  const handleEventMouseEnter = (eventInfo) => {
    console.log("working?");
    setEventDescription(eventInfo.event.title);
  };

  const handleEventMouseLeave = () => {
    console.log("how about this?");
    setEventDescription(null);
  };

  return activeUser ? (
    <>
      {!isSmallScreen && (
        <div className="flex items-center justify-center ">
          <div className="w-3/4 px-2 sm:px-0">
            <div className={`${"nav-body"}`}>
              <div className="flex space-x-4">
                {/* Display all the checklist */}
                {activeUser.group[0] === "Student" ? (
                  <Checklist activeUser={activeUser} />
                ) : null}
                <div className="w-8/12 bg-[rgb(245,245,245)]  px-4 py-5 sm:p-6 rounded-md">
                  <div className="h-fit">
                    {/* <div className="font-bold text-lg">
                      Calendar */}
                    <div
                      style={{
                        height: "300px",
                        width: "300px",
                        position: "relative",
                      }}
                    >
                      <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        titleFormat={{
                          month: "short",
                          day: "numeric",
                        }}
                        aspectRatio={1}
                        height="100%"
                        events={calendarEvents}
                        eventMouseEnter={handleEventMouseEnter}
                        eventMouseLeave={handleEventMouseLeave}
                      />
                      {eventDescription && (
                        <div
                          style={{
                            position: "relative",
                            backgroundPositionX: "15px",
                            backgroundPositionY: "15px",
                          }}
                        >
                          {eventDescription}
                        </div>
                      )}
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSmallScreen && (
        <div className="flex items-center justify-center">
          <div className={`w-3/4 mt-20 ml-10 bg-gray rounded-lg `}>
            <div className="flex space-x-4">
              {/* Display all the checklist */}
              {activeUser.group[0] === "Student" ? (
                <Checklist activeUser={activeUser} />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  ) : null;
}
