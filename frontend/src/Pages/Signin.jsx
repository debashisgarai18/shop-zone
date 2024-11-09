import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import axios from "axios";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Firebase/firebase";

const Signin = () => {
  const nav = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // the me endpoint -> for UI side
  // to check when the user is logged in, if they go to signin/signup page, it should redirect to the current page
  // else if they are not logged in they shouldn't be able to go to any of the pages in Ui except the signin and signup
  const checkMe = useCallback(async () => {
    const token = localStorage.getItem("token") ?? "jhgdghjsdjkhada";
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
      nav("/signin");
      console.log("somerror : ", err);
    }
  }, [nav]);

  useEffect(() => {
    checkMe();
  }, [checkMe]);

  // states for form management
  const [uname, setUname] = useState();
  const [pwd, setPwd] = useState();
  const [showPwd, setShowPwd] = useState(false);

  const clearReasponse = () => {
    setUname("");
    setPwd("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      uname,
      pwd,
    };
    try {
      const resp = await axios({
        method: "post",
        url: "http://localhost:3000/user/signin",
        data: formData,
      });
      localStorage.setItem("token", `Bearer ${resp.data.token}`);
      nav("/");
      clearReasponse();
    } catch (err) {
      alert(`Some error : ${err}`);
    }
  };

  // function to signin with google
  const signinWithGoogle = async () => {
    try {
      const resp = await signInWithPopup(auth, provider);
      const idToken = await resp.user.getIdToken(); // get the auth token from here
      // access the signin endpoint for the firebase
      const signedIn = await axios.get(
        "http://localhost:3000/user/signin/googleAuth",
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      if (signedIn.status === 200) {
        localStorage.setItem("token", `Bearer ${idToken}`);
        nav("/");
      }
    } catch (err) {
      console.log(`Some firebase Error : ${err}`);
    }
  };

  return (
    <div className="w-full bg-[#F1F1F1] mb-[2rem] flex items-center justify-center py-[3rem]">
      <div className="w-[30%] px-[2rem] py-[2rem] bg-white rounded-2xl shadow-xl">
        <form
          className="w-full flex items-center flex-col gap-[1.75rem]"
          onSubmit={handleFormSubmit}
        >
          <div className="w-full text-2xl font-medium">Sign In</div>
          <div className="w-full flex flex-col items-center gap-[1.3rem]">
            <div className="w-full text-xlg">
              <input
                type="text"
                className="w-full h-full px-[1rem] py-[0.75rem] border-[1px] rounded-xl border-[#7E7E7E]"
                placeholder="Email"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
              />
            </div>
            {/* // TODO : Add the eye button to display the password / not show the password */}
            <div className="w-full text-lg  flex items-center border-[#7E7E7E] border-[1px]  rounded-xl pr-[1rem]">
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
            Sign In
          </button>
          <div className="w-full text-center">OR</div>
          <button
            type="button"
            className="bg-white border-[1px] border-[#35baf6] w-full h-full py-[1rem]  text-black uppercase cursor-pointer  rounded-xl flex font-medium items-center justify-center gap-[1rem] hover:bg-[#F6FAFD]"
            onClick={signinWithGoogle}
          >
            <FcGoogle className="text-2xl" />
            <div className="text-sm">sign in with google</div>
          </button>
          <div className="w-full text-center">
            Not have an account?{" "}
            <span
              className="text-[#4284bd] font-medium cursor-pointer"
              onClick={() => nav("/signup")}
            >
              Sign Up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
