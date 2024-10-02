import { FaLocationDot } from "react-icons/fa6";
import PropTypes from "prop-types";

const Select = ({ data }) => {
  return (
    <>
      <FaLocationDot className="absolute left-[5px] text-[#35baf6]" />
      <select
        className="w-full h-full border-[1px] border-black px-[1.3rem] focus:outline-none"
      >
        {data ? (
          data.map((e, idx) => <option key={idx}>{e}</option>)
        ) : (
          <option>Nothing to display</option>
        )}
        {/* <input type="text" placeholder="Search Here..." /> */}
      </select>
    </>
  );
};

Select.propTypes = {
  data: PropTypes.array,
};

export default Select;
