const LinkText = ({ text }) => {
  return (
    <h3 className="hover:text-shadow-lg transform p-2 font-bold shadow-white transition hover:scale-125">
      {text}
    </h3>
  );
};

export default LinkText;
