import React from "react";
// import ulm from '../../public/ulm_logo.png';
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <Image
        className="w-full mx-auto"
        src="/ulm_banner.jpg"
        alt=""
        width={1980}
        height={1024}
        
      />
      <div className="text-[#3B0000] border-t-2">
        <div className="max-w-[800px] mt-[70px] md:text-6xl w-full h-auto mx-auto flex text-center flex-col justify-center">
          <p className="text-[#812633] font-bold p-2">Welcome to</p>
          <h1 className="md:text-7xl sm:text-6xl text=4xl font-bold md:py-6">
            The Pre-Medical Advisory Committee
          </h1>
          <div className="flex justify-center items-center">
            <span className="md:text-3xl text-[#812633] sm:text-2xl text-xl font-bold py-4">
              <span>Application Preparation for</span>{" "}
              <TypeAnimation
                sequence={["Pre-Medical", 2000, "Pre-Dental", 2000]}
                repeat={Infinity}
                speed={20}
              />
            </span>
          </div>
          <p className="md:text-2xl text-xl font-bold text-black]">
            Prepare for success and nail your application with our guidance.
          </p>
          <p>
            
            <button className="bg-ulm_red w-[200px] rounded-md text-lg my-6 mx-auto font-bold px-2 text-white shadow-lg">
            <Link href="/dashboard">Get Started</Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
