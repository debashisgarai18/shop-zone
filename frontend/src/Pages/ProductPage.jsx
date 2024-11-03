import { useNavigate, useSearchParams } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import Rating from "@mui/material/Rating";
import { FaRegHeart } from "react-icons/fa";
import Button from "../Components/Button";
import { IoMdAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { useCallback, useContext, useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import { cartContext, wishlistContext } from "../contexts/countContext";

// TODO : Responsiveness part
const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const nav = useNavigate()

  // states
  const [counter, setCounter] = useState(1);
  const [productToBeShown, setProductToBeShown] = useState({});

  // getting the category and the product Id from the query params
  const category = searchParams.get("category");
  const productId = searchParams.get("id");


  // get the contexts
  const {setWishlistCount} = useContext(wishlistContext);
  // todo
  const {setCartCount} = useContext(cartContext);

  // fetching the product details from the endpoint provided
  const getProduct = useCallback(async () => {
    try {
      const resp = await axios({
        method: "get",
        url: `http://localhost:3000/common/getProductInfo?productId=${productId}&cat=${category}`,
      });
      setProductToBeShown(resp.data?.message);
    } catch (err) {
      alert(`Something went wrong : ${err}`);
    }
  }, [category, productId]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

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

  // function to add to the wishlist
  const addToWishlist = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please signin to your account to add in the wishlist");
      nav("/signin")
      return
    }

    try {
      const resp = await axios.put(
        "http://localhost:3000/user/updateWishlist/addItem",
        {
          category: productToBeShown.parentCategory,
          itemId: productToBeShown._id,
          name: productToBeShown.name,
          img: productToBeShown.img,
          star: productToBeShown.star,
          disPrice: productToBeShown.disPrice,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      setWishlistCount(resp.data.message.length);
    } catch (err) {
      console.log(`Some error : ${err}`);
    }
  };


  // function to add items to the cart
  const handleAddToCart = async () => {
    // check for the availability of the token
    if(!localStorage.getItem("token")){
      alert("You must signin first to add to cart");
      nav("/signin")
      return
    }

    try{
      const response = await axios.put("http://localhost:3000/user/updateCart/addItem", {
          category: productToBeShown.parentCategory,
          itemId: productToBeShown._id,
          name: productToBeShown.name,
          img: productToBeShown.img,
          star: productToBeShown.star,
          disPrice: productToBeShown.disPrice,
          count : counter
      }, {
        headers : {
          Authorization : localStorage.getItem("token"),
          "Content-Type" : 'application/json'
        }
      })
      setCartCount(response.data.message.length)
    }
    catch(err){
      console.log(`Some error : ${err}`)
    }
  }
  
  // effect to scroll back to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (productToBeShown && Object.keys(productToBeShown).length > 0) {
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
                  loading="lazy"
                  src={productToBeShown?.img}
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
                    src={productToBeShown?.img}
                    alt="product main image"
                    className="w-full h-full rounded-2xl object-cover"
                  />
                </div>
                <div className="w-[70px] h-full p-[1px] rounded-xl border-[2px] border-[#E4E4E4] active:border-[#35BAF6] cursor-pointer">
                  <img
                    src={productToBeShown?.img}
                    alt="product main image"
                    className="w-full h-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
            {/* product title, desc and price */}
            <div className="w-[60%] h-[400px] flex flex-col gap-[2rem]">
              <div className="w-full text-5xl capitalize font-medium">
                {productToBeShown?.name}
              </div>
              <div className="flex items-center gap-[1rem]">
                <Rating
                  value={productToBeShown.star ? productToBeShown.star : 0}
                  readOnly
                  precision={0.5}
                />{" "}
                <span className="text-xl">
                  ({productToBeShown?.star} reviews)
                </span>
              </div>
              <div className="w-full flex items-center gap-[1.75rem]">
                <div className="text-4xl font-bold text-[#35BAF6]">
                  {productToBeShown?.disPrice}
                </div>
                <div className="flex flex-col">
                  <div className="text-2xl text-[#FDC040] font-semibold">
                    {productToBeShown
                      ? `${Math.round(
                          ((parseInt(productToBeShown?.orgPrice.split(" ")[1]) -
                            parseInt(
                              productToBeShown?.disPrice.split(" ")[1]
                            )) /
                            parseInt(
                              productToBeShown?.orgPrice.split(" ")[1]
                            )) *
                            100
                        )}% Off`
                      : ""}
                  </div>
                  <div className="text-xl line-through text-[#B9B9B9]">
                    {productToBeShown?.orgPrice}
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
                <div className="h-[40px]" onClick={handleAddToCart}>
                  <Button
                    label="Add To Cart"
                    textSize="2xl"
                    rounded="rounded-md"
                    active
                    icon=<FiShoppingCart />
                  />
                </div>
                <div className="w-[40px] h-[40px] flex justify-center items-center border-[1px] cursor-pointer hover:bg-[#35BAF6] hover:text-white rounded-md border-[#BFBFBF]" onClick={addToWishlist}>
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
              debitis adipisci voluptate, sunt vitae expedita libero
              perspiciatis. Incidunt itaque maxime, quas laboriosam nam optio
              odit sed fugit officia dolorum ducimus labore tenetur minus
              eveniet ipsum doloribus quasi debitis. Aliquid, ipsam illum.
              Voluptatum quibusdam ad at.
            </div>
          </div>
          {/* // TODO : Implment the related products part => needs to be taken from backend */}
        </div>
      </div>
    );
  }
};

export default ProductPage;
