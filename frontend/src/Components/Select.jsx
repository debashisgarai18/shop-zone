import PropTypes from "prop-types";

const Select = ({
  data,
  icon,
  bgColor,
  rounded,
  textColor,
  textSize,
  border,
  fontWeight,
}) => {
  return (
    <>
      {icon}
      <select
        className={`w-full h-full ${
          border && "border-[1px] border-[#cbcbcc]"
        } font-${fontWeight}  px-[1.3rem] focus:outline-none cursor-pointer ${textSize} ${textColor} ${bgColor} ${
          rounded && "rounded-md"
        }`}
      >
        {data ? (
          data.map((e, idx) => <option key={idx}>{e}</option>)
        ) : (
          <option className="cursor-pointer">Nothing to display</option>
        )}
        {/* // TODO : Add the search bar here... */}
        {/* <input type="text" placeholder="Search Here..." /> */}
      </select>
    </>
  );
};

Select.propTypes = {
  data: PropTypes.array,
  icon: PropTypes.elementType,
  bgColor: PropTypes.string,
  rounded: PropTypes.bool,
  textColor: PropTypes.string,
  textSize: PropTypes.string,
  border: PropTypes.bool,
  fontWeight: PropTypes.string,
};

export default Select;
