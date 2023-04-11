import Header from "@/components/Header";
import Image from "next/image";
import Email from "./forms/contactForm";

const SERVICE_ID = "service_o5qrp02";
const TEMPLATE_ID = "template_e45tj6r";
const USER_ID = "****************";

const Contact = () => {
  return (
    <>
      <body>
        <div className="border-b-2 text-[#3B0000] border-t-2 border-b-2">
          <Image
            className="w-full mx-auto"
            src="/ulm_banner.jpg"
            alt=""
            width={1980}
            height={1024}
          />
        </div>
        <div className="Email">
          <Email />
        </div>
      </body>
    </>
  );
};

export default Contact;
