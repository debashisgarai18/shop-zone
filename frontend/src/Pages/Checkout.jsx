import { useContext, useState, useEffect } from "react";
import { cartContext } from "../contexts/countContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import Rating from "@mui/material/Rating";
import { MdDeleteOutline } from "react-icons/md";
import Button from "../Components/Button";
import { FaArrowLeft } from "react-icons/fa";

// todo : update the functionality increment and decrement button
const Checkout = () => {
  const nav = useNavigate();
  return (
    <div className="w-full flex items-center justify-center py-[2rem]">
      <div className="w-[97%] py-[0.75rem] flex flex-col justify-between gap-[1.75rem]">
        <div className="w-full py-[0.75rem] flex justify-between">
          <ItemPart />
          <ShowPrice />
        </div>
        <Button
          label="Continue Shopping"
          textSize="text-2xl"
          rounded="rounded-lg"
          active
          width="w-[20%]"
          icon={<FaArrowLeft />}
          click={() => nav("/")}
        />
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
  // states
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getFullPrice = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/getTotalPrice",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setTotalPrice(response.data.price);
      } catch (err) {
        console.log(`Some error : ${err}`);
      }
    };

    getFullPrice();
  }, []);

  return (
    <div className="w-[27%] border-[1px] flex gap-[1.75rem] flex-col justify-between rounded-xl bg-[#FAFAFA] border-[#a7a7a7] px-[1.75rem] py-[1rem]">
      <div className="flex flex-col gap-[1rem]">
        <div className="w-full flex items-center justify-between">
          <div className="text-lg">Subtotal</div>
          <div className="text-xl font-bold text-[#35BAF6]">
            Rs {totalPrice}
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="text-lg">Shipping</div>
          <div className="text-xl font-semibold">Free</div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="text-lg">Shipping Country</div>
          <div className="text-xl font-semibold">India</div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="text-lg">Total</div>
          <div className="text-xl font-bold text-[#35BAF6]">
            Rs {totalPrice}
          </div>
        </div>
      </div>
      <div>
        <Button
          label="Proceed To Checkout"
          textSize="text-2xl"
          rounded="rounded-lg"
          active
          click={() => alert("Bus itna hi")}
        />
      </div>
    </div>
  );
};

export default Checkout;
