import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RecommendationForm() {
  const [guestUser, setGuestUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getLocalStorage = key => {
      const item = JSON.parse(localStorage.getItem(key));
      if (!item) return null;

      if (new Date() >= new Date(item.expiresAt)) {
        localStorage.removeItem(key);
        return null;
      }
      return item;
    };
    if (!getLocalStorage('guestUser')) {
      router.push('/login');
    } else {
      setGuestUser(getLocalStorage('guestUser').value);
    }
  }, []);

  const [userInfo, setUserInfo] = useState({
    signature: '',
    evaluator: '',
    intellectualAbility: '',
    academicAbility: '',
    motivation: '',
    interpersonalSkills: '',
    leadership: '',
    communication: '',
    integrity: '',
    maturity: '',
    other: '',
    comments: '',
  });

  return guestUser ? (
    <div className='mt-10 sm:mt-0'>
      <div className='mt-10 w-full md:mt-10'>
        <div className='overflow-hidden shadow sm:rounded-md'>
          <div className='border-2 border-[#7e7e7e] rounded-xl shadow-xl shadow-[#7092BE] shadow:opacity-20 w-4/5 mx-auto mb-7 px-4 py-5 sm:p-6 '>
            <h1 className='text-center text-4xl font-bold text-ulm_maroon'>
              Faculty Recommendation Form
            </h1>

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
              <div className='w-[500px]'>
                <label
                  htmlFor='signature'
                  className='block text-sm font-medium text-gray-700'
                >
                  Signature of Applicant
                </label>
                <input
                  type='text'
                  name='signature'
                  id='signature'
                  defaultValue={userInfo.signature}
                  onChange={event =>
                    handleUserInfo('signature', event.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <div className='w-[500px] mt-4'>
                <label
                  htmlFor='evaluator'
                  className='block text-sm font-medium text-gray-700'
                >
                  Name of Evaluator
                </label>
                <input
                  type='text'
                  name='evaluator'
                  id='evaluator'
                  defaultValue={userInfo.evaluator}
                  onChange={event =>
                    handleUserInfo('evaluator', event.target.value)
                  }
                />
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
                <textarea
                  id='message'
                  rows='4'
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white'
                  placeholder='Write your thoughts here...'
                ></textarea>
                <div className='font-bold mt-10 mb-3'>
                  What do you consider to be the applicant&apos;s major
                  strength(s)?
                </div>
                <textarea
                  id='message'
                  rows='4'
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500  bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500'
                  placeholder='Write your thoughts here...'
                ></textarea>
              </div>

              <div className='font-bold mt-10 mb-3'>
                What do you consider to be the applicant&apos;s major
                weakness(es)?
              </div>
              <textarea
                id='message'
                rows='4'
                className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500  bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500'
                placeholder='Write your thoughts here...'
              ></textarea>
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
                      Below Average
                    </td>
                    <td className='border border-slate-600 hover:border-teal-500'>
                      Average
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
              <textarea
                id='message'
                rows='4'
                className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500  bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500'
                placeholder='Write your thoughts here...'
              ></textarea>

              <div>
                <p className='font-bold mt-14'>
                  Thank you for helping us to evaluate this applicant. Please
                  sign below and return this form to Dr. Allison Wiedemeier (326
                  CNSB).
                </p>
                <div className='w-[500px] grid grid-col-2'>
                  <div>
                    <label
                      htmlFor='evalSignature'
                      className='block text-sm font-medium text-gray-700'
                    >
                      <p className='mt-5 mb-3'>Signature of Evaluator</p>
                    </label>
                    <input
                      type='text'
                      name='evalSignature'
                      id='evalSignature'
                      defaultValue={userInfo.evalSignature}
                      onChange={event =>
                        handleUserInfo('signature', event.target.value)
                      }
                      autoComplete='given-name'
                    />
                  </div>
                  <div className='w-[300px]'>
                    <label htmlFor='start'>
                      <p className='mt-5 mb-3'>Date</p>
                    </label>
                    <input
                      type='date'
                      id='date'
                      name='trip-start'
                      value='01/01/2023'
                      min='4/12/23'
                      max='2040-12-31'
                      onChange={event =>
                        handleUserInfo('signature', event.target.value)
                      }
                    />
                    <div className='mt-10'>
                      <p>
                        <button className='bg-ulm_maroon w-[130px] hover:shadow-black shadow-sm rounded-md text-lg my-6 mx-auto font-bold px-2 text-white'>
                          Submit
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
