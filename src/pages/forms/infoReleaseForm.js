import {React, useState, useEffect} from 'react';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

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
    setAuthorizeRelease(!authorizeRelease);
  }

  const handleAllowEvaluation = (e) => {
    setAllowEvaluation(!allowEvaluation);
  }

  const handleAllowAdvertising = (e) => {
    setAllowAdvertising(!allowAdvertising);
  }

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows]
    newRows[index][field] = value
    setTableError(false)
    setRows(newRows)
  } 

  const handleUserInfo = (field, value) => {
    setUserInfo(prevValues => ({ ...prevValues, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // const data = { rows, ...otherValues }
    //   // Check if all rows have values
    // const rowsHaveValues = rows.every((row) => {
    //   return row.name && row.date && row.phone && row.address
    // })

    // // Check if choices are selected
    
    // const checkedChoices = [...otherValues.choices]
    // let checkedOption = 0 
    // checkedChoices.map((choices)=> {{if (choices=='A'||choices=='B'){checkedOption++}}})
    // const choicesSelected = checkedOption == 2
    // console.log(checkedOption)
    // // Check if both conditions are met
    // if (rowsHaveValues && choicesSelected ) {
    //   // Submit the form
    //   // console.log(data);
    
    //   // ...
    // } else {
    //   if (!rowsHaveValues){setTableError(true)}
    //   if (!choicesSelected) {setCheckboxError(true)
    //   }
    
      
    // }

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
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      }
      )
    } catch (err) {
      console.log('error creating InfoRelease Form:', err)
    }
  };

  const handleAddRow = () => {
    setRows([...rows, { name: '', date: '', phone: '', address: '' }])
  }

  const errorMessage = ['Error! Please select at-least the first two checkboxes.','Error! Please fill at-least one row with correct information.']
  return (

   
    <div className="mt-10 sm:mt-0"> 
              
              <div className="mt-10 w-full md:mt-10">
                  <div className="overflow-hidden shadow sm:rounded-md">
                  
                    <div className="bg-white px-4 py-5 sm:p-6">
                    <h1>Information Release Form</h1>

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
   
     
      <div className="mb-4">
        <label className="block text-black font-bold mb-2">
          Please check the box for all that you agree to:
        </label>
        <fieldset className='ml-9'>
     
       
        
     <div className=" leading-relaxed text-justify">
       {/* <input type="checkbox" name="choice" value="authorizeRelease" onChange={event => handleOtherValuesChange('choices', event.target)} /> */}
       <input type="checkbox" name="choice" value="authorizeRelease" checked={authorizeRelease} onChange={(e)=> handleAuthorizeRelease(e)} />
       <span className='ml-3'> I hereby authorize the Pre-Medical Advisory Committee of the University of Louisiana at Monroe
to release the evaluation of the undersigned to the below listed professional schools and/or programs.</span>
     </div >
     <div className=" leading-relaxed text-justify">
       <input type="checkbox" name="choice" value="allowEvaluation" checked={allowEvaluation} onChange={(e) => handleAllowEvaluation(e)}  />
       <span className='ml-3'>   I will allow the committee members to evaluate my performance based on my academic record,
submitted materials, and the committee interview. I authorize the committee to prepare an evaluation
letter for me for the purposes of applying to the professional schools and/or programs listed below. I
understand that their evaluation and all items considered in making this recommendation are
confidential and I waive my right to see such evaluation.</span>
     </div>
     <div className=" leading-relaxed text-justify">
       <input type="checkbox" name="choice" value="allowAdvertising" checked={allowAdvertising} onChange={(e) => handleAllowAdvertising(e)}  />
      <span className='ml-3'>
      I will allow my name to be released to the University if accepted to a professional school. The
University may use my name and the name of the professional school/ and or program for statistics and
recruitment endeavors. These statistics will be gathered for the Biology Program, Pre-Medical Interview
Committee and the University of Louisiana at Monroe.
</span> 
     </div>
   </fieldset>
   
      </div>
      {checkboxError && <div className='text-bred mt-0'> {errorMessage[0]} </div> }
  
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
                          />
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
                         />
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
                          />
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
                          onChange={event => {
                            handleUserInfo('date', event.target.value)
                          }}
                          autoComplete="family-name"
                         />
                      </div>
                      </div>

                    
                      <h1 className="mt-7 text-1xl font-bold">Please provide the physical addresses of each school you are applying to if those schools require
individual letters. If you are using an application system, please list the School and then the
Application service.</h1>

<h1 className="mb-3 mt-2 text-1xl font-bold">All deadlines for all schools need to be listed. Most schools have two deadline dates.
<span className='text-bred'> Please
provide the letter deadline date.</span> </h1>
                      
  <div className="overflow-x-auto">
  <table className="table-auto border-collapse border border-gray-400">
    <thead>
      <tr>
        <th className="border border-gray-400 px-4 py-2">Name of School</th>
        <th className="border border-gray-400 px-4 py-2">Letter Deadline Date</th>
        <th className="border border-gray-400 px-4 py-2">Contact Person</th>
        <th className="border border-gray-400 px-4 py-2">Address</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <tr key={index}>
          <td className="border border-gray-400 px-4 py-2">
            <input type="text" value={row.schoolName} onChange={event => handleRowChange(index, 'schoolName', event.target.value)} />
          </td>
          <td className="border border-gray-400 px-4 py-2">
            <input type="date" value={row.deadlineDate} onChange={event => handleRowChange(index, 'deadlineDate', event.target.value)} />
          </td>
          <td className="border border-gray-400 px-4 py-2">
            <input type="tel" value={row.contactPerson} onChange={event => handleRowChange(index, 'contactPerson', event.target.value)} />
          </td>
          <td className="border border-gray-400 px-4 py-2">
            <input type="text" value={row.address} onChange={event => handleRowChange(index, 'address', event.target.value)} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>

</div>

{tableError && <div className='text-bred mt-0'> {errorMessage[1]} </div> }

      <button className="bg-green text-white font-bold py-2 px-4 rounded mt-5 " type="button" onClick={handleAddRow}>Add Row</button>

      
        <div className="flex justify-center"><button className="bg-green text-white font-bold py-2 px-4 rounded">
        Submit
      </button></div>
      
    </form>






                    </div>
                    </div>
                    </div>
                     </div>
    
  );
}
