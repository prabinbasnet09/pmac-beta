import Header from "@/components/Header";
import Image from "next/image";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import chair from "../../public/allisonwiedemier.jpg"
import ashworth from "../../public/ashworth.jpg"
import chandler from "../../public/chandler.png"
import elgiar from "../../public/elgiar.png"
import gann from "../../public/gann.png"
import hill from "../../public/hill.png"
import siva from "../../public/siva.png"
import overturf from "../../public/overturf.png"

const About = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div>
          <LandingHeader />
        </div>
        <div className="border-b-2 text-[#3B0000]">
          <Image
            className="w-full mx-auto"
            src="/ulm_banner.jpg"
            alt=""
            width={1980}
            height={1024}
          />
        </div>

        <div className='max-w-[800px] mt-[10px] md:text-4xl w-full h-auto mx-auto flex text-center flex-col justify-center'>
            <p className='text-gold font-bold p-2 mb-5'>Applicant Instruction</p>
            </div>

            
<ul className="relative border-l border-green w-1/2 justify-center mx-auto">                  
    <li className="mb-5 ml-6">            
        <span className="absolute flex items-center justify-center w-6 h-6 bg-green rounded-full -left-3">
           
        </span>
        <div className="items-center justify-between p-4 bg-white border border-gray rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
            <div className="text-sm font-normal text-gray-500 dark:text-gray-300">Complete forms: <span className="font-bold text-red">Applicant Information Form and Information Release Form</span></div>
        </div>
    </li>
    <li className="mb-5 ml-6">            
        <span className="absolute flex items-center justify-center w-6 h-6 bg-green rounded-full -left-3">
           
        </span>
        <div className="items-center justify-between p-4 bg-white border border-gray rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
            <div className="text-sm font-normal text-gray-500 dark:text-gray-300">Request a faculty member to complete: <span className="font-bold text-red">Faculty Recommendation Form</span></div>
        </div>
    </li>
    <li className="mb-5 ml-6">            
        <span className="absolute flex items-center justify-center w-6 h-6 bg-green rounded-full -left-3">
           
        </span>
        <div className="items-center justify-between p-4 bg-white border border-gray rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
            <div className="text-sm font-normal text-gray-500 dark:text-gray-300">Upload the following documents: <span className="font-bold text-red">Unofficial Transcript, Personal Statement, and Headshot </span></div>
        </div>
    </li>
    <li className="mb-5 ml-6">            
        <span className="absolute flex items-center justify-center w-6 h-6 bg-green rounded-full -left-3">
           
        </span>
        <div className="items-center justify-between p-4 bg-white border border-gray rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
            <div className="text-sm font-normal text-gray-500 dark:text-gray-300">Fill out schedule of your current semester to allow an  <span className="font-bold text-red">interview </span>time to be determined</div>
        </div>
    </li>
    <li className="mb-5 ml-6">            
        <span className="absolute flex items-center justify-center w-6 h-6 bg-green rounded-full -left-3">
           
        </span>
        <div className="items-center justify-between p-4 bg-white border border-gray rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
            <div className="text-sm font-normal text-gray-500 dark:text-gray-300">Wait for your interview to be <span className="font-bold text-red">scheduled </span></div>
        </div>
    </li>
    <li className="mb-5 ml-6">            
        <span className="absolute flex items-center justify-center w-6 h-6 bg-green rounded-full -left-3">
           
        </span>
        <div className="items-center justify-between p-4 bg-white border border-gray rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
            <div className="text-sm font-normal text-gray-500 dark:text-gray-300">Wait for your recommendation letter to be <span className="font-bold text-red">completed </span></div>
        </div>
    </li>
    
</ul>


<div class="grid mt-4 mb-8 border border-gray rounded w-1/2 justify-center mx-auto md:mb-12 md:grid-cols-2">
    <figure class="flex flex-col items-center justify-center p-2 text-center bg-white border-b border-black rounded  md:rounded-t-none md:rounded-tl-lg md:border-r ">
        <blockquote class="max-w-2xl mx-auto text-gray-500 ">
            <h3 class="text-lg  text-black mb-2">Spring Deadline for Documents:</h3>
            <p class="font-bold text-2xl text-red">Feburary 15</p>
        </blockquote>
           
    </figure>
    <figure class="flex flex-col items-center justify-center p-2 text-center bg-white border-gray  rounded dark:bg-gray-800 dark:border-gray-700">
        <blockquote class="max-w-2xl mx-auto text-gray-500 ">
        <h3 class="text-lg  text-black mb-2">Fall Deadline for Documents:</h3>
            <p class="font-bold text-2xl text-red">October 1</p>
        </blockquote>
          
    </figure>
   
