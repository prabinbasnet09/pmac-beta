import { React, useState, useEffect, useContext } from 'react';
import { Auth, API } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function FacultyRecommendationdForm() {
  const router = useRouter();
  const { user, facultyEmail } = router.query;
  const [sign, setSign] = useState(false);

  const initialValues = {
    applicantName: '',
    intellectual: '',
    motivation: '',
    initiative: '',
    personal: '',
    emotional: '',
    dependability: '',
    leadership: '',
    character: '',
    verbal: '',
    capacityKnownStudent: '',
    majorStrength: '',
    weakness: '',
    comments: '',
    potential: '',
    evalSignature: '',
    date: '',
  };

  useEffect(() => {
    const fetchUser = async () => {
      await Auth.currentAuthenticatedUser().then(async () => {
        await API.graphql({
          query: queries.listFacultyRecommendationForms,
          variables: {
            filter: {
              userId: {
                eq: user,
              },
              facultyEmail: {
                eq: facultyEmail,
              },
            },
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })
          .then(res => {
            console.log(res);
            const data = res.data.listFacultyRecommendationForms.items[0];
            if (data) {
              initialValues.applicantName = data.applicantName;
              initialValues.intellectual = data.intellectual;
              initialValues.motivation = data.motivation;
              initialValues.initiative = data.initiative;
              initialValues.personal = data.personal;
              initialValues.emotional = data.emotional;
              initialValues.dependability = data.dependability;
              initialValues.leadership = data.leadership;
              initialValues.character = data.character;
              initialValues.verbal = data.verbal;
              initialValues.capacityKnownStudent = data.studentCapacity;
              initialValues.majorStrength = data.majorStrength;
              initialValues.weakness = data.weaknesses;
              initialValues.comments = data.comments;
              initialValues.potential = data.potential;
              initialValues.evalSignature = data.evaluatorName;
              initialValues.date = data.date;
              setSign(data.agreement);
            }
          })
          .catch(err => {
            console.log(err);
          })
          .catch(err => {
            console.log(err);
            router.push('/login');
          });
      });
    };

    fetchUser();
  }, []);

  return user ? (
    <div className='mt-10 sm:mt-0'>
      <div className='mt-10 w-full md:mt-10'>
        <div className='overflow-hidden shadow sm:rounded-md'>
          <div className='border-2 border-[#7e7e7e] rounded-xl shadow-xl shadow-[#7092BE] shadow:opacity-20 w-4/5 mx-auto mb-7 px-4 py-5 sm:p-6 '>
            <h1 className='text-center text-4xl font-bold text-ulm_maroon'>
              Faculty Recommendation Form
            </h1>
            <Formik initialValues={initialValues}>
              {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-black'
                  >
                    Applicant Name
                  </label>
                  <Field
                    type='text'
                    name='applicantName'
                    className='w-full'
                    disabled={true}
                  />
                  <ErrorMessage
                    name='applicantName'
                    component='div'
                    className='text-bred'
                  />

                  <div className=' p-4 text-black opacity-75 mx-auto'>
                    <p className='leading-relaxed text-justify'>
                      The above-named student is in the process of applying to a
                      pre-health professional program. The applicant has asked
                      to be interviewed by ULM&apos;s Pre-Medical Advisory
                      Committee. The information you provide will be used only
                      in the admissions/evaluation process. Please complete this
                      form as soon as possible. You may be contacted by a member
                      of the Pre-Professional Health Advisory Committee seeking
                      additional information or verification.
                    </p>
                  </div>

                  <div>
                    <div className=' p-4 text-black opacity-75 mx-auto'>
                      <p className='text-justify'>
                        Please indicate your estimation of this applicant by
                        choosing the appropriate description in the table below
                        and answering the following questions. Thank you for
                        your assistance in this process.
                      </p>
                    </div>

                    {/*Table Start*/}
                    <div>
                      <table className='border border-seperate border-slate-700 w-full text-center'>
                        <tbody>
                          <tr>
                            <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                              Intellectual Ability
                              <br />
                            </td>
                            <td className='border border-slate-600 hover:border-teal-500'>
                              <Field
                                type='radio'
                                name='intellectual'
                                value='belowAverage'
                                disabled={true}
                              />
                              <div>Below Average</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='intellectual'
                                value='average'
                                disabled={true}
                              />
                              <div>Average</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='intellectual'
                                value='aboveAverage'
                                disabled={true}
                              />
                              <div>Above Average</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='intellectual'
                                value='exceptional'
                                disabled={true}
                              />
                              <div> Exceptional</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='intellectual'
                                value='IntellectualNotObserved'
                                disabled={true}
                              />
                              <div>Not Observed</div>
                            </td>
                          </tr>
                          <tr>
                            <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                              Motivation
                              <br />
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='motivation'
                                value='uncertain'
                                disabled={true}
                              />
                              <div>Seems Uncertain</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='motivation'
                                value='certain'
                                disabled={true}
                              />
                              <div>Seems Certain</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='motivation'
                                value='motivated'
                                disabled={true}
                              />
                              <div>Motivated</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='motivation'
                                value='highlyMotivated'
                                disabled={true}
                              />
                              <div>Highly Motivated</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='motivation'
                                value='motivationNotObserved'
                                disabled={true}
                              />
                              <div>Not Observed</div>
                            </td>
                          </tr>
                          <tr>
                            <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                              Initiative
                              <br />
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='initiative'
                                value='needsProdding'
                                disabled={true}
                              />
                              <div>Needs Occasional Prodding</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='initiative'
                                value='doesWork'
                                disabled={true}
                              />
                              <div>Does All Assigned Work</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='initiative'
                                value='doesExtraWork'
                                disabled={true}
                              />
                              <div> Does Suggested Extra Work</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='initiative'
                                value='seeksLearning'
                                disabled={true}
                              />
                              <div>Seeks Out Learning Opportunities</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='initiative'
                                value='initiativeNotObserved'
                                disabled={true}
                              />
                              <div> Not Observed</div>
                            </td>
                          </tr>
                          <tr>
                            <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                              Personal & Social Maturity
                              <br />
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='personal'
                                value='personalBelowAverage'
                                disabled={true}
                              />
                              <div>Below Average</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='personal'
                                value='personalAverage'
                                disabled={true}
                              />
                              <div> Average</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='personal'
                                value='personalAboveAverage'
                                disabled={true}
                              />
                              <div>Above Average</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='personal'
                                value='personalExceptional'
                                disabled={true}
                              />
                              <div>Exceptional</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='personal'
                                value='personalNotObserved'
                                disabled={true}
                              />
                              <div>Not Observed</div>
                            </td>
                          </tr>
                          <tr>
                            <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                              Emotional Maturity
                              <br />
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='emotional'
                                value='excitable'
                                disabled={true}
                              />
                              <div> Very Excitable</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='emotional'
                                value='upset'
                                disabled={true}
                              />
                              <div>Easily Upset</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='emotional'
                                value='stable'
                                disabled={true}
                              />
                              <div> Usually Stable</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='emotional'
                                value='wellBalanced'
                                disabled={true}
                              />
                              <div>Stable / Well Balanced</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='emotional'
                                value='emotionalNotObserved'
                                disabled={true}
                              />
                              <div>Not Observed</div>
                            </td>
                          </tr>
                          <tr>
                            <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                              Dependability & Reliability
                              <br />
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='dependability'
                                value='reliabililty'
                                disabled={true}
                              />
                              <div>Doubtful Reliability</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='dependability'
                                value='reliable'
                                disabled={true}
                              />
                              <div>Usually Reliable</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='dependability'
                                value='averageReliability'
                                disabled={true}
                              />
                              <div>Above Average Reliability</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='dependability'
                                value='unquestionedReliability'
                                disabled={true}
                              />
                              <div>Unquestioned Reliability</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='dependability'
                                value='dependabilityNotObserved'
                                disabled={true}
                              />
                              <div>Not Observed</div>
                            </td>
                          </tr>
                          <tr>
                            <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                              Leadership
                              <br />
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='leadership'
                                value='follow'
                                disabled={true}
                              />
                              <div>Satisfied to Follow</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='leadership'
                                value='leader'
                                disabled={true}
                              />
                              <div>Occasionally a Leader</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='leadership'
                                value='frequentLeader'
                                disabled={true}
                              />
                              <div>Frequently a Leader</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='leadership'
                                value='outstandingLeader'
                                disabled={true}
                              />
                              <div>Outstanding Leader</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='leadership'
                                value='leadershipNotObserved'
                                disabled={true}
                              />
                              <div> Not Observed</div>
                            </td>
                          </tr>
                          <tr>
                            <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                              Character / Integrity
                              <br />
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='character'
                                value='untrustworthy'
                                disabled={true}
                              />
                              <div> Untrustworthy</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='character'
                                value='lapses'
                                disabled={true}
                              />
                              <div>Occasional Lapses</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='character'
                                value='noFlaws'
                                disabled={true}
                              />
                              <div>No Serious Flaws</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='character'
                                value='trustworthy'
                                disabled={true}
                              />
                              <div>Absolutely Trustworthy</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='character'
                                value='characterNotObserved'
                                disabled={true}
                              />
                              <div> Not Observed</div>
                            </td>
                          </tr>
                          <tr>
                            <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                              Verbal Skills
                              <br />
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='verbal'
                                value='verbalBelowAverage'
                                disabled={true}
                              />
                              <div>Below Average</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='verbal'
                                value='verbalAverage'
                                disabled={true}
                              />
                              <div> Average</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='verbal'
                                value='verbalAboveAverage'
                                disabled={true}
                              />
                              <div>Above Average</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='verbal'
                                value='verbalExceptional'
                                disabled={true}
                              />
                              <div>Exceptional</div>
                            </td>
                            <td className='border border-slate-600'>
                              <Field
                                type='radio'
                                name='verbal'
                                value='verbalNotObserved'
                                disabled={true}
                              />
                              <div>Not Observed</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className='font-bold mt-10 mb-3'>
                        How long and in what capacity have you known or observed
                        this student?
                      </div>
                      <Field
                        as='textarea'
                        type='text'
                        name='capacityKnownStudent'
                        rows={4}
                        className='block p-2.5 w-full text-sm text-black rounded-lg border'
                        placeholder='Write your thoughts here...'
                        disabled={true}
                      ></Field>
                      <div className='font-bold mt-10 mb-3'>
                        What do you consider to be the applicant&apos;s major
                        strength(s)?
                      </div>
                      <Field
                        as='textarea'
                        type='text'
                        name='majorStrength'
                        rows={4}
                        className='block p-2.5 w-full text-sm text-black rounded-lg border'
                        placeholder='Write your thoughts here...'
                        disabled={true}
                      />
                    </div>

                    <div className='font-bold mt-10 mb-3'>
                      What do you consider to be the applicant&apos;s major
                      weakness(es)?
                    </div>
                    <Field
                      as='textarea'
                      type='text'
                      name='weakness'
                      rows={4}
                      className='block p-2.5 w-full text-sm text-black rounded-lg border'
                      placeholder='Write your thoughts here...'
                      disabled={true}
                    ></Field>
                  </div>
                  <div className='mt-10'>
                    <p className='mb-4 font-bold'>
                      Please indicate the applicant&apos;s overall potential for
                      success.
                    </p>
                    <Field
                      type='radio'
                      name='potential'
                      value='belowAverage'
                      disabled={true}
                    />
                    <label> Below Average</label>
                    <div>
                      <Field
                        type='radio'
                        name='potential'
                        value='average'
                        disabled={true}
                      />
                      <span> Average</span>
                    </div>
                    <div>
                      <Field
                        type='radio'
                        name='potential'
                        value='aboveAverage'
                        disabled={true}
                      />
                      <span> Above Average</span>
                    </div>
                    <div>
                      <Field
                        type='radio'
                        name='potential'
                        value='wellAboveAverage'
                        disabled={true}
                      />
                      <span> Well Above Average</span>
                    </div>
                    <div>
                      <Field
                        type='radio'
                        name='potential'
                        value='trulyOutstanding'
                        disabled={true}
                      />
                      <span> Truly Outstanding</span>
                    </div>

                    <p className='mt-5 mb-3 font-bold'>Additional Comments:</p>
                    <Field
                      as='textarea'
                      type='text'
                      name='comments'
                      rows={4}
                      className='block p-2.5 w-full text-sm text-black rounded-lg border'
                      placeholder='Write your thoughts here...'
                      disabled={true}
                    ></Field>

                    <div>
                      <p className='font-bold mt-14'>
                        Thank you for helping us to evaluate this applicant. If
                        you have any questions regarding the form, please
                        conatct Dr. Allison Wiedemeier (326 CNSB).
                      </p>
                      <div>
                        <label
                          htmlFor='evalSignature'
                          className='block text-sm font-medium text-gray-700'
                        >
                          <p className='mt-5 mb-3'>Name of Evaluator</p>
                        </label>
                        <Field
                          type='text'
                          name='evalSignature'
                          id='evalSignature'
                          className='w-full'
                          disabled={true}
                        />
                      </div>
                      <div>
                        <input type='checkbox' checked={sign} disabled={true} />
                        <span className='font-bold'>
                          {' '}
                          By checking this box, I hereby consent to using my
                          name as a valid signature for all purposes related to
                          this agreement.
                        </span>
                        <ErrorMessage
                          name='sign'
                          component='div'
                          className='text-bred'
                        />
                      </div>
                      <div>
                        <label htmlFor='start'>
                          <p className='mt-5 mb-3'>Date</p>
                        </label>
                        <Field
                          type='date'
                          id='date'
                          name='date'
                          className='w-full'
                          disabled={true}
                        />
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
