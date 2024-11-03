import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import Rating from "@mui/material/Rating";

const WishlistPage = () => {
  // todo : add the auth check first -> if the token is not found then send in the signin page
  // todo : if token find then fetch the details of the wishlist from the DB after auth check
  const nav = useNavigate();

  // states
  const [itemCount, setItemCount] = useState(0);
  const [wishlistData, setWishlistData] = useState([]);

  const getWishlistItems = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/user/showWishlist",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setItemCount(response.data.wishlist.length);
      setWishlistData(response.data.wishlist);
    } catch (err) {
      console.log(`Some error: ${err}`);
    }
  }, []);

  // check if the token is present or not
  // if present then continue, else nav back to the signin endpoint
  if (localStorage.getItem("token")) {
    getWishlistItems();
  }

  // if the token not present then redirect to the signin page with an alert
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("You must signin to see the wishlist");
      nav("/signin");
    }
  }, [nav]);

  return (
    <div className="w-full flex items-center justify-center py-[1.75rem]">
      <div className="w-[50%] flex flex-col gap-[2rem]">
        <div className="flex flex-col gap-[0.5rem]">
          <div className="text-3xl font-medium">My List</div>
          <div className="text-xl text-[#8B8B92]">
            There <span>{itemCount === 1 ? "is" : "are"}</span>{" "}
            <span className="font-medium text-[#35BAF6]">{itemCount}</span>{" "}
            product<span>{itemCount > 1 && "s"}</span> in your wishlist
          </div>
        </div>
        <div className="w-full">
          {itemCount > 0 && (
            <div className="w-full flex items-center border-y-[1px] border-y-[#E5E5E5] py-[0.75rem] capitalize font-medium text-[#27272f] bg-[#F1F1F1] rounded-xl px-[0.75rem]">
              <div className="w-[60%]">Product</div>
              <div className="w-[20%]">Price</div>
              <div className="w-[20%]">Remove</div>
            </div>
          )}
          {wishlistData?.map((e) => {
            return (
              <div
                className="w-full flex items-center border-b-[1px] border-b-[#E5E5E5] py-[0.75rem] px-[0.75rem]"
                key={e.itemId}
              >
                <div
                  className="w-[60%] flex items-center gap-[0.75rem] cursor-pointer"
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
                <div className="w-[20%] text-[#27272f] font-bold capitalize">
                  {e.disPrice}
                </div>
                <div className="w-[20%] text-2xl">
                  <MdDeleteOutline
                    className="cursor-pointer"
                    onClick={async () => {
                      try {
                        const response = await axios.put(
                          `http://localhost:3000/user/updateWishlist/removeItem/${e.itemId}`,
                          {},
                          {
                            headers: {
                              Authorization: localStorage.getItem("token"),
                            },
                          }
                        );
                        console.log(response.data);
                        itemCount(response.data.message.length);
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
    </div>
  );
};

export default WishlistPage;
