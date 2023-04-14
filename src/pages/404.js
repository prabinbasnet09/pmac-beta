import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const NotFoundPage = () => {
  return (
    <>
      
      <div className='text-center mt-16 text-9xl text-[#8C8C8C] font-bold'>OOPS!</div>
      <div className="flex  justify-center pt-16">
        <Player
          src="https://assets1.lottiefiles.com/packages/lf20_kcsr6fcp.json"
          className="Student"
          loop
          autoplay
        />
      </div>
      <div className='text-center text-4xl font-bold text-[#8C8C8C]'>
        Page not found.
      </div>
    </>
  );
};

export default NotFoundPage;
