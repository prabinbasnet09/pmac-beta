import React from "react";

const FileUpload = () => {
  return (
    <label
      class="flex  cursor-pointer mt- appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
      tabindex="0"
    >
      <span for="photo-dropbox" class="flex items-center space-x-2">
        <svg class="h-6 w-6 stroke-gray-400" viewBox="0 0 256 256">
          <path
            d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></path>
          <path
            d="M80,128a80,80,0,1,1,144,48"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></path>
          <polyline
            points="118.1 161.9 152 128 185.9 161.9"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></polyline>
          <line
            x1="152"
            y1="208"
            x2="152"
            y2="128"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
        </svg>
        <span class="text-xs font-medium text-gray-600">
          Drop files to Attach, or  
          <span class="text-blue-600 font-bold"> browse</span>
        </span>
      </span>
      <input id="photo-dropbox" type="file" class="sr-only" />
    </label>
  );
};

export default FileUpload;
