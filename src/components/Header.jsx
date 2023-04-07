import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";

const Header = (props) => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-10 max-w-[1240px] mx-auto px-4 text-[#3B0000]">
      <h1 className="w-full text-3xl font-bold text-ulm_red">ULM</h1>
      <ul className="hidden md:flex">
        <li className="p-4">
          <Link href="/landing">Home</Link>
        </li>
        <li className="p-4">
          <Link href="/faculty">Faculty</Link>
        </li>
        <li className="p-4">
          <Link href="/contact">Contact</Link>
        </li>
        <li className="p-4">
          <Link href="/about">About</Link>
        </li>
      </ul>

      {/*Login Button*/}
      <a href="https://pmac-beta-opnaptos3-prabinbasnet09.vercel.app/">
        <button className="bg-ulm_red w-[100px] rounded-md text-lg my-6 mx-auto font-bold px-2 text-white">
          <Link href="/SignUp">Login</Link>
        </button>
      </a>

      {/*Burger Menu*/}
      <div onClick={handleNav} className="block md:hidden pl-4 text-black">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[40%] h-full border-r z-40 border-stone-900 bg-[#ffffff] ease-in-out duration-500"
            : "fixed left-[-100%] text-black"
        }
      >
        <h1 className="w-full text-3xl font-bold m-4">ULM</h1>
        <ul className="uppercase p-4 border-b border-stone-900">
          <li className="p-4 border-b border-stone-900">Home</li>
          <li className="p-4 border-b border-stone-900">Faculty</li>
          <li className="p-4 border-b border-stone-900">Contact</li>
          <li className="p-4">
            <Link href="/about">
              <p>About</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
