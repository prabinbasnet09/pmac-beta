import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ActiveUser } from './_app';
import { Auth } from 'aws-amplify';

function Documents() {
  const activeUser = useContext(ActiveUser);
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then(user => setUser(user))
        .catch(err => {
          console.log(err);
          setUser(null);
          router.push('/login');
        });
    };
    fetchUser();
  }, [router]);


  return activeUser ? (
    <>
        <div className='flex items-center justify-center'>
          <div className='w-3/4 px-2 sm:px-0'>
          <div className={`sm:block hidden ${'nav-body'}`}  > 
              <table className='w-full table-auto border  border-black  px-4 py-2 bg-red text-white '>
                <thead>
                  <tr>
                    <th className='w-2/4 border border-black px-4 py-2'>
                      Forms
                    </th>
                    <th className='w-1/4 border border-black px-4 py-2'>
                      Status
                    </th>
                    <th className='w-1/4 border border-black px-10 py-2'>
                      Due
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white text-black  hover:text-red hover:font-bold'>
                      <Link href='/forms/appInfo'>
                        Applicant Information Form
                      </Link>
                    </td>
                    <td className='w-1/4 border border-black px-4 py-2 bg-white text-black text-gray italic text-sm'>
                      {activeUser.applicantForm ? (
                        activeUser.applicantForm === 'Submitted' ? (
                          <span className=' text-green font-bold'>
                            Complete
                          </span>
                        ) : (
                          <span>Incomplete...</span>
                        )
                      ) : (
                        <span>Not Started</span>
                      )}
                    </td>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white  text-red font-bold'>
                      03/25/2023
                    </td>
                  </tr>
                  <tr>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white text-black hov  er:text-red hover:font-bold'>
                      <Link href='/forms/infoReleaseForm'>
                        Information Release Form
                      </Link>
                    </td>
                    <td className='w-1/4 border border-black px-4 py-2 bg-white text-gray italic text-sm '>
                      {activeUser.applicantReleaseForm ? (
                        activeUser.applicantReleaseForm === 'Submitted' ? (
                          <span className=' text-green font-bold'>
                            Complete
                          </span>
                        ) : (
                          <span>Incomplete...</span>
                        )
                      ) : (
                        <span>Not Started...</span>
                      )}
                    </td>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white  text-red font-bold'>
                      03/25/2023
                    </td>
                  </tr>
                  <tr>
                    <td className='w-3/4   px-4 py-2 bg-white text-red font-bold disabled:'>
                      Faculty Evaluation Forms
                    </td>
                    <td className='w-1/4  px-4 py-2 bg-white '></td>
                    <td className='w-1/4  px-4 py-2 bg-white '></td>
                  </tr>

                  {activeUser.facultyRecommendation ? (
                    activeUser.facultyRecommendation[0] && (
                      <tr>
                        <td className='w-3/4 border border-black px-4 py-2 bg-white text-black hover:text-red hover:font-bold'>
                          <Link href='/applications/facultyRecForm'>
                            Faculty Recommendation Form 1
                          </Link>
                        </td>
                        <td className='w-1/4 border border-black px-4 py-2 bg-white text-green font-bold'>
                          Complete
                        </td>
                        <td className='w-3/4 border border-black px-4 py-2 bg-white  text-red font-bold'>
                          03/25/2023
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td className='w-3/4 border border-black px-20 py-2 bg-white text-black hover:text-red hover:font-bold'>
                        <Link href='/applications/facultyRecForm'>
                          Faculty Recommendation Form 1
                        </Link>
                      </td>
                      <td className='w-1/4 border border-black px-4 py-2 bg-white text-black text-gray italic text-sm'>
                        Incomplete...
                      </td>
                      <td className='w-3/4 border border-black px-4 py-2 bg-white  text-red font-bold'>
                        03/25/2023
                      </td>
                    </tr>
                  )}

                  {activeUser.facultyRecommendation ? (
                    activeUser.facultyRecommendation[1] && (
                      <tr>
                        <td className='w-3/4 border border-black px-4 py-2 bg-white text-black hover:text-red hover:font-bold'>
                          <Link href='/applications/facultyRecForm'>
                            Faculty Recommendation Form 2
                          </Link>
                        </td>
                        <td className='w-1/4 border border-black px-4 py-2 bg-white text-green font-bold'>
                          Complete
                        </td>
                        <td className='w-3/4 border border-black px-4 py-2 bg-white  text-red font-bold'>
                          03/25/2023
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td className='w-3/4 border border-black px-20 py-2 bg-white text-black hover:text-red hover:font-bold'>
                        <Link href='/applications/facultyRecForm'>
                          Faculty Recommendation Form 2
                        </Link>
                      </td>
                      <td className='w-1/4 border border-black px-4 py-2 bg-white text-black text-gray italic text-sm'>
                        Incomplete...
                      </td>
                      <td className='w-3/4 border border-black px-4 py-2 bg-white  text-red font-bold'>
                        03/25/2023
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td className='w-3/4 border border-black px-20 py-2 bg-white text-black hover:text-red hover:font-bold'>
                      <Link href='/referrals'>Add Referrals</Link>
                    </td>
                    <td className='w-1/4 border border-black px-4 py-2 bg-white text-gray italic text-sm'>
                      0/2
                    </td>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white text-center text-red font-bold'>
                      -
                    </td>
                  </tr>

                  <tr>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white text-black hover:text-red hover:font-bold'>
                      <Link href='/forms/statementTranscript'>
                        Personal Statement
                      </Link>
                    </td>
                    <td className='w-1/4 border border-black px-4 py-2 bg-white text-black italic text-sm'>
                      {activeUser.personalStatement ? (
                        <span className=' text-green font-bold'>Complete</span>
                      ) : (
                        <span className='text-gray'>Incomplete...</span>
                      )}
                    </td>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white  text-red font-bold'>
                      03/25/2023
                    </td>
                  </tr>
                  <tr>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white text-black hover:text-red hover:font-bold'>
                      <Link href='/forms/statementTranscript'>Transcript</Link>
                    </td>
                    <td className='w-1/4 border border-black px-4 py-2 bg-white text-black italic text-sm'>
                      {activeUser.transcript ? (
                        <span className=' text-green font-bold'>Complete</span>
                      ) : (
                        <span className='text-gray'>Incomplete...</span>
                      )}
                    </td>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white  text-red font-bold'>
                      03/25/2023
                    </td>
                  </tr>
                  <tr>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white text-black hover:text-red hover:font-bold'>
                      <Link href='/forms/statementTranscript'>Headshot</Link>
                    </td>
                    <td className='w-1/4 border border-black px-4 py-2 bg-white text-black italic text-sm'>
                      {activeUser.profilePicture ? (
                        <span className=' text-green font-bold'>Complete</span>
                      ) : (
                        <span className='text-gray'>Incomplete...</span>
                      )}
                    </td>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white  text-red font-bold'>
                      03/25/2023
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={`sm:hidden ${'nav-body-small'}`}  > 
              <table className='w-full table-auto border  border-black  px-4 py-2 bg-red text-white '>
                <thead>
                  <tr>
                    <th className='w-2/4 border border-black px-4 py-2'>
                      Forms
                    </th>
                  
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white text-black  hover:text-red hover:font-bold'>
                      <Link href='/forms/appInfo'>
                        Applicant Information Form
                      </Link>
                    </td>
                  
                  </tr>
                  <tr>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white text-black hov  er:text-red hover:font-bold'>
                      <Link href='/forms/infoReleaseForm'>
                        Information Release Form
                      </Link>
                    </td>
                  
                  </tr>
                  <tr>
                    <td className='w-3/4   px-4 py-2 bg-white text-red font-bold disabled:'>
                      Faculty Evaluation Forms
                    </td>
                  </tr>

                  {activeUser.facultyRecommendation ? (
                    activeUser.facultyRecommendation[0] && (
                      <tr>
                        <td className='w-3/4 border border-black px-4 py-2 bg-white text-black hover:text-red hover:font-bold'>
                          <Link href='/applications/facultyRecForm'>
                            Faculty Recommendation Form 1
                          </Link>
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td className='w-3/4 border border-black px-20 py-2 bg-white text-black hover:text-red hover:font-bold'>
                        <Link href='/applications/facultyRecForm'>
                          Faculty Recommendation Form 1
                        </Link>
                      </td>
                    </tr>
                  )}

                  {activeUser.facultyRecommendation ? (
                    activeUser.facultyRecommendation[1] && (
                      <tr>
                        <td className='w-3/4 border border-black px-4 py-2 bg-white text-black hover:text-red hover:font-bold'>
                          <Link href='/applications/facultyRecForm'>
                            Faculty Recommendation Form 2
                          </Link>
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td className='w-3/4 border border-black px-20 py-2 bg-white text-black hover:text-red hover:font-bold'>
                        <Link href='/applications/facultyRecForm'>
                          Faculty Recommendation Form 2
                        </Link>
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td className='w-3/4 border border-black px-20 py-2 bg-white text-black hover:text-red hover:font-bold'>
                      <Link href='/referrals'>Add Referrals</Link>
                    </td>
                  </tr>

                  <tr>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white text-black hover:text-red hover:font-bold'>
                      <Link href='/forms/statementTranscript'>
                        Personal Statement
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white text-black hover:text-red hover:font-bold'>
                      <Link href='/forms/statementTranscript'>Transcript</Link>
                    </td>
                  </tr>
                  <tr>
                    <td className='w-3/4 border border-black px-4 py-2 bg-white text-black hover:text-red hover:font-bold'>
                      <Link href='/forms/statementTranscript'>Headshot</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </>
  ) : null;
}

export default Documents;
