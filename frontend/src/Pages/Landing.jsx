import PropTypes from "prop-types";
import { categories } from "../Components/categories";
import { Slider } from "@mui/material";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { ProductCard } from "../Components/PopularProducts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Landing = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchValue = searchParams.get("search");

  // states
  const [sub, setSub] = useState([]);
  const [value, setValue] = useState([100, 500000]);
  const [minVal, setMinVal] = useState(100);
  const [maxVal, setMaxVal] = useState(500000);
  const [item, setItem] = useState([]);

  // debouncing the function values to set the values
  // const debouncedFunction = (fn, delay) => {
  //   let timer;

  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       fn(...args);
  //     }, delay);
  //   };
  // };

  // effect to filter the values in the given range
  useEffect(() => {
    (async function () {
      try {
        const resp = await axios.get(
          category
            ? `http://localhost:3000/common/filterProduct?category=${category}&minVal=${minVal}&maxVal=${maxVal}`
            : `http://localhost:3000/common/filterProduct?minVal=${minVal}&maxVal=${maxVal}&search=${searchValue}`
        );
        setItem(resp.data.message);
      } catch (err) {
        console.log(`Some error Occured : ${err}`);
      }
    })();
  }, [category, minVal, maxVal, searchValue]);

  // this will be called whenever ctaegory is provided to give the subs of the category
  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await axios({
          method: "get",
          url: `http://localhost:3000/common/getProducts/${category}`,
        });
        setSub(resp.data.message.sub);
      } catch (err) {
        alert(`error : ${err}`);
      }
    };
    if (category) getData();
  }, [category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (category) {
    return (
      <section className="w-full h-fit flex justify-center py-[1rem] ">
        <div className="w-[97%] h-fit ">
          <LandingPageTitle category={category} sub={sub} />
          <div className="w-full mt-[1rem] flex justify-center gap-[1rem]">
            <FilterCategoryPart
              value={value}
              setValue={setValue}
              minVal={minVal}
              setMinVal={setMinVal}
              maxVal={maxVal}
              setMaxVal={setMaxVal}
            />
            <ItemsPart item={item} />
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="w-full h-fit flex justify-center py-[1rem] ">
        <div className="w-[97%] h-fit ">
          <div className="w-full mt-[1rem] flex justify-center gap-[1rem]">
            <FilterCategoryPart
              value={value}
              setValue={setValue}
              minVal={minVal}
              setMinVal={setMinVal}
              maxVal={maxVal}
              setMaxVal={setMaxVal}
            />
            <ItemsPart item={item} />
          </div>
        </div>
      </section>
    );
  }
};

// TODO : Do the responsiveness part
const LandingPageTitle = ({ category, sub }) => {
  return (
    <div className="w-full bg-[#CDFAFE] flex gap-[1rem] flex-col rounded-2xl py-[1rem] px-[2rem]">
      {categories?.filter((e) => e.cat === category)[0].hasProducts && (
        <div className="text-[2rem] font-medium">{category}</div>
      )}
      <div className="w-full flex gap-[1rem]">
        {sub &&
          sub.map((_, idx) => {
            return (
              <div key={idx} className="cursor-pointer">
                {_}
              </div>
            );
          })}
      </div>
    </div>
  );
};

LandingPageTitle.propTypes = {
  category: PropTypes.string,
  sub: PropTypes.array,
};

// TODO : Do the responsiveness part

const FilterCategoryPart = ({
  value,
  setValue,
  minVal,
  setMinVal,
  maxVal,
  setMaxVal,
}) => {
  const [categories, setCategories] = useState([]);

  const nav = useNavigate();

  // debounce the change => to restrict to call the API every time the value changes
  const debouncedFunction = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMinVal(newValue[0]);
    setMaxVal(newValue[1]);
  };

  const debounedChange = debouncedFunction(handleChange, 300);

  const handleClick = (cat) => {
    nav(`/landing?category=${cat}`);
  };

  const getData = async () => {
    try {
      const resp = await axios({
        method: "get",
        url: "http://localhost:3000/common/getCategories/",
      });
      setCategories(resp.data.message);
    } catch (err) {
      console.log(`Error : ${err}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
                onClick={() => handleClick(e.cat)}
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
            max={500000}
            value={value}
            onChange={debounedChange}
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
      {/* // Below Offers */}
      <div className="w-full h-[600px] rounded-2xl flex flex-col gap-[0.75rem]">
        <img
          src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1729337724/Croma%20Assets/CMS/LP%20Page%20Banners/2024/Whats%20Hot/OCT/20102024/Desktop/HP_New-at-Croma_Tablets_20Oct2024_f7ofcy.jpg?tr=w-1024"
          alt="some Image"
          className="w-full h-full object-center cursor-pointer rounded-2xl"
        />
        <img src="" alt="" />
      </div>
    </div>
  );
};

FilterCategoryPart.propTypes = {
  value: PropTypes.array,
  setValue: PropTypes.func,
  minVal: PropTypes.number,
  setMinVal: PropTypes.func,
  maxVal: PropTypes.number,
  setMaxVal: PropTypes.func,
};

// TODO : Do the responsiveness part
const ItemsPart = ({ item }) => {
  return (
    <div className="w-[75%] px-[1rem] py-[1rem]">
      {item.length >= 1 ? (
        <div className="text-[#7E7E7E] text-lg">
          We&apos;ve found{" "}
          <span className="text-[#35BAF6] font-medium">{item.length}</span>{" "}
          items for you!
        </div>
      ) : (
        <div className="text-[#7E7E7E] text-lg">
          We&apos;ve found <span className="text-[#35BAF6] font-medium">0</span>{" "}
          items for you!
        </div>
      )}
      {item ? (
        <div className="w-full grid grid-cols-4 gap-[1.75rem] py-[1rem]">
          {item?.map((e) => (
            <ProductCard
              key={e._id}
              productInfo={e}
              category={e.parentCategory}
              productId={e._id}
            />
          ))}
        </div>
      ) : (
        <div className="w-full text-center font-medium text-2xl py-[2rem]">
          Sorry! no products to show
        </div>
      )}
    </div>
  );
};
ItemsPart.propTypes = {
  item: PropTypes.array,
};

export default Landing;
