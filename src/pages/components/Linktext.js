const LinkText = ({ text }) => {
  return (
    <div className="transform rounded-3xl p-2 shadow-sm shadow-white backdrop-blur-3xl transition hover:scale-105">
      <h3 className="p-2 font-bold shadow-white">{text}</h3>
    </div>
  );
};

export default LinkText;
