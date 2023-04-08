import Header from "@/components/Header";
import Image from "next/image";

const About = () => {
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
          />
        </div>
      </body>
    </>
  );
};

export default About;
