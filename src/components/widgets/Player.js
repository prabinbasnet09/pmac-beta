import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const player = () => {
  return (
    <div className="container w-[350px]">
      <Player loop autoplay />
    </div>
  );
};

export default player;
