import Image from 'next/image';
import Email from './forms/contactForm';
import LandingHeader from '@/components/LandingHeader';
import Footer from '@/components/Footer';

const SERVICE_ID = 'service_o5qrp02';
const TEMPLATE_ID = 'template_e45tj6r';
const USER_ID = '****************';

const Contact = () => {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <div>
          <LandingHeader />
          <div className='border-b-2 text-[#3B0000] border-t-2 border-b-2 '>
            <Image
              className='w-full mx-auto'
              src='/ulm_banner.jpg'
              alt=''
              width={1980}
              height={1024}
            />
          </div>
          <div>
            <p className='mt-10 text-4xl font-bold text-ulm_maroon text-center mt-10'>
              Have questions? Get in touch with us!{' '}
            </p>
            <p className='text-center mt-4 font-bold text-xl'>
              Use our contact form if you have any questions or comments.
            </p>
            <Email />
          </div>
        </div>
        <div className='mt-auto'>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Contact;
