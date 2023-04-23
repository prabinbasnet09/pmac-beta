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

export default function InfoReleaseForm() {
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
  }, []);

  const [authorizeRelease, setAuthorizeRelease] = useState(false);
  const [allowEvaluation, setAllowEvaluation] = useState(false);
  const [allowAdvertising, setAllowAdvertising] = useState(false);

  const [userInfo, setUserInfo] = useState({
    fullName: '',
    cwid: '',
    date: '',
  });

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
    userInfo: Yup.object().shape({
      fullName: Yup.string().required('Full Name is required'),
    cwid: Yup.string()
      .required('CWID is required')
      .matches(
        /^[0-9]{8}$/,
        'CWID must be a valid date in the format xxxx-xxxx'
      ),
    date: Yup.string().required('Date is Required'),
    }),
    
    choice: Yup.array()
      .of(Yup.string())
      .min(3, 'Please select all 3 checkboxes!'),
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
          if (data) {
            setAuthorizeRelease(data.authorizeRelease);
            setAllowEvaluation(data.allowEvaluation);
            setAllowAdvertising(data.allowAdvertising);
            setUserInfo({
              fullName: data.fullName,
              cwid: data.cwid,
              signature: data.signature,
              date: data.date,
            });
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
    try {
      const schoolDetails = rows.map(row => {
        return {
          schoolName: row.schoolName,
          deadlineDate: row.deadlineDate,
          contactPerson: row.contactPerson,
          address: row.address,
        };
      });

      const inputData = {
        userId: activeUser.id,
        authorizeRelease: authorizeRelease,
        allowEvaluation: allowEvaluation,
        allowAdvertising: allowAdvertising,
        fullName: userInfo.fullName,
        cwid: userInfo.cwid,
        signature: userInfo.signature,
        date: userInfo.date,
        // schoolDetails: `[{\"authorizeRelease\":true, \"allowEvaluation\":true, \"allowAdvertisement\": true, \"schoolName\": \"ULM\", \"deadlineDate\": \"2023/03/18\", \"contactPerson\": \"Dr. Jose Cordova\", \"address\": \"Concordia, Monroe\"}, \
        //                 {\"name\": \"name\", \"succeed\": true, \"date\": \"2021-05-05\", \"phone\": \"318-123-4567\", \"address\": \"1234 Main St, Monroe, LA 71203\"}]`
        schoolDetails: JSON.stringify(schoolDetails),
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
                })
                .catch(err => {
                  console.log(err);
                });
            }
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      };

      const updateForm = async (values, { setSubmitting }) => {
        await API.graphql({
          query: mutations.updateApplicantReleaseForm,
          variables: { input: inputData },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      };

      activeUser.applicationReleaseForm ? updateForm() : createForm();
    } catch (err) {
      console.log('error creating InfoRelease Form:', err);
    }

    console.log(values);
    setSubmitting(false);
  };

  const handleAuthorizeRelease = e => {
    setAuthorizeRelease(e.target.checked);
  };

  const handleAllowEvaluation = e => {
    setAllowEvaluation(e.target.checked);
  };

  const handleAllowAdvertising = e => {
    setAllowAdvertising(e.target.checked);
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

  const handleUserInfo = (field, value, setFieldValue) => {
    setUserInfo(prevValues => ({ ...prevValues, [field]: value }));
    setFieldValue(prevValues => ({ ...prevValues, [field]: value }));
  };

  const handleAddRow = () => {
    setRows([...rows, { name: '', date: '', phone: '', address: '' }]);
  };

  const initialValues = {
    userInfo:{fullName:  '',
    cwid: '',
    date: '',},
    
    choice: [],
  };

  return activeUser ? (
    <div className='mt-10 sm:mt-0'>
      <div className='mt-10 w-full md:mt-10'>
        <div className='overflow-hidden shadow sm:rounded-md'>
          <div className='border-2 border-gold w-4/5 mx-auto mb-7 px-4 py-5 sm:p-6 '>
            <h1 className='text-center text-4xl font-bold text-gold'>
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
              {({ values, setFieldValue, handleFormSubmit, isSubmitting }) => (
                <Form>
                  <div>
                    <label className='block text-black font-bold mb-2'>
                      Please check the box for all that you agree to:
                    </label>
                    <fieldset className='ml-9'>
                      <div className=' leading-relaxed text-justify'>
                        <input
                          type='checkbox'
                          name='choice'
                          value='authorizeRelease'
                          checked={values.choice.includes('authorizeRelease')}
                          onChange={e => handleAuthorizeRelease(e)}
                          id='authorizeRelease'
                        />

                        <span className='ml-3'>
                          {' '}
                          I hereby authorize the Pre-Medical Advisory Committee
                          of the University of Louisiana at Monroe to release
                          the evaluation of the undersigned to the below listed
                          professional schools and/or programs.
                        </span>
                      </div>
                      <div className=' leading-relaxed text-justify'>
                        <input
                          type='checkbox'
                          name='choice'
                          value='allowEvaluation'
                          checked={values.choice.includes('allowEvaluation')}
                          onChange={e => handleAllowEvaluation(e)}
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
                      <div className=' leading-relaxed text-justify'>
                        <input
                          type='checkbox'
                          name='choice'
                          value='allowAdvertising'
                          checked={values.choice.includes('allowAdvertising')}
                          onChange={e => handleAllowAdvertising(e)}
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
                        <ErrorMessage name='choice' />
                      </div>
                    </fieldset>
                  </div>

                  <h1 className='mb-5 mt-7 text-1xl font-bold'>
                    By signing below, I understand that I am waiving my right to
                    review the evaluation material and agree to the release of
                    my name and school upon acceptance.
                  </h1>

                  <div className='grid grid-cols-6 gap-6 w-full'>
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='fullName'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Name
                      </label>
                      <input
                        type='text'
                        name='userInfo.fullName'
                        id='userInfo.fullName'
                        autoComplete='given-name'
                      />
                   
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='cwid' 
                        className='block text-sm font-medium text-gray-700'
                      >
                        CWID Number
                      </label>
                      <input
                        type='text'
                        name='cwid'
                        id='cwid'
                        defaultValue={userInfo.cwid}
                        onChange={event =>
                          handleUserInfo('cwid', event.target.value)
                        }
                        autoComplete='family-name'
                      />
                      <ErrorMessage className='text-bred italic' name='cwid' />
                    </div>
                  </div>
                  <div className=' mt-5  grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='date'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Date
                      </label>
                      <input
                        type='date'
                        name='date'
                        id='date'
                        defaultValue={userInfo.date}
                        onChange={event =>
                          handleUserInfo('date', event.target.value)
                        }
                      
                      />
                      <ErrorMessage className='text-bred italic' name='date' />
                    </div>
                  </div>

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
                    className='inline-flex items-center gap-1 bg-gold text-white px-1 py-1 mt-5 mr-2 rounded'
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
                    {activeUser.applicationReleaseForm === 'Submitted' ? (
                      <button
                        className='bg-green text-white font-bold py-2 px-4 rounded mt-3  w-1/2'
                        onClick={e => handleFormSubmit(e)}
                      >
                        Update
                      </button>
                    ) : (
                      <div>
                        <button
                          className='bg-green text-white font-bold py-2 px-4 rounded mt-3 mr-3 w-2/2'
                          onClick={e => handleFormSubmit(e)}
                        >
                          Save
                        </button>
                        <button
                          type='submit'
                          disabled={isSubmitting}
                          className='bg-green text-white font-bold py-2 px-4 rounded mt-3  w-2/2'
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


