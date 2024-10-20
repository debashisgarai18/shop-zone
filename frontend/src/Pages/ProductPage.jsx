import { useSearchParams } from "react-router-dom";
import { categories } from "../Components/categories";
import { IoMdSearch } from "react-icons/io";
import Rating from "@mui/material/Rating";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const productToBeShown = categories.filter((e) => e.cat === category)[0]
    .items[searchParams.get("id")];

  return (
    <div className="w-full flex justify-center py-[2rem]">
      <div className="w-[85%] flex justify-between">
        {/* product image */}
        <div className="w-[35%] flex flex-col gap-[1rem]">
          {/* main Image */}
          <div className="w-full h-[768px] rounded-2xl relative">
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
        <div className="w-[60%] h-[400px] bg-red-300">
          <div className="w-full">{productToBeShown.name}</div>
          <div className="flex items-center">
            <Rating value={productToBeShown.star} readOnly precision={0.5} />{" "}
            <span>({productToBeShown.star} reviews)</span>
          </div>
          <div className="w-full flex items-center">
            <div>{productToBeShown.disPrice}</div>
            <div className="flex flex-col">
              <div>
                {`${Math.round(
                  ((parseInt(productToBeShown.orgPrice.split(" ")[1]) -
                    parseInt(productToBeShown.disPrice.split(" ")[1])) /
                    parseInt(productToBeShown.orgPrice.split(" ")[1])) *
                    100
                )}% Off`}
              </div>
              <div>{productToBeShown.orgPrice}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
