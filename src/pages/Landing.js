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
    </>
  );
};

export default Landing;
