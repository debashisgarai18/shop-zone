import PropTypes from "prop-types";

const Button = ({ label, textSize, rounded, active, click, icon }) => {
  return (
    <div
      className={`bg-[#35baf6] h-full px-[1rem] py-[0.3rem] text-white text-[${textSize}] ${rounded} capitalize cursor-pointer flex justify-center items-center gap-[0.75rem] ${
        active && "active:translate-y-[2px]"
      } font-medium flex items-center justify-center active:bg-green-400`}
      onClick={click}
    >
      {icon && <div>{icon}</div>}
      <div>{label}</div>
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  textSize: PropTypes.string,
  rounded: PropTypes.string,
  active: PropTypes.bool,
  click: PropTypes.func,
  icon: PropTypes.elementType,
};

export default Button;
