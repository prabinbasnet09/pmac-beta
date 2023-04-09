import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { GrSend } from 'react-icons/gr'

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_1ididir",
        "template_6yapupl",
        form.current,
        "W-709xlp-JluQEznV"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <center>
      <div>
        <label
          for="first_name"
          class="block mb-2 text-sm font-bold mt-16 text-gray-900 dark:text-black"
        >
          Name
        </label>
        <input
          type="text"
          id="user_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Name"
          required
        />
      </div>
      </center>

      <center>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-bold mt-5 text-gray-900 dark:text-black "
          >
            Email address
          </label>
          <input
            type="email"
            id="user_email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email Address"
            required
          />
        </div>
      </center>
     <center>
      <div>
        
        <label for="message" class="block mb-2 text-sm font-bold text-gray-900 dark:text-black">Your message</label>
        <textarea id="message" rows="4" class="block p-2.5 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

      </div>
      </center>
      <center>
      <div className='grid grid-cols-1 place-items-center'>
      <button type="submit" 
              class="bg-ulm_red w-[130px] rounded-md text-lg my-6 mx-auto font-bold px-2 text-white">
      <p>Send</p>
      </button>
      </div>
      </center>
      
    </form>
  );
};

export default Contact;
