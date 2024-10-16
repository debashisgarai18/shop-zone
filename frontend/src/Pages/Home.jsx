import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SliderImg1 from "../assets/sliderImg/slider1.webp";
import SliderImg2 from "../assets/sliderImg/slider2.webp";
import SliderImg3 from "../assets/sliderImg/slider3.webp";
import SliderImg4 from "../assets/sliderImg/slider4.webp";
import SliderImg5 from "../assets/sliderImg/slider5.webp";
import "../css/Home.css";
import { categories } from "../Components/categories";
import PopularProducts from "../Components/PopularProducts";
import { useState } from "react";

const Home = () => {
  return (
    <div className="w-full flex justify-center flex-col items-center gap-[1rem]">
      <SliderPart />
      <FeaturedCategories />
      <PopularProductsMenu />
    </div>
  );
};

// TODO : Responsiveness Part
// Slider Part --> made with react-slick npm package
const SliderPart = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
  };
  return (
    <div className="w-[97%]">
      <div className="w-full relative px-[1rem] py-[1rem]">
        <Slider {...settings} className="w-full rounded-[20px] overflow-hidden">
          <div className="h-[200px] md:h-[400px] w-full">
            <img
              src={SliderImg1}
              alt="Image 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[200px] md:h-[400px] w-full">
            <img
              src={SliderImg2}
              alt="Image 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[200px] md:h-[400px] w-full">
            <img
              src={SliderImg3}
              alt="Image 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[200px] md:h-[400px] w-full ">
            <img
              src={SliderImg4}
              alt="Image 4"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[200px] md:h-[400px] w-full">
            <img
              src={SliderImg5}
              alt="Image 6"
              className="w-full h-full object-cover"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

// featured categories part
// TODO : Responsiveness Part
const FeaturedCategories = () => {
  return (
    <div className="w-[97%] flex flex-col gap-[2rem] item-center px-[1rem] mb-[1rem]">
      <div className="text-2xl font-medium">Featured Categories</div>
      <div className="flex items-center justify-around w-full">
        {categories.map((e, idx) => {
          if (e.logo)
            return (
              <div
                key={idx}
                className="flex flex-col gap-[0.75rem] items-center"
              >
                <div
                  className="flex items-center justify-center rounded-[50%] px-[1.75rem] py-[1.75rem] hover:shadow-xl hover:-translate-y-2 cursor-pointer transition-all duration-200 ease-in-out"
                  style={{ backgroundColor: e.bgColor }}
                >
                  <img className="w-[70px] h-[70px]" src={e.logo} alt={e.cat} />
                </div>
                <div className="text-lg font-medium text-[#333333]">
                  {e.cat}
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

// Popular Product Part
// TODO : Responsiveness Part -> later
// TODO : redesign the upperpart sec div => learn from video
const PopularProductsMenu = () => {
  // states
  const [selectedCategory, setSelectedCategory] = useState("Fashion");

  return (
    <div className="w-[97%] px-[1rem] flex flex-col gap-[1.5rem]">
      {/* Upper part */}
      <div className="w-full flex items-center justify-between">
        <div className="text-2xl font-medium">Popular Products</div>
        <div
          className="flex items-center text-[0.875rem] gap-[1rem] tracking-[0.02857em]"
          style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}
        >
          {categories.map((elem, idx) => {
            if (elem.logo)
              return (
                <button
                  key={idx}
                  className="uppercase px-[1rem] py-[0.5rem] text-[#333333] cursor-pointer focus:text-[#1976D2] border-b-[2px] border-b-white focus:border-b-[#1976D2] transition-all duration-200 ease-in-out font-medium"
                  onClick={() => setSelectedCategory(elem.cat)}
                >
                  {elem.cat}
                </button>
              );
          })}
        </div>
      </div>
      {/* Lower Part */}
      <PopularProducts category={selectedCategory} />
    </div>
  );
};

export default Home;
