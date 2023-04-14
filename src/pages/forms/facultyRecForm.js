import { React, useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";
import * as queries from "../../api/gql/queries";
import * as mutations from "../../api/gql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { setDate } from "date-fns";
import { ActiveUser } from "../_app";

export default function InfoReleaseForm() {
  const activeUser = useContext(ActiveUser);

  const [rows, setRows] = useState([
    {
      schoolName: "",
      deadlineDate: "",
      contactPerson: "",
      address: "",
    },
  ]);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    cwid: Yup.string()
      .required("CWID is required")
      .matches(
        /^[0-9]{8}$/,
        "CWID must be a valid date in the format xxxx-xxxx"
      ),
    signature: Yup.string().required("Signature is required"),
    date: Yup.string().required("Date is Required"),
  });

  const rowSchema = Yup.object().shape({
    schoolName: Yup.string().required("Full Name is required!"),
    deadlineDate: Yup.string().required("Valid Date is required"),
    contactPerson: Yup.string().required("Contact person's is required!"),
    address: Yup.string().required("Address is required!"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const [authorizeRelease, setAuthorizeRelease] = useState(false);
  const [allowEvaluation, setAllowEvaluation] = useState(false);
  const [allowAdvertising, setAllowAdvertising] = useState(false);

  const [userInfo, setUserInfo] = useState({
    signature: "",
    evaluator: "",
    evalSignature: "",
    date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      await API.graphql({
        query: queries.listApplicantReleaseForms,
        variables: { filter: { userId: { eq: activeUser.id } } },
        authMode: "AMAZON_COGNITO_USER_POOLS",
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
          console.log(err);
        });
    };

    fetchData();
  }, [activeUser]);

  const handleFormSubmit = async () => {
    try {
      const schoolDetails = rows.map((row) => {
        return {
          schoolName: row.schoolName,
          deadlineDate: row.deadlineDate,
          contactPerson: row.contactPerson,
          address: row.address,
        };
      });

      const inputData = {
        userId: activeUser.id,
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
      };

      const createForm = async () => {
        await API.graphql({
          query: mutations.createApplicantReleaseForm,
          variables: { input: inputData },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })
          .then(async (res) => {
            if (res.data.createApplicantReleaseForm) {
              await API.graphql({
                query: mutations.updateUser,
                variables: {
                  input: {
                    id: activeUser.id,
                    applicantReleaseForm: "Submitted",
                  },
                },
                authMode: "AMAZON_COGNITO_USER_POOLS",
              })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const updateForm = async () => {
        await API.graphql({
          query: mutations.updateApplicantReleaseForm,
          variables: { input: inputData },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      activeUser.applicationReleaseForm ? updateForm() : createForm();
    } catch (err) {
      console.log("error creating InfoRelease Form:", err);
    }
  };

  const handleAuthorizeRelease = (e) => {
    setAuthorizeRelease(e.target.checked);
  };

  const handleAllowEvaluation = (e) => {
    setAllowEvaluation(e.target.checked);
  };

  const handleAllowAdvertising = (e) => {
    setAllowAdvertising(e.target.checked);
  };

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;

    setRows(newRows);
  };

  const handleDeleteRow = () => {
    const newRows = [...rows];
    newRows.pop(); // remove the last row

    setRows(newRows);
  };

  const handleUserInfo = (field, value) => {
    setUserInfo((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleAddRow = () => {
    setRows([...rows, { name: "", date: "", phone: "", address: "" }]);
  };

  const ProgressBar = ({ progressPercentage }) => {
    return (
      <div className="h-1 w-full bg-gray-300">
        <div
          style={{ width: `${progressPercentage}%` }}
          className={`h-full ${
            progressPercentage < 70 ? "bg-red-600" : "bg-green-600"
          }`}
        ></div>
      </div>
    );
  };

  return activeUser ? (
    <div className="mt-10 sm:mt-0">
      <div className="mt-10 w-full md:mt-10">
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="border-2 border-[#7e7e7e] rounded-xl shadow-xl shadow-[#7092BE] shadow:opacity-20 w-4/5 mx-auto mb-7 px-4 py-5 sm:p-6 ">
            <h1 className="text-center text-4xl font-bold text-ulm_maroon">
              Faculty Recommendation Form
            </h1>

            <div className=" p-4 text-black opacity-75 mx-auto">
              <p className="leading-relaxed text-justify">
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
              <div className="w-[500px]">
                <label
                  htmlFor="signature"
                  className="block text-sm font-medium text-gray-700"
                >
                  Signature of Applicant
                </label>
                <input
                  type="text"
                  name="signature"
                  id="signature"
                  defaultValue={userInfo.signature}
                  onChange={(event) =>
                    handleUserInfo("signature", event.target.value)
                  }
                  autoComplete="given-name"
                  {...register("signature")}
                  className={`form-control w-full ${
                    errors.signature ? "is-invalid" : ""
                  }`}
                />
                <div className="text-bred italic ">
                  {errors.signature?.message}
                </div>
              </div>
            </div>
            <div>
              <div className="w-[500px] mt-4">
                <label
                  htmlFor="evaluator"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name of Evaluator
                </label>
                <input
                  type="text"
                  name="evaluator"
                  id="evaluator"
                  defaultValue={userInfo.evaluator}
                  onChange={(event) =>
                    handleUserInfo("evaluator", event.target.value)
                  }
                  autoComplete="given-name"
                  {...register("evaluator")}
                  className={`form-control w-full ${
                    errors.evaluator ? "is-invalid" : ""
                  }`}
                />
                <div className="text-bred italic ">
                  {errors.evaluator?.message}
                </div>
              </div>
              <div className=" p-4 text-black opacity-75 mx-auto">
                <p className="text-justify">
                  Please indicate your estimation of this applicant by circling
                  the appropriate description in the table below and answering
                  the following questions. Thank you for your assistance in this
                  process.
                </p>
              </div>

              {/*Table Start*/}
              <div>
                <table className="border border-seperate border-slate-700 w-full text-center">
                  <tbody>
                    <tr>
                      <td className="text-left px-4 font-bold text-ulm_logo_red border border-slate-600 ">
                        Intellectual Ability
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Below Average
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Average
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Above Average
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Exceptional
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className="text-left px-4 font-bold text-ulm_logo_red border border-slate-600 ">
                        Motivation
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Seems Uncertain
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Seems Certain
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Motivated
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Highly Motivated
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className="text-left px-4 font-bold text-ulm_logo_red border border-slate-600 ">
                        Initiative
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Needs Occasional Prodding
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Does All Assigned Work
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Does Suggested Extra Work
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Seeks Out Learning Opportunities
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className="text-left px-4 font-bold text-ulm_logo_red border border-slate-600 ">
                        Personal & Social Maturity
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Below Average
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Average
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Above Average
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Exceptional Maturity
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className="text-left px-4 font-bold text-ulm_logo_red border border-slate-600 ">
                        Emotional Maturity
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Very Excitable
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Easily Upset
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Usually Stable
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Stable / Well Balanced
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className="text-left px-4 font-bold text-ulm_logo_red border border-slate-600 ">
                        Dependability & Reliability
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Doubtful Reliability
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Usually Reliable
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Above Average Reliability
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Unquestioned Reliability
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className="text-left px-4 font-bold text-ulm_logo_red border border-slate-600 ">
                        Leadership
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Satisfied to Follow
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Occasionally a Leader
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Frequently a Leader
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Outstanding Leader
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className="text-left px-4 font-bold text-ulm_logo_red border border-slate-600 ">
                        Character / Integrity
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Untrustworthy
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Occasional Lapses
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        No Serious Flaws
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Absolutely Trustworthy
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Not Observed
                      </td>
                    </tr>
                    <tr>
                      <td className="text-left px-4 font-bold text-ulm_logo_red border border-slate-600 ">
                        Verbal Skills
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Below Average
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Average
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Above Average
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Exceptional
                      </td>
                      <td className="border border-slate-600 hover:border-teal-500">
                        Not Observed
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="font-bold mt-10 mb-3">
                  How long and in what capacity have you known or observed this
                  student?
                </div>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder="Write your thoughts here..."
                ></textarea>
                <div className="font-bold mt-10 mb-3">
                  What do you consider to be the applicant&apos;s major
                  strength(s)?
                </div>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500  bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>

              <div className="font-bold mt-10 mb-3">
                What do you consider to be the applicant&apos;s major
                weakness(es)?
              </div>
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500  bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
            <div className="mt-10">
              <p className="mb-4 font-bold">
                Please indicate the applicant&apos;s overall potential for
                success.
              </p>
              <table className="border border-seperate border-slate-700 w-full text-center">
                <tbody>
                  <tr>
                    <td className="border border-slate-600 hover:border-teal-500">
                      Below Average
                    </td>
                    <td className="border border-slate-600 hover:border-teal-500">
                      Average
                    </td>
                    <td className="border border-slate-600 hover:border-teal-500">
                      Above Average
                    </td>
                    <td className="border border-slate-600 hover:border-teal-500">
                      Well Above Average
                    </td>
                    <td className="border border-slate-600 hover:border-teal-500">
                      Truly Outstanding
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-5 mb-3 font-bold">Additional Comments:</p>
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500  bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>

              <div>
                <p className="font-bold mt-14">
                  Thank you for helping us to evaluate this applicant. Please
                  sign below and return this form to Dr. Allison Wiedemeier (326
                  CNSB).
                </p>
                <div className="w-[500px] grid grid-col-2">
                  <div>
                    <label
                      htmlFor="evalSignature"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <p className='mt-5 mb-3'>Signature of Evaluator</p>
                    </label>
                    <input
                      type="text"
                      name="evalSignature"
                      id="evalSignature"
                      defaultValue={userInfo.evalSignature}
                      onChange={(event) =>
                        handleUserInfo("signature", event.target.value)
                      }
                      autoComplete="given-name"
                      {...register("signature")}
                      className={`form-control w-full ${
                        errors.evalSignature ? "is-invalid" : ""
                      }`}
                    />
                    <div className="text-bred italic ">
                      {errors.evalSignature?.message}
                    </div>
                  </div>
                  <div className="w-[300px]">
                    <label for="start">
                      <p className='mt-5 mb-3'>Date</p>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="trip-start"
                      value="01/01/2023"
                      min="4/12/23"
                      max="2040-12-31"
                      onChange={(event) =>
                        handleUserInfo("signature", event.target.value)
                      }
                      autoComplete="date"
                      {...register("date")}
                      className={`form-control w-full ${
                        errors.date ? "is-invalid" : ""
                      }`}
                    />
                    <div className="text-bred italic ">
                      {errors.date?.message}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
