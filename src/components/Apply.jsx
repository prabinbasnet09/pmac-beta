import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';

const Apply = () => {
  return (
    <div className='w-full py-16 grid ml-14 '>
        <div className=' max-w-[1240px] mx-auto grid grid-cols-2'>
          
          
        <div className=''>
          <h1 className=' text-ulm_maroon md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
          How to apply?</h1>
          Our committee is ready and waiting to 
          conduct interviews with prospective students as part 
          of their application process. To arrange an interview, 
          simply submit the required forms and the committee will 
          be in touch to schedule a time that works for you.
          </div>
          
        <div className='w-[350px] mx-auto'>
          {/*Animated Chart*/}
          <Player
              src='https://assets3.lottiefiles.com/packages/lf20_chdxojyo.json'
              className='container'
              loop
              autoplay
          />
        </div>
      </div>
    </div>
  )
}

export default Apply