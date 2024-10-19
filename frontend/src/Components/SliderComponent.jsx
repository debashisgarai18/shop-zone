import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";

const SliderComponent = ({ data, dotsRequired }) => {
  const [sliderState, setSliderState] = useState(0);

  const handlenext = () => {
    if (sliderState >= data.length - 1) setSliderState(0);
    else setSliderState((prev) => prev + 1);
  };

  const handleprev = () => {
    if (sliderState === 0) setSliderState(data.length - 1);
    else setSliderState((prev) => prev - 1);
  };

  const handleDotClick = (idx) => {
    setSliderState(parseInt(idx));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderState >= data.length - 1) setSliderState(0);
      else setSliderState((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderState, data.length]);

  return (
    <div
      className={`w-full h-[200px] md:h-[400px] rounded-2xl relative flex justify-center z-0 overflow-hidden`}
    >
      <div
        className={`w-full h-full rounded-2xl absolute top-0 left-0 z-1 transition-transform duration-500 ease-out `}
      >
        <div className={`w-full h-full bg-cover bg-center`}>
          {data[sliderState]}
        </div>
      </div>
      <div
        className="w-[50px] h-[50px] rounded-[50%] bg-white absolute left-[2%] top-[45%] flex items-center justify-center cursor-pointer hover:bg-[#35BAF6] hover:text-white"
        style={{
          boxShadow:
            "0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23)",
        }}
        onClick={handleprev}
      >
        <MdArrowBackIosNew className="text-2xl" />
      </div>
      <div
        className="w-[50px] h-[50px] rounded-[50%] bg-white absolute right-[2%] top-[45%] flex items-center justify-center cursor-pointer hover:bg-[#35BAF6] hover:text-white"
        style={{
          boxShadow:
            "0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23)",
        }}
        onClick={handlenext}
      >
        <MdArrowForwardIos className="text-2xl" />
      </div>
      {dotsRequired && (
        <div className="bg-transparent opacity-50 absolute bottom-[3%] flex rounded-3xl items-center justify-around gap-[1rem] px-[1rem] py-[0.5rem]">
          {data.map((e, idx) => {
            // TODO : The below part is not working
            return (
              <div
                key={e.key}
                className={`w-[13px] h-[13px] bg-white rounded-[50%] cursor-pointer ${
                  parseInt(e.key) === sliderState + 1 && "bg-black"
                } transition-all duration-500 ease-in-out hover:bg-[#35BAF6]`}
                onClick={() => handleDotClick(idx)}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

SliderComponent.propTypes = {
  data: PropTypes.array.isRequired,
  dotsRequired: PropTypes.bool,
};

export default SliderComponent;
