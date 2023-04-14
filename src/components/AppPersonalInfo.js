import React, { useState } from 'react';
<<<<<<< HEAD
import CountrySelect from './CountrySelect';
import Select from 'react-select';
import Table from './Table';

const majors = [
  { value: "bio", label: "Biology" },
  { value: "chem", label: "Chemistry" },
  { value: "phy", label: "Physics" },
  { value: "psych", label: "Psychology" },
  { value: "biochem", label: "Biochemistry" },
  { value: "math", label: "Mathematics" },
  { value: "cs", label: "Computer Science" },
  { value: "me", label: "Mechanical Engineering" },
  { value: "ee", label: "Electrical Engineering" },
  { value: "ce", label: "Civil Engineering" },
];

const minors = [
  { value: "bio", label: "Biology" },
  { value: "chem", label: "Chemistry" },
  { value: "phy", label: "Physics" },
  { value: "psych", label: "Psychology" },
  { value: "biochem", label: "Biochemistry" },
  { value: "math", label: "Mathematics" },
  { value: "phil", label: "Philosophy" },
  { value: "lang", label: "Foreign Language" },
  
];

export default function AppPersonalInfo() {

  const headingsone = ['Activity', 'Years and Total Hours', 'Description of Involvement(Indicate leadership position if appropriate)'];
    const headingstwo = ['Work', 'Years and Total Hours', 'Description of Position and Duties'];
    const headingsthree = ['Experience', 'Years and Total Hours', 'Description of Experience and Duties'];
    const headingsfour = ['Honor/Award', 'Received Date', 'Description of Award'];
    const headingsfive = ['Research Project Name', 'Academic Years and Hours', 'Description of Project and Your Duties '];
    const headingssix = ['Expierence: Description of Experience', 'Individual or Group', 'Dates and Hours'];

    const [tableOne, setTableOne]=useState([]);
    const [tableTwo, setTableTwo]=useState([]);
    const [tableThree, setTableThree]=useState([]);
    const [tableFour, setTableFour]=useState([]);
    const [tableFive, setTableFive]=useState([]);
    const [tableSix, setTableSix]=useState([]);
    
  const [selectedCountry, setSelectedCountry] = useState('');

  const [selectedMajors, setSelectedMajors] = useState([]);
  const [selectedMinors, setSelectedMinors] = useState([]);

  const [tableValues, setTableValues] = useState({
    amcasLetterId: '',
    aacomasCasNumber: '',
    caspaCasNumber: '',
    aadsasIdNumber: '',
    aamcId: ''
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    cwid: '',
    number: '',
    address: '',
    city:'',
    state:'',
    zip: '',
    ulm: '',
    alternate: '',
    expectedGrad:'',
    overallGPA: '',
    date: '',
    scores: '',
    examDate: '',
    appType: '',
    faculty: '',
});

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

const [recommenderData, setrecommenderData] = useState([    ["", "", ""],
    ["", "", ""],
  ]);

  const handleTableOneChange = (newData) => {
    setTableOne(newData);
  };
  const handleTableTwoChange = (newData) => {
    setTableTwo(newData);
  };
  const handleTableThreeChange = (newData) => {
    setTableThree(newData);
  };
  const handleTableFourChange = (newData) => {
    setTableFour(newData);
  };
  const handleTableFiveChange = (newData) => {
    setTableFive(newData);
  };
  const handleTableSixChange = (newData) => {
    setTableSix(newData);
  };

  const handleRecommenderChange = (e, row, col) => {
    const newData = [...recommenderData];
    newData[row][col] = e.target.value;
    setrecommenderData(newData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTableValues({ ...tableValues, [name]: value });
  }

  const handleMajorChange = (selectedOptions) => {
    setSelectedMajors(selectedOptions);
  };

  const handleMinorChange = (selectedOptions) => {
    setSelectedMinors(selectedOptions);
  };
  

  
  function handleCountryChange(countryCode) {
    setSelectedCountry(countryCode);
  }

    const handlePersonalInfo = (field, value) => {
      setPersonalInfo(prevValues => ({ ...prevValues, [field]: value }));
      
    };

    const onSubmitHandler = () => {}


    return (
      <>
    <form onSubmit={onSubmitHandler}>
      <div className=" sm:mt-0">
          <div >
            
          
            <div className=" w-full md:mt-10">
              
                <div className="overflow-hidden">
              
                  <div className="px-4 py-5 sm:p-6">
=======
import {useForm} from 'react-hook-form';
import AppAcademicInfo from './AppAcademicInfo';
import Table from './Table'


export default function AppPersonalInfo({ formData, onChangeForm, errors }) {
  const { register } = useForm();

  register('firstName', { onChange: (e) => onChangeForm(e) });
  register('lastName', { onChange: (e) => onChangeForm(e) });
  register('cwid', { onChange: (e) => onChangeForm(e) });
  register('number', { onChange: (e) => onChangeForm(e) });
  register('country', { onChange: (e) => onChangeForm(e) });
  register('address', { onChange: (e) => onChangeForm(e) });
  register('city', { onChange: (e) => onChangeForm(e) });
  register('state', { onChange: (e) => onChangeForm(e) });
  register('zip', { onChange: (e) => onChangeForm(e) });
  register('ulm', { onChange: (e) => onChangeForm(e) });
  register('alternate', { onChange: (e) => onChangeForm(e) });

  // const [nextPages, setNextPages] = useState(false);

  // const nextPage = () => {
  //   setNextPages(true);
  // }

    return (
      <>
     {/* { !nextPages &&  */}
      <div className=" sm:mt-0">
          <div >
          
            <div className=" w-full md:mt-10">
              
                <div className="overflow-hidden shadow sm:rounded-md">
                <h1>Personal Information</h1>
                  <div className="bg-white px-4 py-5 sm:p-6">
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
                    
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" 
<<<<<<< HEAD
                        className="block text-sm font-medium text-black"
=======
                        className="block text-sm font-medium text-gray-700"
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
                       >
                          First name  
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
<<<<<<< HEAD
                          
                          autoComplete="given-name"
                          className='w-full rounded-md  '
                          defaultValue={personalInfo.firstName}
                          onChange={event =>
                            handlePersonalInfo('firstName', event.target.value)}  
                                                
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="lastname" className="block text-sm font-medium text-black">
=======
                          defaultValue={formData.firstName}
                          autoComplete="given-name"
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green focus:ring-green sm:text-sm ${
                            errors.firstName ? 'border-bred' : ''
                          }`}
                          {...register("firstName", {required: true, maxLength:80})}
                        />
                        {errors.firstName && (<span className="inline-flex text-sm text-bred">Please enter your First Name.</span>)}
                      </div>
  
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
<<<<<<< HEAD
                          autoComplete="family-name"
                          className='w-full rounded-md  '
                          defaultValue={personalInfo.lastName}
                          onChange={event =>
                            handlePersonalInfo('lastName', event.target.value)}  
                        />
                       
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="cwid" className="block text-sm font-medium text-black">
=======
                          value={formData.lastName} 
                          autoComplete="family-name"
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green focus:ring-green sm:text-sm ${
                            errors.lastName ? 'border-bred' : ''
                          }`}
                          {...register("lastName", {required: true, maxLength:80})}
                        />
                        {errors.lastName && (<span className="inline-flex text-sm text-bred">Please enter your Last Name.</span>)}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="cwid" className="block text-sm font-medium text-gray-700">
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
                          ULM CWID #
                        </label>
                        <input
                          type="text"
                          name="cwid"
                          id="cwid"
<<<<<<< HEAD
                          className='w-full rounded-md  '
                          defaultValue={personalInfo.cwid}
                          onChange={event =>
                            handlePersonalInfo('cwid', event.target.value)}  
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="number" className="block text-sm font-medium text-black">
=======
                          value={formData.cwid} 
           
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green focus:ring-green sm:text-sm ${
                            errors.cwid ? 'border-bred' : ''
                          }`}
                          {...register("cwid", {required: true, minLength:8, maxLength:8})}
                        />
                        {errors.cwid && (<span className="inline-flex text-sm text-bred">Please enter your correct CWID [xxxx-xxxx].</span>)}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
                          Cell Phone
                        </label>
                        <input
                          type="text"
                          name="number"
                          id="number"
<<<<<<< HEAD
                          className='w-full rounded-md  '
                          defaultValue={personalInfo.number}
                          onChange={event =>
                            handlePersonalInfo('number', event.target.value)}  
                        />
                       
=======
                          value={formData.number} 
                          {...register("number", {required: true, minLength: 10, maxLength:10})}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green focus:ring-green sm:text-sm ${
                            errors.number ? 'border-bred' : ''
                          }`}
                        />
                        {errors.number && (<span className="inline-flex text-sm text-bred">Please enter your correct Phone number [xxx-xxx-xxxx].</span>)}
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
                      </div>
                      
  
                      <div className="col-span-6 sm:col-span-3">
<<<<<<< HEAD
                        <label htmlFor="country" className="block text-sm font-medium text-black">
                          Country
                        </label>
                        <CountrySelect selectedCountry={selectedCountry} onCountryChange={handleCountryChange} />
                        {/* <p>Selected country: {selectedCountry}</p> */}
                                        </div>
  
                      <div className="col-span-6">
                        <label htmlFor="streetaddress" className="block text-sm font-medium text-black">
=======
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          defaultValue={formData.country}
                          autoComplete="country-name"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-green focus:outline-none focus:ring-green sm:text-sm"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>
  
                      <div className="col-span-6">
                        <label htmlFor="streetaddress" className="block text-sm font-medium text-gray-700">
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
                          Street address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
<<<<<<< HEAD
                          className='w-full rounded-md  '
                          defaultValue={personalInfo.address}
                          onChange={event =>
                            handlePersonalInfo('address', event.target.value)}  
                          autoComplete="street-address"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-black">
=======
                          value={formData.address} 
                          autoComplete="street-address"
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green focus:ring-green sm:text-sm ${
                            errors.address ? 'border-bred' : ''
                          }`}
                          {...register("address", {required: true, maxLength:80})}
                        />
                        {errors.address && (<span className="inline-flex text-sm text-bred">Please enter your correct Address.</span>)}
                      </div>
  
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
<<<<<<< HEAD
                          autoComplete="address-level2"
                          className='w-full rounded-md  '
                          defaultValue={personalInfo.city}
                          onChange={event =>
                            handlePersonalInfo('city', event.target.value)}  
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium text-black">
=======
                          value={formData.city} 
                          autoComplete="address-level2"
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green focus:ring-green sm:text-sm ${
                            errors.city ? 'border-bred' : ''
                          }`}
                          {...register("city", {required: true, maxLength:80})}
                        />
                        {errors.city && (<span className="inline-flex text-sm text-bred">Please enter your correct City.</span>)}
                      </div>
  
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
                          State / Province
                        </label>
                        <input
                          type="text"
                          name="state"
                          id="state"
<<<<<<< HEAD
                          autoComplete="address-level1"
                          className='w-full rounded-md  '
                          defaultValue={personalInfo.state}
                          onChange={event =>
                            handlePersonalInfo('state', event.target.value)}  
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-black">
=======
                          value={formData.state} 
                          autoComplete="address-level1"
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green focus:ring-green sm:text-sm ${
                            errors.state ? 'border-bred' : ''
                          }`}
                          {...register("state", {required: true, maxLength:80})}
                        />
                        {errors.state && (<span className="inline-flex text-sm text-bred">Please enter your correct State/Province.</span>)}
                      </div>
  
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
                          ZIP / Postal code
                        </label>
                        <input
                          type="text"
                          name="zip"
                          id="zip"
<<<<<<< HEAD
                          autoComplete="postal-code"
                          className='w-full rounded-md  '
                          defaultValue={personalInfo.zip}
                          onChange={event =>
                            handlePersonalInfo('zip', event.target.value)}  
                        />
                       
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email-address" className="block text-sm font-medium text-black">
=======
                          value={formData.zip} 
                          autoComplete="postal-code"
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green focus:ring-green sm:text-sm ${
                            errors.zip ? 'border-bred' : ''
                          }`}
                          {...register("zip", {required: true, maxLength:5})}
                        />
                        {errors.zip && (<span className="inline-flex text-sm text-bred">Please enter your correct Zip/Postal Code [x-xxxxx].</span>)}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
                          ULM Email address
                        </label>
                        <input
                          type="text"
                          name="ulm"
                          id="ulm"
<<<<<<< HEAD
                          autoComplete="email"
                          className='w-full rounded-md  '
                          defaultValue={personalInfo.ulm}
                          onChange={event =>
                            handlePersonalInfo('ulm', event.target.value)}  
                        />
                       
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email-address" className="block text-sm font-medium text-black">
=======
                          value={formData.ulm} 
                          autoComplete="email"
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green focus:ring-green sm:text-sm ${
                            errors.ulm ? 'border-bred' : ''
                          }`}
                          {...register("ulm", {required: true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})}
                        />
                        {errors.ulm && (<span className="inline-flex text-sm text-bred">Please enter your correct ULM email address [...@warhawks.ulm.edu].</span>)}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
                          Alternative Email address
                        </label>
                        <input
                          type="text"
                          name="alternate"
                          id="alternate"
<<<<<<< HEAD
                          autoComplete="email"
                          className='w-full rounded-md  '
                          defaultValue={personalInfo.alternate}
                          onChange={event =>
                            handlePersonalInfo('alternate', event.target.value)}  
                        />
                     
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="major"
                      className="block text-sm font-medium text-black"
                    >
                      Major
                    </label>
                    <Select
          id="majors"
          name="majors"
          options={majors}
          isMulti
          value={selectedMajors}
          onChange={handleMajorChange}
          creatable
        />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="minor"
                      className="block text-sm font-medium text-black"
                    >
                      Minor
                    </label>
                    <Select
                      id="minors"
                      name="minors"
                      options={minors}
                      isMulti
                      value={selectedMinors}
                      onChange={handleMinorChange}
                      creatable
        />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="expectedGrad"
                      className="block text-sm font-medium text-black"
                    >
                      Expected Graduation Date From ULM
                    </label>
                    <input
                      type="date"
                      name="expectedGrad"
                      id="expectedGrad"
                      className='w-full rounded-md  '
                      defaultValue={personalInfo.expectedGrad}
                      onChange={event =>
                        handlePersonalInfo('expectedGrad', event.target.value)}  
              
                    />
                   
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="overallGPA"
                      className="block text-sm font-medium text-black"
                    >
                      Overall Collegiate GPA
                    </label>
                    <input
                      type="text"
                      name="overallGPA"
                      id="overallGPA"
                      className='w-full rounded-md  '
                      defaultValue={personalInfo.overallGPA}
                      onChange={event =>
                        handlePersonalInfo('overallGPA', event.target.value)}  
                    />
                   
                  </div>
                  <div className="col-span-6 ">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-black"
                    >
                      Date of Proposed Entrance to Professional School
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className='w-full rounded-md'
                      defaultValue={personalInfo.date}
                      onChange={event =>
                        handlePersonalInfo('date', event.target.value)}  
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="scores"
                      className="block text-sm font-medium text-black"
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
      <th className='border border-black'>Chemical and Physical Foundations of Biological Systems</th>
      <th className='border border-black'>Critical Analysis and Reasoning Skills</th>
      <th className='border border-black'>Biological and Biochemical Foundations of Living Systems</th>
      <th className='border border-black'>Psychological, Social, and Biological Foundations of Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input
              type="text"
              value={mcat.chemical}
              onChange={(e) => setMCAT({ ...mcat, chemical: e.target.value })}
              className="w-full px-2 py-1 border-black"
            /></td>
      <td><input
              type="text"
              value={mcat.critical}
              onChange={(e) => setMCAT({ ...mcat, critical: e.target.value })}
              className="w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2"
            /></td>
      <td><input
              type="text"
              value={mcat.biological}
              onChange={(e) => setMCAT({ ...mcat, biological: e.target.value })}
              className="w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2"
            /></td>
      <td><input
              type="text"
              value={mcat.psychological}
              onChange={(e) => setMCAT({ ...mcat, psychological: e.target.value })}
              className="w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2"
            /></td>
    </tr>
  </tbody>
</table>

<h3 className='mt-3 mb-3'>DAT</h3>
                    <table className='w-full mb-5'>
  <thead>
    <tr className='bg-red text-white border border-black   '>
      <th className='border border-black'>Natural</th>
      <th className='border border-black'>Perceptual</th>
      <th className='border border-black'>Reading</th>
      <th className='border border-black'>Quantitative</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input
              type="text"
              value={dat.natural}
              onChange={(e) => setDAT({ ...dat, natural: e.target.value })}
              className="w-full px-2 py-1 border-black"
            /></td>
      <td><input
              type="text"
              value={dat.perceptual}
              onChange={(e) => setDAT({ ...dat, perceptual: e.target.value })}
              className="w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2"
            /></td>
      <td><input
              type="text"
              value={dat.reading}
              onChange={(e) => setDAT({ ...dat, reading: e.target.value })}
              className="w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2"
            /></td>
      <td><input
              type="text"
              value={dat.quantitative}
              onChange={(e) => setDAT({ ...dat, quantitative: e.target.value })}
              className="w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2"
            /></td>
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
      <th className='border border-black'>Quantitative</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input
              type="text"
              value={oat.natural}
              onChange={(e) => setOAT({ ...oat, natural: e.target.value })}
              className="w-full px-2 py-1 border-black"
            /></td>
      <td><input
              type="text"
              value={oat.reading}
              onChange={(e) => setOAT({ ...oat, reading: e.target.value })}
              className="w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2"
            /></td>
      <td><input
              type="text"
              value={oat.physics}
              onChange={(e) => setOAT({ ...oat, physics: e.target.value })}
              className="w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2"
            /></td>
      <td><input
              type="text"
              value={oat.quantitative}
              onChange={(e) => setOAT({ ...oat, quantitative: e.target.value })}
              className="w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2"
            /></td>
    </tr>
  </tbody>
</table>

<h3 className='mt-3 mb-3'>GRE</h3>
                    <table className='w-full mb-5'>
  <thead>
    <tr className='bg-red text-white border border-black   '>
      <th className='border border-black'>Verbal</th>
      <th className='border border-black'>Quantitative</th>
      <th className='border border-black'>Writing</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input
              type="text"
              value={gre.verbal}
              onChange={(e) => setGRE({ ...gre, verbal: e.target.value })}
              className="w-full px-2 py-1 border-black"
            /></td>
      <td><input
              type="text"
              value={gre.quantitative}
              onChange={(e) => setGRE({ ...gre, quantitative: e.target.value })}
              className="w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2"
            /></td>
      <td><input
              type="text"
              value={gre.writing}
              onChange={(e) => setGRE({ ...gre, writing: e.target.value })}
              className="w-full px-2 py-1 border-gray-300 focus:outline-none focus:ring-2"
            /></td>
    </tr>
  </tbody>
</table>

                  
    <div className="col-span-6 mb-5">
                    <label
                      htmlFor="appType"
                      className="block text-sm font-medium text-black"
                    >
                      Type of School Application will be sent
                    </label>
                    <input
                      type="text"
                      id="appType"
                      name="appType"
                      className='w-full rounded-md'
                     
                    />
                   
                  </div>

                  <div className="col-span-6 mb-5">
                    <label
                      htmlFor="appIDType"
                      className="block text-sm font-medium text-black"
                    >
                      Depending on the type pf application, fill in the
                      appropriate ID numbers.
                    </label>
                    <div className='overflow-x-auto'>
                    <table className="border-collapse border border-black">
  <thead className="bg-red text-white">
    <tr>
      <th className="border border-black ">AMCAS Letter ID</th>
      <th className="border border-black">AACOMAS CAS #</th>
      <th className="border border-black">CASPA CAS #</th>
      <th className="border border-black">AADSAS ID #</th>
      <th className="border border-black">AAMC ID</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td ><input type="text" name="amcasLetterId" value={tableValues.amcasLetterId} onChange={handleInputChange} /></td>
          <td><input type="text" name="aacomasCasNumber" value={tableValues.aacomasCasNumber} onChange={handleInputChange} /></td>
          <td><input type="text" name="caspaCasNumber" value={tableValues.caspaCasNumber} onChange={handleInputChange} /></td>
          <td><input type="text" name="aadsasIdNumber" value={tableValues.aadsasIdNumber} onChange={handleInputChange} /></td>
          <td><input type="text" name="aamcId" value={tableValues.aamcId} onChange={handleInputChange} /></td>
    </tr>
  </tbody>
</table>
</div>


                    
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="faculty"
                      className="block text-sm font-medium text-black"
                    >
                      Faculty Members Submitting Evaluation on your Behalf:
                    </label>
                    
                  </div>
                  <table className="border-collapse border border-black w-full">
      <thead className="bg-red text-white">
        <tr>
          <th className="border border-black">Name</th>
          <th className="border border-black">Title</th>
          <th className="border border-black">Department</th>
        </tr>
      </thead>
      <tbody>
        {recommenderData.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>
                <input
                  className='w-full'
                  type="text"
                  value={cell}
                  onChange={(e) => handleRecommenderChange(e, i, j)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

    <div className='mb-5'>
      <div className="mt-10 sm:mt-0">
            <div >
              
                   
                  <div className="overflow-hidden sm:rounded-md">
                    <div className="">
                    
                    <div className="mt-10 w-full md:mt-10">
                    <div className='mt-5 mb-5 text-black font-bold text-2lg mx-auto'>
              <p className='leading-relaxed text-justify'>
                    List any memberships/activities, work, professional experiences, honors/awards and volunteer
experiences for each semester and summer during your collegiate career. Please use additional paper if
necessary. Where applicable, provide numbers of hours associated with that task per week.</p></div>
                    <h2 className="text-xl font-bold mb-2"> Membership/Academic Clubs </h2>
                    <Table className="w-full" headings={headingsone} onTableDataChange={handleTableOneChange}/> 
  
                    <h2 className="text-xl font-bold mb-2 mt-10"> Work </h2>
                    <Table className="w-full" headings={headingstwo} onTableDataChange={handleTableTwoChange}/> 

                    <h2 className="text-xl font-bold mt-10"> Experiences within Chosen Field </h2>
                    <Table className="w-full" headings={headingsthree} onTableDataChange={handleTableThreeChange}/> 

                    <h2 className="text-xl font-bold mt-10"> Honors and Awards </h2>
                    <Table className="w-full" headings={headingsfour} onTableDataChange={handleTableFourChange}/> 
                
                    <h2 className="text-xl font-bold mt-10"> Laboratory Research </h2>
                    <Table className="w-full" headings={headingsfive} onTableDataChange={handleTableFiveChange}/>

                    <h2 className="text-xl font-bold mt-10"> Volunteer Experiences </h2>
                    <Table className="w-full" headings={headingssix} onTableDataChange={handleTableSixChange}/>
              </div>
                    </div>
                    </div></div></div>


        
              </div>

                    
                  </div>

                  


=======
                          value={formData.alternate}
                          autoComplete="email"
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green focus:ring-green sm:text-sm ${
                            errors.alternate ? 'border-bred' : ''
                          }`}
                          {...register("alternate", {required: true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})}
                        />
                        {errors.alternate && (<span className="inline-flex text-sm text-bred">Please enter your correct Alternate email address [...@example.com].</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="bg-red px-4 py-3 text-right sm:px-6">
                  <div 
                      className="inline-flex justify-center rounded-md border border-transparent bg-green py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Next
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
                    </div>
                  </div>
                </div>
             
            </div>
          
          </div>
        
        </div>
<<<<<<< HEAD
        </form>
=======

        {/* }{nextPages && <AppA />} */}
  
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
  
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
      </>
    )
  }