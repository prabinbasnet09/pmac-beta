import {React, useState, useEffect} from 'react';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { setDate } from 'date-fns';

export default function InfoReleaseForm({ user }) {
  
  const [rows, setRows] = useState([
    {
      schoolName: '',
      deadlineDate: '',
      contactPerson: '',
      address: '',
    }
  ])
  
  const [authorizeRelease, setAuthorizeRelease] = useState(false)
  const [allowEvaluation, setAllowEvaluation] = useState(false)
  const [allowAdvertising, setAllowAdvertising] = useState(false)

  const [userInfo, setUserInfo] = useState({
    fullName: '',
    cwid: '',
    signature: '',
    date: '',
  })

  const [tableError, setTableError] = useState(false)
  const [checkboxError, setCheckboxError] = useState(false)
  const [nameError, setNameError] = useState(false);
  const [cwidError, setCwidError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [signatureError, setSignatureError] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      await API.graphql({
        query: queries.listApplicantReleaseForms,
        variables: { filter: { userId: { eq: user.attributes.sub } } },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      })
      .then((res) => {
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
      .catch((err) => {
        console.log(err)
        })
    }

    fetchData();
  }, [user])

  const handleAuthorizeRelease = (e) => {
    setAuthorizeRelease(e.target.checked);
    // setCheckboxOne(e.target.checked)
    console.log(authorizeRelease)
    setCheckboxError(false)
    
  }

  const handleAllowEvaluation = (e) => {
    setAllowEvaluation(e.target.checked);
    // if (!allowEvaluation){setCheckboxTwo(false);}
    // else {setCheckboxTwo(true);}
    console.log(allowEvaluation)
    // setCheckboxTwo(e.target.checked)
    setCheckboxError(false)
  }

  const handleAllowAdvertising = (e) => {
    setAllowAdvertising(e.target.checked);
    // if (!allowAdvertising){setCheckboxThree(false);}
    // else {console.log(allowAdvertising)
    //   setCheckboxThree(true)}
    // setCheckboxThree(e.target.checked)
    console.log(allowAdvertising)
    setCheckboxError(false)
  }

  

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows]
    newRows[index][field] = value
    setTableError(false)
    setRows(newRows)
  } 

  const handleDeleteRow = () => {
    const newRows = [...rows];
    newRows.pop(); // remove the last row
    
    setRows(newRows);
    setTableError(false)
  
  }

  const handleUserInfo = (field, value) => {
    
    if (field === 'fullName'){
     
      if (value!==''){setNameError(false)}
  else {setNameError(true)}}
      
    if (field === 'cwid'){
      if (value!==''){setCwidError(false)}
      else {setCwidError(true)}
      }
    
    if (field === 'date'){
      if (value!==''){setDateError(false)}else
      {setDateError(true)}}
    
    if (field === 'signature'){setSignatureError(false)}
    setUserInfo(prevValues => ({ ...prevValues, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!authorizeRelease || !allowEvaluation || !allowAdvertising){
      console.log("Set CheckBox errror")
      setCheckboxError(!checkboxError);
      console.log(checkboxError)
      
    }

  if (userInfo.fullName === '') {
    console.log(userInfo.fullName + "\n+++++");
  
    setNameError(prevState => {
      !prevState
      console.log(prevState);
      return true;
    });
  }
  
  if (userInfo.cwid === '') {
    setCwidError(prevState => !prevState);
  }
  
  if (userInfo.date === '') {
    setDateError(prevState => !prevState);
  }
  
  if (userInfo.signature === '') {
    setSignatureError(prevState => !prevState);
  }
  


    const rowsHaveValues = rows.every((row) => {
     
      return row.schoolName && row.deadlineDate && row.contactPerson && row.address
       })
  
      if (!rowsHaveValues){setTableError(true)}
    if (!checkboxError && !tableError && !nameError && !cwidError && !signatureError && !dateError){
      
      console.log(checkboxError)
      console.log("test")

      
      try {

        
      const id = user.attributes.sub;
      
      const schoolDetails = rows.map((row) => {
        return {
          schoolName: row.schoolName,
          deadlineDate: row.deadlineDate,
          contactPerson: row.contactPerson,
          address: row.address,
        }
      })

      const inputData = {
        userId: id,
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
        }

      await API.graphql({
        query: mutations.createApplicantReleaseForm,
        variables: { input: inputData },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      })
      .then((res) => {
        console.log("+++++shit")
        console.log(res)
      })
      .catch((err) => {
        console.log("error I guess")
        console.log(err)
      }
      )
    } catch (err) {
      console.log('error creating InfoRelease Form:', err)
    }}
    else{
      console.log("don't submit");
    }
  };

  const handleAddRow = () => {
    setRows([...rows, { name: '', date: '', phone: '', address: '' }])
  }

  const errorMessage = ['Error! Please select all three checkboxes.','Error! Please fill at-least one row with correct information.']
  return (

   
    <div className="mt-10 sm:mt-0"> 
              
              <div className="mt-10 w-full md:mt-10">
                  <div className="overflow-hidden shadow sm:rounded-md">
                  
                  <div className="border-2 border-gold w-4/5 mx-auto mb-7 px-4 py-5 sm:p-6 ">
                  <h1 className='text-center text-4xl font-bold text-gold'>Information Release Form</h1>

                    <div className=" p-4 text-black opacity-75 mx-auto">
                        
      <p className="leading-relaxed text-justify">
        I understand that members of the Pre-Medical Advisory Committee have access to my transcript, test scores,
        personal statement and faculty evaluations submitted on my behalf. I understand that the committee evaluation
        will be based on the submitted faculty evaluations, transcript(s), test scores, a personal statement, and the
        committee interview. I, as the applicant, have made every effort to provide the committee with the full and 
        correct address where the evaluation letter for the pre-medical committee should be mailed, understanding that this may
        not be the general address for the school in most cases.
      </p>
    </div>

   
    <form onSubmit={handleSubmit}>
   
     
      <div >
        <label className="block text-black font-bold mb-2">
          Please check the box for all that you agree to:
        </label>
        <fieldset className='ml-9'>
     
       
        
     <div className=" leading-relaxed text-justify">
       {/* <input type="checkbox" name="choice" value="authorizeRelease" onChange={event => handleOtherValuesChange('choices', event.target)} /> */}
       <input type="checkbox" name="choice" value="authorizeRelease" checked={authorizeRelease} onChange={handleAuthorizeRelease} />
       <span className='ml-3'> I hereby authorize the Pre-Medical Advisory Committee of the University of Louisiana at Monroe
to release the evaluation of the undersigned to the below listed professional schools and/or programs.</span>
     </div >
     <div className=" leading-relaxed text-justify">
       <input type="checkbox" name="choice" value="allowEvaluation" checked={allowEvaluation} onChange={handleAllowEvaluation}  />
       <span className='ml-3'>   I will allow the committee members to evaluate my performance based on my academic record,
submitted materials, and the committee interview. I authorize the committee to prepare an evaluation
letter for me for the purposes of applying to the professional schools and/or programs listed below. I
understand that their evaluation and all items considered in making this recommendation are
confidential and I waive my right to see such evaluation.</span>
     </div>
     <div className=" leading-relaxed text-justify">
       <input type="checkbox" name="choice" value="allowAdvertising" checked={allowAdvertising} onChange={ handleAllowAdvertising}  />
      <span className='ml-3'>
      I will allow my name to be released to the University if accepted to a professional school. The
University may use my name and the name of the professional school/ and or program for statistics and
recruitment endeavors. These statistics will be gathered for the Biology Program, Pre-Medical Interview
Committee and the University of Louisiana at Monroe.
</span> 
     </div>
   </fieldset>
   
      </div>
      {checkboxError && <div className='text-bred text-sm mt-0 italic'> {errorMessage[0]} </div> }
  
  <h1 className="mb-5 mt-7 text-1xl font-bold">By signing below, I understand that I am waiving my right to review the evaluation material and agree to the release of
my name and school upon acceptance.</h1>
     
      <div className="grid grid-cols-6 gap-6 w-full">
      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" 
                        className="block text-sm font-medium text-gray-700"
                       >
                          Name (Print Clearly)
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          defaultValue={userInfo.fullName}
                          onChange={event => handleUserInfo('fullName', event.target.value)}
                          autoComplete="given-name"
                          className='w-full'
                          />
                          {nameError && (
                           <p className="text-bred text-sm italic">Please enter your full name</p>
                        )}
                      </div>
  
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="cwid" className="block text-sm font-medium text-gray-700">
                          CWID Number
                        </label>
                        <input
                          type="text"
                          name="cwid"
                          id="cwid"
                          defaultValue={userInfo.cwid}
                          onChange={event => handleUserInfo('cwid', event.target.value)}
                          autoComplete="family-name"
                          className='w-full'
                         />
                         {cwidError && (
                           <p className="text-bred text-sm italic">Please enter your correct CWID [xxxx-xxxx]</p>
                        )}
                      </div>
                      </div>
                      <div className=" mt-5  grid grid-cols-6 gap-6">
      <div className=" col-span-6 sm:col-span-3">
                        <label htmlFor="signature" 
                        className="block text-sm font-medium text-gray-700"
                       >
                          Signature
                        </label>
                        <input
                          type="text"
                          name="signature"
                          id="signature"
                          defaultValue={userInfo.signature}
                          onChange={event => handleUserInfo('signature', event.target.value)}
                          autoComplete="given-name"
                          className='w-full'
                          />
                          {signatureError && (
                           <p className="text-bred text-sm italic">Please enter your full name.</p>)}
                      </div>
  
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          defaultValue={userInfo.date}
                          onChange={event => handleUserInfo('date', event.target.value)}
                          autoComplete="family-name"
                          className='w-full'
                         />
                          {dateError && (
                           <p className="text-bred text-sm italic">Please select today's date.</p>
                        )}
                      </div>
                      </div>

                    
                      <h1 className="mt-7 text-1xl font-bold">Please provide the physical addresses of each school you are applying to if those schools require
individual letters. If you are using an application system, please list the School and then the
Application service.</h1>

<h1 className="mb-3 mt-2 text-1xl font-bold">All deadlines for all schools need to be listed. Most schools have two deadline dates.
<span className='text-bred'> Please
provide the letter deadline date.</span> </h1>
                      
  <div className="overflow-x-auto">
  <table className="table-auto border-collapse border border-black w-full bg-red opacity-75 text-white ">
    <thead>
      <tr>
        <th className="border border-black px-4 py-2">Name of School</th>
        <th className="border border-black px-4 py-2">Letter Deadline Date</th>
        <th className="border border-black px-4 py-2">Contact Person</th>
        <th className="border border-black px-4 py-2">Address</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <tr key={index}>
          <td className="border border-black ">
            <input className="border-none w-full text-black" type="text" value={row.schoolName} onChange={event => handleRowChange(index, 'schoolName', event.target.value)} />
          </td>
          <td className="border border-black ">
            <input className="border-none w-full text-black" type="date" value={row.deadlineDate} onChange={event => handleRowChange(index, 'deadlineDate', event.target.value)} />
          </td>
          <td className="border border-black ">
            <input className="border-none w-full text-black" type="tel" value={row.contactPerson} onChange={event => handleRowChange(index, 'contactPerson', event.target.value)} />
          </td>
          <td className="border border-black ">
            <input className="border-none w-full text-black" type="text" value={row.address} onChange={event => handleRowChange(index, 'address', event.target.value)} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>

</div>

{tableError && <div className='text-bred text-sm mt-0 italic'> {errorMessage[1]} </div> }

<button className="inline-flex items-center gap-1 bg-gold text-white px-1 py-1 mt-5 mr-2 rounded" type="button" onClick={handleAddRow}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

</button>
<button onClick={ handleDeleteRow} className="bg-bred text-white font-bold px-1 py-1 rounded mt-5 " type="button">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
</svg>

      </button>

      
      <div className="flex justify-center"><button className="bg-green text-white font-bold py-2 px-4 rounded mt-3  w-1/2">
        Submit
      </button>
      </div>
      
    </form>






                    </div>
                    </div>
                    </div>
                     </div>
    
  );
}
