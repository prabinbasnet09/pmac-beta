import Image from "next/image";

const About = () => {
  return (
    <>
      <body>
        <div className="border-b-2 text-[#3B0000] border-t-2">
          <Image
            className="w-full mx-auto"
            src="/ulm_banner.jpg"
            alt=""
            width={1980}
            height={1024}
          />
        </div>
      </body>
      <footer>
        <div className="w-full bg-[#bcbcbc] py-1 px-4 border-ulm_maroon border-t-2">
          <p className="text-center">© 2023 University of Louisiana Monroe</p>
        </div>
      </footer>
    </>
  );
};

export default About;
