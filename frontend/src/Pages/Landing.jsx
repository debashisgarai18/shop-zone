import PropTypes from "prop-types";
import { categories } from "../Components/categories";
import { Slider } from "@mui/material";
import { useState } from "react";
import Rating from "@mui/material/Rating";

const Landing = () => {
  return (
    <section className="w-full h-fit flex justify-center py-[1rem]">
      <div className="w-[97%] h-fit">
        <LandingPageTitle category="Electronics" />
        <div className="w-full mt-[1rem] flex justify-center gap-[1rem]">
          <FilterCategoryPart />
          <ItemsPart />
        </div>
      </div>
    </section>
  );
};

// TODO : Do the responsiveness part
const LandingPageTitle = ({ category }) => {
  return (
    <div className="w-full bg-[#CDFAFE] flex gap-[1rem] flex-col rounded-2xl py-[1rem] px-[2rem]">
      {categories.filter((e) => e.cat === category)[0].hasProducts && (
        <div className="text-[2rem] font-medium">{category}</div>
      )}
      <div className="w-full flex gap-[1rem]">
        {categories.filter((e) => e.cat === category)[0].hasProducts &&
          categories.filter((e) => e.cat === category)[0].sub &&
          categories
            .filter((e) => e.cat === category)[0]
            .sub.map((e, idx) => {
              return (
                <div key={idx} className="cursor-pointer">
                  {e}
                </div>
              );
            })}
      </div>
    </div>
  );
};

LandingPageTitle.propTypes = {
  category: PropTypes.string,
};

const FilterCategoryPart = () => {
  const [value, setValue] = useState([100, 1000]);
  const [minVal, setMinVal] = useState(100);
  const [maxVal, setMaxVal] = useState(1000);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMinVal(newValue[0]);
    setMaxVal(newValue[1]);
  };

  return (
    <div className="w-[25%] h-fit flex flex-col justify-center gap-[1.5rem]">
      {/* // category Part */}
      <div className="w-full h-[425px] shadow-xl flex flex-col justify-center gap-[1.75rem] px-[1.5rem] py-[1rem] rounded-xl">
        <div className="text-[1.5rem] font-medium">Category</div>
        <div className="w-full flex">
          <div className="w-[25%] h-[4px] bg-[#AAF4FC]"></div>
          <div className="w-[75%] h-[4px] bg-[#F0F0F0]"></div>
        </div>
        <div className="w-full h-full flex flex-col gap-[1rem] overflow-y-scroll">
          {categories
            .filter((e) => e.hasProducts === true)
            .map((e, idx) => (
              <div
                key={idx}
                className="flex border-[1px] px-[1rem] border-[#F0F0F0] items-center gap-[1rem] py-[0.5rem] cursor-pointer hover:border-[#9e9d9d]"
              >
                <div className="w-[1.5rem]">
                  <img src={e.logo} />
                </div>
                <div className="text-[1rem]">{e.cat}</div>
              </div>
            ))}
        </div>
      </div>
      {/* // Filter by price part */}
      <div className="w-full h-[425px] shadow-xl flex flex-col gap-[1.75rem] px-[1.5rem] py-[1rem] rounded-xl">
        <div className="text-[1.5rem] font-medium">Filter by price</div>
        <div className="w-full flex">
          <div className="w-[25%] h-[4px] bg-[#AAF4FC]"></div>
          <div className="w-[75%] h-[4px] bg-[#F0F0F0]"></div>
        </div>
        <div className="w-full flex flex-col">
          <Slider
            min={100}
            max={1000}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
          />
          <div className="w-full flex items-center justify-between">
            <div>
              From:{" "}
              <span className="text-[#35BAF6] font-medium">Rs.{minVal}</span>
            </div>
            <div>
              To:{" "}
              <span className="text-[#35BAF6] font-medium">Rs.{maxVal}</span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[0.75rem]">
          <div className="w-full font-medium">Filter By Ratings</div>
          <Rating
            value={5}
            readOnly
            precision={0.5}
            className="cursor-pointer"
          />
          <Rating
            value={4}
            readOnly
            precision={0.5}
            className="cursor-pointer"
          />
          <Rating
            value={3}
            readOnly
            precision={0.5}
            className="cursor-pointer"
          />
          <Rating
            value={2}
            readOnly
            precision={0.5}
            className="cursor-pointer"
          />
          <Rating
            value={1}
            readOnly
            precision={0.5}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

const ItemsPart = () => {
  return <div className="w-[75%] h-[400px] bg-green-400"></div>;
};

export default Landing;
