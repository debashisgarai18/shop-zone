import PropTypes from "prop-types";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const PopularProducts = ({ category }) => {
  const [items, setItems] = useState([]);

  // fetch all the catgeories from the DB
  // TODO : get all the data based on the category provided n some another endpoint
  const getAllCategories = async (cat) => {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/common/getProducts/${cat}`,
    });
    setItems(response.data.message);
  };

  useEffect(() => {
    getAllCategories(category);
  }, [category]);

  return (
    <div className="w-full grid grid-cols-5 px-[1rem] gap-[1.75rem] py-[1rem]">
      {items.map((e) => {
        return <ProductCard key={e._id} category={category} productInfo={e} />;
      })}
    </div>
  );
};

// this is the product card to be displayed for the home page
export const ProductCard = ({ productInfo, category, productId }) => {
  const [hover, setHover] = useState(false);
  const nav = useNavigate();
  return (
    <div
      className={`flex flex-col w-full rounded-3xl cursor-pointer gap-[1rem] ${
        hover && "shadow-xl scale-105"
      } transition-all duration-300 ease-in border-[1px] border-[#E5E5E5]`}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() =>
        nav(`${category && `/product?category=${category}&id=${productId}`}`)
      }
    >
      {/* image part */}
      <div className="h-[300px] w-full relative transition-all duration-300 ease-in">
        <img
          loading="lazy"
          src={productInfo.img}
          // TODO : On hovering the whole card the image should scale to 105
          className="h-full w-full object-cover rounded-t-3xl transition-all duration-300 ease-in "
          alt="ProductImage"
        />
        {hover && (
          <>
            <div className="bg-black h-full w-full opacity-30 absolute top-0 rounded-t-3xl"></div>
            <WishlistView />
          </>
        )}
      </div>
      {/* details part */}
      <div className="w-full px-[1.5rem] pb-[1.75rem] flex flex-col gap-[1rem]">
        <div className="text-sm font-medium">{category}</div>
        <div className="w-full flex flex-col gap-[0.5rem]">
          <div className="text-lg font-bold">{productInfo.name}</div>
          <Rating value={productInfo.star} readOnly precision={0.5} />
          <div>
            By <span className=" text-[#55BAF6]">{productInfo.by}</span>
          </div>
        </div>
        <div className="w-full flex items-center gap-[1rem]">
          <div className="text-2xl font-bold text-[#55BAF6]">
            {productInfo.disPrice}
          </div>
          <div className="text-lg line-through">{productInfo.orgPrice}</div>
        </div>
      </div>
    </div>
  );
};

const WishlistView = () => {
  return (
    <div className="w-[90px] h-[50px] rounded-2xl absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border-[1px] border-[#55BAF6]">
      <div className="w-[50%] h-full flex items-center justify-center border-r-[1px] border-r-[#55BAF6]">
        <FaRegHeart className="text-xl hover:text-[#55BAF6]" />
      </div>
      <div className="w-[50%] h-full flex items-center justify-center">
        <FaRegEye className="text-xl hover:text-[#55BAF6]" />
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  productInfo: PropTypes.object,
  category: PropTypes.string,
  productId: PropTypes.number,
};

PopularProducts.propTypes = {
  category: PropTypes.string,
};
