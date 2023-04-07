import Header from "@/components/Header";

const SERVICE_ID = "service_o5qrp02";
const TEMPLATE_ID = "template_e45tj6r";
const USER_ID = "****************";

const Contact = () => {
  return (
    <>
      <Header>
        <Header />
      </Header>
      <body>
        {/*Dark Brown Window Banner */}
        <div className="w-full bg-[#bcbcbc] py-10 px-4 mt-[200px] flex mx-auto">
          {/*Light Grey Email Box*/}
          <div className="bg-[#7F7F7F] w-256 mx-auto md:w-auto lg:max-w-md shadow dark:border rounded-lg  md:mt-0  sm: xl:p-0">
            {/*Email Component*/}
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8"></div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Contact;
