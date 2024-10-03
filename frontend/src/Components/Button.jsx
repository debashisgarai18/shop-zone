import PropTypes from "prop-types";

const Button = ({ label }) => {
  return (
    <div className="bg-[#35baf6] px-[1rem] py-[0.3rem] text-white text-[16px] rounded-md capitalize cursor-pointer active:translate-y-[2px] font-medium">
      {label}
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string,
};

export default Button;
