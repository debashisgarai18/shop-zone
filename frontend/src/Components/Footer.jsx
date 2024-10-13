import FooterImage from "../assets/newsletter.5931358dd220a40019fc.png";
import Button from "./Button";
import { IoNavigateOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { IoMdPricetags } from "react-icons/io";
import { FaHandshake } from "react-icons/fa6";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TbHierarchy3 } from "react-icons/tb";
import { PiPackageBold } from "react-icons/pi";
import UseImage from "../assets/react.svg";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuMail } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";

const dummyFeatures = [
  {
    name: "Best prices & offers",
    desc: "Orders $50 or more",
    icon: <IoMdPricetags className="hover:-translate-y-2 transition-all ease-out duration-300" />,
  },
  {
    name: "Free delivery",
    desc: "Orders $50 or more",
    icon: <FaHandshake className="hover:-translate-y-2 transition-all ease-out duration-300" />,
  },
  {
    name: "Great daily deal",
    desc: "Orders $50 or more",
    icon: <RiMoneyRupeeCircleFill className="hover:-translate-y-2 transition-all ease-out duration-300" />,
  },
  {
    name: "Wide assortment",
    desc: "Orders $50 or more",
    icon: <TbHierarchy3 className="hover:-translate-y-2 transition-all ease-out duration-300" />,
  },
  {
    name: "Easy returns",
    desc: "Orders $50 or more",
    icon: <PiPackageBold className="hover:-translate-y-2 transition-all ease-out duration-300" />,
  },
];

const dummyFooter = [
  {
    title: "Company",
    subParts: [
      "About us",
      "Delivery Information",
      "Privacy Policy",
      "Terms and Conditions",
      "Contact Us",
      "Support Center",
      "Careers",
    ],
  },
  {
    title: "Category",
    subParts: [
      "About us",
      "Delivery Information",
      "Privacy Policy",
      "Terms and Conditions",
      "Contact Us",
      "Support Center",
      "Careers",
    ],
  },
  {
    title: "Corporate",
    subParts: [
      "About us",
      "Delivery Information",
      "Privacy Policy",
      "Terms and Conditions",
      "Contact Us",
      "Support Center",
      "Careers",
    ],
  },
  {
    title: "Popular",
    subParts: [
      "About us",
      "Delivery Information",
      "Privacy Policy",
      "Terms and Conditions",
      "Contact Us",
      "Support Center",
      "Careers",
    ],
  },
];

// TODO : Add the responsiveness for the footer part
const Footer = () => {
  return (
    <div className="w-full mt-[1rem] flex flex-col items-center justify-center">
      <div className="w-[97%] flex flex-col item-center gap-[1.5rem] place-items-center">
        <ContactPart />
        <div className="w-full grid grid-cols-5 gap-[2rem]">
          {dummyFeatures.map((e, idx) => {
            return (
              <FeaturesPart
                title={e.name}
                desc={e.desc}
                icon={e.icon}
                key={idx}
              />
            );
          })}
        </div>
        <BottomPart />
        <div className="w-full h-[1px] bg-[#7E7E86] mb-[1rem] opacity-40"></div>
        <Socials />
      </div>
    </div>
  );
};

// 1st part
const ContactPart = () => {
  return (
    <div className="w-full rounded-[2rem] bg-gradient-to-r from-cyan-300 via-cyan-200 to-cyan-100 flex px-[2rem] py-[1rem] justify-between items-center">
      <div className="md:w-[33%] w-full flex flex-col gap-[1rem]">
        <div className="w-full flex flex-col gap-[0.75rem]">
          <div className="md:text-[2.75rem] text-[2rem] font-medium md:leading-[3.75rem] leading-[2.5rem]">
            Stay home & get your daily needs from our shop
          </div>
          <div className="md:text-[1.75rem] text-[1rem] text-[#474747]">
            Start your daily shopping with this mart
          </div>
        </div>
        <div className="w-full flex relative md:h-[3rem] h-[2.5rem] items-center">
          <div className="w-[3rem] h-full bg-white flex items-center rounded-l-3xl justify-center">
            <IoNavigateOutline className="md:text-[1rem] text-[0.75rem] text-[#474747]" />
          </div>
          <input
            type="text"
            className="rounded-r-3xl w-full md:text-[1rem] text-[0.75rem] px-[1rem] py-[0.3rem] focus:outline-none h-full"
            placeholder="Enter your email here"
          />
          <div className="absolute right-0 h-full">
            <Button label="subscribe" textSize="1rem" rounded="rounded-3xl" />
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <img src={FooterImage} alt="Image Not found" className="h-[300px]" />
      </div>
    </div>
  );
};

