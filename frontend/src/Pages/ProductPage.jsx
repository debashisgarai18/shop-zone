import { useSearchParams } from "react-router-dom";
import { categories } from "../Components/categories";
import { IoMdSearch } from "react-icons/io";
import Rating from "@mui/material/Rating";
import { FaRegHeart } from "react-icons/fa";
import Button from "../Components/Button";
import { IoMdAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

// TODO : Responsiveness part
const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const [counter, setCounter] = useState(1);

  const category = searchParams.get("category");
  const productToBeShown = categories.filter((e) => e.cat === category)[0]
    .items[searchParams.get("id")];

  // function to increment the itemcoount
  const handleAddCounter = () => {
    setCounter((prev) => prev + 1);
    if (counter >= 5) {
      alert("You cannot add more than 5 items");
      setCounter(1);
    }
  };

  // function to decrement the itemcoount
  const handleSubCounter = () => {
    setCounter((prev) => prev - 1);
    if (counter <= 1) setCounter(1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full flex justify-center py-[2rem]">
      <div className="w-[85%] flex flex-col gap-[2.75rem] justify-between">
        {/* items-info part */}
        <div className="w-full flex justify-between">
          {/* product image */}
          <div className="w-[35%] flex flex-col gap-[1rem]">
            {/* main Image */}
            <div className="w-full h-[650px] rounded-2xl relative">
              <img
                src={productToBeShown.img}
                alt="product main image"
                className="w-full h-full rounded-2xl object-cover"
              />
              <div className="w-[40px] h-[40px] absolute bg-[#E4E4E4] rounded-lg right-1 bottom-1 flex items-center justify-center text-2xl">
                <IoMdSearch />
              </div>
            </div>
            {/* other images */}
            <div className="w-full h-[70px] flex flex-row gap-[1rem]">
              {/* // TODO : TO be done on the basis of the number of other images */}
              <div className="w-[70px] h-full p-[1px] rounded-xl border-[2px] border-[#E4E4E4] active:border-[#35BAF6] cursor-pointer">
                <img
                  src={productToBeShown.img}
                  alt="product main image"
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
              <div className="w-[70px] h-full p-[1px] rounded-xl border-[2px] border-[#E4E4E4] active:border-[#35BAF6] cursor-pointer">
                <img
                  src={productToBeShown.img}
                  alt="product main image"
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
          {/* product title, desc and price */}
          <div className="w-[60%] h-[400px] flex flex-col gap-[2rem]">
            <div className="w-full text-5xl capitalize font-medium">
              {productToBeShown.name}
            </div>
            <div className="flex items-center gap-[1rem]">
              <Rating value={productToBeShown.star} readOnly precision={0.5} />{" "}
              <span className="text-xl">({productToBeShown.star} reviews)</span>
            </div>
            <div className="w-full flex items-center gap-[1.75rem]">
              <div className="text-4xl font-bold text-[#35BAF6]">
                {productToBeShown.disPrice}
              </div>
              <div className="flex flex-col">
                <div className="text-2xl text-[#FDC040] font-semibold">
                  {`${Math.round(
                    ((parseInt(productToBeShown.orgPrice.split(" ")[1]) -
                      parseInt(productToBeShown.disPrice.split(" ")[1])) /
                      parseInt(productToBeShown.orgPrice.split(" ")[1])) *
                      100
                  )}% Off`}
                </div>
                <div className="text-xl line-through text-[#B9B9B9]">
                  {productToBeShown.orgPrice}
                </div>
              </div>
            </div>
            <div className="w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              accusamus consequatur magnam voluptas, magni assumenda alias, in
              at ad quis aspernatur similique labore eum? Dignissimos officia,
              incidunt corrupti libero corporis fugit, temporibus delectus
              repudiandae debitis exercitationem repellendus reprehenderit
              voluptatibus natus placeat sapiente eius porro consequatur
              necessitatibus omnis perspiciatis, ullam cumque soluta odio! At,
              non?
            </div>
            <div className="w-full flex items-center gap-[1rem]">
              <div className="w-[150px] flex items-center justify-between gap-[1rem]">
                <div
                  className="w-[40px] h-[40px] text-xl rounded-[50%] flex justify-center items-center cursor-pointer bg-[#EDEEF5] hover:bg-[#CCCCCC]"
                  onClick={handleSubCounter}
                >
                  <GrFormSubtract />
                </div>
                <div className="text-xl font-medium">{counter}</div>
                <div
                  className="w-[40px] h-[40px] text-xl rounded-[50%] flex justify-center items-center cursor-pointer bg-[#EDEEF5] hover:bg-[#CCCCCC]"
                  onClick={handleAddCounter}
                >
                  <IoMdAdd />
                </div>
              </div>
              <div className="h-[40px]">
                <Button
                  label="Add To Cart"
                  textSize="2xl"
                  rounded="rounded-md"
                  active
                  icon=<FiShoppingCart />
                />
              </div>
              <div className="w-[40px] h-[40px] flex justify-center items-center border-[1px] cursor-pointer hover:bg-[#35BAF6] hover:text-white rounded-md border-[#BFBFBF]">
                <FaRegHeart className="text-xl" />
              </div>
            </div>
          </div>
        </div>
        {/* items-description part */}
        <div className="w-full px-[1.75rem] py-[1.75rem] flex flex-col border-[1px] gap-[1.75rem] border-[#bfbfbf] rounded-3xl">
          <div className="w-full flex items-center gap-[1rem]">
            <button className="px-[1rem] focus:text-[#35BAF6] cursor-pointer py-[0.5rem] text-lg font-medium rounded-3xl border-[1px] border-[#bfbfbf] text-center">
              Description
            </button>
            <button className="px-[1rem] focus:text-[#35BAF6] cursor-pointer py-[0.5rem] text-lg font-medium rounded-3xl border-[1px] border-[#bfbfbf] text-center">
              Additional Info
            </button>
            <button className="px-[1rem] focus:text-[#35BAF6] cursor-pointer py-[0.5rem] text-lg font-medium rounded-3xl border-[1px] border-[#bfbfbf] text-center">
              Reviews (1)
            </button>
          </div>
          <div className="w-full text-[#7E7E7E]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
            adipisci. Labore quasi iusto ipsum recusandae dicta odio rerum
            debitis adipisci voluptate, sunt vitae expedita libero perspiciatis.
            Incidunt itaque maxime, quas laboriosam nam optio odit sed fugit
            officia dolorum ducimus labore tenetur minus eveniet ipsum doloribus
            quasi debitis. Aliquid, ipsam illum. Voluptatum quibusdam ad at.
          </div>
        </div>
        {/* // TODO : Implment the related products part => needs to be taken from backend */}
      </div>
    </div>
  );
};

export default ProductPage;
