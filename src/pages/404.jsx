import React from 'react'
import { Player } from "@lottiefiles/react-lottie-player";

const NotFoundPage = () => {
  return (
    <div className='flex  justify-center pt-16'>
    <Player
            src="https://assets1.lottiefiles.com/packages/lf20_kcsr6fcp.json"
            className="Student"
            loop
            autoplay
          />
    </div>
  )
}

export default NotFoundPage