// 2nd part
const FeaturesPart = ({ title, desc, icon }) => {
  return (
    <div className="w-full flex items-center justify-around gap-[1rem] bg-[#F4F6FA] py-[1rem] px-[1rem] rounded-2xl">
      <div className="flex items-center justify-center text-[4.55rem] text-[#35BAF6]">
        {icon}
      </div>
      <div className="flex flex-col text-xl">
        <div className="font-medium">{title}</div>
        <div className="text-[#474747]">{desc}</div>
      </div>
    </div>
  );
};

// 3rd part
const BottomPart = () => {
  return (
    <div className="w-full flex gap-[1.75rem] mb-[1.rem]">
      <div className="w-[25%] px-[1rem] py-[1rem] flex flex-col gap-[1.75rem]">
        <div className="w-full flex items-">
          <img src={UseImage} className="h-[2rem] md:h-[2.5rem]" />
          <span className="text-[1.75rem] hidden md:inline">Demo</span>
        </div>
        <div className="w-full text-lg">Awesome multi store website</div>
        <div className="w-full flex flex-col gap-[0.5rem]">
          <div className="w-full flex items-center gap-[0.75rem]">
            <HiOutlineLocationMarker className="text-[#35BAF6] font-medium" />
            <div>
              {" "}
              <span className="font-medium text-[#7E7E7E]">Address:</span> 296,
              Anjangarh, Shyamnagar, 24Pgs (North)
            </div>
          </div>
          <div className="w-full flex items-center gap-[0.75rem]">
            <MdOutlineHeadsetMic className="text-[#35BAF6] font-medium" />
            <div>
              <span className="font-medium text-[#7E7E7E]">Call Us:</span> (+91)
              - 540-025-124553
            </div>
          </div>
          <div className="w-full flex items-center gap-[0.75rem]">
            <LuMail className="text-[#35BAF6] font-medium" />
            <div>
              <span className="font-medium text-[#7E7E7E]">Email:</span>{" "}
              sale@Nest.com
            </div>
          </div>
          <div className="w-full flex items-center gap-[0.75rem]">
            <FaRegClock className="text-[#35BAF6] font-medium" />
            <div>
              <span className="font-medium text-[#7E7E7E]">Hours:</span> 10:00 -
              18:00, Mon - Sat
            </div>
          </div>
        </div>
      </div>
      <div className="w-[75%] grid grid-cols-4 px-[1rem] py-[1rem]">
        {dummyFooter.map((e, index) => {
          return (
            <div key={index} className="flex flex-col gap-[1rem]">
              <div className="font-medium">{e.title}</div>
              <div className="flex flex-col gap-[0.75rem]">
                {e.subParts.map((elem, idx) => {
                  return (
                    <div
                      key={idx}
                      className="hover:text-[#35BAF6] cursor-pointer hover:translate-x-1 transition-all ease-out duration-300"
                    >
                      {elem}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 4th part
const Socials = () => {
  return (
    <div className="w-full flex items-center justify-between mb-[1rem]">
      <div>© 2024, Ecommerce Website, All rights reserved</div>
      <div className="flex items-center gap-[1rem] text-xl">
        <div>Follow Us</div>
        <div className="cursor-pointer rounded-[50%] px-[0.75rem] py-[0.75rem] bg-[#35BAF6] hover:bg-black transition-all ease-out duration-300">
          <FaXTwitter className="text-white" />
        </div>
        <div className="cursor-pointer rounded-[50%] px-[0.75rem] py-[0.75rem] bg-[#35BAF6] hover:bg-black transition-all ease-out duration-300">
          <IoLogoGithub className="text-white" />
        </div>
        <div className="cursor-pointer rounded-[50%] px-[0.75rem] py-[0.75rem] bg-[#35BAF6] hover:bg-black transition-all ease-out duration-300">
          <FaLinkedinIn className="text-white" />
        </div>
        <div className="cursor-pointer rounded-[50%] px-[0.75rem] py-[0.75rem] bg-[#35BAF6] hover:bg-black transition-all ease-out duration-300">
          <FiInstagram className="text-white" />
        </div>
      </div>
    </div>
  );
};

FeaturesPart.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  icon: PropTypes.elementType,
};

export default Footer;
