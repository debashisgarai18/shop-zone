import { GrAppsRounded } from "react-icons/gr";
import PropTypes from "prop-types";
import { MdOutlineHeadset } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

// this is global dummy array
// TODO : To be eliminated when data comes from the API
const categories = [
  {
    cat: "Home",
    expand: false,
  },
  {
    cat: "Fashion",
    expand: true,
    sub: ["Men", "Women", "Boys", "Girls"],
  },
  {
    cat: "Electronics",
    expand: true,
    sub: [
      "Mobiles",
      "TV",
      "Computers and Accessories",
      "Smart Watches and Accessories",
      "Cameras",
    ],
  },
  {
    cat: "Groceries",
    expand: true,
    sub: ["Cooking Essentials", "Homecare"],
  },
  {
    cat: "Footwear",
    expand: true,
    sub: ["Men's Footwear", "Women's Footwear", "Children Footwear"],
  },
  {
    cat: "Beauty",
    expand: false,
  },
  {
    cat: "Wellness",
    expand: false,
  },
  {
    cat: "Shop",
    expand: true,
    sub: [
      {
        main: "Fashion",
        under: ["Men", "Women", "Boys", "Girls"],
      },
      {
        main: "Electronics",
        under: [
          "Mobiles",
          "TV",
          "Computers and Accessories",
          "Cameras",
          "Smart Watches and Accessories",
          "Cameras",
        ],
      },
      {
        main: "Groceries",
        under: ["Cooking Essentials", "Homecare"],
      },
      {
        main: "Footwear",
        under: ["Men's Footwear", "Women's Footwear", "Children Footwear"],
      },
      {
        main: "Beauty",
        under: [],
      },
      {
        main: "Wellness",
        under: [],
      },
    ],
  },
];

const Menubar = () => {
  return (
    <>
      <div className="hidden sticky z-[1000] top-0 w-full h-fit md:flex flex-col items-center bg-white">
        <div className="w-[97%] h-[4rem] flex item-center justify-between">
          <Categories />
          <ExpandedCategories />
          <SupportCenter />
        </div>
      <div className="h-[1px] w-full bg-[#cbcbcc]"></div>
      </div>
    </>
  );
};

// funtction for the brose all categories button
const Categories = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <>
      <div
        className="w-[13%] flex flex-col relative items-center bg-[#35baf6] justify-center my-[1rem] hover:bg-green-400 rounded-md cursor-pointer"
        onClick={() => setOpenDropDown((prev) => !prev)}
      >
        <div className="w-[80%] flex items-center justify-center text-sm font-medium text-white gap-[5px]">
          <GrAppsRounded />
          <span>Browse All Categories</span>
          <MdKeyboardArrowDown />
        </div>
      </div>
      {openDropDown && <BrowseDropDown />}
    </>
  );
};

const BrowseDropDown = () => {
  const [hover, setHover] = useState(null);
  return (
    <div className="h-fit w-[450px] shadow-lg  bg-[#f5f5f5] text-[#474747] py-[0.5rem] rounded-lg absolute top-[100%] left-[28px] flex flex-col justify-center px-[1rem]">
      {categories.map((e, idx) => {
        if (!e.expand && e.cat !== "Home" && e.cat !== "Shop")
          return (
            <div
              key={idx}
              className="py-[0.3rem] hover:text-[#35baf6] text-lg font-medium"
            >
              {e.cat}
            </div>
          );
        else if (e.cat !== "Home" && e.cat !== "Shop")
          return (
            <div
              key={idx}
              className="flex py-[0.3rem]"
              onMouseOver={() => setHover(idx)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="w-full flex justify-between items-center hover:text-[#35baf6] text-lg font-medium cursor-pointer pr-[0.3rem]">
                <span>{e.cat}</span>
                <MdKeyboardArrowDown />
              </div>
              {hover === idx && (
                <div
                  className="w-[200px] h-[242px] rounded-md absolute right-[-41%] bg-[#f5f5f5] top-0 shadow-lg cursor-pointer"
                  onMouseLeave={() => setHover(null)}
                >
                  {e.sub.map((e, i) => {
                    return (
                      <div
                        key={i}
                        className="py-[0.5rem] text-sm px-[0.5rem] font-medium hover:text-[#b2b2b2]"
                      >
                        {e}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
      })}
    </div>
  );
};

// function to diaplay all the categories
// TODO : Change the dummy data to the original fetched data
const ExpandedCategories = () => {
  return (
    <div className="w-[45%] my-[1rem] flex justify-around items-center relative">
      {categories.map((e, idx) => {
        if (e.expand) return <RenderCategories key={idx} content={e} expand />;
        else return <RenderCategories key={idx} content={e} />;
      })}
    </div>
  );
};

const RenderCategories = ({ content, expand }) => {
  // to handle hover functionality on the arrow button of the categories
  const [hover, setHover] = useState(false);

  if (!expand) {
    return <div className="capitalize font-medium">{content.cat}</div>;
  } else if (expand && content.cat !== "Shop") {
    return (
      <div className="flex flex-col">
        <div
          className="flex items-center justify-center gap-[7px] cursor-pointer"
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <span className="capitalize font-medium">{content.cat}</span>
          <MdKeyboardArrowDown />
        </div>
        {hover && (
          <div
            className="h-fit w-[200px] rounded-lg absolute top-[1.75rem] bg-[#f5f5f5] text-[#474747] shadow-lg"
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {content.sub.map((e, idx) => (
              <div
                key={idx}
                className="text-sm cursor-pointer px-[1rem] py-[0.5rem] font-medium my-[0.5rem] hover:bg-[#dedddd]"
              >
                {e}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col">
        <div
          className="flex items-center justify-center gap-[7px] cursor-pointer"
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <span className="capitalize font-medium">{content.cat}</span>
          <MdKeyboardArrowDown />
        </div>
        {hover && (
          <div
            className="h-fit w-[150%] bg-[#f5f5f5] rounded-lg shadow-lg absolute top-[1.75rem] left-[-25%]"
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className="w-full py-[0.75rem] px-[1rem] grid gap-[2rem]"
              style={{gridTemplateColumns : `repeat(${content.sub.length}, minmax(0, 1fr))`}}
            >
              {content.sub.map((e, idx) => {
                return (
                  <div key={idx} className="flex flex-col">
                    <span className="font-medium text-[#35baf6] pb-[1rem] cursor-pointer">
                      {e.main}
                    </span>
                    {e.under.map((elem, i) => {
                      return (
                        <div
                          key={i}
                          className="text-[#474747] py-[0.35rem] cursor-pointer hover:bg-[#dedddd] px-[0.3rem] text-sm font-medium"
                        >
                          {elem}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
};

// function to display the contact details for the customer support
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
  content: PropTypes.object,
  expand: PropTypes.bool,
};

export default Menubar;
