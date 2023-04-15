import Header from '@/components/Header';
import Image from 'next/image';
import LandingHeader from '@/components/LandingHeader';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <div>
          <LandingHeader />
        </div>
        <div className='border-b-2 text-[#3B0000]'>
          <Image
            className='w-full mx-auto'
            src='/ulm_banner.jpg'
            alt=''
            width={1980}
            height={1024}
          />
        </div>
        <div className='mt-auto'>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;
