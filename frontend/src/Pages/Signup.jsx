import { useCallback, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const nav = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // the me endpoint -> for UI side
  // to check when the user is logged in, if they go to signin/signup page, it should redirect to the current page
  // else if they are not logged in they shouldn't be able to go to any of the pages in Ui except the signin and signup
  const checkMe = useCallback(async () => {
    const token = localStorage.getItem("token") ?? "";
    try {
      const resp = await axios({
        method: "get",
        url: "http://localhost:3000/user/me/",
        headers: {
          Authorization: token,
        },
      });
      if (resp) nav("/");
    } catch (err) {
      nav("/signup");
      console.log("somerror : ", err);
    }
  }, [nav]);

  useEffect(() => {
    checkMe();
  }, [checkMe]);

  // states for form management
  const [fname, setFname] = useState();
  const [uname, setUname] = useState();
  const [phno, setPhno] = useState();
  const [pwd, setPwd] = useState();
  const [showPwd, setShowPwd] = useState(false);

  const clearReasponse = () => {
    setFname("");
    setUname("");
    setPwd("");
    setPhno("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      fname,
      uname,
      phno,
      pwd,
    };
    try {
      const resp = await axios({
        method: "post",
        url: "http://localhost:3000/user/signup",
        data: formData,
      });
      localStorage.setItem("token", `Bearer ${resp.data.token}`);
      nav("/");
      clearReasponse();
    } catch (err) {
      alert(`Some error : ${err}`);
    }
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
                className="w-full h-full px-[1rem] py-[0.75rem] border-[1px] rounded-xl border-[#7E7E7E] focus:outline-none"
                placeholder="Full Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="w-full text-lg">
              <input
                type="text"
                className="w-full h-full px-[1rem] py-[0.75rem] border-[1px] rounded-xl border-[#7E7E7E] focus:outline-none"
                placeholder="Email"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
              />
            </div>
            <div className="w-full text-lg">
              <input
                type="text"
                className="w-full h-full px-[1rem] py-[0.75rem] border-[1px] rounded-xl border-[#7E7E7E] focus:outline-none"
                placeholder="Phone"
                value={phno}
                onChange={(e) => setPhno(e.target.value)}
              />
            </div>
            {/* // TODO : Add the eye button to display the password / not show the password */}
            <div className="w-full text-lg relative flex items-center border-[#7E7E7E] border-[1px]  rounded-xl pr-[1rem]">
              <input
                type={showPwd ? "text" : "password"}
                className="w-full h-full px-[1rem] py-[0.75rem] border-none rounded-xl focus:outline-none"
                placeholder="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              {showPwd ? (
                <FiEyeOff
                  className="cursor-pointer z-10"
                  onClick={() => setShowPwd((prev) => !prev)}
                />
              ) : (
                <FiEye
                  className="cursor-pointer z-10"
                  onClick={() => setShowPwd((prev) => !prev)}
                />
              )}
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
