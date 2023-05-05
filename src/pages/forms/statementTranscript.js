import React, { useEffect, useState, useContext } from 'react';
import { FileUploader } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Image from 'next/image';
import FileUpload from '@/components/widgets/FileUpload';
import upload from '../../../public/upload.png';
import uploadOrange from '../../../public/upload_orange.png';
import uploadGreen from '../../../public/upload_green.png';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import { API } from 'aws-amplify';
import { updateUser } from '../../graphql/mutations';
import { ActiveUser } from '../_app';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StatementTranscript() {
  const activeUser = useContext(ActiveUser);
  const [personalStatement, setPersonalStatement] = useState(null);
  const [headShot, setHeadShot] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [amcasForm, setAmcasForm] = useState(null);

  const [personalStatementToggle, setPersonalStatementToggle] = useState(false);
  const [headShotToggle, setHeadShotToggle] = useState(false);
  const [transcriptToggle, setTranscriptToggle] = useState(false);
  const [amcasFormToggle, setAmcasFormToggle] = useState(false);

  const success = msg =>
    toast(msg, {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      style: {
        backgroundColor: '#4BB543',
      },
    });

  const error = error =>
    toast(error, {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      style: {
        backgroundColor: '#FF0000',
      },
    });

  useEffect(() => {
    activeUser &&
      setPersonalStatement(
        activeUser.personalStatement
          ? activeUser.personalStatement.substring(
              activeUser.personalStatement.lastIndexOf('/') + 1
            )
          : null
      );
    activeUser &&
      setHeadShot(
        activeUser.profilePicture
          ? activeUser.profilePicture.substring(
              activeUser.profilePicture.lastIndexOf('/') + 1
            )
          : null
      );
    activeUser &&
      setTranscript(
        activeUser.transcript
          ? activeUser.transcript.substring(
              activeUser.transcript.lastIndexOf('/') + 1
            )
          : null
      );
    activeUser &&
      setAmcasForm(
        activeUser.amcasForm
          ? activeUser.amcasForm.substring(
              activeUser.amcasForm.lastIndexOf('/') + 1
            )
          : null
      );
  }, [activeUser]);

  useEffect(() => {
    personalStatement && setPersonalStatementToggle(true);
  }, [personalStatement]);

  useEffect(() => {
    headShot && setHeadShotToggle(true);
  }, [headShot]);

  useEffect(() => {
    transcript && setTranscriptToggle(true);
  }, [transcript]);

  useEffect(() => {
    amcasForm && setAmcasFormToggle(true);
  }, [amcasForm]);

  const handlePersonalStatement = async event => {
    const bucketName = 'pmacbucket2023135904-dev';
    const path = `public/${event.key}`;

    setPersonalStatement(event.key);

    const objectURL = `https://${bucketName}.s3.amazonaws.com/${path}`;

    try {
      await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: activeUser.id,
            personalStatement: objectURL,
          },
        },
      })
        .then(res => {
          console.log(res);
          success('Personal Statement uploaded!');
        })
        .catch(err => {
          console.log(err);
          error('Error uploading Personal Statement!');
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleHeadShot = async event => {
    const bucketName = 'pmacbucket2023135904-dev';
    const path = `public/${event.key}`;

    setHeadShot(event.key);

    const objectURL = `https://${bucketName}.s3.amazonaws.com/${path}`;

    try {
      await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: activeUser.id,
            profilePicture: objectURL,
          },
        },
      })
        .then(res => {
          console.log(res);
          success('Headshot uploaded!');
        })
        .catch(err => {
          console.log(err);
          error('Error uploading Headshot!');
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleTranscript = async event => {
    const bucketName = 'pmacbucket2023135904-dev';
    const path = `public/${event.key}`;

    setTranscript(event.key);

    const objectURL = `https://${bucketName}.s3.amazonaws.com/${path}`;

    try {
      await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: activeUser.id,
            transcript: objectURL,
          },
        },
      })
        .then(res => {
          console.log(res);
          success('Transcript uploaded!');
        })
        .catch(err => {
          console.log(err);
          error('Error uploading Transcript!');
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAmcasForm = async event => {
    const bucketName = 'pmacbucket2023135904-dev';
    const path = `public/${event.key}`;

    setAmcasForm(event.key);

    const objectURL = `https://${bucketName}.s3.amazonaws.com/${path}`;

    try {
      await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: activeUser.id,
            amcasForm: objectURL,
          },
        },
      })
        .then(res => {
          console.log(res);
          success('AMCAS Form uploaded!');
        })
        .catch(err => {
          console.log(err);
          error('Error uploading AMCAS Form!');
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
          <span className='block mt-1'>
            You can also upload a copy of your{' '}
            <span className='text-red'>AMCAS Form</span>, if applicable.
          </span>
        </p>
      </div>
      <div className='flex flex-wrap justify-center md:flex-row gap-5 mt-20 ml-5 mr-5'>
        <div className='w-full md:w-1/3 px-4 mb-4'>
          <div className='bg-white overflow-hidden shadow-md shadow-[#840029] p-10 hover:shadow-[#7092BE] border border-black rounded-xl font-semibold text-sm text-black  tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition min-h-[30rem]'>
            <div className='text-center p-1 text-2xl font-bold'>
              Personal Statement
            </div>
            <div className='w-full'>
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
                        href={
                          activeUser.personalStatement
                            ? activeUser.personalStatement
                            : ''
                        }
                        target='_blank'
                        className='flex justify-center p-8'
                      >
                        <span className='ml-2 text-sm text-gray-700'>
                          {personalStatement}
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
                        '.png',
                        '.pdf',
                        '.docx',
                      ]}
                      accessLevel='public'
                      multipleFiles={false}
                      onSuccess={event => handlePersonalStatement(event)}
                      onError={error => window.alert('error uploading file')}
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
        <div className='w-full md:w-1/3 px-4 mb-4'>
          <div className='bg-white overflow-hidden shadow-md shadow-[#840029] p-10 hover:shadow-[#7092BE] border border-black rounded-xl font-semibold text-sm text-black tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition min-h-[30rem]'>
            <div className='text-center p-1 text-2xl font-bold'>
              Unofficial Transcript
            </div>
            <div className='w-full'>
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
                        href={
                          activeUser.transcript ? activeUser.transcript : ''
                        }
                        target='_blank'
                        className='flex justify-center p-8'
                      >
                        <span className='ml-2 text-sm text-gray-700'>
                          {transcript}
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
                        '.png',
                        '.pdf',
                        '.docx',
                      ]}
                      accessLevel='public'
                      onSuccess={event => handleTranscript(event)}
                      onError={error => window.alert('error uploading file')}
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
        <div className='w-full md:w-1/3 px-4 mb-4'>
          <div className='bg-white overflow-hidden shadow-md shadow-[#840029] p-10 hover:shadow-[#7092BE] border border-black rounded-xl font-semibold text-sm text-black tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition min-h-[30rem]'>
            <div className='text-center p-1 text-2xl font-bold'> Headshot</div>
            <div className='w-full'>
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
                        href={
                          activeUser.profilePicture
                            ? activeUser.profilePicture
                            : ''
                        }
                        target='_blank'
                        className='flex justify-center p-8'
                      >
                        <span className='ml-2 text-sm text-gray-700'>
                          {headShot}
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
                        '.png',
                        '.pdf',
                        '.docx',
                      ]}
                      accessLevel='public'
                      onSuccess={event => handleHeadShot(event)}
                      onError={error => window.alert('error uploading file')}
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
        <div className='w-full md:w-1/3 px-4 mb-4'>
          <div className='bg-white overflow-hidden shadow-md shadow-[#840029] p-10 hover:shadow-[#7092BE] border border-black rounded-xl font-semibold text-sm text-black tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition min-h-[30rem]'>
            <div className='text-center p-1 text-2xl font-bold'>
              {' '}
              AMCAS Form
            </div>
            <div className='w-full'>
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
                        href={activeUser.amcasForm ? activeUser.amcasForm : '#'}
                        target='_blank'
                        className='flex justify-center p-8'
                      >
                        <span className='ml-2 text-sm text-gray-700'>
                          {amcasForm}
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
                        '.png',
                        '.pdf',
                        '.docx',
                      ]}
                      accessLevel='public'
                      onSuccess={event => handleAmcasForm(event)}
                      onError={error => window.alert('error uploading file')}
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
