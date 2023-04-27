import { useState, useContext, useEffect, useRef } from 'react';
import { Storage } from '@aws-amplify/storage';
import { API } from '@aws-amplify/api';
import {
  changePersonalStatement,
  changeTranscript,
} from '../../graphql/mutations';
import { getUser } from '../../graphql/queries';
import { ActiveUser } from '../../pages/_app';

const FileUpload = () => {
  const activeUser = useContext(ActiveUser);
  const [selectedPersonalStatement, setSelectedPersonalStatement] =
    useState(null);
  const [selectedTranscript, setSelectedTranscript] = useState(null);
  const [updatePersonalStatement, setUpdatePersonalStatement] = useState(false);
  const [updateTranscript, setUpdateTranscript] = useState(false);
  const handleInvisiblePersonalStatement = useRef(null);
  const handleInvisibleTranscript = useRef(null);

  const handleClick = (e, fileType) => {
    e.preventDefault();
    fileType === 'personalStatement'
      ? handleInvisiblePersonalStatement.current.click()
      : handleInvisibleTranscript.current.click();
  };

  const handleFileSelect = async (e, fileType) => {
    e.preventDefault();
    const file = e.target.files[0];

    fileType === 'personalStatement'
      ? setSelectedPersonalStatement(file)
      : setSelectedTranscript(file);

    fileType === 'personalStatement'
      ? setUpdatePersonalStatement(true)
      : setUpdateTranscript(true);
  };

  const handleFileRemove = async (e, fileType) => {
    e.preventDefault();
    fileType === 'personalStatement'
      ? setSelectedPersonalStatement(null)
      : setSelectedTranscript(null);

    fileType === 'personalStatement'
      ? setUpdatePersonalStatement(false)
      : setUpdateTranscript(false);
  };

  const handleFileUpload = async (e, fileType) => {
    e.preventDefault();
    const bucketName = 'pmacbetafiles135904-dev';
    let file;
    fileType === 'personalStatement'
      ? (file = selectedPersonalStatement)
      : (file = selectedTranscript);

    const objectURL = `https://s3.amazonaws.com/${bucketName}/public/student-documents/${file.name}`;
    try {
      await Storage.put(`student-documents/${file.name}`, file, {
        contentType: file.type,
        metadata: {
          id: activeUser.id,
          owner: activeUser.username,
        },
      });
    } catch (err) {
      console.log(err);
    }

    try {
      const queryType =
        fileType === 'personalStatement'
          ? changePersonalStatement
          : changeTranscript;
      await API.graphql({
        query: queryType,
        variables: {
          input: {
            id: activeUser.id,
            [fileType]: objectURL,
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
    <label
      className='flex  cursor-pointer mt- appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75'
      tabIndex='0'
    >
      <span htmlFor='photo-dropbox' className='flex items-center space-x-2'>
        <svg className='h-6 w-6 stroke-gray-400' viewBox='0 0 256 256'>
          <path
            d='M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='24'
          ></path>
          <path
            d='M80,128a80,80,0,1,1,144,48'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='24'
          ></path>
          <polyline
            points='118.1 161.9 152 128 185.9 161.9'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='24'
          ></polyline>
          <line
            x1='152'
            y1='208'
            x2='152'
            y2='128'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='24'
          ></line>
        </svg>
        <span className='text-xs font-medium text-gray-600'>
          Drop files to Attach, or
          <span className='text-blue-600 font-bold'> browse</span>
        </span>
      </span>
      <input id='photo-dropbox' type='file' className='sr-only' />
    </label>
  );
};

export default FileUpload;

// const handleGetUser = async e => {
//   e.preventDefault();
//   try {
//     await API.graphql({
//       query: getUser,
//       variables: {
//         id: activeUser.id,
//       },
//     })
//       .then(res => {
//         console.log(res);
//         (res.data.getUser);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };
