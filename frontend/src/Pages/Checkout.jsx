import { useContext, useState, useEffect } from "react";
import { cartContext } from "../contexts/countContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import Rating from "@mui/material/Rating";
import { MdDeleteOutline } from "react-icons/md";

// todo : update the functionality increment and decrement button
const Checkout = () => {
  return (
    <div className="w-full flex items-center justify-center py-[2rem]">
      <div className="w-[97%] py-[0.75rem] flex justify-between">
        <ItemPart />
        <ShowPrice />
      </div>
    </div>
  );
};

const ItemPart = () => {
  const nav = useNavigate();

  // take the values from the context
  const { cartCount, setCartCount } = useContext(cartContext);

  // states
  const [cartData, setCartData] = useState([]);
  // const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("You must signin to see the cart");
      nav("/signin");
      return;
    }
    const getCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/showCart",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setCartData(response.data.cart);
      } catch (err) {
        console.log(`Some error: ${err}`);
      }
    };
    getCartItems();
  }, [nav, cartCount]);

  return (
    <div className="w-[70%] flex flex-col gap-[2rem]">
      <div className="flex flex-col gap-[0.5rem]">
        <div className="text-2xl font-medium">My Cart</div>
        <div className="text-lg text-[#8B8B92]">
          There <span>{cartCount === 1 ? "is" : "are"}</span>{" "}
          <span className="font-medium text-[#35BAF6]">{cartCount}</span>{" "}
          product<span>{cartCount > 1 && "s"}</span> in your cart
        </div>
      </div>
      <div className="w-full">
        {cartCount > 0 && (
          <div className="w-full flex items-center justify-around border-y-[1px] border-y-[#E5E5E5] py-[0.75rem] capitalize font-medium text-[#27272f] bg-[#F1F1F1] rounded-xl px-[0.75rem]">
            <div className="w-[50%]">Product</div>
            <div className="w-[10%]">Price</div>
            <div className="w-[15%]">Quantity</div>
            <div className="w-[10%]">Subtotal</div>
            <div className="w-[10%]">Remove</div>
          </div>
        )}
        {cartData?.map((e) => {
          return (
            <div
              className="w-full flex items-center justify-around border-b-[1px] border-b-[#E5E5E5] gap-[1rem] py-[0.75rem] px-[0.75rem]"
              key={e.itemId}
            >
              <div
                className="w-[50%] flex items-center gap-[0.75rem] cursor-pointer"
                onClick={() => {
                  nav(`/product?category=${e.category}&id=${e.itemId}`);
                }}
              >
                <div className="w-[30%] p-[0.5rem] border-[1px] border-[#E5E5E5] rounded-md">
                  <img
                    src={e.img}
                    alt="productImage"
                    className="w-full h-[5rem] object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-[#27272f] font-bold capitalize">
                    {e.name}
                  </div>
                  <div className="flex items-center gap-[0.5rem]">
                    <Rating
                      value={e.star ? e.star : 0}
                      readOnly
                      precision={0.5}
                    />
                    <span className="text-[#8B8B92] font-medium">
                      ({e.star})
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[10%] text-[#27272f] font-bold capitalize">
                {e.disPrice}
              </div>
              {/* // todo : update the functionality increment and decrement button */}
              <div className="w-[15%] flex items-center justify-around">
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer bg-[#EDEEF5] hover:bg-[#CCCCCC]">
                  <RiSubtractLine />
                </div>
                <div>{e.count}</div>
                <div className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded-full bg-[#EDEEF5] hover:bg-[#CCCCCC]">
                  <IoMdAdd />
                </div>
              </div>
              <div className="w-[10%] text-[#35BAF6] font-bold capitalize">
                Rs {parseInt(e.disPrice?.split(" ")[1]) * e.count}
              </div>
              <div className="w-[10%] text-2xl">
                <MdDeleteOutline
                  className="cursor-pointer"
                  onClick={async () => {
                    try {
                      const response = await axios.put(
                        `http://localhost:3000/user/updateCart/removeItem/${e.itemId}`,
                        {},
                        {
                          headers: {
                            Authorization: localStorage.getItem("token"),
                          },
                        }
                      );
                      setCartCount(response.data.message.length);
                    } catch (err) {
                      console.log(`Some error: ${err}`);
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ShowPrice = () => {
  return <div className="w-[27%] h-[200px] bg-green-500"></div>;
};

export default Checkout;
