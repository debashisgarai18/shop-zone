import PropTypes from "prop-types";

const NotifyIcons = ({ label, logo, count }) => {
  return (
    <div className="flex items-center justify-center gap-[1rem] h-full cursor-pointer">
      <div className="h-full flex items-center justify-center relative">
        {logo}
        <div className="h-[1.2rem] font-medium w-[1.2rem] rounded-full bg-[#35baf6] flex items-center justify-center absolute text-[10px] top-[6%] right-[-56%] text-white">
          {count}
        </div>
      </div>
      <span className="font-medium">{label}</span>
    </div>
  );
};

NotifyIcons.propTypes = {
  label: PropTypes.string,
  logo: PropTypes.elementType,
  count: PropTypes.number,
};
export default NotifyIcons;
