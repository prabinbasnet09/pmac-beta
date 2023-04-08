import Header from "@/components/Header";
import Image from "next/image";
import { CiMail } from 'react-icons/ci'

const SERVICE_ID = "service_o5qrp02";
const TEMPLATE_ID = "template_e45tj6r";
const USER_ID = "****************";

const Contact = () => {
  return (
    <>
      <body>
        <div className="border-b-2 text-[#3B0000]">
          <Image
            className="w-full mx-auto"
            src="/ulm_banner.jpg"
            alt=""
            width={1980}
            height={1024}
          /></div>
          <div className='mx-auto font-bold'>
          
          <h1>Have questions? Get in touch with us!</h1>
          <CiMail size={100} color='#7F7F7F'/>
          </div>
          <div className='mx-auto'>
            
          </div>
      </body>
    </>
  );
};

export default Contact;
