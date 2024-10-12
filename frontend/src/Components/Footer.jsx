import FooterImage from "../assets/newsletter.5931358dd220a40019fc.png";
import Button from "./Button";
import { IoNavigateOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { IoMdPricetags } from "react-icons/io";
import { FaHandshake } from "react-icons/fa6";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TbHierarchy3 } from "react-icons/tb";
import { PiPackageBold } from "react-icons/pi";

const dummyFeatures = [
  {
    name: "Best prices & offers",
    desc: "Orders $50 or more",
    icon: <IoMdPricetags className="hover:-translate-y-2" />,
  },
  {
    name: "Free delivery",
    desc: "Orders $50 or more",
    icon: <FaHandshake className="hover:-translate-y-2" />,
  },
  {
    name: "Great daily deal",
    desc: "Orders $50 or more",
    icon: <RiMoneyRupeeCircleFill className="hover:-translate-y-2" />,
  },
  {
    name: "Wide assortment",
    desc: "Orders $50 or more",
    icon: <TbHierarchy3 className="hover:-translate-y-2" />,
  },
  {
    name: "Easy returns",
    desc: "Orders $50 or more",
    icon: <PiPackageBold className="hover:-translate-y-2" />,
  },
];

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
        <BottomPart/>
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
  return <div className="w-full bg-red-300 flex gap-[1.75rem] items-center">
    <div className="w-[25%] bg-green-300">
sdsds
    </div>
    <div className="w-[75%] bg-cyan-300">
sdsds
    </div>
  </div>
}

FeaturesPart.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  icon: PropTypes.elementType,
};

export default Footer;
