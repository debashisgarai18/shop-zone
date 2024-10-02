import UseImage from "../assets/react.svg";
import { IoMdSearch } from "react-icons/io";
import Select from "./Select";
import NotifyIcons from "./NotifyIcons";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetchdata from "../Hooks/useFetchData";

const Navbar = () => {
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center">
      <Header />
    </div>
  );
};

const Header = () => {
  return (
    <div className="w-[97%] flex item-center pt-[1rem]">
      <div className="w-[23%] flex items-center gap-[0.75rem]">
        <img src={UseImage} className="h-[2.5rem]" />
        <span className="text-[1.75rem]">e-Commerce</span>
      </div>
      <div className="w-[45%] flex relative flex-row items-center">
        <input
          type="text"
          placeholder="Seacrh for items...."
          className=" text-[1rem] px-[1rem] h-full w-[70%] focus:outline-none border-[1px] border-black"
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
    <div className="w-[33%] flex gap-[1rem] bg-red-400">
      <div className="w-[35%] bg-green-300 flex items-center relative">
        <Select data={countries} />
      </div>
      <div className="w-[calc(100%-35%)] bg-blue-500 flex items-center justify-around">
        <NotifyIcons />
        <NotifyIcons />
        <Button />
      </div>
    </div>
  );
};

export default Navbar;
