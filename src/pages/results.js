import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { ActiveUser } from './_app';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Result() {
  const activeUser = useContext(ActiveUser);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then(user => true)
        .catch(err => {
          console.log(err);
          router.push('/login');
        });
    };
    fetchUser();
  }, [router]);

  const [windowSize, setWindowSize] = useState({ width: undefined });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowSize.width < 740;

  const onSubmitHandler = (data) => {console.log(data)}

  const validationSchema = Yup.object({
    accepting: Yup.string().required("This section is required!"),
    choice: Yup.string().required("This section is required!"),
    
  });

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(validationSchema),
  });

  
  return activeUser ? (
    <>
    <div className='flex items-center justify-center'>
          <div className= {`${isSmallScreen ? 'px-0 w-3/4' : 'px-2 w-3/4'}`}>
       
        <div className={`${isSmallScreen ? 'nav-body-calendar' : 'nav-body'}`}>
          <div className= {`${isSmallScreen ? 'w-3/2 mx-auto border border-black  p-4 mt-10 ml-9'  : ''}`}>
            <form
              className={`bg-white rounded-lg ${isSmallScreen ? '' : 'p-5 w-full'}`}
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <label
                htmlFor='Results'
                className='block mb-2 text-2xl font-bold text-black'
              >
                Please let us know about your results!
              </label>
              <p className='text-base'> If accepted, please fill out a brief survey to help us improve our services for future pre-med students!
              </p>
              <label className='block mt-3 mb-2 text-lg font-medium text-black'>
                1. Tell us about the school(s) you got accepted to, if any.
              </label>
              <textarea
                rows='4'
                id='accepting'
                className='block mb-2 text-sm text-black bg-white focus:ring-0 w-full'
                placeholder='List the school(s) you got accepted to.'
               {...register("accepting")}
              ></textarea>
              {errors.accepting && <p className='text-bred mb-4'>{errors.accepting.message}</p>}
              <label className='block mb-2 text-lg font-medium text-black'>
                2. Which school did you decide to attend?
              </label>
              <textarea
                rows='4'
                id='school_of_choice'
                className='block mb-2 text-sm text-black bg-white w-full'
                placeholder='Name the school you decided to attend.'
               {...register("choice")}
              ></textarea>
              {errors.choice && <p className='text-bred mb-4'>{errors.choice.message}</p>}
              <button
                type='submit'
                className='bg-green text-white font-bold py-2 px-4 rounded mt-3 mr-3 w-2/2'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        
      </div>
    </div></>
    
  ) : null;
}
