import React, { useState } from 'react';
import { FileUploader } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Image from 'next/image';
import FileUpload from '@/components/widgets/FileUpload';
import upload from '../../../public/upload.png';
import uploadOrange from '../../../public/upload_orange.png';
import uploadGreen from '../../../public/upload_green.png';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

export default function StatementTranscript() {
  const [personalStatement, setPersonalStatement] = useState(null);
  const [headShot, setHeadShot] = useState(null);
  const [transcript, setTranscript] = useState(null);

  const handlePersonalStatement = personalStatement => {
    setPersonalStatement(personalStatement);
    console.log(file.name);
  };

  async function uploadFileAndStoreURL(file) {
    console.log(file.name);
  }

  return (
    <>
      <div className='mx-auto'>
        <div className='text-[#812633] max-w-[800px] mt-[70px] text-5xl w-full h-auto mx-auto flex text-center flex-col justify-center font-bold p-2'>
          Required Digital Documents
        </div>

        <p className='text-3xl font-bold text-ulm_maroon text-center mt-14'>
          Personal Statement
        </p>
        <div className=' font-bold p-2 mx-16 mt-5 md:text-xl justify-center '>
          The personal statement should be approximately one page in length,
          single spaced. The personal statement you included in your
          AMCAS/AADSAS application is preferred. Please note that this is an
          important document and should be carefully and thoughtfully prepared.
          If you have questions about how to prepare a personal statement,
          please contact
          <Link
            href='https://webservices.ulm.edu/facultyactivities/profile/awiedemeier'
            target='_blank'
          >
            <span className=' text-ulm_red hover:text-sky-700'>
              &nbsp;Dr. Allison Wiedemeier&nbsp;
            </span>
          </Link>
          or
          <Link
            href='https://webservices.ulm.edu/facultyactivities/profile/overturf'
            target='_blank'
          >
            {' '}
            <span className='text-ulm_red hover:text-sky-700'>
              &nbsp;Dr. Matt Overturf
            </span>
          </Link>
          .
        </div>
        <div className='flex w-full justify-center mt-20'>
          <div className='bg-white shadow-xl shadow-black items-center grid grid-rows-3 px-4 border hover:shadow-[#7092BE] border-black rounded-xl font-semibold text-sm text-black hover:text-[#7092BE] tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition'>
            <div className='text-center p-1 text-2xl font-bold'>
              Personal Statement
            </div>
            <div>
              <Image
                className='mx-auto mt-10'
                src={upload}
                alt=''
                width={100}
                height={100}
              />
            </div>
            <p className='text-black'>
              <FileUpload />
            </p>
          </div>
        </div>
      </div>
      <p className='text-4xl font-bold text-ulm_maroon text-center mt-20'>
        Unofficial Transcript & Headshot
      </p>
      <p className='font-bold p-2 mx-16 mt-5 md:text-xl text-center'>
        Also provide a copy of your unofficial transcript alongside a profile
        photo.
      </p>
      {/*Upload Cards*/}
      <div className='mx-auto flex justify-center column-3 max-w-[1240px]'>
        <div className='flex flex-wrap w-full justify-center mt-20'>
          <div className='bg-white shadow-xl shadow-black items-center grid grid-rows-3 px-4 border hover:shadow-[#7092BE] border-black rounded-xl font-semibold text-sm text-black hover:text-[#7092BE] tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition'>
            <div className='text-center p-1 text-2xl font-bold'>
              Unofficial Transcript
            </div>
            <div>
              <Image
                className='mx-auto mt-10'
                src={uploadOrange}
                alt=''
                width={100}
                height={100}
              />
            </div>
            <p className='text-black'>
              <FileUpload />
            </p>
          </div>
        </div>

        <div className='flex w-full justify-center mt-20'>
          <div className='bg-white shadow-xl shadow-black hover:shadow-[#7092BE] items-center grid grid-rows-3 px-4 border border-black rounded-xl font-semibold text-sm text-black hover:text-[#7092BE] tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition'>
            <div className='text-center p-1 text-2xl font-bold'>Headshot</div>
            <div>
              <Image
                className='mx-auto mt-10'
                src={uploadGreen}
                alt=''
                width={100}
                height={100}
              />
            </div>
            <p className='text-black'>
              <FileUpload />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
