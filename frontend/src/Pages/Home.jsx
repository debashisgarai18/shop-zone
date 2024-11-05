import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SliderImg1 from "../assets/sliderImg/slider1.webp";
import SliderImg2 from "../assets/sliderImg/slider2.webp";
import SliderImg3 from "../assets/sliderImg/slider3.webp";
import SliderImg4 from "../assets/sliderImg/slider4.webp";
import SliderImg5 from "../assets/sliderImg/slider5.webp";
import "../css/Home.css";
import { PopularProducts, ProductCard } from "../Components/PopularProducts";
import { useState } from "react";
import SliderComponent from "../Components/SliderComponent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full flex justify-center flex-col items-center gap-[1rem] mb-[2rem]">
      <SliderPart />
      <FeaturedCategories />
      <PopularProductsMenu />
      <ProductSliderPart />
      <FeaturedProducts />
    </div>
  );
};

// TODO : Responsiveness Part
// Slider Part --> made with react-slick npm package
const SliderPart = () => {
  const sliderImages = [
    <img
      loading="lazy"
      src={SliderImg1}
      alt="Image 1"
      className="w-full h-full object-cover"
      key={1}
    />,
    <img
      loading="lazy"
      src={SliderImg2}
      alt="Image 2"
      className="w-full h-full object-cover"
      key={2}
    />,
    <img
      loading="lazy"
      src={SliderImg3}
      alt="Image 3"
      className="w-full h-full object-cover"
      key={3}
    />,
    <img
      loading="lazy"
      src={SliderImg4}
      alt="Image 4"
      className="w-full h-full object-cover"
      key={4}
    />,
    <img
      loading="lazy"
      src={SliderImg5}
      alt="Image 5"
      className="w-full h-full object-cover"
      key={5}
    />,
  ];
  return (
    <div className="w-[97%]">
      <div className="w-full relative px-[1rem] py-[1rem]">
        <SliderComponent data={sliderImages} dotsRequired />
      </div>
    </div>
  );
};

// featured categories part
// TODO : Responsiveness Part
const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);

  // fetch all the catgeories from the DB
  const getAllCategories = async () => {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/common/getCategories",
    });
    setCategories(response.data.message);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const nav = useNavigate();
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
                  onClick={() => nav(`/landing?category=${e.cat}`)}
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
const PopularProductsMenu = () => {
  // states
  const [selectedCategory, setSelectedCategory] = useState("Fashion");
  const [categories, setCategories] = useState([]);

  // fetch all the catgeories from the DB
  const getAllCategories = async () => {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/common/getCategories",
    });
    setCategories(response.data.message);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

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

// PRoduct Slider => Bottom Slider
const ProductSliderPart = () => {
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
  };
  return (
    <div className="w-[97%]">
      <div className="w-full relative px-[1rem]">
        <Slider {...settings} className="w-full rounded-[20px] overflow-hidden">
          <div className="h-[200px] md:h-[200px] w-[25%]">
            <img
              loading="lazy"
              src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/ba13ca2134f7c538.jpg?q=20"
              alt="Image"
              className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
            />
          </div>
          <div className="h-[200px] md:h-[200px] w-[25%]">
            <img
              loading="lazy"
              src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/846beb79-ada7-48c3-a6c6-4448f276c2111651599573979-Sports-Shoes_Desk.jpg"
              alt="Image"
              className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
            />
          </div>
          <div className="h-[200px] md:h-[200px] w-[25%]">
            <img
              loading="lazy"
              src="https://res.cloudinary.com/dy2p0n2xc/image/upload/v1729058216/1729058212922_New_Project_3.jpg"
              alt="Image"
              className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
            />
          </div>
          <div className="h-[200px] md:h-[200px] w-[25%]">
            <img
              loading="lazy"
              src="https://res.cloudinary.com/dy2p0n2xc/image/upload/v1729058247/1729058244370_New_Project_18.jpg"
              alt="Image"
              className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
            />
          </div>
          <div className="h-[200px] md:h-[200px] w-[25%]">
            <img
              loading="lazy"
              src="https://res.cloudinary.com/dy2p0n2xc/image/upload/v1729058266/1729058263591_New_Project_9.jpg"
              alt="Image"
              className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
            />
          </div>
          <div className="h-[200px] md:h-[200px] w-[25%]">
            <img
              loading="lazy"
              src="https://res.cloudinary.com/dy2p0n2xc/image/upload/v1729058278/1729058275936_New_Project_16.jpg"
              alt="Image"
              className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

// Featured Products Slider part
// TODO : Responsiveness Part
const FeaturedProducts = () => {
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
  };

  const nav = useNavigate();

  // states
  const [dummy_featured_products, setDummy_featured_products] = useState([]);

  useEffect(() => {
    const getRandomProducts = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3000/common/getRandomProducts"
        );
        setDummy_featured_products(resp.data.message);
      } catch (err) {
        console.log(`Some axios error: ${err}`);
      }
    };

    getRandomProducts();
  }, []);

  return (
    <div className="w-[97%] px-[1rem] gap-[1rem] flex flex-col justify-between">
      <div className="text-2xl font-medium">Featured Products</div>
      <div className="w-full flex justify-between gap-[1rem]">
        <div className="w-[75%] h-full px-[1rem]">
          <Slider
            {...settings}
            className="w-full rounded-[20px] overflow-hidden"
          >
            {dummy_featured_products.map((e, idx) => (
              <div
                key={idx}
                className="w-[25%] h-full"
                onClick={() =>
                  nav(`/product?category=${e.parentCategory}&id=${e._id}`)
                }
              >
                <ProductCard productInfo={e} productId={e._id} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-[25%] h-[600px] cursor-pointer">
          <img
            src="https://rukminim2.flixcart.com/www/330/460/promos/26/09/2023/6c3c5fe2-c236-4fa2-8d97-595e1e01da01.jpg?q=90"
            alt="justApic"
            loading="lazy"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
