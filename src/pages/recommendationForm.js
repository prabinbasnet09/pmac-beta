import { React, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LandingHeader from '@/components/LandingHeader';
import axios from 'axios';

export default function RecommendationForm() {
  const [guestUser, setGuestUser] = useState(null);
  const [sign, setSign] = useState(false);
  const [userId, setUserId] = useState('e2b937bd-6aeb-4f12-b223-586a9db2bf11');

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
    evaluatorName: '',
    date: '',
    sign: false,
  };

  const validationSchema = Yup.object().shape({
    applicantName: Yup.string().required('Applicant Name is required!'),
    date: Yup.date().required('Date is required!'),
    capacityKnownStudent: Yup.string().required('This section is required!'),
    majorStrength: Yup.string().required('This section is required!'),
    weakness: Yup.string().required('This section is required!'),
    comments: Yup.string().required('This section is required!'),
    potential: Yup.string().required('This section is required!'),
    intellectual: Yup.string().required('This section is required!'),
    motivation: Yup.string().required('This section is required!'),
    initiative: Yup.string().required('This section is required!'),
    personal: Yup.string().required('This section is required!'),
    emotional: Yup.string().required('This section is required!'),
    dependability: Yup.string().required('This section is required!'),
    leadership: Yup.string().required('This section is required!'),
    character: Yup.string().required('This section is required!'),
    verbal: Yup.string().required('This section is required!'),
    evaluatorName: Yup.string().required('Evaluator Full Name is Required!'),
    sign: Yup.boolean()
      .required('You must agree to the terms')
      .oneOf([true], 'You must agree to the terms!'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    const backendURL =
      'https://99ym30ffli.execute-api.us-east-1.amazonaws.com/prod/submit';

    const requestConfig = {
      headers: {
        'x-api-key': 'PBDYZzW59J6ZeQH6qDFGE3kd8BE34BFRavTb6Sez',
      },
    };
    const requestBody = {
      userId: userId,
      applicantName: values.applicantName,
      date: values.date,
      evaluatorName: values.evaluatorName,
      intellectual: values.intellectual,
      motivation: values.motivation,
      initiative: values.initiative,
      personal: values.personal,
      emotional: values.emotional,
      dependability: values.dependability,
      leadership: values.leadership,
      character: values.character,
      verbal: values.verbal,
      studentCapacity: values.capacityKnownStudent,
      majorStrength: values.majorStrength,
      weaknesses: values.weakness,
      comments: values.comments,
      potential: values.potential,
      agreement: values.sign,
      facultyEmail: guestUser.email,
    };
    axios
      .post(backendURL, requestBody, requestConfig)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    setSubmitting(false);
  };

  return guestUser ? (
    <div>
      <LandingHeader />
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
                    <ErrorMessage
                      name='applicantName'
                      component='div'
                      className='text-bred'
                    />

                    <div className=' p-4 text-black opacity-75 mx-auto'>
                      <p className='leading-relaxed text-justify'>
                        The above-named student is in the process of applying to
                        a pre-health professional program. The applicant has
                        asked to be interviewed by ULM&apos;s Pre-Medical
                        Advisory Committee. The information you provide will be
                        used only in the admissions/evaluation process. Please
                        complete this form as soon as possible. You may be
                        contacted by a member of the Pre-Professional Health
                        Advisory Committee seeking additional information or
                        verification.
                      </p>
                    </div>

                    <div>
                      <div className=' p-4 text-black opacity-75 mx-auto'>
                        <p className='text-justify'>
                          Please indicate your estimation of this applicant by
                          choosing the appropriate description in the table
                          below and answering the following questions. Thank you
                          for your assistance in this process.
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
                                <ErrorMessage
                                  name='intellectual'
                                  component='span'
                                  className='text-bred'
                                />
                              </td>
                              <td className='border border-slate-600 hover:border-teal-500'>
                                <Field
                                  type='radio'
                                  name='intellectual'
                                  value='belowAverage'
                                />
                                <div>Below Average</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='intellectual'
                                  value='average'
                                />
                                <div>Average</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='intellectual'
                                  value='aboveAverage'
                                />
                                <div>Above Average</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='intellectual'
                                  value='exceptional'
                                />
                                <div> Exceptional</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='intellectual'
                                  value='IntellectualNotObserved'
                                />
                                <div>Not Observed</div>
                              </td>
                            </tr>
                            <tr>
                              <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                                Motivation
                                <br />
                                <ErrorMessage
                                  name='motivation'
                                  component='span'
                                  className='text-bred'
                                />
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='motivation'
                                  value='uncertain'
                                />
                                <div>Seems Uncertain</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='motivation'
                                  value='certain'
                                />
                                <div>Seems Certain</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='motivation'
                                  value='motivated'
                                />
                                <div>Motivated</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='motivation'
                                  value='highlyMotivated'
                                />
                                <div>Highly Motivated</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='motivation'
                                  value='motivationNotObserved'
                                />
                                <div>Not Observed</div>
                              </td>
                            </tr>
                            <tr>
                              <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                                Initiative
                                <br />
                                <ErrorMessage
                                  name='initiative'
                                  component='span'
                                  className='text-bred'
                                />
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='initiative'
                                  value='needsProdding'
                                />
                                <div>Needs Occasional Prodding</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='initiative'
                                  value='doesWork'
                                />
                                <div>Does All Assigned Work</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='initiative'
                                  value='doesExtraWork'
                                />
                                <div> Does Suggested Extra Work</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='initiative'
                                  value='seeksLearning'
                                />
                                <div>Seeks Out Learning Opportunities</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='initiative'
                                  value='initiativeNotObserved'
                                />
                                <div> Not Observed</div>
                              </td>
                            </tr>
                            <tr>
                              <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                                Personal & Social Maturity
                                <br />
                                <ErrorMessage
                                  name='personal'
                                  component='span'
                                  className='text-bred'
                                />
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='personal'
                                  value='personalBelowAverage'
                                />
                                <div>Below Average</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='personal'
                                  value='personalAverage'
                                />
                                <div> Average</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='personal'
                                  value='personalAboveAverage'
                                />
                                <div>Above Average</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='personal'
                                  value='personalExceptional'
                                />
                                <div>Exceptional</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='personal'
                                  value='personalNotObserved'
                                />
                                <div>Not Observed</div>
                              </td>
                            </tr>
                            <tr>
                              <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                                Emotional Maturity
                                <br />
                                <ErrorMessage
                                  name='emotional'
                                  component='span'
                                  className='text-bred'
                                />
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='emotional'
                                  value='excitable'
                                />
                                <div> Very Excitable</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='emotional'
                                  value='upset'
                                />
                                <div>Easily Upset</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='emotional'
                                  value='stable'
                                />
                                <div> Usually Stable</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='emotional'
                                  value='wellBalanced'
                                />
                                <div>Stable / Well Balanced</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='emotional'
                                  value='emotionalNotObserved'
                                />
                                <div>Not Observed</div>
                              </td>
                            </tr>
                            <tr>
                              <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                                Dependability & Reliability
                                <br />
                                <ErrorMessage
                                  name='dependability'
                                  component='span'
                                  className='text-bred'
                                />
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='dependability'
                                  value='reliabililty'
                                />
                                <div>Doubtful Reliability</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='dependability'
                                  value='reliable'
                                />
                                <div>Usually Reliable</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='dependability'
                                  value='averageReliability'
                                />
                                <div>Above Average Reliability</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='dependability'
                                  value='unquestionedReliability'
                                />
                                <div>Unquestioned Reliability</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='dependability'
                                  value='dependabilityNotObserved'
                                />
                                <div>Not Observed</div>
                              </td>
                            </tr>
                            <tr>
                              <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                                Leadership
                                <br />
                                <ErrorMessage
                                  name='leadership'
                                  component='span'
                                  className='text-bred'
                                />
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='leadership'
                                  value='follow'
                                />
                                <div>Satisfied to Follow</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='leadership'
                                  value='leader'
                                />
                                <div>Occasionally a Leader</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='leadership'
                                  value='frequentLeader'
                                />
                                <div>Frequently a Leader</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='leadership'
                                  value='outstandingLeader'
                                />
                                <div>Outstanding Leader</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='leadership'
                                  value='leadershipNotObserved'
                                />
                                <div> Not Observed</div>
                              </td>
                            </tr>
                            <tr>
                              <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                                Character / Integrity
                                <br />
                                <ErrorMessage
                                  name='character'
                                  component='span'
                                  className='text-bred'
                                />
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='character'
                                  value='untrustworthy'
                                />
                                <div> Untrustworthy</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='character'
                                  value='lapses'
                                />
                                <div>Occasional Lapses</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='character'
                                  value='noFlaws'
                                />
                                <div>No Serious Flaws</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='character'
                                  value='trustworthy'
                                />
                                <div>Absolutely Trustworthy</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='character'
                                  value='characterNotObserved'
                                />
                                <div> Not Observed</div>
                              </td>
                            </tr>
                            <tr>
                              <td className='text-left px-4 font-bold text-ulm_logo_red border border-slate-600 '>
                                Verbal Skills
                                <br />
                                <ErrorMessage
                                  name='verbal'
                                  component='span'
                                  className='text-bred'
                                />
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='verbal'
                                  value='verbalBelowAverage'
                                />
                                <div>Below Average</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='verbal'
                                  value='verbalAverage'
                                />
                                <div> Average</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='verbal'
                                  value='verbalAboveAverage'
                                />
                                <div>Above Average</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='verbal'
                                  value='verbalExceptional'
                                />
                                <div>Exceptional</div>
                              </td>
                              <td className='border border-slate-600'>
                                <Field
                                  type='radio'
                                  name='verbal'
                                  value='verbalNotObserved'
                                />
                                <div>Not Observed</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className='font-bold mt-10 mb-3'>
                          How long and in what capacity have you known or
                          observed this student?
                        </div>
                        <Field
                          as='textarea'
                          type='text'
                          name='capacityKnownStudent'
                          rows={4}
                          className='block p-2.5 w-full text-sm text-black rounded-lg border'
                          placeholder='Write your thoughts here...'
                        ></Field>
                        <ErrorMessage
                          name='capacityKnownStudent'
                          component='div'
                          className='text-bred'
                        />

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
                        ></Field>
                        <ErrorMessage
                          name='majorStrength'
                          component='div'
                          className='text-bred'
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
                      ></Field>
                      <ErrorMessage
                        name='weakness'
                        component='div'
                        className='text-bred'
                      />
                    </div>
                    <div className='mt-10'>
                      <p className='mb-4 font-bold'>
                        Please indicate the applicant&apos;s overall potential
                        for success.
                      </p>
                      <Field
                        type='radio'
                        name='potential'
                        value='belowAverage'
                      />
                      <label> Below Average</label>
                      <div>
                        <Field type='radio' name='potential' value='average' />
                        <span> Average</span>
                      </div>
                      <div>
                        <Field
                          type='radio'
                          name='potential'
                          value='aboveAverage'
                        />
                        <span> Above Average</span>
                      </div>
                      <div>
                        <Field
                          type='radio'
                          name='potential'
                          value='wellAboveAverage'
                        />
                        <span> Well Above Average</span>
                      </div>
                      <div>
                        <Field
                          type='radio'
                          name='potential'
                          value='trulyOutstanding'
                        />
                        <span> Truly Outstanding</span>
                      </div>

                      <ErrorMessage
                        name='potential'
                        component='div'
                        className='text-bred'
                      />
                      <p className='mt-5 mb-3 font-bold'>
                        Additional Comments:
                      </p>
                      <Field
                        as='textarea'
                        type='text'
                        name='comments'
                        rows={4}
                        className='block p-2.5 w-full text-sm text-black rounded-lg border'
                        placeholder='Write your thoughts here...'
                      ></Field>
                      <ErrorMessage
                        name='comments'
                        component='div'
                        className='text-bred'
                      />

                      <div>
                        <p className='font-bold mt-14'>
                          Thank you for helping us to evaluate this applicant.
                          If you have any questions regarding the form, please
                          conatct Dr. Allison Wiedemeier (326 CNSB).
                        </p>
                        <div>
                          <label
                            htmlFor='evaluatorName'
                            className='block text-sm font-medium text-gray-700'
                          >
                            <p className='mt-5 mb-3'>Name of Evaluator</p>
                          </label>
                          <Field
                            type='text'
                            name='evaluatorName'
                            id='evaluatorName'
                            className='w-full'
                          />
                          <ErrorMessage
                            name='evaluatorName'
                            component='div'
                            className='text-bred'
                          />
                        </div>
                        <div>
                          <Field
                            type='checkbox'
                            name='sign'
                            checked={sign}
                            className='cursor-pointer'
                            onChange={e => {
                              const { checked } = e.target;
                              setSign(checked);
                              setFieldValue('sign', checked);
                            }}
                          />
                          <span className='font-bold'>
                            {' '}
                            By checking this box, I hereby consent to using my
                            name as a valid signature for all purposes related
                            to this agreement.
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
                          />
                          <ErrorMessage
                            name='date'
                            component='div'
                            className='text-bred'
                          />
                          <div className='mt-10'>
                            <p>
                              <button
                                type='submit'
                                disabled={isSubmitting}
                                className='bg-ulm_maroon hover:shadow-black shadow-sm rounded-md text-lg my-6 mx-auto font-bold px-2 text-white'
                              >
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
    </div>
  ) : null;
}
