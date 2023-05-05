import { React, useState, useEffect, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { setDate } from 'date-fns';
import { ActiveUser } from '../_app';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InfoReleaseForm() {
  const activeUser = useContext(ActiveUser);
  const router = useRouter();

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
    const fetchUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then(user => true)
        .catch(err => {
          console.log(err);
          router.push('/login');
        });
    };
    fetchUser();
  }, []);

  // const [fullName, setFullName] = useState('');
  // const [cwid, setCwid] = useState('');
  // const [date, setDate] = useState('');
  // const [authorizeRelease, setAuthorizeRelease] = useState(false);
  // const [allowEvaluation, setAllowEvaluation] = useState(false);
  // const [allowAdvertising, setAllowAdvertising] = useState(false);

  const initialValues = {
    fullName: '',
    cwid: '',
    date: '',
    authorizeRelease: false,
    allowEvaluation: false,
    allowAdvertising: false,
  };

  const [rows, setRows] = useState([
    {
      schoolName: '',
      deadlineDate: '',
      contactPerson: '',
      address: '',
    },
  ]);

  const rowSchema = Yup.object().shape({
    schoolName: Yup.string().required('Full Name is required!'),
    deadlineDate: Yup.string().required('Valid Date is required'),
    contactPerson: Yup.string().required("Contact person's is required!"),
    address: Yup.string().required('Address is required!'),
  });

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required!'),
    cwid: Yup.string()
      .required('CWID is required!')
      .matches(
        /^[0-9]{8}$/,
        'CWID must be a valid date in the format xxxx-xxxx.'
      ),
    date: Yup.date().required('Date is Required!'),
    authorizeRelease: Yup.boolean().oneOf(
      [true],
      'Authorize Release is required!'
    ),
    allowEvaluation: Yup.boolean().oneOf(
      [true],
      'Allow Evaluation is required!'
    ),
    allowAdvertising: Yup.boolean().oneOf(
      [true],
      'Allow Advertising is required!'
    ),
  });

  useEffect(() => {
    const fetchData = async () => {
      await API.graphql({
        query: queries.listApplicantReleaseForms,
        variables: { filter: { userId: { eq: activeUser.id } } },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
        .then(res => {
          const data = res.data.listApplicantReleaseForms.items[0];
          console.log(data);
          if (data) {
            initialValues.authorizeRelease = data.authorizeRelease;
            initialValues.allowEvaluation = data.allowEvaluation;
            initialValues.allowAdvertising = data.allowAdvertising;
            initialValues.fullName = data.fullName;
            initialValues.cwid = data.cwid;
            initialValues.date = data.date;
            setRows(JSON.parse(data.schoolDetails));
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    activeUser && fetchData();
  }, [activeUser]);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    const inputData = {
      userId: activeUser.id,
      authorizeRelease: values.authorizeRelease,
      allowEvaluation: values.allowEvaluation,
      allowAdvertising: values.allowAdvertising,
      fullName: values.fullName,
      cwid: values.cwid,
      date: values.date,
      schoolDetails: JSON.stringify(rows),
    };

    const createForm = async () => {
      await API.graphql({
        query: mutations.createApplicantReleaseForm,
        variables: { input: inputData },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
        .then(async res => {
          if (res.data.createApplicantReleaseForm) {
            await API.graphql({
              query: mutations.updateUser,
              variables: {
                input: {
                  id: activeUser.id,
                  applicantReleaseForm: 'Submitted',
                },
              },
              authMode: 'AMAZON_COGNITO_USER_POOLS',
            })
              .then(res => {
                console.log(res);
                success('Form Submitted!');
              })
              .catch(err => {
                console.log(err);
                error('Error submitting form!');
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const updateForm = async () => {
      await API.graphql({
        query: mutations.updateApplicantReleaseForm,
        variables: { input: inputData },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
        .then(async res => {
          if (res.data.updateApplicantReleaseForm) {
            await API.graphql({
              query: mutations.updateUser,
              variables: {
                input: {
                  id: activeUser.id,
                  applicantReleaseForm: 'Submitted',
                },
              },
              authMode: 'AMAZON_COGNITO_USER_POOLS',
            })
              .then(res => {
                console.log(res);
                success('Form Submitted!');
              })
              .catch(err => {
                console.log(err);
                error('Error submitting form!');
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    console.log(activeUser.applicantReleaseForm);
    activeUser.applicantReleaseForm === 'Submitted' ||
    activeUser.applicantReleaseForm === 'Progress'
      ? updateForm()
      : createForm();

    setSubmitting(false);
  };

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;

    setRows(newRows);
  };

  const handleDeleteRow = () => {
    const newRows = [...rows];
    newRows.pop(); // remove the last row

    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { name: '', date: '', phone: '', address: '' }]);
  };

  const onTempSave = values => {
    const inputData = {
      userId: activeUser.id,
      authorizeRelease: values.authorizeRelease,
      allowEvaluation: values.allowEvaluation,
      allowAdvertising: values.allowAdvertising,
      fullName: values.fullName,
      cwid: values.cwid,
      date: values.date,
      schoolDetails: JSON.stringify(rows),
    };

    const createForm = async () => {
      await API.graphql({
        query: mutations.createApplicantReleaseForm,
        variables: { input: inputData },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
        .then(async res => {
          if (res.data.createApplicantReleaseForm) {
            await API.graphql({
              query: mutations.updateUser,
              variables: {
                input: {
                  id: activeUser.id,
                  applicantReleaseForm: 'Progress',
                },
              },
              authMode: 'AMAZON_COGNITO_USER_POOLS',
            })
              .then(res => {
                console.log(res);
                success('Form Saved!');
              })
              .catch(err => {
                console.log(err);
                error('Error saving form!');
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const updateForm = async () => {
      await API.graphql({
        query: mutations.updateApplicantReleaseForm,
        variables: { input: inputData },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
        .then(res => {
          console.log(res);
          success('Form Saved!');
        })
        .catch(err => {
          console.log(err);
          error('Error saving form!');
        });
    };
    activeUser.applicantReleaseForm ? updateForm() : createForm();
  };

  return activeUser ? (
    <div className='mt-10 sm:mt-0'>
      <div className='mt-10 w-full md:mt-10'>
        <div className='overflow-hidden shadow sm:rounded-md'>
          <div className='border-2 border-r border-gray w-4/5 mx-auto mb-7 px-4 py-5 sm:p-6 '>
            <h1 className='text-center text-4xl font-bold text-ulm_maroon'>
              Information Release Form
            </h1>

            <div className=' p-4 text-black opacity-75 mx-auto'>
              <p className='leading-relaxed text-justify'>
                I understand that members of the Pre-Medical Advisory Committee
                have access to my transcript, test scores, personal statement
                and faculty evaluations submitted on my behalf. I understand
                that the committee evaluation will be based on the submitted
                faculty evaluations, transcript(s), test scores, a personal
                statement, and the committee interview. I, as the applicant,
                have made every effort to provide the committee with the full
                and correct address where the evaluation letter for the
                pre-medical committee should be mailed, understanding that this
                may not be the general address for the school in most cases.
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form>
                  <div>
                    <label className='block text-black font-bold mb-2'>
                      Please check the box for all that you agree to:
                    </label>
                    <fieldset className='ml-9'>
                      <div className=' leading-relaxed text-justify'>
                        <Field
                          type='checkbox'
                          name='authorizeRelease'
                          // checked={authorizeRelease}
                          // onChange={e => {
                          //   const { checked } = e.target;
                          //   setAuthorizeRelease(checked);
                          //   setFieldValue('authorizeRelease', checked);
                          // }}
                        />

                        <span className='ml-3'>
                          {' '}
                          I hereby authorize the Pre-Medical Advisory Committee
                          of the University of Louisiana at Monroe to release
                          the evaluation of the undersigned to the below listed
                          professional schools and/or programs.
                        </span>
                      </div>

                      <ErrorMessage
                        name='authorizeRelease'
                        component='div'
                        className='text-bred '
                      />
                      <div className=' leading-relaxed text-justify'>
                        <Field
                          type='checkbox'
                          name='allowEvaluation'
                          // checked={allowEvaluation}
                          // onChange={e => {
                          //   const { checked } = e.target;
                          //   setAllowEvaluation(checked);
                          //   setFieldValue('allowEvaluation', checked);
                          // }}
                        />

                        <span className='ml-3'>
                          {' '}
                          I will allow the committee members to evaluate my
                          performance based on my academic record, submitted
                          materials, and the committee interview. I authorize
                          the committee to prepare an evaluation letter for me
                          for the purposes of applying to the professional
                          schools and/or programs listed below. I understand
                          that their evaluation and all items considered in
                          making this recommendation are confidential and I
                          waive my right to see such evaluation.
                        </span>
                      </div>
                      <ErrorMessage
                        name='allowEvaluation'
                        component='div'
                        className='text-bred'
                      />
                      <div className=' leading-relaxed text-justify'>
                        <Field
                          type='checkbox'
                          name='allowAdvertising'
                          // checked={allowAdvertising}
                          // onChange={e => {
                          //   const { checked } = e.target;
                          //   setAllowAdvertising(checked);
                          //   setFieldValue('allowAdvertising', checked);
                          // }}
                        />
                        <span className='ml-3'>
                          I will allow my name to be released to the University
                          if accepted to a professional school. The University
                          may use my name and the name of the professional
                          school/ and or program for statistics and recruitment
                          endeavors. These statistics will be gathered for the
                          Biology Program, Pre-Medical Interview Committee and
                          the University of Louisiana at Monroe.
                        </span>
                        <ErrorMessage
                          name='allowAdvertising'
                          component='div'
                          className='text-bred'
                        />
                      </div>
                    </fieldset>
                  </div>

                  <h1 className='mb-5 mt-7 text-1xl font-bold'>
                    By writing below my name, I understand that I am waiving my
                    right to review the evaluation material and agree to the
                    release of my name and school upon acceptance.
                  </h1>
                  <label
                    htmlFor='fullName'
                    className='block text-sm font-medium text-black'
                  >
                    Name
                  </label>
                  <Field type='text' name='fullName' className='w-full' />
                  <ErrorMessage
                    name='fullName'
                    component='div'
                    className='text-bred'
                  />

                  <label
                    htmlFor='cwid'
                    className='block mt-4 text-sm font-medium text-black'
                  >
                    CWID Number
                  </label>
                  <Field type='text' name='cwid' className='w-full' />
                  <ErrorMessage
                    name='cwid'
                    component='div'
                    className='text-bred'
                  />

                  <label
                    htmlFor='date'
                    className='block mt-4 text-sm font-medium text-black'
                  >
                    Date
                  </label>
                  <Field type='date' name='date' className='w-full' />
                  <ErrorMessage
                    name='date'
                    component='div'
                    className='text-bred'
                  />

                  <h1 className='mt-7 text-1xl font-bold'>
                    Please provide the physical addresses of each school you are
                    applying to if those schools require individual letters. If
                    you are using an application system, please list the School
                    and then the Application service.
                  </h1>

                  <h1 className='mb-3 mt-2 text-1xl font-bold'>
                    All deadlines for all schools need to be listed. Most
                    schools have two deadline dates.
                    <span className='text-bred'>
                      {' '}
                      Please provide the letter deadline date.
                    </span>{' '}
                  </h1>

                  <div className='overflow-x-auto'>
                    <table className='table-auto border-collapse border border-black w-full bg-red opacity-75 text-white '>
                      <thead>
                        <tr>
                          <th className='border border-black px-4 py-2'>
                            Name of School
                          </th>
                          <th className='border border-black px-4 py-2'>
                            Letter Deadline Date
                          </th>
                          <th className='border border-black px-4 py-2'>
                            Contact Person
                          </th>
                          <th className='border border-black px-4 py-2'>
                            Address
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr key={index}>
                            <td className='border border-black '>
                              <input
                                className='border-none w-full text-black'
                                type='text'
                                defaultValue={row.schoolName}
                                onChange={event =>
                                  handleRowChange(
                                    index,
                                    'schoolName',
                                    event.target.value
                                  )
                                }
                              />
                            </td>
                            <td className='border border-black '>
                              <input
                                className='border-none w-full text-black'
                                type='date'
                                defaultValue={row.deadlineDate}
                                onChange={event =>
                                  handleRowChange(
                                    index,
                                    'deadlineDate',
                                    event.target.value
                                  )
                                }
                              />
                            </td>
                            <td className='border border-black '>
                              <input
                                className='border-none w-full text-black'
                                type='tel'
                                defaultValue={row.contactPerson}
                                onChange={event =>
                                  handleRowChange(
                                    index,
                                    'contactPerson',
                                    event.target.value
                                  )
                                }
                              />
                            </td>
                            <td className='border border-black '>
                              <input
                                className='border-none w-full text-black'
                                type='text'
                                defaultValue={row.address}
                                onChange={event =>
                                  handleRowChange(
                                    index,
                                    'address',
                                    event.target.value
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                    className='inline-flex items-center gap-1 bg-ulm_maroon text-white px-1 py-1 mt-5 mr-2 rounded'
                    type='button'
                    onClick={handleAddRow}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 4.5v15m7.5-7.5h-15'
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleDeleteRow}
                    className='bg-bred text-white font-bold px-1 py-1 rounded mt-5 '
                    type='button'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 12h-15'
                      />
                    </svg>
                  </button>

                  <div className='flex justify-center'>
                    {activeUser.applicantReleaseForm === 'Submitted' ? (
                      <button
                        type='submit'
                        className='ml-5 bg-green hover:opacity-50 text-white font-bold py-2 px-7 rounded'
                      >
                        Update
                      </button>
                    ) : (
                      <div className='flex justify-center'>
                        <button
                          type='button'
                          className='bg-ulm_maroon hover:opacity-50 text-white font-bold py-2 px-7 rounded'
                          onClick={e => {
                            e.preventDefault();
                            onTempSave(values);
                          }}
                        >
                          Save
                        </button>
                        <button
                          type='submit'
                          className='ml-5 bg-ulm_logo_red hover:opacity-50 text-white font-bold py-2 px-7 rounded'
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
