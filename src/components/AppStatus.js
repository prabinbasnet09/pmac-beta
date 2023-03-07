import { useState, useEffect, useContext,} from "react";
import { CheckCircleIcon} from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ActiveUser } from "@/pages/_app";

const Steps = () => {

  const activeUser = useContext(ActiveUser);

  console.log(activeUser)

  const [steps, setSteps] = useState([]);
  const [openStep, setOpenStep] = useState(null);

  const toggleStepState = (index) => {
    const newState = [...steps];
    const numStates = 3;
    newState[index].state = (newState[index].state + 1) % numStates;
    setSteps(newState);
  };

  const toggleOpenStep = (index) => {
    setOpenStep(openStep === index ? null : index);
  };

  useEffect(() => {
    setSteps(
      [
        {label: "Application Release Form", state: 2},
        {label: "Unofficial Transcript", state: activeUser.transcript ? 2 : 0},
        {label: "Application Information Form", state: 1},
        {label: "Faculty Recommendation", state: activeUser.fileURL ? activeUser.fileURL.length === 2 ? 2 : 1 : 0},
        {label: "Schedule", state: 1},
        {label: "Personal Statement", state: activeUser.personalStatement ? 2 : 0},
        {label: "Headshot", state: activeUser.profilePicture ? 2 : 0},
        {label: "AMCAS Form", state: activeUser.amcas ? 2 : 0},
      ]
    )}, [activeUser])
    
  return (
    <ul className="space-y-4 bg-[rgb(245,245,245)]  px-4 py-5 sm:p-6">
      {steps.sort((a, b) => a.state - b.state).map((step, index) => (

        <li key={String(step.label)} className = "bg-[rgb(255,255,255)] p-4 hover:bg-[rgb(230,230,230)] shadow-xl">
          <div className="flex justify-between items-center">
            <button
              onClick={() => toggleOpenStep(index)}
              className="mt-2 flex"
            >
              <ChevronDownIcon
                className={`w-8 h-8 ${
                  openStep === index ? "transform rotate-180" : ""
                }`}
              />
            </button> 
          
            <h3 className="justify-left text-lg font-medium">{step.label}</h3>
            {step.state === 1 && (
              <div className="flex items-center">
                <p className='text-lg mr-1'>Incomplete</p>
                <ExclamationTriangleIcon className="w-6 h-6 fill-yellow-600" />
              </div>
            )}
            {step.state === 2 && (
              <div className="flex items-center">
                <p className='font-bold text-lg'>Complete</p>
                <CheckCircleIcon className="w-6 h-6 ml-1 fill-green" />
              </div>
            )}
            {step.state === 0 && (
              <div className="flex items-center">
                <p className='text-lg'>Not Started</p>
              </div>
            )}
          </div>
          <div
            className={`${
              openStep === index ? "block" : "hidden"} mt-4`}>
              <p>Dropdown content goes here.</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Steps;