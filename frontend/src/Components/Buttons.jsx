import PropTypes from "prop-types";

const Buttons = ({ name, bgcolor, text, click }) => {
  return (
    <button
      className={`bg-${bgcolor} text-${text} h-fit text-lg md:text-xl px-[0.5rem] py-[0.3rem] md:px-[1rem] md:py-[0.5rem] rounded-lg border-[2px] border-b-gray-300 capitalize font-medium cursor-pointer active:translate-y-[1px]`}
      onClick={click}
    >
      {name}
    </button>
  );
};

Buttons.propTypes = {
  name: PropTypes.string.isRequired,
  bgcolor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  click: PropTypes.func,
};

export default Buttons;
