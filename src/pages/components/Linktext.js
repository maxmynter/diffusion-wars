const LinkText = ({ text }) => {
  return (
    <div className="transform rounded-3xl bg-gray-400 p-2 transition hover:scale-125">
      <h3 className="  p-2 font-bold shadow-white  ">{text}</h3>
    </div>
  );
};

export default LinkText;
