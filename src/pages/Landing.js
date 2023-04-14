import React from "react";
import Hero from "@/components/Hero";
import Purpose from "@/components/Purpose";
import Apply from "@/components/Apply";
import Player from "@/components/widgets/Player";

const Landing = () => {
  return (
    <>
        <div>
          <Hero />
          <Purpose />
          <Apply />
          <Player />
        </div>
        <div className="w-full mt-16 bg-[#bcbcbc] py-1 px-4 border-ulm_maroon border-t-2">
          <p className="text-center">© 2023 University of Louisiana Monroe</p>
        </div>
    </>
  );
};

export default Landing;
