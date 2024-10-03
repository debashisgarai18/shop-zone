import UseImage from "../assets/react.svg";
import { IoMdSearch } from "react-icons/io";
import Select from "./Select";
import NotifyIcons from "./NotifyIcons";
import Button from "./Button";
import useFetchdata from "../Hooks/useFetchData";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";

// TODO : Implement the hamburger for mobile devices
const Navbar = () => {
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center">
      <TopHeader />
      <div className="h-[1px] w-full bg-[#cbcbcc]"></div>
    </div>
  );
};

// this is the first header for the navbar
const TopHeader = () => {
  return (
    <div className="w-[97%] flex item-center py-[1rem]">
      <div className="w-[23%] flex items-center gap-[0.75rem]">
        <img src={UseImage} className="h-[2.5rem]" />
        <span className="text-[1.75rem]">e-Commerce</span>
      </div>
      <div className="w-[45%] flex relative flex-row items-center">
        <input
          type="text"
          placeholder="Seacrh for items...."
          className=" text-[1rem] px-[1rem] h-full w-[70%] focus:outline-none border-[1px] border-[#cbcbcc]"
        />
        <IoMdSearch className="text-[1.5rem] absolute right-[32%] cursor-pointer" />
      </div>
      <RightTopNav />
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
    <div className="w-[33%] flex gap-[1rem]">
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
        <Button label="Sign in" />
      </div>
    </div>
  );
};
export default Navbar;
