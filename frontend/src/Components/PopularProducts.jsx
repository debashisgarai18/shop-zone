import PropTypes from "prop-types";
import { dummy_product } from "./dummyProductsObject";
import { useState } from "react";

const PopularProducts = ({ category }) => {
  return (
    <div className="w-full grid grid-cols-5 px-[1rem] gap-[1rem] py-[1rem]">
      {dummy_product
        .filter((elem) => elem.cat === category)
        .map((elem) =>
          elem.items.map((e, idx) => (
            <ProductCard key={idx} category={category} productInfo={e} />
          ))
        )}
    </div>
  );
};

const ProductCard = ({ productInfo, category }) => {
    const [hover, setHover] = useState(false);
  return (
    <div className={`flex flex-col w-full rounded-3xl  cursor-pointer gap-[1rem] ${hover && "shadow-xl"} transition-all duration-300 ease-in`}
    onMouseOver={() =>setHover(true)}
    onMouseLeave={() => setHover(false)}>
        {/* image part */}
      <div className="h-[300px] w-full">
        <img
          src={productInfo.img}
          // TODO : On hovering the whole card the image should scale to 105
          className="h-full w-full object-cover rounded-t-3xl"
          alt="ProductImage"
        />
      </div>
      {/* details part */}
      <div className="w-full px-[1.5rem] pb-[2rem] flex flex-col gap-[1rem]" >
        <div className="text-sm font-medium">{category}</div>
        <div className="w-full flex flex-col">
          <div className="text-lg font-bold">{productInfo.name}</div>
          {/* // TODO : render 5 stars and fill them according to the rating value */}
          <div>stars {productInfo.star}</div>
          <div>
            By <span className=" text-[#55BAF6]">{productInfo.by}</span>
          </div>
        </div>
        <div className="w-full flex items-center gap-[1rem]" >
          <div className="text-2xl font-bold text-[#55BAF6]">{productInfo.disPrice}</div>
          <div className="text-lg line-through">{productInfo.orgPrice}</div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  productInfo: PropTypes.object,
  category: PropTypes.string,
};

PopularProducts.propTypes = {
  category: PropTypes.string,
};

export default PopularProducts;
