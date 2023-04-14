import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import { ActiveUser } from "./_app";

export default function Result() {
  const activeUser = useContext(ActiveUser);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then((user) => true)
        .catch((err) => {
          console.log(err);
          setUser(null);
          router.push("/login");
        });
    };
    fetchUser();
  }, []);

  return activeUser ? (
    <div className="flex items-center justify-center">
      <div className="w-3/4 px-2 sm:px-0">
        <div className={`${"nav-body"}`}>
          <div className="flex space-x-4">
            <form
              className="w-3/4"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label
                htmlFor="Results"
                className="block mb-2 text-2xl font-bold text-gray-900 text-black"
              >
                We would love to know about your results!
              </label>
              <p className='text-lg'>
                We would appreciate it if you could share your post-application
                experience with us, as it will help us improve our services for
                future pre-med students.
              </p>
              <label className="block mt-10 mb-2 mx-5 text-lg font-medium text-gray-900 text-black">
                1. Tell us which schools you got accepted to.
              </label>
              <textarea
                rows="8"
                id="accepting_schools"
                className="block mb-2 mx-5 text-sm text-gray-800 bg-white border-0 bg-gray-800 focus:ring-0 text-white placeholder-gray-400 w-full"
                placeholder="List the school(s) you got accepted to."
              ></textarea>
              <label className="block mb-2 mx-5 text-lg font-medium text-gray-900 text-black">
                2. Which school did you decide to go to?
              </label>
              <textarea
                rows="8"
                id="school_of_choice"
                className="block mb-2 mx-5 text-sm text-gray-800 bg-white border-0 bg-gray-800 focus:ring-0 text-white placeholder-gray-400 w-full"
                placeholder="Name the school you decided to attend."
              ></textarea>
              <button
                type="submit"
                className="mx-5 bg-ulm_maroon text-white font-bold py-2 px-4 rounded mt-3 mr-3 w-2/2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
