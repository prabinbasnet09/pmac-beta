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
  const [amcasForm, setAmcasForm] = useState(null);

  const [personalStatementToggle, setPersonalStatementToggle] = useState(false);
  const [headShotToggle, setHeadShotToggle] = useState(false);
  const [transcriptToggle, setTranscriptToggle] = useState(false);
  const [amcasFormToggle, setAmcasFormToggle] = useState(false);

  const handlePersonalStatement = personalStatement => {
    setPersonalStatement(personalStatement);
    console.log(file.name);
  };

  const handleFileURL = async file => {
    console.log(file.name);
    const bucketName = '';
    const path = `public/${selectedFile.name}`;

    const objectURL = `https://s3.amazonaws.com/${bucketName}/${path}`;

    try {
      await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: user.id,
            facultyRecommendation: objectURL,
          },
        },
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

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
          single spaced.{' '}
          <span className='underline text-red'>
            The personal statement you included in your AMCAS/AADSAS application
            is preferred.
          </span>{' '}
          Please note that this is an important document and should be carefully
          and thoughtfully prepared. If you have questions about how to prepare
          a personal statement, please contact
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

        <p className='text-4xl font-bold text-ulm_maroon text-center mt-20'>
          Unofficial Transcript & Headshot
        </p>
        <p className='font-bold p-2 mx-16 mt-5 md:text-xl text-center'>
          Also provide a copy of your
          <span className='text-ulm_red hover:text-sky-700'>
            {' '}
            unofficial transcript{' '}
          </span>{' '}
          alongside a
          <span className='text-ulm_red hover:text-sky-700'> headshot </span>
          profile photo.
        </p>
      </div>
      <div class='flex flex-wrap justify-center md:flex-row gap-5 mt-20 ml-5 mr-5'>
        <div class='w-full md:w-1/3 px-4 mb-4'>
          <div class='bg-white overflow-hidden shadow-md shadow-[#840029] p-10 hover:shadow-[#7092BE] border-black rounded-xl font-semibold text-sm text-black  tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition min-h-[30rem]'>
            <div className='text-center p-1 text-2xl font-bold'>
              Personal Statement
            </div>
            <div class='w-full'>
              <Image
                className='mx-auto py-5'
                src={upload}
                alt=''
                width={100}
                height={100}
              />
            </div>
            <div className='mt-5'>
              <div>
                {personalStatementToggle ? (
                  <div>
                    <div className='mt-5 bg-[#fff] border border-dashed border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer'>
                      <Link
                        href='#'
                        target='_blank'
                        className='flex justify-center p-8'
                      >
                        <span className='ml-2 text-sm text-gray-700'>
                          FileName
                        </span>
                      </Link>
                    </div>
                    <div className='flex justify-center mt-10'>
                      <button
                        className='mx-auto py-3 bg-[#008dff] rounded-lg px-10 text-lg hover:text-white'
                        onClick={e => {
                          e.preventDefault();
                          setPersonalStatementToggle(false);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <FileUploader
                      acceptedFileTypes={[
                        '.gif',
                        '.bmp',
                        '.doc',
                        '.jpeg',
                        '.jpg',
                      ]}
                      accessLevel='public'
                    />
                    {personalStatement && !personalStatementToggle ? (
                      <div className='flex justify-center mt-5'>
                        <button
                          className='mx-auto py-3 bg-[#06ff86] rounded-lg px-10 text-lg hover:text-white'
                          onClick={e => {
                            e.preventDefault();
                            setPersonalStatementToggle(prevValue => !prevValue);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div class='w-full md:w-1/3 px-4 mb-4'>
          <div class='bg-white overflow-hidden shadow-md shadow-[#840029] p-10 hover:shadow-[#7092BE] border-black rounded-xl font-semibold text-sm text-black tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition min-h-[30rem]'>
            <div className='text-center p-1 text-2xl font-bold'>
              Unofficial Transcript
            </div>
            <div class='w-full'>
              <Image
                className='mx-auto py-5'
                src={uploadOrange}
                alt=''
                width={100}
                height={100}
              />
            </div>
            <div className='mt-5'>
              <div>
                {transcriptToggle ? (
                  <div>
                    <div className='mt-5 bg-[#fff] border border-dashed border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer'>
                      <Link
                        href='#'
                        target='_blank'
                        className='flex justify-center p-8'
                      >
                        <span className='ml-2 text-sm text-gray-700'>
                          FileName
                        </span>
                      </Link>
                    </div>
                    <div className='flex justify-center mt-10'>
                      <button
                        className='mx-auto py-3 bg-[#e6781b] rounded-lg px-10 text-lg hover:text-white'
                        onClick={e => {
                          e.preventDefault();
                          setTranscriptToggle(false);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <FileUploader
                      acceptedFileTypes={[
                        '.gif',
                        '.bmp',
                        '.doc',
                        '.jpeg',
                        '.jpg',
                      ]}
                      accessLevel='public'
                    />
                    {transcript && !transcriptToggle ? (
                      <div className='flex justify-center mt-5'>
                        <button
                          className='mx-auto py-3 bg-[#06ff86] rounded-lg px-10 text-lg hover:text-white'
                          onClick={e => {
                            e.preventDefault();
                            setTranscriptToggle(prevValue => !prevValue);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div class='w-full md:w-1/3 px-4 mb-4'>
          <div class='bg-white overflow-hidden shadow-md shadow-[#840029] p-10 hover:shadow-[#7092BE] border-black rounded-xl font-semibold text-sm text-black tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition min-h-[30rem]'>
            <div className='text-center p-1 text-2xl font-bold'> Headshot</div>
            <div class='w-full'>
              <Image
                className='mx-auto py-5'
                src={uploadGreen}
                alt=''
                width={100}
                height={100}
              />
            </div>
            <div className='mt-5'>
              <div>
                {headShotToggle ? (
                  <div>
                    <div className='mt-5 bg-[#fff] border border-dashed border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer'>
                      <Link
                        href='#'
                        target='_blank'
                        className='flex justify-center p-8'
                      >
                        <span className='ml-2 text-sm text-gray-700'>
                          FileName
                        </span>
                      </Link>
                    </div>
                    <div className='flex justify-center mt-10'>
                      <button
                        className='mx-auto py-3 bg-[#06ff86] rounded-lg px-10 text-lg hover:text-white'
                        onClick={e => {
                          e.preventDefault();
                          setHeadShotToggle(false);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <FileUploader
                      acceptedFileTypes={[
                        '.gif',
                        '.bmp',
                        '.doc',
                        '.jpeg',
                        '.jpg',
                      ]}
                      accessLevel='public'
                    />
                    {headShot && !headShotToggle ? (
                      <div className='flex justify-center mt-5'>
                        <button
                          className='mx-auto py-3 bg-[#06ff86] rounded-lg px-10 text-lg hover:text-white'
                          onClick={e => {
                            e.preventDefault();
                            setHeadShotToggle(prevValue => !prevValue);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div class='w-full md:w-1/3 px-4 mb-4'>
          <div class='bg-white overflow-hidden shadow-md shadow-[#840029] p-10 hover:shadow-[#7092BE] border-black rounded-xl font-semibold text-sm text-black tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition min-h-[30rem]'>
            <div className='text-center p-1 text-2xl font-bold'>
              {' '}
              AMCAS Form
            </div>
            <div class='w-full'>
              <Image
                className='mx-auto py-5'
                src={upload}
                alt=''
                width={100}
                height={100}
              />
            </div>
            <div className='mt-5'>
              <div>
                {amcasFormToggle ? (
                  <div>
                    <div className='mt-5 bg-[#fff] border border-dashed border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer'>
                      <Link
                        href='#'
                        target='_blank'
                        className='flex justify-center p-8'
                      >
                        <span className='ml-2 text-sm text-gray-700'>
                          FileName
                        </span>
                      </Link>
                    </div>
                    <div className='flex justify-center mt-10'>
                      <button
                        className='mx-auto py-3 bg-[#008dff] rounded-lg px-10 text-lg hover:text-white'
                        onClick={e => {
                          e.preventDefault();
                          setAmcasFormToggle(false);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <FileUploader
                      acceptedFileTypes={[
                        '.gif',
                        '.bmp',
                        '.doc',
                        '.jpeg',
                        '.jpg',
                      ]}
                      accessLevel='public'
                    />
                    {amcasForm && !amcasFormToggle ? (
                      <div className='flex justify-center mt-5'>
                        <button
                          className='mx-auto py-3 bg-[#008dff] rounded-lg px-10 text-lg hover:text-white'
                          onClick={e => {
                            e.preventDefault();
                            setAmcasFormToggle(prevValue => !prevValue);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
