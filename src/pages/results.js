import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { ActiveUser } from './_app';
import { useForm } from 'react-hook-form';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Results from '@/components/Results';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowSize.width < 740;

  const validationSchema = Yup.object({
    accepting: Yup.string().required('This section is required!'),
    choice: Yup.string().required('This section is required!'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      await API.graphql({
        query: mutations.updateUser,
        variables: {
          input: {
            id: activeUser.id,
            results: [values.accepting, values.choice],
          },
        },
      })
        .then(res => {
          console.log(res);
          success('Results submitted!');
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
      error('Error submitting results!');
    }

    setSubmitting(false);
  };

  const initialValues = {
    accepting: activeUser && activeUser.results ? activeUser.results[0] : '',
    choice: activeUser && activeUser.results ? activeUser.results[1] : '',
  };

  console.log(initialValues);

  return activeUser ? (
    <>
      <div className='flex items-center justify-center'>
        <div className={`${isSmallScreen ? 'px-0 w-3/4' : 'px-2 w-3/4'}`}>
          <div
            className={`${isSmallScreen ? 'nav-body-calendar' : 'nav-body'}`}
          >
            <div
              className={`${
                isSmallScreen
                  ? 'w-3/2 mx-auto border border-black  p-4 mt-10 ml-9'
                  : ''
              }`}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form
                    className={`bg-white rounded-lg ${
                      isSmallScreen ? '' : 'p-5 w-full'
                    }`}
                  >
                    <label
                      htmlFor='Results'
                      className='block mb-2 text-2xl font-bold text-black'
                    >
                      Please let us know about your results!
                    </label>
                    <p className='text-base'>
                      {' '}
                      If accepted, please fill out a brief survey to help us
                      improve our services for future pre-med students!
                    </p>
                    <div className='mt-5 mb-5'>
                      <label className='block mt-3 mb-2 text-lg font-medium text-black'>
                        1. Tell us about the school(s) you got accepted to, if
                        any.
                      </label>
                      <Field
                        as='textarea'
                        type='text'
                        name='accepting'
                        rows={4}
                        className='block p-2.5 w-full text-sm text-black rounded-lg border'
                        placeholder='Write your answers here...'
                      ></Field>
                    </div>
                    <div className='mt-5 '>
                      <label className='block mb-2 text-lg font-medium text-black'>
                        2. Which school did you decide to attend?
                      </label>
                      <Field
                        as='textarea'
                        type='text'
                        name='choice'
                        rows={4}
                        className='block p-2.5 w-full text-sm text-black rounded-lg border'
                        placeholder='Write your answers here...'
                      />
                    </div>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='bg-ulm_maroon hover:shadow-black shadow-sm rounded-md text-lg my-6 mx-auto font-bold px-5 py-2 text-white'
                    >
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