</div>



        <div className='max-w-[800px] mt-[10px] md:text-4xl w-full h-auto mx-auto flex text-center flex-col justify-center'>
            <p className='text-gold font-bold p-2'>Committee Members</p>
            </div>

        <div className="max-h-[1024px] max-w-[1280px] flex flex-col bg-gray-100 mx-auto mb-11">
          <div className="m-auto mb-10 mt-10">
            <div className="border border-gray shadow-black flex flex-col bg-gray-200 max-w-sm shadow-md py-2 px-10 md:px-3 rounded-lg w-96 h-32">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <Image
                  className="rounded-full border-4 border-gray-600 h-24 w-24 mx-auto"
                  src={chair}
                  alt="chair"
                />
                <div className="flex flex-col text-center md:text-left">
                  <div className="font-medium text-lg text-gray-800">
                    Allison Wiedemeier
                  </div>
                  <div className="text-gray-500 mb-3 whitespace-wrap">
                    Committee Chair
                  </div>
                  <div className="text-gray-500 mb-2 whitespace-wrap">
                  Associate Professor, Biology
                  </div>
                  <div className="flex flex-row gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0"></div>
                </div>
              </div>
            </div>
          </div>
          
        <div className='grid grid-cols-3 gap-3'>
          <div className="m-auto">
            <div className="border border-gray shadow-black flex flex-col bg-gray-200 max-w-sm shadow-md py-2 px-10 md:px-3 rounded-lg w-96 h-32">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <Image
                  className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                  src={ashworth}
                  alt="chair"
                />
                <div className="flex flex-col text-center md:text-left">
                  <div className="font-medium text-lg text-gray-800">
                    Burt Ashworth
                  </div>
                  <div className="text-gray-500 mb-3 whitespace-wrap">
                    Faculty
                  </div>
                  <div className="text-gray-500 mb-2 whitespace-wrap">
                  Associate Professor, Psychology
                  </div>
                  <div className="flex flex-row gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="m-auto">
          <div className="border border-gray shadow-black flex flex-col bg-gray-200 max-w-sm shadow-md py-2 px-10 md:px-3 rounded-lg w-96 h-32">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <Image
                  className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                  src={elgiar}
                  alt="chair"
                />
                <div className="flex flex-col text-center md:text-left">
                  <div className="font-medium text-lg text-gray-800">
                  Dr. Emad M. El-Giar
                  </div>
                  <div className="text-gray-500 mb-3 whitespace-wrap">
                    Faculty
                  </div>
                  <div className="text-gray-500 mb-2 whitespace-wrap">
                  Associate Professor, Chemistry
                  </div>
                  <div className="flex flex-row gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="m-auto">
          <div className="border border-gray shadow-black flex flex-col bg-gray-200 max-w-sm shadow-md py-2 px-10 md:px-3 rounded-lg w-96 h-32">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <Image
                  className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                  src={chandler}
                  alt="chair"
                />
                <div className="flex flex-col text-center md:text-left">
                  <div className="font-medium text-lg text-gray-800">
                    Kristin Chandler
                  </div>
                  <div className="text-gray-500 mb-3 whitespace-wrap">
                    Faculty
                  </div>
                  <div className="text-gray-500 mb-2 whitespace-wrap">
                  Executive Director of Career and Student Development
                  </div>
                  <div className="flex flex-row gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="m-auto">
          <div className="border border-gray shadow-black flex flex-col bg-gray-200 max-w-sm shadow-md py-2 px-10 md:px-3 rounded-lg w-96 h-32">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <Image
                  className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                  src={gann}
                  alt="chair"
                />
                <div className="flex flex-col text-center md:text-left">
                  <div className="font-medium text-lg text-gray-800">
                    Joshua Gann
                  </div>
                  <div className="text-gray-500 mb-3 whitespace-wrap">
                    Faculty
                  </div>
                  <div className="text-gray-500 mb-2 whitespace-wrap">
                  Assistant Professor, Kinesiology
                  </div>
                  <div className="flex flex-row gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="m-auto">
          <div className="border border-gray shadow-black flex flex-col bg-gray-200 max-w-sm shadow-md py-2 px-10 md:px-3 rounded-lg w-96 h-32">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <Image
                  className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                  src={hill}
                  alt="chair"
                />
                <div className="flex flex-col text-center md:text-left">
                  <div className="font-medium text-lg text-gray-800">
                  Ronald A Hill, PhD
                  </div>
                  <div className="text-gray-500 mb-3 whitespace-wrap">
                    Faculty
                  </div>
                  <div className="text-gray-500 mb-2 whitespace-wrap">
                  Associate Professor, Pharmacy
                  </div>
                  <div className="flex flex-row gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="m-auto">
          <div className="border border-gray shadow-black flex flex-col bg-gray-200 max-w-sm shadow-md py-2 px-10 md:px-3 rounded-lg w-96 h-32">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <Image
                  className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                  src={siva}
                  alt="chair"
                />
                <div className="flex flex-col text-center md:text-left">
                  <div className="font-medium text-lg text-gray-800">
                    Siva Murru
                  </div>
                  <div className="text-gray-500 mb-3 whitespace-wrap">
                    Faculty
                  </div>
                  <div className="text-gray-500 mb-2 whitespace-wrap">
                  Associate Professor, Organic Chemistry
                  </div>
                  
                  <div className="flex flex-row gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="m-auto">
          <div className="border border-gray shadow-black flex flex-col bg-gray-200 max-w-sm shadow-md py-2 px-10 md:px-3 rounded-lg w-96 h-32">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <Image
                  className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
                  src={overturf}
                  alt="chair"
                />
                <div className="flex flex-col text-center md:text-left">
                  <div className="font-medium text-lg text-gray-800">
                    Matt Overturf
                  </div>
                  <div className="text-gray-500 mb-3 whitespace-wrap">
                    Faculty
                  </div>
                  <div className="text-gray-500 mb-2 whitespace-wrap">
                  Associate Professor, Biology
                  </div>
                  <div className="flex flex-row gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0"></div>
                </div>
              </div>
            </div>
          </div>


        </div>
        </div>


        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;
