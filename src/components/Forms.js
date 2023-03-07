import React from 'react'
import { useContext } from 'react'
import Link from 'next/link'
import { ActiveUser } from '@/pages/_app'

function Forms() {
  const activeUser = useContext(ActiveUser);

  return (
    <div> 
       <table className="w-full table-auto border  border-black  px-4 py-2 bg-red text-white ">
      <thead>
        <tr>
          <th className="w-3/4 border border-black px-4 py-2">Forms</th>
          <th className="w-1/4 border border-black px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="w-3/4 border border-black px-4 py-2 bg-white text-black  hover:text-red hover:font-bold">
            <Link href="/forms/appInfo">Applicant Information Form</Link>
          </td>
          <td className="w-1/4 border border-black px-4 py-2 bg-white text-black text-gray italic text-sm">Incomplete...</td>
        </tr>
        <tr>
          <td className="w-3/4 border border-black px-4 py-2 bg-white text-black hover:text-red hover:font-bold">
            <Link href="/forms/infoReleaseForm">Information Release Form</Link>
          </td>
          <td className="w-1/4 border border-black px-4 py-2 bg-white text-gray italic text-sm ">Incomplete...</td>
        </tr>
        <tr>
          <td className="w-3/4 border border-black px-4 py-2 bg-white text-black disabled:">
            Faculty Recommendation Form
          </td>
          <td className="w-1/4 border border-black px-4 py-2 bg-white text-black text-gray italic text-sm">Incomplete....</td>
        </tr>
        <tr>
          <td className="w-3/4 border border-black px-4 py-2 bg-white text-black hover:text-red hover:font-bold">
            <Link href="/forms/statementTranscript">Personal Statement</Link>
          </td>
          <td className="w-1/4 border border-black px-4 py-2 bg-white text-black text-gray italic text-sm">Incomplete....</td>
        </tr>
        <tr>
          <td className="w-3/4 border border-black px-4 py-2 bg-white text-black hover:text-red hover:font-bold">
            <Link href="/forms/statementTranscript">Transcript</Link>
          </td>
          <td className="w-1/4 border border-black px-4 py-2 bg-white text-black text-gray italic text-sm">Incomplete....</td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default Forms
