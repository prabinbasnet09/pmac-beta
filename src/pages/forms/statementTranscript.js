import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Storage } from "@aws-amplify/storage";
import { API } from "@aws-amplify/api";
import {
  changePersonalStatement,
  changeTranscript,
} from "@/graphql/mutations.js";
import { getUser } from "@/graphql/queries.js";

import { ActiveUser } from "../_app.js";

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
      <div>
        <h1 className="p-5">Personal Statement❗</h1>
        {student.personalStatement && !updatePersonalStatement ? (
          <>
            <a
              href={student.personalStatement}
              target="_blank"
              rel="noreferrer"
              className="mt-2 ml-[3.5rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg"
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
              className="mt-2 ml-[1rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg"
              onClick={(e) => {
                handleClick(e, "personalStatement");
              }}
            >
              Change
            </button>
          </>
        ) : selectedPersonalStatement ? (
          <>
            <button
              className="mt-2 ml-[3.5rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg"
              onClick={(e) => {
                handleFileUpload(e, "personalStatement");
              }}
            >
              Upload {selectedPersonalStatement.name.substring(0, 10) + "..."}
            </button>
            <button
              className="mt-2 ml-[1rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg"
              onClick={(e) => {
                handleFileRemove(e, "personalStatement");
              }}
            >
              Remove
            </button>
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
            <button
              className=" ml-[3.5rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg"
              onClick={(e) => {
                handleClick(e, "personalStatement");
              }}
            >
              Choose File
            </button>
          </>
        )}
      </div>

      <div>
        <h1 className="p-5">Latest Transcript❗</h1>
        {student.transcript && !updateTranscript ? (
          <>
            <a
              href={student.transcript}
              target="_blank"
              rel="noreferrer"
              className="mt-2 ml-[3.5rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg"
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
              className="mt-2 ml-[1rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg"
              onClick={(e) => {
                handleClick(e, "transcript");
              }}
            >
              Change
            </button>
          </>
        ) : selectedTranscript ? (
          <>
            <button
              className="mt-2 ml-[3.5rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg"
              onClick={(e) => {
                handleFileUpload(e, "transcript");
              }}
            >
              Upload {selectedTranscript.name.substring(0, 10) + "..."}
            </button>
            <button
              className="mt-2 ml-[1rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg"
              onClick={(e) => {
                handleFileRemove(e, "transcript");
              }}
            >
              Remove
            </button>
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
            <button
              className=" ml-[3.5rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg"
              onClick={(e) => {
                handleClick(e, "transcript");
              }}
            >
              Choose File
            </button>
          </>
        )}

        {
          <button
            className=" m-10 p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg"
            onClick={(e) => handleGetUser(e)}
          >
            Get User
          </button>
        }
      </div>
    </>
  );
}
