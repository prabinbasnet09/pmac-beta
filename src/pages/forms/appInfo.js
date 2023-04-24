import Table from '../../components/widgets/Table';
import React, { useState, useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import CountrySelect from '.././../components/CountrySelect';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { ActiveUser } from '../../pages/_app';


export default function AppInfo() {
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

  const [tableOne, setTableOne] = useState([]);
  const [tableTwo, setTableTwo] = useState([]);
  const [tableThree, setTableThree] = useState([]);
  const [tableFour, setTableFour] = useState([]);
  const [tableFive, setTableFive] = useState([]);
  const [tableSix, setTableSix] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');

  const [tableValues, setTableValues] = useState({
    amcasLetterId: '',
    aacomasCasNumber: '',
    caspaCasNumber: '',
    aadsasIdNumber: '',
    aamcId: '',
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    cwid: '',
    number: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    ulm: '',
    alternate: '',
    expectedGrad: '',
    overallGPA: '',
    date: '',
    majors:'', 
    minor:'',

  });

  const initialValues={
    personalInfo: {
      firstName: '',
    lastName: '',
    cwid: '',
    number: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    ulm: '',
    alternate: '',
    expectedGrad: '',
    overallGPA: '',
    date: '',
    majors:'', 
    minor:'',
    }
  }

  const validationSchema = Yup.object().shape({
    personalInfo:Yup.object().shape({
      firstName: Yup.string().required('First Name is required!'),
    lastName: Yup.string().required('Last Name is required!'),
    cwid: Yup.string()
    .required('CWID is required')
    .matches(
      /^[0-9]{8}$/,
      'CWID must be a valid in the format xxxx-xxxx'
    ),
    number: Yup.string().required('Last Name is required!')
    .matches(/^[0-9]{10}$/,
    'Number must be a valid date in the format xxxxxxxxxx'),
    address: Yup.string().required('Address is required!'),
    city: Yup.string().required('City is required!'),
    state: Yup.string().required('State Name is required!'),
    zip: Yup.number().required('Valid Zip code is required!'),
    ulm: Yup.string().email('Email is invalid!').required('Valid ULM email address is required!'),
    alternate: Yup.string().email('Email is invalid!').required('Valid alternate address is required!'),
    expectedGrad: Yup.date().required('Valid graduation date is required!'),
    overallGPA: Yup.string().required('Overall GPA is required!'),
    date: Yup.date().required('Date of Proposed Entrance is required!'),
    majors: Yup.string().required('Major(s) is required!'),
    minor: Yup.string()
    .test('has-strings', 'Please enter at least one string, separated by a comma and a space', (value) => {
      if (!value) {
        return false; // Empty value is not allowed
      }
      const strings = value.split(', ');
      if (strings.length === 1) {
        return true; // Only one string is allowed
      }
      return strings.every(str => str.trim().length > 0); // All strings must have at least one character
    })
    .required('This field is required'),
    })
    


  })

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

  function handleCountryChange(countryCode) {
    setSelectedCountry(countryCode);
  }

  const handlePersonalInfo = (field, value) => {
    setPersonalInfo(prevValues => ({ ...prevValues, [field]: value }));
  };

  const onSubmitHandler = (values, {setSubmitting}) => {
    event.preventDefault();
    const formData = {
      tableValues,
      personalInfo,
      mcat,
      dat,
      oat,
      gre,
      recommenderData,
      tableOne,
      tableTwo,
      tableThree,
      tableFour,
      tableFive,
      tableSix,
    };
    console.log(values, formData);
  };

  return activeUser ? (
    <>
      <div className='mt-9 rounded border-2 border-gold w-4/5 mx-auto mb-7 px-4 py-5 sm:p-6 '>
        <h1 className='text-center text-4xl font-bold text-gold'>
          Applicant Information Form
        </h1>
        <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmitHandler}
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
                        <Field name='personalInfo.firstName' type='text' className='w-full rounded-md  ' />
            <ErrorMessage name='personalInfo.firstName' component='div' className='text-bred'/>
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='lastname'
                          className='block text-sm font-medium text-black'
                        >
                          Last name
                        </label>
                        <Field name='personalInfo.lastName' type='text' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.lastName' component='div' className='text-bred'/>
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='cwid'
                          className='block text-sm font-medium text-black'
                        >
                          ULM CWID #
                        </label>
                        <Field name='personalInfo.cwid' type='text' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.cwid' component='div' className='text-bred'/>
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='number'
                          className='block text-sm font-medium text-black'
                        >
                          Cell Phone
                        </label>
                        <Field name='personalInfo.number' type='text' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.number' component='div' className='text-bred'/>
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='country'
                          className='block text-sm font-medium text-black'
                        >
                          Country
                        </label>
                        <CountrySelect
                          selectedCountry={selectedCountry}
                          onCountryChange={handleCountryChange}
                        />
                        {/* <p>Selected country: {selectedCountry}</p> */}
                      </div>

                      <div className='col-span-6'>
                        <label
                          htmlFor='streetaddress'
                          className='block text-sm font-medium text-black'
                        >
                          Street address
                        </label>
                        <Field name='personalInfo.address' type='text' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.address' component='div' className='text-bred'/>
                      </div>

                      <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                        <label
                          htmlFor='city'
                          className='block text-sm font-medium text-black'
                        >
                          City
                        </label>
                        <Field name='personalInfo.city' type='text' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.city' component='div' className='text-bred'/>
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label
                          htmlFor='region'
                          className='block text-sm font-medium text-black'
                        >
                          State / Province
                        </label>
                        <Field name='personalInfo.state' type='text' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.state' component='div' className='text-bred'/>
                      </div>

                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label
                          htmlFor='postal-code'
                          className='block text-sm font-medium text-black'
                        >
                          ZIP / Postal code
                        </label>
                        <Field name='personalInfo.zip' type='text' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.zip' component='div' className='text-bred'/>
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='email-address'
                          className='block text-sm font-medium text-black'
                        >
                          ULM Email address
                        </label>
                        <Field name='personalInfo.ulm' type='text' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.ulm' component='div' className='text-bred'/>
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='email-address'
                          className='block text-sm font-medium text-black'
                        >
                          Alternative Email address
                        </label>
                        <Field name='personalInfo.alternate' type='text' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.alternate' component='div' className='text-bred'/>
                      </div>



                      <div className='col-span-6 sm:col-span-3'>
                      <label
                          htmlFor='majors'
                          className='block text-sm font-medium text-black'
                        >
                          Major(s)
                          <span className='italic text-sm opacity-50'> [For multiple majors, separate each major by a comma followed by a space. Example: X, X, X]</span> 
                        </label>
                        <Field name='personalInfo.majors' type='text' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.majors' component='div' className='text-bred'/>
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                      <label
                          htmlFor='minor'
                          className='block text-sm font-medium text-black'
                        >
                          Minor(s) <span className='italic text-sm opacity-50'>[For multiple minors, separate each minor by a comma followed by a space. Example: X, X, X]</span>
                        </label>
                        <Field name='personalInfo.minor' type='text' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.minor' component='div' className='text-bred'/>
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='expectedGrad'
                          className='block text-sm font-medium text-black'
                        >
                          Expected Graduation Date From ULM
                        </label>
                        <Field name='personalInfo.expectedGrad' type='date' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.expectedGrad' component='div' className='text-bred'/>
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='overallGPA'
                          className='block text-sm font-medium text-black'
                        >
                          Overall Collegiate GPA
                        </label>
                        <Field name='personalInfo.overallGPA' type='text' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.overallGPA' component='div' className='text-bred'/>
                      </div>
                      <div className='col-span-6 '>
                        <label
                          htmlFor='date'
                          className='block text-sm font-medium text-black'
                        >
                          Date of Proposed Entrance to Professional School
                        </label>
                        <Field name='personalInfo.date' type='date' className='w-full rounded-md  '/>
            <ErrorMessage name='personalInfo.date' component='div' className='text-bred'/>
                      </div>
                      <div className='col-span-6'>
                        <label
                          htmlFor='scores'
                          className='block text-sm font-medium text-black'
                        >
                          <span>
                            Scores of your most recent professional entry exam
                            (MCAT, DAT, OAT, GRE). <br />
                          </span>
                          <span>Please include your breakdown scores.</span>
                        </label>

                        <h3 className='mt-3 mb-3'>MCAT</h3>
                        <table className='w-full mb-5'>
                          <thead>
                            <tr className='bg-red text-white border border-black   '>
                              <th className='border border-black'>
                                Chemical and Physical Foundations of Biological
                                Systems
                              </th>
                              <th className='border border-black'>
                                Critical Analysis and Reasoning Skills
                              </th>
                              <th className='border border-black'>
                                Biological and Biochemical Foundations of Living
                                Systems
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
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <h3 className='mt-3 mb-3'>DAT</h3>
                        <table className='w-full mb-5'>
                          <thead>
                            <tr className='bg-red text-white border border-black   '>
                              <th className='border border-black'>Natural</th>
                              <th className='border border-black'>
                                Perceptual
                              </th>
                              <th className='border border-black'>Reading</th>
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
                                    setDAT({ ...dat, natural: e.target.value })
                                  }
                                  className='w-full px-2 py-1 border-black'
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
                                />
                              </td>
                              <td>
                                <input
                                  type='text'
                                  value={dat.reading}
                                  onChange={e =>
                                    setDAT({ ...dat, reading: e.target.value })
                                  }
                                  className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
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
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <h3 className='mt-3 mb-3'>OAT</h3>
                        <table className='w-full mb-5'>
                          <thead>
                            <tr className='bg-red text-white border border-black   '>
                              <th className='border border-black'>Natural</th>
                              <th className='border border-black'>Reading</th>
                              <th className='border border-black'>Physics</th>
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
                                    setOAT({ ...oat, natural: e.target.value })
                                  }
                                  className='w-full px-2 py-1 border-black'
                                />
                              </td>
                              <td>
                                <input
                                  type='text'
                                  value={oat.reading}
                                  onChange={e =>
                                    setOAT({ ...oat, reading: e.target.value })
                                  }
                                  className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
                                />
                              </td>
                              <td>
                                <input
                                  type='text'
                                  value={oat.physics}
                                  onChange={e =>
                                    setOAT({ ...oat, physics: e.target.value })
                                  }
                                  className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
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
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <h3 className='mt-3 mb-3'>GRE</h3>
                        <table className='w-full mb-5'>
                          <thead>
                            <tr className='bg-red text-white border border-black   '>
                              <th className='border border-black'>Verbal</th>
                              <th className='border border-black'>
                                Quantitative
                              </th>
                              <th className='border border-black'>Writing</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  type='text'
                                  value={gre.verbal}
                                  onChange={e =>
                                    setGRE({ ...gre, verbal: e.target.value })
                                  }
                                  className='w-full px-2 py-1 border-black'
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
                                />
                              </td>
                              <td>
                                <input
                                  type='text'
                                  value={gre.writing}
                                  onChange={e =>
                                    setGRE({ ...gre, writing: e.target.value })
                                  }
                                  className='w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2'
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div className='col-span-6 mb-5'>
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
                        </div>

                        <div className='col-span-6 mb-5'>
                          <label
                            htmlFor='appIDType'
                            className='block text-sm font-medium text-black'
                          >
                            Depending on the type pf application, fill in the
                            appropriate ID numbers.
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
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      name='aacomasCasNumber'
                                      value={tableValues.aacomasCasNumber}
                                      onChange={handleInputChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      name='caspaCasNumber'
                                      value={tableValues.caspaCasNumber}
                                      onChange={handleInputChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      name='aadsasIdNumber'
                                      value={tableValues.aadsasIdNumber}
                                      onChange={handleInputChange}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type='text'
                                      name='aamcId'
                                      value={tableValues.aamcId}
                                      onChange={handleInputChange}
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
                                        List any memberships/activities, work,
                                        professional experiences, honors/awards
                                        and volunteer experiences for each
                                        semester and summer during your
                                        collegiate career. Please use additional
                                        paper if necessary. Where applicable,
                                        provide numbers of hours associated with
                                        that task per week.
                                      </p>
                                    </div>
                                    <h2 className='text-xl font-bold mb-2'>
                                      {' '}
                                      Membership/Academic Clubs{' '}
                                    </h2>
                                    <Table
                                      className='w-full'
                                      headings={headingsone}
                                      onTableDataChange={handleTableOneChange}
                                    />

                                    <h2 className='text-xl font-bold mb-2 mt-10'>
                                      {' '}
                                      Work{' '}
                                    </h2>
                                    <Table
                                      className='w-full'
                                      headings={headingstwo}
                                      onTableDataChange={handleTableTwoChange}
                                    />

                                    <h2 className='text-xl font-bold mt-10'>
                                      {' '}
                                      Experiences within Chosen Field{' '}
                                    </h2>
                                    <Table
                                      className='w-full'
                                      headings={headingsthree}
                                      onTableDataChange={handleTableThreeChange}
                                    />

                                    <h2 className='text-xl font-bold mt-10'>
                                      {' '}
                                      Honors and Awards{' '}
                                    </h2>
                                    <Table
                                      className='w-full'
                                      headings={headingsfour}
                                      onTableDataChange={handleTableFourChange}
                                    />

                                    <h2 className='text-xl font-bold mt-10'>
                                      {' '}
                                      Laboratory Research{' '}
                                    </h2>
                                    <Table
                                      className='w-full'
                                      headings={headingsfive}
                                      onTableDataChange={handleTableFiveChange}
                                    />

                                    <h2 className='text-xl font-bold mt-10'>
                                      {' '}
                                      Volunteer Experiences{' '}
                                    </h2>
                                    <Table
                                      className='w-full'
                                      headings={headingssix}
                                      onTableDataChange={handleTableSixChange}
                                    />
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

          <div className='flex justify-center'>
            <button
              type='submit'
              className='  bg-green hover:opracity-50 text-white font-bold py-2 px-4 rounded'
            >
              Submit{' '}
            </button>
          </div>
        </Form>
         )}
         </Formik>
      </div>
    </>
  ) : null;
}
