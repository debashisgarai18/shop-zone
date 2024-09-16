import Buttons from "./Buttons";
import Logo from "../assets/Screenshot 2024-09-17 030245.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();
  return (
    <div className="w-full border-b-[1px] border-b-gray-300 flex justify-between items-center px-[1rem] flex-wrap py-[1.5rem]">
      <div className="flex items-center gap-[1rem]">
        <img src={Logo} alt="image" className="w-[3rem]" />
        <div className="text-2xl font-bold md:text-4xl hidden md:block">
          E-Shop
        </div>
      </div>
      <div className="flex gap-[1rem]">
        <Buttons
          name="sign in"
          bgcolor="white"
          text="black"
          click={() => nav("/signin")}
        />
        <Buttons
          name="sign up"
          bgcolor="black"
          text="white"
          click={() => nav("/signup")}
        />
      </div>
    </div>
  );
};

export default Navbar;
