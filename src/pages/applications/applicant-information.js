import Table from '../../components/widgets/Table';
import React, { useState, useContext, useEffect } from 'react';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { API } from 'aws-amplify';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';

export default function ApplicantInformation() {
  const router = useRouter();
  const { user } = router.query;

  const [tableOne, setTableOne] = useState([
    {
      activity: '',
      yearsAndHours: '',
      descriInvolve: '',
    },
  ]);
  const [tableTwo, setTableTwo] = useState([
    { work: '', yearsHours: '', positionDescrip: '' },
  ]);

  const [tableThree, setTableThree] = useState([
    { experience: '', yearsAndTotalHours: '', dutiesDescriptionExperience: '' },
  ]);

  const [tableFour, setTableFour] = useState([
    { honorsAward: '', receivedDate: '', awardDescription: '' },
  ]);

  const [tableFive, setTableFive] = useState([
    { projectName: '', yearsAndHrs: '', descripDuties: '' },
  ]);

  const [tableSix, setTableSix] = useState([
    { experience: '', indivGroup: '', dateHours: '' },
  ]);

  const [tableValues, setTableValues] = useState({
    amcasLetterId: '',
    aacomasCasNumber: '',
    caspaCasNumber: '',
    aadsasIdNumber: '',
    aamcId: '',
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    date: '',
    cwid: '',
    number: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    ulm: '',
    alternate: '',
    expectedGrad: '',
    overallGPA: 0.0,
    entranceDate: '',
    majors: '',
    minor: '',
    selectedCountry: '',
    examDate: '',
    schoolApplication: '',
  };

  const [mcat, setMCAT] = useState({
    chemical: '',
    critical: '',
    biological: '',
    psychological: '',
  });
  const [dat, setDAT] = useState({
    natural: '',
    perceptual: '',
    reading: '',
    quantitative: '',
  });
  const [oat, setOAT] = useState({
    natural: '',
    reading: '',
    physics: '',
    quantitative: '',
  });
  const [gre, setGRE] = useState({
    verbal: '',
    quantitative: '',
    writing: '',
  });

  const [recommenderData, setrecommenderData] = useState([
    ['', '', ''],
    ['', '', ''],
  ]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await API.graphql({
          query: queries.getApplicantForm,
          variables: { userId: user },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })
          .then(res => {
            console.log(res);
            const data = res.data.getApplicantForm;
            if (data) {
              initialValues.firstName = data.firstName;
              initialValues.lastName = data.lastName;
              initialValues.date = data.date;
              initialValues.cwid = data.cwid;
              initialValues.number = data.cellPhone;
              initialValues.address = data.streetAddress;
              initialValues.city = data.city;
              initialValues.state = data.state;
              initialValues.zip = data.zipCode;
              initialValues.ulm = data.email;
              initialValues.alternate = data.alternativeEmail;
              initialValues.expectedGrad = data.expectedGraduation;
              initialValues.overallGPA = data.gpa;
              initialValues.entranceDate = data.entranceDate;
              initialValues.majors = data.major;
              initialValues.minor = data.minor;
              initialValues.selectedCountry = data.country;
              initialValues.examDate = data.examDate;
              initialValues.schoolApplication = data.schoolApplication;
              setMCAT(JSON.parse(data.entryExams).mcat);
              setDAT(JSON.parse(data.entryExams).dat);
              setOAT(JSON.parse(data.entryExams).oat);
              setGRE(JSON.parse(data.entryExams).gre);
              setTableOne(JSON.parse(data.involvement));
              setTableTwo(JSON.parse(data.workExperience));
              setTableThree(JSON.parse(data.fieldExperience));
              setTableFour(JSON.parse(data.honors));
              setTableFive(JSON.parse(data.labResearch));
              setTableSix(JSON.parse(data.volunteer));
              setrecommenderData(JSON.parse(data.facultyEvaluators));
              setTableValues(JSON.parse(data.applicationID));
            }
          })
          .catch(err => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    user && fetchData();
  }, [user]);

  const headingsone = [
    'Activity',
    'Years and Total Hours',
    'Description of Involvement',
  ];
  const headingstwo = [
    'Work',
    'Years and Total Hours',
    'Description of Position and Duties',
  ];
  const headingsthree = [
    'Experience',
    'Years and Total Hours',
    'Description of Experience and Duties',
  ];
  const headingsfour = ['Honor/Award', 'Received Date', 'Description of Award'];
  const headingsfive = [
    'Research Project Name',
    'Academic Years and Hours',
    'Description of Project and Your Duties ',
  ];
  const headingssix = [
    'Expierence: Description of Experience',
    'Individual or Group',
    'Dates and Hours',
  ];

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required!'),
    lastName: Yup.string().required('Last Name is required!'),
    date: Yup.date().required('Date is required!'),
    cwid: Yup.string()
      .required('CWID is required!')
      .matches(/^[0-9]{8}$/, 'CWID must be a valid in the format xxxx-xxxx'),
    number: Yup.string()
      .required('Phone number is required!')
      .matches(
        /^[0-9]{10}$/,
        'Number must be a valid date in the format xxxxxxxxxx'
      ),
    address: Yup.string().required('Address is required!'),
    city: Yup.string().required('City is required!'),
    state: Yup.string().required('State Name is required!'),
    zip: Yup.number().required('Valid Zip code is required!'),
    ulm: Yup.string()
      .email('Email is invalid!')
      .required('Valid ULM email address is required!'),
    alternate: Yup.string()
      .email('Email is invalid!')
      .required('Valid alternate address is required!'),
    expectedGrad: Yup.date().required('Valid graduation date is required!'),
    overallGPA: Yup.number().required('Overall GPA is required!'),
    entranceDate: Yup.date().required('Date of Proposed Entrance is required!'),
    selectedCountry: Yup.string().required('Country name is required!'),
    majors: Yup.string()
      .matches(
        /^[A-Za-z, ]+$/,
        'Multiple Majors must be in the above mentioned format!'
      )
      .required('Major(s) is required!'),
    minor: Yup.string().matches(
      /^[A-Za-z, ]+$/,
      'Multiple Minors must be in the above mentioned format!'
    ),
    examDate: Yup.date().required('Exam Date is required!'),
    schoolApplication: Yup.string().required('School Application is required!'),
  });

  const handleTableOneChange = newData => {
    setTableOne(newData);
  };
  const handleTableTwoChange = newData => {
    setTableTwo(newData);
  };
  const handleTableThreeChange = newData => {
    setTableThree(newData);
  };
  const handleTableFourChange = newData => {
    setTableFour(newData);
  };
  const handleTableFiveChange = newData => {
    setTableFive(newData);
  };
  const handleTableSixChange = newData => {
    setTableSix(newData);
  };

  const handleRecommenderChange = (e, row, col) => {
    const newData = [...recommenderData];
    newData[row][col] = e.target.value;
    setrecommenderData(newData);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTableValues({ ...tableValues, [name]: value });
  };

  return user ? (
    <>
      <div className='mt-9 rounded border-2 border-gold w-4/5 mx-auto mb-7 px-4 py-5 sm:p-6 '>
        <h1 className='text-center text-4xl font-bold text-gold'>
          Applicant Information Form
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <div className=' sm:mt-0'>
                <div>
                  <div className=' w-full md:mt-10'>
                    <div className='overflow-hidden'>
                      <div className='px-4 py-5 sm:p-6'>
                        <div className='grid grid-cols-6 gap-6'>
                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='firstName'
                              className='block text-sm font-medium text-black'
                            >
                              First name
                            </label>
                            <Field
                              name='firstName'
                              type='text'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='firstName'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='lastname'
                              className='block text-sm font-medium text-black'
                            >
                              Last name
                            </label>
                            <Field
                              name='lastName'
                              type='text'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='lastName'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='date'
                              className='block text-sm font-medium text-black'
                            >
                              Date
                            </label>
                            <Field
                              name='date'
                              type='date'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='date'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='cwid'
                              className='block text-sm font-medium text-black'
                            >
                              ULM CWID #
                            </label>
                            <Field
                              name='cwid'
                              type='text'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='cwid'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='number'
                              className='block text-sm font-medium text-black'
                            >
                              Cell Phone
                            </label>
                            <Field
                              name='number'
                              type='text'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='number'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='country'
                              className='block text-sm font-medium text-black'
                            >
                              Country
                            </label>
                            <Field
                              name='selectedCountry'
                              type='text'
                              className='w-full rounded-md  '
                              disabled={true}
                            />

                            <ErrorMessage
                              name='selectedCountry'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6'>
                            <label
                              htmlFor='streetaddress'
                              className='block text-sm font-medium text-black'
                            >
                              Street address
                            </label>
                            <Field
                              name='address'
                              type='text'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='address'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                            <label
                              htmlFor='city'
                              className='block text-sm font-medium text-black'
                            >
                              City
                            </label>
                            <Field
                              name='city'
                              type='text'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='city'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                            <label
                              htmlFor='region'
                              className='block text-sm font-medium text-black'
                            >
                              State / Province
                            </label>
                            <Field
                              name='state'
                              type='text'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='state'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                            <label
                              htmlFor='postal-code'
                              className='block text-sm font-medium text-black'
                            >
                              ZIP / Postal code
                            </label>
                            <Field
                              name='zip'
                              type='text'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='zip'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='email-address'
                              className='block text-sm font-medium text-black'
                            >
                              ULM Email address
                            </label>
                            <Field
                              name='ulm'
                              type='text'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='ulm'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='email-address'
                              className='block text-sm font-medium text-black'
                            >
                              Alternative Email address
                            </label>
                            <Field
                              name='alternate'
                              type='text'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='alternate'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='majors'
                              className='block text-sm font-medium text-black'
                            >
                              Major(s)
                              <span className='italic text-sm opacity-50'>
                                {' '}
                                [For multiple majors, separate each major by a
                                comma followed by a space. Example: X, X, X]
                              </span>
                            </label>
                            <Field
                              name='majors'
                              type='text'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='majors'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='minor'
                              className='block text-sm font-medium text-black'
                            >
                              Minor(s){' '}
                              <span className='italic text-sm opacity-50'>
                                [For multiple minors, separate each minor by a
                                comma followed by a space. Example: X, X, X]
                              </span>
                            </label>
                            <Field
                              name='minor'
                              type='text'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='minor'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='expectedGrad'
                              className='block text-sm font-medium text-black'
                            >
                              Expected Graduation Date From ULM
                            </label>
                            <Field
                              name='expectedGrad'
                              type='date'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='expectedGrad'
                              component='div'
                              className='text-bred'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='overallGPA'
                              className='block text-sm font-medium text-black'
                            >
                              Overall Collegiate GPA
                            </label>
                            <Field
                              name='overallGPA'
                              type='number'
                              className='w-full rounded-md  '
                              step='0.01'
                              disabled={true}
                            />
                            <ErrorMessage
                              name='overallGPA'
                              component='div'
                              className='text-bred'
                            />
                          </div>
                          <div className='col-span-6 '>
                            <label
                              htmlFor='entranceDate'
                              className='block text-sm font-medium text-black'
                            >
                              Date of Proposed Entrance to Professional School
                            </label>
                            <Field
                              name='entranceDate'
                              type='date'
                              className='w-full rounded-md  '
                              disabled={true}
                            />
                            <ErrorMessage
                              name='entranceDate'
                              component='div'
                              className='text-bred'
                            />
                          </div>
                          <div className='col-span-6'>
                            <label
                              htmlFor='scores'
                              className='block text-sm font-medium text-black'
                            >
                              <span>
                                Scores of your most recent professional entry
                                exam (MCAT, DAT, OAT, GRE). <br />
                              </span>
                              <span>Please include your breakdown scores.</span>
                            </label>

                            <h3 className='mt-3 mb-3'>MCAT</h3>
                            <table className='w-full mb-5'>
                              <thead>
                                <tr className='bg-red text-white border border-black   '>
                                  <th className='border border-black'>
                                    Chemical and Physical Foundations of
                                    Biological Systems
                                  </th>
                                  <th className='border border-black'>
                                    Critical Analysis and Reasoning Skills
                                  </th>
                                  <th className='border border-black'>
                                    Biological and Biochemical Foundations of
                                    Living Systems
                                  </th>
                                  <th className='border border-black'>
                                    Psychological, Social, and Biological
                                    Foundations of Behavior
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <input
                                      type='text'
                                      value={mcat.chemical}
                                      onChange={e =>
                                        setMCAT({
                                          ...mcat,
                                          chemical: e.target.value,
                                        })
                                      }
                                      disabled={true}
                                      className='w-full px-2 py-1 border-black'
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      value={mcat.critical}
                                      onChange={e =>
                                        setMCAT({
                                          ...mcat,
                                          critical: e.target.value,
                                        })
                                      }
                                      disabled={true}
                                      className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      value={mcat.biological}
                                      onChange={e =>
                                        setMCAT({
                                          ...mcat,
                                          biological: e.target.value,
                                        })
                                      }
                                      className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      value={mcat.psychological}
                                      onChange={e =>
                                        setMCAT({
                                          ...mcat,
                                          psychological: e.target.value,
                                        })
                                      }
                                      className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
                                      disabled={true}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <h3 className='mt-3 mb-3'>DAT</h3>
                            <table className='w-full mb-5'>
                              <thead>
                                <tr className='bg-red text-white border border-black   '>
                                  <th className='border border-black'>
                                    Natural
                                  </th>
                                  <th className='border border-black'>
                                    Perceptual
                                  </th>
                                  <th className='border border-black'>
                                    Reading
                                  </th>
                                  <th className='border border-black'>
                                    Quantitative
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <input
                                      type='text'
                                      value={dat.natural}
                                      onChange={e =>
                                        setDAT({
                                          ...dat,
                                          natural: e.target.value,
                                        })
                                      }
                                      className='w-full px-2 py-1 border-black'
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      value={dat.perceptual}
                                      onChange={e =>
                                        setDAT({
                                          ...dat,
                                          perceptual: e.target.value,
                                        })
                                      }
                                      className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      value={dat.reading}
                                      onChange={e =>
                                        setDAT({
                                          ...dat,
                                          reading: e.target.value,
                                        })
                                      }
                                      className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      value={dat.quantitative}
                                      onChange={e =>
                                        setDAT({
                                          ...dat,
                                          quantitative: e.target.value,
                                        })
                                      }
                                      className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
                                      disabled={true}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <h3 className='mt-3 mb-3'>OAT</h3>
                            <table className='w-full mb-5'>
                              <thead>
                                <tr className='bg-red text-white border border-black   '>
                                  <th className='border border-black'>
                                    Natural
                                  </th>
                                  <th className='border border-black'>
                                    Reading
                                  </th>
                                  <th className='border border-black'>
                                    Physics
                                  </th>
                                  <th className='border border-black'>
                                    Quantitative
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <input
                                      type='text'
                                      value={oat.natural}
                                      onChange={e =>
                                        setOAT({
                                          ...oat,
                                          natural: e.target.value,
                                        })
                                      }
                                      className='w-full px-2 py-1 border-black'
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      value={oat.reading}
                                      onChange={e =>
                                        setOAT({
                                          ...oat,
                                          reading: e.target.value,
                                        })
                                      }
                                      className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      value={oat.physics}
                                      onChange={e =>
                                        setOAT({
                                          ...oat,
                                          physics: e.target.value,
                                        })
                                      }
                                      className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      value={oat.quantitative}
                                      onChange={e =>
                                        setOAT({
                                          ...oat,
                                          quantitative: e.target.value,
                                        })
                                      }
                                      className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
                                      disabled={true}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <h3 className='mt-3 mb-3'>GRE</h3>
                            <table className='w-full mb-5'>
                              <thead>
                                <tr className='bg-red text-white border border-black   '>
                                  <th className='border border-black'>
                                    Verbal
                                  </th>
                                  <th className='border border-black'>
                                    Quantitative
                                  </th>
                                  <th className='border border-black'>
                                    Writing
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <input
                                      type='text'
                                      value={gre.verbal}
                                      onChange={e =>
                                        setGRE({
                                          ...gre,
                                          verbal: e.target.value,
                                        })
                                      }
                                      className='w-full px-2 py-1 border-black'
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      value={gre.quantitative}
                                      onChange={e =>
                                        setGRE({
                                          ...gre,
                                          quantitative: e.target.value,
                                        })
                                      }
                                      className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      value={gre.writing}
                                      onChange={e =>
                                        setGRE({
                                          ...gre,
                                          writing: e.target.value,
                                        })
                                      }
                                      className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
                                      disabled={true}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <div className='col-span-6 mb-5'>
                              <label
                                htmlFor='examDate'
                                className='block text-sm font-medium text-black'
                              >
                                Date of exam taken or expected date of exam
                              </label>
                              <Field
                                name='examDate'
                                type='date'
                                className='w-full rounded-md  '
                                disabled={true}
                              />
                              <ErrorMessage
                                name='examDate'
                                component='div'
                                className='text-bred'
                              />
                            </div>

                            {/* <div className='col-span-6 mb-5'>
                              <label
                                htmlFor='appType'
                                className='block text-sm font-medium text-black'
                              >
                                Type of School Application will be sent
                              </label>
                              <input
                                type='text'
                                id='appType'
                                name='appType'
                                className='w-full rounded-md'
                              />
                            </div> */}

                            <div className='col-span-6 mb-5'>
                              <label
                                htmlFor='schoolApplication'
                                className='block text-sm font-medium text-black'
                              >
                                Type of School Application will be sent
                              </label>
                              <Field
                                name='schoolApplication'
                                type='text'
                                className='w-full rounded-md  '
                                disabled={true}
                              />
                              <ErrorMessage
                                name='schoolApplication'
                                component='div'
                                className='text-bred'
                              />
                            </div>

                            <div className='col-span-6 mb-5'>
                              <label
                                htmlFor='appIDType'
                                className='block text-sm font-medium text-black'
                              >
                                Depending on the type of application, fill in
                                the appropriate ID numbers.
                              </label>
                              <div className='overflow-x-auto'>
                                <table className='border-collapse border border-black'>
                                  <thead className='bg-red text-white'>
                                    <tr>
                                      <th className='border border-black '>
                                        AMCAS Letter ID
                                      </th>
                                      <th className='border border-black'>
                                        AACOMAS CAS #
                                      </th>
                                      <th className='border border-black'>
                                        CASPA CAS #
                                      </th>
                                      <th className='border border-black'>
                                        AADSAS ID #
                                      </th>
                                      <th className='border border-black'>
                                        AAMC ID
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <input
                                          type='text'
                                          name='amcasLetterId'
                                          value={tableValues.amcasLetterId}
                                          onChange={handleInputChange}
                                          disabled={true}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type='text'
                                          name='aacomasCasNumber'
                                          value={tableValues.aacomasCasNumber}
                                          onChange={handleInputChange}
                                          disabled={true}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type='text'
                                          name='caspaCasNumber'
                                          value={tableValues.caspaCasNumber}
                                          onChange={handleInputChange}
                                          disabled={true}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type='text'
                                          name='aadsasIdNumber'
                                          value={tableValues.aadsasIdNumber}
                                          onChange={handleInputChange}
                                          disabled={true}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type='text'
                                          name='aamcId'
                                          value={tableValues.aamcId}
                                          onChange={handleInputChange}
                                          disabled={true}
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div className='col-span-6'>
                              <label
                                htmlFor='faculty'
                                className='block text-sm font-medium text-black'
                              >
                                Faculty Members Submitting Evaluation on your
                                Behalf:
                              </label>
                            </div>
                            <table className='border-collapse border border-black w-full'>
                              <thead className='bg-red text-white'>
                                <tr>
                                  <th className='border border-black'>Name</th>
                                  <th className='border border-black'>Title</th>
                                  <th className='border border-black'>
                                    Department
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {recommenderData.map((row, i) => (
                                  <tr key={i}>
                                    {row.map((cell, j) => (
                                      <td key={j}>
                                        <input
                                          className='w-full'
                                          type='text'
                                          value={cell}
                                          onChange={e =>
                                            handleRecommenderChange(e, i, j)
                                          }
                                          disabled={true}
                                        />
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            <div className='mb-5'>
                              <div className='mt-10 sm:mt-0'>
                                <div>
                                  <div className='overflow-hidden sm:rounded-md'>
                                    <div className=''>
                                      <div className='mt-10 w-full md:mt-10'>
                                        <div className='mt-5 mb-5 text-black font-bold text-2lg mx-auto'>
                                          <p className='leading-relaxed text-justify'>
                                            List any memberships/activities,
                                            work, professional experiences,
                                            honors/awards and volunteer
                                            experiences for each semester and
                                            summer during your collegiate
                                            career. Please use additional paper
                                            if necessary. Where applicable,
                                            provide numbers of hours associated
                                            with that task per week.
                                          </p>
                                        </div>
                                        <h2 className='text-xl font-bold mb-2'>
                                          {' '}
                                          Membership/Academic Clubs{' '}
                                        </h2>
                                        <div className='overflow-x-auto'>
                                          <table className='table-auto border-collapse border border-black w-full bg-red opacity-75 text-white '>
                                            <thead>
                                              <tr>
                                                {headingsone.map(
                                                  (heading, index) => (
                                                    <th
                                                      key={index}
                                                      className='border border-black px-4 py-2'
                                                    >
                                                      {heading}
                                                    </th>
                                                  )
                                                )}
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {tableOne.map(
                                                (tableOne, index) => (
                                                  <tr key={index}>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableOne.activity
                                                        }
                                                        onChange={event =>
                                                          handleOneRowChange(
                                                            index,
                                                            'activity',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableOne.yearsAndHours
                                                        }
                                                        onChange={event =>
                                                          handleOneRowChange(
                                                            index,
                                                            'yearsAndHours',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableOne.descriInvolve
                                                        }
                                                        onChange={event =>
                                                          handleOneRowChange(
                                                            index,
                                                            'descriInvolve',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                  </tr>
                                                )
                                              )}
                                            </tbody>
                                          </table>
                                        </div>

                                        <h2 className='text-xl font-bold mb-2 mt-10'>
                                          {' '}
                                          Work{' '}
                                        </h2>

                                        <div className='overflow-x-auto'>
                                          <table className='table-auto border-collapse border border-black w-full bg-red opacity-75 text-white '>
                                            <thead>
                                              <tr>
                                                {headingstwo.map(
                                                  (heading, index) => (
                                                    <th
                                                      key={index}
                                                      className='border border-black px-4 py-2'
                                                    >
                                                      {heading}
                                                    </th>
                                                  )
                                                )}
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {tableTwo.map(
                                                (tableTwo, index) => (
                                                  <tr key={index}>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableTwo.work
                                                        }
                                                        onChange={event =>
                                                          handleTwoRowChange(
                                                            index,
                                                            'work',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableTwo.yearsHours
                                                        }
                                                        onChange={event =>
                                                          handleTwoRowChange(
                                                            index,
                                                            'yearsHours',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableTwo.positionDescrip
                                                        }
                                                        onChange={event =>
                                                          handleTwoRowChange(
                                                            index,
                                                            'positionDescrip',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                  </tr>
                                                )
                                              )}
                                            </tbody>
                                          </table>
                                        </div>

                                        <h2 className='text-xl font-bold mt-10'>
                                          {' '}
                                          Experiences within Chosen Field{' '}
                                        </h2>

                                        <div className='overflow-x-auto'>
                                          <table className='table-auto border-collapse border border-black w-full bg-red opacity-75 text-white '>
                                            <thead>
                                              <tr>
                                                {headingsthree.map(
                                                  (heading, index) => (
                                                    <th
                                                      key={index}
                                                      className='border border-black px-4 py-2'
                                                    >
                                                      {heading}
                                                    </th>
                                                  )
                                                )}
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {tableThree.map(
                                                (tableThree, index) => (
                                                  <tr key={index}>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableThree.experience
                                                        }
                                                        onChange={event =>
                                                          handleThreeRowChange(
                                                            index,
                                                            'experience',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableThree.yearsAndTotalHours
                                                        }
                                                        onChange={event =>
                                                          handleThreeRowChange(
                                                            index,
                                                            'yearsAndTotalHours',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableThree.dutiesDescriptionExperience
                                                        }
                                                        onChange={event =>
                                                          handleThreeRowChange(
                                                            index,
                                                            'dutiesDescriptionExperience',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                  </tr>
                                                )
                                              )}
                                            </tbody>
                                          </table>
                                        </div>

                                        <h2 className='text-xl font-bold mt-10'>
                                          {' '}
                                          Honors and Awards{' '}
                                        </h2>

                                        <div className='overflow-x-auto'>
                                          <table className='table-auto border-collapse border border-black w-full bg-red opacity-75 text-white '>
                                            <thead>
                                              <tr>
                                                {headingsfour.map(
                                                  (heading, index) => (
                                                    <th
                                                      key={index}
                                                      className='border border-black px-4 py-2'
                                                    >
                                                      {heading}
                                                    </th>
                                                  )
                                                )}
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {tableFour.map(
                                                (tableFour, index) => (
                                                  <tr key={index}>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableFour.honorsAward
                                                        }
                                                        onChange={event =>
                                                          handleFourRowChange(
                                                            index,
                                                            'honorsAward',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableFour.receivedDate
                                                        }
                                                        onChange={event =>
                                                          handleFourRowChange(
                                                            index,
                                                            'receivedDate',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableFour.awardDescription
                                                        }
                                                        onChange={event =>
                                                          handleFourRowChange(
                                                            index,
                                                            'awardDescription',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                  </tr>
                                                )
                                              )}
                                            </tbody>
                                          </table>
                                        </div>

                                        <h2 className='text-xl font-bold mt-10'>
                                          {' '}
                                          Laboratory Research{' '}
                                        </h2>

                                        <div className='overflow-x-auto'>
                                          <table className='table-auto border-collapse border border-black w-full bg-red opacity-75 text-white '>
                                            <thead>
                                              <tr>
                                                {headingsfive.map(
                                                  (heading, index) => (
                                                    <th
                                                      key={index}
                                                      className='border border-black px-4 py-2'
                                                    >
                                                      {heading}
                                                    </th>
                                                  )
                                                )}
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {tableFive.map(
                                                (tableFive, index) => (
                                                  <tr key={index}>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableFive.projectName
                                                        }
                                                        onChange={event =>
                                                          handleFiveRowChange(
                                                            index,
                                                            'projectName',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableFive.yearsAndHrs
                                                        }
                                                        onChange={event =>
                                                          handleFiveRowChange(
                                                            index,
                                                            'yearsAndHrs',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableFive.descripDuties
                                                        }
                                                        onChange={event =>
                                                          handleFiveRowChange(
                                                            index,
                                                            'descripDuties',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                  </tr>
                                                )
                                              )}
                                            </tbody>
                                          </table>
                                        </div>

                                        <h2 className='text-xl font-bold mt-10'>
                                          {' '}
                                          Volunteer Experiences{' '}
                                        </h2>

                                        <div className='overflow-x-auto'>
                                          <table className='table-auto border-collapse border border-black w-full bg-red opacity-75 text-white '>
                                            <thead>
                                              <tr>
                                                {headingssix.map(
                                                  (heading, index) => (
                                                    <th
                                                      key={index}
                                                      className='border border-black px-4 py-2'
                                                    >
                                                      {heading}
                                                    </th>
                                                  )
                                                )}
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {tableSix.map(
                                                (tableSix, index) => (
                                                  <tr key={index}>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableSix.experience
                                                        }
                                                        onChange={event =>
                                                          handleSixRowChange(
                                                            index,
                                                            'experience',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableSix.indivGroup
                                                        }
                                                        onChange={event =>
                                                          handleSixRowChange(
                                                            index,
                                                            'indivGroup',
                                                            event.target.value
                                                          )
                                                        }
                                                      />
                                                    </td>
                                                    <td className='border border-black '>
                                                      <textarea
                                                        rows={4}
                                                        className='border-none w-full text-black'
                                                        type='text'
                                                        defaultValue={
                                                          tableSix.dateHours
                                                        }
                                                        onChange={event =>
                                                          handleSixRowChange(
                                                            index,
                                                            'dateHours',
                                                            event.target.value
                                                          )
                                                        }
                                                        disabled={true}
                                                      />
                                                    </td>
                                                  </tr>
                                                )
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  ) : null;
}
