import UseImage from "../assets/react.svg";
import { IoMdSearch } from "react-icons/io";
import Select from "./Select";
import NotifyIcons from "./NotifyIcons";
import Button from "./Button";
import useFetchdata from "../Hooks/useFetchData";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

// TODO : Implement the hamburger for mobile devices
const Navbar = () => {
  return (
    <>
      <div className="w-full sticky md:static top-0 bg-white h-fit flex flex-col items-center justify-center">
        <TopHeader />
        <div className="hidden md:inline h-[1px] w-full bg-[#cbcbcc]"></div>
      </div>
    </>
  );
};

// this is the first header for the navbar
const TopHeader = () => {
  return (
    <div className="w-[97%] flex item-center py-[1rem]">
      <div className="w-[23%] flex items-center gap-[0.75rem]">
        <img src={UseImage} className="h-[2rem] md:h-[2.5rem]" />
        <span className="text-[1.75rem] hidden md:inline">Demo</span>
      </div>
      <div className="w-[45%] flex relative flex-row items-center">
        <input
          type="text"
          placeholder="Seacrh for items...."
          className="text-[1rem] hidden md:inline px-[1rem] h-full w-[70%] focus:outline-none border-[1px] border-[#cbcbcc]"
        />
        <input
          type="text"
          className="absolute inline md:hidden w-full h-full px-[1rem] right-[-25%] focus:outline-none border-[1px] py-[1rem] border-[#cbcbcc] rounded-xl"
          placeholder="Search"
        />
        <IoMdSearch className="text-[1.5rem] absolute right-[-42%] md:right-[32%] cursor-pointer" />
      </div>
      <RightTopNav />
      <HamburgerMenu />
    </div>
  );
};

const RightTopNav = () => {
  let countries = ["All"];
  countries = [
    ...countries,
    ...useFetchdata("https://countriesnow.space/api/v0.1/countries"),
  ];
  return (
    <div className="w-[33%] hidden md:flex gap-[1rem]">
      <div className="w-[35%] flex items-center justify-center relative">
        <Select
          data={countries}
          icon=<FaLocationDot className="absolute left-[5px] text-[#35baf6]" />
          bgColor="bg-white"
          rounded={false}
          border
          fontWeight="normal"
        />
      </div>
      <div className="w-[calc(100%-35%)] flex items-center justify-around">
        <NotifyIcons
          label="Wishlist"
          logo=<FaRegHeart className="text-[1.2rem]" />
          count={0}
        />
        <NotifyIcons
          label="Cart"
          logo=<FiShoppingCart className="text-[1.2rem]" />
          count={0}
        />
        <Button label="Sign in" textSize="16px" rounded="rounded-md" active />
      </div>
    </div>
  );
};

// for mobile only --> replacement for all the account related things of the above menu
const HamburgerMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const onClickHandler = () => {
    setOpenMenu((prev) => !prev);
  };
  return (
    <>
      <div className="w-[2rem] h-[2rem] flex md:hidden absolute right-[5%] items-center justify-center">
        {!openMenu ? (
          <GiHamburgerMenu className="text-2xl" onClick={onClickHandler} />
        ) : (
          <IoClose className="text-2xl" onClick={onClickHandler} />
        )}
      </div>
      {openMenu && (
        <div className="w-[30%] h-fit bg-[#d4d1d1] rounded-xl shadow-2xl inlne md:hidden absolute right-0 top-[100%] flex flex-col items-center cursor-pointer">
          <div className="w-full flex items-center gap-[1rem] hover:bg-[#8f8e8e] px-[1rem] py-[0.5rem] rounded-xl">
            <FaRegHeart className="text-[1rem]" />
            <span className="text-[1rem] font-medium">Wishlist</span>
          </div>
          <div className="w-full flex items-center gap-[1rem] hover:bg-[#8f8e8e] px-[1rem] py-[0.5rem] rounded-xl">
            <FiShoppingCart className="text-[1rem]" />
            <span className="text-[1rem] font-medium">Cart</span>
          </div>
          <div className="w-full h-[3rem] ">
            <Button label="Sign in" textSize="1rem" rounded="rounded-md" active />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
