import Select from "./Select";
import { GrAppsRounded } from "react-icons/gr";
import PropTypes from "prop-types";
import { MdOutlineHeadset } from "react-icons/md";

const Menubar = () => {
  return (
    <div className="sticky top-0 w-full h-fit flex flex-col items-center">
      <div className="w-[97%] h-[4rem] flex item-center justify-between">
        <Categories />
        <ExpandedCategories />
        <SupportCenter />
      </div>
      <div className="h-[1px] w-full bg-[#cbcbcc]"></div>
    </div>
  );
};

const Categories = () => {
  return (
    <div className="w-[13%] flex items-center bg-[#35baf6] justify-center my-[1rem] hover:bg-green-400 rounded-md">
      <div className="w-[80%] relative flex items-center justify-center ">
        <Select
          data=""
          icon={
            <GrAppsRounded className="absolute left-[5px] text-[1rem] text-white" />
          }
          bgColor="bg-transparent"
          rounded
          textColor="text-white"
          textSize="text-sm"
          hoverBg="bg-[#4a924d]"
          fontWeight="medium"
        />
      </div>
    </div>
  );
};

// TODO : implement the array elems as objects, the one which has drop to true will have the dropdown feature
const ExpandedCategories = () => {
  const categories = [
    "Home",
    "Fashion",
    "Electronics",
    "Groceries",
    "Footwear",
    "Beauty",
    "Wellness",
    "Shop",
  ];
  return (
    <div className="w-[45%] bg-red-300 my-[1rem] flex justify-around items-center">
      {categories.map((e, idx) => (
        <RenderCategories key={idx} content={e} />
      ))}
    </div>
  );
};

const RenderCategories = ({ content }) => {
  return <div className="capitalize font-medium">{content}</div>;
};

const SupportCenter = () => {
  return (
    <div className="w-[12%] h-full flex items-center gap-[1rem]">
      <div className="h-full flex items-center justify-center text-4xl text-[#656565]">
        <MdOutlineHeadset />
      </div>
      <div className="h-full flex flex-col justify-center">
        <span className="text-lg font-medium text-[#35baf6]">9876-5432</span>
        <span className="text-[#656565] text-sm">24/7 Support Center</span>
      </div>
    </div>
  );
};

RenderCategories.propTypes = {
  content: PropTypes.string,
};

export default Menubar;
