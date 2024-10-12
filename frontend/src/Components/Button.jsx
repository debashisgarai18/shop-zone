import PropTypes from "prop-types";

const Button = ({ label, textSize, rounded, active }) => {
  return (
    <div
      className={`bg-[#35baf6] h-full px-[1rem] py-[0.3rem] text-white text-[${textSize}] ${rounded} capitalize cursor-pointer ${active && "active:translate-y-[2px]"} font-medium flex items-center justify-center active:bg-green-400`}
    >
      {label}
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  textSize: PropTypes.string,
  rounded : PropTypes.string,
  active : PropTypes.bool
};

export default Button;
