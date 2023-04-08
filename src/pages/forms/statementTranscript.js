import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Storage } from "@aws-amplify/storage";
import { API } from "@aws-amplify/api";
import {
  changePersonalStatement,
  changeTranscript,
} from "@/api/gql/mutations.js";
import { getUser } from "@/api/gql/queries.js";
import { ActiveUser } from "../../pages/_app";
import Image from "next/image";
export default function StatementTranscript() {
  const activeUser = useContext(ActiveUser);
  const [student, setStudent] = useState(activeUser);
  const [selectedPersonalStatement, setSelectedPersonalStatement] =
    useState(null);
  const [selectedTranscript, setSelectedTranscript] = useState(null);
  const [updatePersonalStatement, setUpdatePersonalStatement] = useState(false);
  const [updateTranscript, setUpdateTranscript] = useState(false);
  const handleInvisiblePersonalStatement = useRef(null);
  const handleInvisibleTranscript = useRef(null);

  const handleGetUser = async (e) => {
    e.preventDefault();
    try {
      await API.graphql({
        query: getUser,
        variables: {
          id: student.id,
        },
      })
        .then((res) => {
          console.log(res);
          setStudent(res.data.getUser);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e, fileType) => {
    e.preventDefault();
    fileType === "personalStatement"
      ? handleInvisiblePersonalStatement.current.click()
      : handleInvisibleTranscript.current.click();
  };

  const handleFileSelect = async (e, fileType) => {
    e.preventDefault();
    const file = e.target.files[0];

    fileType === "personalStatement"
      ? setSelectedPersonalStatement(file)
      : setSelectedTranscript(file);

    fileType === "personalStatement"
      ? setUpdatePersonalStatement(true)
      : setUpdateTranscript(true);
  };

  const handleFileRemove = async (e, fileType) => {
    e.preventDefault();
    fileType === "personalStatement"
      ? setSelectedPersonalStatement(null)
      : setSelectedTranscript(null);

    fileType === "personalStatement"
      ? setUpdatePersonalStatement(false)
      : setUpdateTranscript(false);
  };

  const handleFileUpload = async (e, fileType) => {
    e.preventDefault();
    const bucketName = "pmacbetafiles135904-dev";
    let file;
    fileType === "personalStatement"
      ? (file = selectedPersonalStatement)
      : (file = selectedTranscript);

    const objectURL = `https://s3.amazonaws.com/${bucketName}/public/student-documents/${file.name}`;
    try {
      await Storage.put(`student-documents/${file.name}`, file, {
        contentType: file.type,
        metadata: {
          id: student.id,
          owner: student.username,
        },
      });
    } catch (err) {
      console.log(err);
    }

    try {
      const queryType =
        fileType === "personalStatement"
          ? changePersonalStatement
          : changeTranscript;
      await API.graphql({
        query: queryType,
        variables: {
          input: {
            id: student.id,
            [fileType]: objectURL,
          },
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="border-b-2 text-[#3B0000]">
        <Image
          className="w-full mx-auto"
          src="/ulm_banner.jpg"
          alt=""
          width={1980}
          height={1024}
        />
      </div>
      <div className="text-[#812633] max-w-[800px] mt-[70px] md:text-4xl w-full h-auto mx-auto flex text-center flex-col justify-center font-bold p-2">
        Other Required Documents
      </div>
      <p className=" font-bold p-2 mx-16 mt-10 md:text-xl text-center">
        Prepare a type-written personal statement. This statement should be
        approximately one page in length, single spaced. The personal statement
        you included in your AMCAS/AADSAS application is preferred. Please note
        that this is an important document and should be carefully and
        thoughtfully prepared. If you have questions about how to prepare a
        personal statement, please contact Dr. Allison Wiedemeier or Dr. Matt
        Overturf.
      </p>
      <div>
        <h1 className="p-5 font-bold text-ulm_maroon md:text-xl text-center">
          Upload Personal Statement
        </h1>
        {student.personalStatement && !updatePersonalStatement ? (
          <>
            <a
              href={student.personalStatement}
              target="_blank"
              rel="noreferrer"
              className="mt-2 ml-[3.5rem] p-2 bg-ulm_logo_red rounded-lg text-white font-bold"
            >
              View
            </a>
            <input
              type="file"
              id="myfile"
              name="myfile"
              style={{ display: "none" }}
              ref={handleInvisiblePersonalStatement}
              onChange={(e) => {
                handleFileSelect(e, "personalStatement");
              }}
            />
            <button
              className="mt-2 ml-[1rem] p-2 bg-ulm_logo_red text-white font-bold rounded-lg"
              onClick={(e) => {
                handleClick(e, "personalStatement");
              }}
            >
              Change
            </button>
          </>
        ) : selectedPersonalStatement ? (
          <>
            <center>
              <button
                className="mt-2 p-2 bg-ulm_logo_red rounded-lg text-white font-bold"
                onClick={(e) => {
                  handleFileUpload(e, "personalStatement");
                }}
              >
                Upload {selectedPersonalStatement.name.substring(0, 10) + "..."}
              </button>
              <button
                className="mt-2 ml-[1rem] p-2 bg-ulm_logo_red rounded-lg text-white font-bold"
                onClick={(e) => {
                  handleFileRemove(e, "personalStatement");
                }}
              >
                Remove
              </button>
            </center>
          </>
        ) : (
          <>
            <input
              type="file"
              id="myfile"
              name="myfile"
              style={{ display: "none" }}
              ref={handleInvisiblePersonalStatement}
              onChange={(e) => {
                handleFileSelect(e, "personalStatement");
              }}
            />
            <center>
              <button
                className="p-2 bg-ulm_logo_red rounded-lg text-white font-bold w-[200px] "
                onClick={(e) => {
                  handleClick(e, "personalStatement");
                }}
              >
                <p className="font-bold text-white">Choose File</p>
              </button>
            </center>
          </>
        )}
      </div>
      <p className=" font-bold p-2 mx-16 md:text-xl text-center mt-16">
        Supply the committee with an up-to-date unofficial transcript.
      </p>
      <div className="p-5 text-ulm_maroon max-w-[800px] md:text-xl w-full h-auto mx-auto flex text-center flex-col justify-center font-bold p-2">
        Upload Latest Transcript
      </div>
     
      <div>
        {student.transcript && !updateTranscript ? (
          <>
            <a
              href={student.transcript}
              target="_blank"
              rel="noreferrer"
              className="mt-2 ml-[3.5rem] p-2 bg-ulm_logo_red rounded-lg text-white font-bold"
            >
              View
            </a>
            <input
              type="file"
              id="myfile"
              name="myfile"
              style={{ display: "none" }}
              ref={handleInvisibleTranscript}
              onChange={(e) => {
                handleFileSelect(e, "transcript");
              }}
            />
            <button
              className="mt-2 ml-[1rem] p-2 bg-ulm_logo_red rounded-lg text-white font-bold"
              onClick={(e) => {
                handleClick(e, "transcript");
              }}
            >
              Change
            </button>
          </>
        ) : selectedTranscript ? (
          <>
            <center>
              <button
                className="mt-2 p-2 bg-ulm_logo_red rounded-lg text-white font-bold"
                onClick={(e) => {
                  handleFileUpload(e, "transcript");
                }}
              >
                Upload {selectedTranscript.name.substring(0, 10) + "..."}
              </button>
              <button
                className="mt-2 ml-[1rem] p-2 bg-ulm_logo_red rounded-lg text-white font-bold"
                onClick={(e) => {
                  handleFileRemove(e, "transcript");
                }}
              >
                Remove
              </button>
            </center>
          </>
        ) : (
          <>
            <input
              type="file"
              id="myfile"
              name="myfile"
              style={{ display: "none" }}
              ref={handleInvisibleTranscript}
              onChange={(e) => {
                handleFileSelect(e, "transcript");
              }}
            />
            <center>
              <button
                className="p-2  bg-ulm_logo_red rounded-lg text-white font-bold w-[200px]"
                onClick={(e) => {
                  handleClick(e, "transcript");
                }}
              >
                <p className="font-bold text-white">Choose File</p>
              </button>
            </center>
            
          </>
        )}
      </div>
      <p className=" font-bold p-2 mx-16 mt-16 md:text-xl text-center">
      Include a headshot of yourself, preferably the headshot required by your application.
      </p>
      <div className="p-5 text-ulm_maroon max-w-[800px] md:text-xl w-full h-auto mx-auto flex text-center flex-col justify-center font-bold p-2">
        Upload Photo
      </div>
      
      <div>
        {student.transcript && !updateTranscript ? (
          <>
            <a
              href={student.transcript}
              target="_blank"
              rel="noreferrer"
              className="mt-2 ml-[3.5rem] p-2 bg-ulm_logo_red rounded-lg text-white font-bold"
            >
              View
            </a>
            <input
              type="file"
              id="myfile"
              name="myfile"
              style={{ display: "none" }}
              ref={handleInvisibleTranscript}
              onChange={(e) => {
                handleFileSelect(e, "transcript");
              }}
            />
            <button
              className="mt-2 ml-[1rem] p-2 bg-ulm_logo_red rounded-lg text-white font-bold"
              onClick={(e) => {
                handleClick(e, "transcript");
              }}
            >
              Change
            </button>
          </>
        ) : selectedTranscript ? (
          <>
            <center>
              <button
                className="mt-2 p-2 bg-ulm_logo_red rounded-lg text-white font-bold"
                onClick={(e) => {
                  handleFileUpload(e, "transcript");
                }}
              >
                Upload {selectedTranscript.name.substring(0, 10) + "..."}
              </button>
              <button
                className="mt-2 ml-[1rem] p-2 bg-ulm_logo_red rounded-lg text-white font-bold"
                onClick={(e) => {
                  handleFileRemove(e, "transcript");
                }}
              >
                Remove
              </button>
            </center>
          </>
        ) : (
          <>
            <input
              type="file"
              id="myfile"
              name="myfile"
              style={{ display: "none" }}
              ref={handleInvisibleTranscript}
              onChange={(e) => {
                handleFileSelect(e, "transcript");
              }}
            />
            <center>
              <button
                className="p-2  bg-ulm_logo_red rounded-lg text-white font-bold w-[200px]"
                onClick={(e) => {
                  handleClick(e, "transcript");
                }}
              >
                <p className="font-bold text-white">Choose File</p>
              </button>
            </center>
            
          </>
        )}
      </div>
      
    </>
  );
}
