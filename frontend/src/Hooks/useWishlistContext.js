import { useContext } from "react";
import { wishlistContext } from "../contexts/countContext";

export const useWishlistContext = () => {
  const context = useContext(wishlistContext);

  if (context === undefined) {
    throw new Error("Context is undefined");
  }

  return context;
};
