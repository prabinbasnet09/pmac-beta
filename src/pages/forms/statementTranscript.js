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
import FileUpload from "@/components/widgets/FileUpload";
import upload from "../../../public/upload.png";
import uploadOrange from "../../../public/upload_orange.png";
import uploadGreen from "../../../public/upload_green.png";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

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
        <div className='mx-auto'>
          <div className="text-[#812633] max-w-[800px] mt-[70px] md:text-4xl w-full h-auto mx-auto flex text-center flex-col justify-center font-bold p-2">
            Required Digital Documents
          </div>

          <p className="text-2xl font-bold text-ulm_maroon text-center mt-14">
            Personal Statement
          </p>
          <div className=" font-bold p-2 mx-16 mt-5 md:text-xl justify-center ">
            The personal statement should be approximately one page in length,
            single spaced. The personal statement you included in your
            AMCAS/AADSAS application is preferred. Please note that this is an
            important document and should be carefully and thoughtfully
            prepared. If you have questions about how to prepare a personal
            statement, please contact
            <a className=" text-ulm_red hover:text-sky-700">
              <Link href="https://webservices.ulm.edu/facultyactivities/profile/awiedemeier">            
                &nbsp;Dr. Allison Wiedemeier&nbsp;
              </Link>
            </a>
            or
            <a className="text-ulm_red hover:text-sky-700">
              <Link href="https://webservices.ulm.edu/facultyactivities/profile/overturf">
                {" "}
                &nbsp;Dr. Matt Overturf
              </Link>
              .
            </a>
          </div>
          <p className="text-2xl font-bold text-ulm_maroon text-center mt-14">
            Unofficial Transcript & Headshot
          </p>
          <p className="font-bold p-2 mx-16 mt-5 md:text-xl text-center">
            Also provide a copy of your unofficial transcript alongside a
            profile photo.
          </p>
          {/*Upload Cards*/}
          <div className="mx-auto flex justify-center column-3 max-w-[1240px]">
            <div className="flex w-full justify-center mt-20">
              <div className="bg-white shadow-xl shadow-black items-center grid grid-rows-3 px-4 border hover:shadow-[#7092BE] border-black rounded-xl font-semibold text-sm text-black hover:text-[#7092BE] tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition">
                <div className="text-center p-1 text-2xl font-bold">
                  Personal Statement
                </div>
                <div>
                  <Image
                    className="mx-auto mt-10"
                    src={upload}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
                <p className="text-black">
                  <FileUpload />
                </p>
              </div>
            </div>

            <div className="flex w-full justify-center mt-20">
              <div className="bg-white shadow-xl shadow-black items-center grid grid-rows-3 px-4 border hover:shadow-[#7092BE] border-black rounded-xl font-semibold text-sm text-black hover:text-[#7092BE] tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition">
                <div className="text-center p-1 text-2xl font-bold">
                  Unofficial Transcript
                </div>
                <div>
                  <Image
                    className="mx-auto mt-10"
                    src={uploadOrange}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
                <p className="text-black">
                  <FileUpload />
                </p>
              </div>
            </div>

            <div className="flex w-full justify-center mt-20">
              <div className="bg-white shadow-xl shadow-black hover:shadow-[#7092BE] items-center grid grid-rows-3 px-4 border border-black rounded-xl font-semibold text-sm text-black hover:text-[#7092BE] tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition">
                <div className="text-center p-1 text-2xl font-bold">
                  Headshot
                </div>
                <div>
                  <Image
                    className="mx-auto mt-10"
                    src={uploadGreen}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
                <p className="text-black">
                  <FileUpload />
                </p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
