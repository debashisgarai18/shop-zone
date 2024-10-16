import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full bg-[#F1F1F1] mb-[2rem] flex items-center justify-center py-[3rem]">
      <div className="w-[30%] px-[2rem] py-[2rem] bg-white rounded-2xl shadow-xl">
        <form
          className="w-full flex items-center flex-col gap-[1.75rem]"
          onSubmit={handleFormSubmit}
        >
          <div className="w-full text-2xl font-medium">Sign Up</div>
          <div className="w-full flex flex-col items-center gap-[1.3rem]">
            <div className="w-full text-lg">
              <input
                type="text"
                className="w-full h-full px-[1rem] py-[0.75rem] border-[1px] rounded-xl border-[#7E7E7E]"
                placeholder="Full Name"
              />
            </div>
            <div className="w-full text-lg">
              <input
                type="text"
                className="w-full h-full px-[1rem] py-[0.75rem] border-[1px] rounded-xl border-[#7E7E7E]"
                placeholder="Email"
              />
            </div>
            <div className="w-full text-lg">
              <input
                type="text"
                className="w-full h-full px-[1rem] py-[0.75rem] border-[1px] rounded-xl border-[#7E7E7E]"
                placeholder="Phone"
              />
            </div>
            {/* // TODO : Add the eye button to display the password / not show the password */}
            <div className="w-full text-lg">
              <input
                type="password"
                className="w-full h-full px-[1rem] py-[0.75rem] border-[1px] rounded-xl border-[#7E7E7E]"
                placeholder="Password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#35baf6] w-full h-full py-[1rem] text-2xl text-white capitalize cursor-pointer active:translate-y-[2px] rounded-xl font-medium text-center active:bg-green-400"
          >
            Sign Up
          </button>
          <div className="w-full text-center">OR</div>
          <button className="bg-white border-[1px] border-[#35baf6] w-full h-full py-[1rem]  text-black uppercase cursor-pointer  rounded-xl flex font-medium items-center justify-center gap-[1rem] hover:bg-[#F6FAFD]">
            <FcGoogle className="text-2xl" />
            <div className="text-sm">sign in with google</div>
          </button>
          <div className="w-full text-center">
            Already have an account?{" "}
            <span
              className="text-[#4284bd] font-medium cursor-pointer"
              onClick={() => nav("/signin")}
            >
              Sign In
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
