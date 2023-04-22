import { React, useState, useEffect, useContext } from 'react';
import { ActiveUser } from '../_app'; 
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function InfoReleaseForm() {
  const activeUser = useContext(ActiveUser);
  const router = useRouter();

  const [intellecBelowAverage, setIntellecBelowAverage] = useState(false);
  const [intellecAverage, setIntellecAverage]= useState(false);
  const [intellecAboveAverge, setIntellecAboveAverage]=useState(false);
  const [intellecExceptional, setIntellecException]=useState(false);
  const [intellecNotObserved, setIntellecNotObserved]=useState(false);

  const [uncertain, setUncertain]=useState(false);
  const [certain, setCertain]=useState(false);
  const [motivated, setMotivated]=useState(false);
  const [motivationNotObserved, setMotivationNotObserved]= useState(false);

  const [prodding, setProdding]= useState(false);
  const [assignedWork, setAssignedWork]= useState(false);
  const[suggestedWork, setSuggestedWork]= useState(false);
  const [seeksOut, setSeeksOut]= useState(false);
  const [initiativeNotObserved, setInitiativeNotObserved]= useState(false);

  const [maturityBelowAverage, setMaturityBelowAverage] = useState(false);
  const [maturityAverage, setMaturityAverage]= useState(false);
  const [maturityAboveAverge, setMaturityAboveAverage]=useState(false);
  const [maturityExceptional, setMaturityException]=useState(false);
  const [maturityNotObserved, setMaturityNotObserved]=useState(false);

  const [excitable, setExcitable]= useState(false);
  const [upset, setUpset]= useState(false);
  const [stable, setStable]= useState(false);
  const [balanced, setBalanced]= useState(false);
  const [emotionalNotObserved, setEmotionalNotObserved]= useState(false);

  const [reliability, setReliability]= useState(false);
  const [reliable, setReliable]= useState(false);
  const [averageReliability, setAverageReliability]= useState(false);
  const [unquestionedReliability, setUnquestionedReliability]= useState(false);
  const [reliabilityNotObserved, setReliabilityNotObserved]= useState(false);

  const[follow, setFollow]= useState(false);
  const [leader, setLeader]= useState(false);
  const [frequent, setFrequent]= useState(false);
  const [outstanding, setOutstanding]= useState(false);
  const [leadershipNotObserved, setLeadershipNotObserved]= useState(false);

  const [untrustworthy, setUntrustworthy]=useState(false);
  const [lapses, setLapses]=useState(false);
  const[flaws, setFlaws]= useState(false);
  const [trustworthy, setTrustworthy]=useState(false);
  const [integrityNotObserved, setIntegrityNotObserved]=useState(false);

  const [skillsBelowAverage, setSkillsBelowAverage] = useState(false);
  const [skillsAverage, setSkillsAverage]= useState(false);
  const [skillsAboveAverge, setSkillsAboveAverage]=useState(false);
  const [skillsExceptional, setSkillsException]=useState(false);
  const [skillsNotObserved, setSkillsNotObserved]=useState(false);

  const [belowAverage, setBelowAverage] = useState(false);
  const [average, setAverage]= useState(false);
  const [aboveAverge, setAboveAverage]=useState(false);
  const [wellAboveAverage, setWellAboveAverage]=useState(false);
  const [trulyOutstanding, setTrulyOutstanding]=useState(false);
  

  const initialValues = {
    applicantName: '',
    evaluator: '',
    evalSignature: '',
    date: '',
    capacityKnownStudent:'',
    majorStrength:'',
    weakness:'',
    comments:'',
    potential:'',
    
  };

  const validationSchema=Yup.object().shape({
    applicantName: Yup.string().required('Applicant Name is required!'),
    evaluator: Yup.string().required('Evaluator Name is required!'),
    evalSignature: Yup.string().required('Name as Signature is Required!'),
    date: Yup.date().required('Date is required!'),
    capacityKnownStudent: Yup.string().required('This section is required!'),
    majorStrength: Yup.string().required('This section is required!'),
    weakness: Yup.string().required('This section is required!'),
    comments: Yup.string().required('This section is required!'),
  })


  const onSubmit = (values, { setSubmitting }) => {
    const user = values;
    console.log(user);
    setSubmitting(false);
  };


  return activeUser ? (
    <div className='mt-10 sm:mt-0'>
      <div className='mt-10 w-full md:mt-10'>
        <div className='overflow-hidden shadow sm:rounded-md'>
          <div className='border-2 border-[#7e7e7e] rounded-xl shadow-xl shadow-[#7092BE] shadow:opacity-20 w-4/5 mx-auto mb-7 px-4 py-5 sm:p-6 '>
            <h1 className='text-center text-4xl font-bold text-ulm_maroon'>
              Faculty Recommendation Form
            </h1>
            <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => ( 
            <Form>

            <label
                        htmlFor='applicantName' 
                        className='block text-sm font-medium text-black'
                      >
                        Applicant Name
                      </label>
                      <Field
                        type='text'
                        name='applicantName'
                        className='w-full'
                      />
                    <ErrorMessage name='applicantName' component='div' className='text-bred' />

            <div className=' p-4 text-black opacity-75 mx-auto'>
              <p className='leading-relaxed text-justify'>
                The above-named student is in the process of applying to a
                pre-health professional program. The applicant has asked to be
                interviewed by ULM&apos;s Pre-Medical Advisory Committee. The
                information you provide will be used only in the
                admissions/evaluation process. Please complete and return this
                form to Dr. Allison Wiedemeier, CNSB 326, in the Biology
                Department as soon as possible. You may be contacted by a member
                of the Pre-Professional Health Advisory Committee seeking
                additional information or verification. By signing below the
                undersigned student hereby waives his/her right of access to
                this information.
              </p>
            </div>

            <div>
              <div>
                <label
                  htmlFor='evaluator'
                  className='block text-sm font-medium text-black'
                >
                  Name of Evaluator
                </label>
                <Field
                  type='text'
                  name='evaluator'
                  id='evaluator'
                  autoComplete='given-name'
                  className='w-full'
                 
                />
                 <ErrorMessage name='evaluator' component='div' className='text-bred' />
               
              </div>
              <div className=' p-4 text-black opacity-75 mx-auto'>
                <p className='text-justify'>
                  Please indicate your estimation of this applicant by circling
                  the appropriate description in the table below and answering
                  the following questions. Thank you for your assistance in this
                  process.
                </p>
              </div>

              {/*Table Start*/}
              <div>
                <table className='border border-seperate border-slate-700 w-full text-center'>
                  <tbody>
                    <tr>
                      <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                        Intellectual Ability
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Below Average
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Average
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Above Average
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Exceptional
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                        Motivation
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Seems Uncertain
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Seems Certain
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Motivated
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Highly Motivated
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                        Initiative
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Needs Occasional Prodding
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Does All Assigned Work
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Does Suggested Extra Work
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Seeks Out Learning Opportunities
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                        Personal & Social Maturity
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Below Average
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Average
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Above Average
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Exceptional Maturity
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                        Emotional Maturity
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Very Excitable
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Easily Upset
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Usually Stable
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Stable / Well Balanced
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                        Dependability & Reliability
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Doubtful Reliability
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Usually Reliable
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Above Average Reliability
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Unquestioned Reliability
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                        Leadership
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Satisfied to Follow
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Occasionally a Leader
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Frequently a Leader
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Outstanding Leader
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                        Character / Integrity
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Untrustworthy
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Occasional Lapses
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        No Serious Flaws
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Absolutely Trustworthy
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                        Verbal Skills
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Below Average
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Average
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Above Average
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Exceptional
                      </td>
                      <td className='border border-slate-600 hover:border-teal-500'>
                        Not Observed
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className='font-bold mt-10 mb-3'>
                  How long and in what capacity have you known or observed this
                  student?
                </div>
                <Field as="textarea"

type='text'
name='capacityKnownStudent'
                  rows={4}
                  className='block p-2.5 w-full text-sm text-black rounded-lg border'
                  placeholder='Write your thoughts here...'
                ></Field>
                <ErrorMessage name='capacityKnownStudent' component='div' className='text-bred' />

                <div className='font-bold mt-10 mb-3'>
                  What do you consider to be the applicant&apos;s major
                  strength(s)?
                </div>
                <Field as="textarea"

type='text'
name='majorStrength'
                  rows={4}
                  className='block p-2.5 w-full text-sm text-black rounded-lg border' 
                  placeholder='Write your thoughts here...'
                ></Field>
                 <ErrorMessage name='majorStrength' component='div' className='text-bred' />
              </div>

              <div className='font-bold mt-10 mb-3'>
                What do you consider to be the applicant&apos;s major
                weakness(es)?
              </div>
              <Field as="textarea"
              type='text'
              name='weakness'
                rows={4}
                className='block p-2.5 w-full text-sm text-black rounded-lg border' 
                placeholder='Write your thoughts here...'
              ></Field>
              <ErrorMessage name='majorStrength' component='div' className='text-bred' />
            </div>
            <div className='mt-10'>
              <p className='mb-4 font-bold'>
                Please indicate the applicant&apos;s overall potential for
                success.
              </p>
              
              <table className='border border-seperate border-slate-700 w-full text-center'>
                <tbody>
                  <tr>
                    <td className='border border-slate-600 hover:border-teal-500'>
                    <Field
                type='checkbox'
                name='potential'
                value='belowAverage'
                checked={belowAverage}
                onChange={(e) => {
                  const { checked } = e.target;
                  setBelowAverage(checked);
                  setFieldValue('belowAverage', checked);
                }}
              />
              <label>Below Average</label>
                      
                    </td>
                    <td className='border border-slate-600 hover:border-teal-500'>
                    <Field
                type='checkbox'
                name='potential'
                value="average"
                checked={average}
                onChange={(e) => {
                  const { checked } = e.target;
                  setAverage(checked);
                  setFieldValue('average', checked);
                }}
              />
                    <span >Average</span>  
                    </td>
                    <td className='border border-slate-600 hover:border-teal-500'>
                      Above Average
                    </td>
                    <td className='border border-slate-600 hover:border-teal-500'>
                      Well Above Average
                    </td>
                    <td className='border border-slate-600 hover:border-teal-500'>
                      Truly Outstanding
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className='mt-5 mb-3 font-bold'>Additional Comments:</p>
              <Field as="textarea"
              type='text'
              name='comments'
                rows={4}
                className='block p-2.5 w-full text-sm text-black rounded-lg border' 
                placeholder='Write your thoughts here...'
              ></Field>
              <ErrorMessage name='majorStrength' component='div' className='text-bred' />

              <div>
                <p className='font-bold mt-14'>
                  Thank you for helping us to evaluate this applicant. Please
                  sign below and return this form to Dr. Allison Wiedemeier (326
                  CNSB).
                </p>
                  <div>
                    <label
                      htmlFor='evalSignature'
                      className='block text-sm font-medium text-gray-700'
                    >
                      <p className='mt-5 mb-3'>Name of Evaluator as Signature</p>
                    </label>
                    <Field
                      type='text'
                      name='evalSignature'
                      id='evalSignature'
                      className='w-full'
                    />
                     <ErrorMessage name='evalSignature' component='div' className='text-bred' />
                  </div>
                  <div >
                    <label htmlFor='start'>
                      <p className='mt-5 mb-3'>Date</p>
                    </label>
                    <Field
                      type='date'
                      id='date'
                      name='date'
                      className='w-full'
                    />
                    <ErrorMessage name='date' component='div' className='text-bred' />
                    <div className='mt-10'>
                      <p>
                        <button type='submit' disabled={isSubmitting} className='bg-ulm_maroon hover:shadow-black shadow-sm rounded-md text-lg my-6 mx-auto font-bold px-2 text-white'>
                          Submit
                        </button>
                      </p>
                    </div>

                  </div>
              </div>
            </div>
            </Form>
            )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
