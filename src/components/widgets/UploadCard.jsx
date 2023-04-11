import React from "react";
import FileUpload from "./FileUpload";
import Image from "next/image";
import upload from "../../../public/upload.png";

const UploadCard = () => {
  return (
    <div className="mx-auto flex flex-col justify-center ">
      <div class="flex w-full justify-center">
        <div className="bg-[#bcbcbc] items-center grid grid-rows-3 px-4 border border-[#7c7c7c] rounded-xl font-semibold text-sm text-black tracking-widest hover:bg-white active:bg-[#bcbcbc] focus:ring-gray disabled:opacity-25 transition">
          <div className="text-center p-1 text-2xl font-bold text-ulm_logo_red">
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
          <p>
            <FileUpload />
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadCard;
