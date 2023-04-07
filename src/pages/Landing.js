import React from "react";
import Hero from "@/components/Hero";
import Purpose from "@/components/Purpose";
import Apply from "@/components/Apply";
import Player from "@/components/widgets/Player";
import Header from "@/components/Header";

const Landing = () => {
  return (
    <>
      <body>
        <div>
          <Header />
          <Hero />
          <Purpose />
          <Apply />
          <Player />
        </div>
      </body>
      <footer>
        <div className="w-full bg-[#bcbcbc] py-5 px-4">
          <p className="text-center">© 2023 University of Louisiana Monroe</p>
        </div>
      </footer>
    </>
  );
};

export default Landing;
