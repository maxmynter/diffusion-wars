const BlurredBackgroundContainer = (props) => {
  return (
    <div className="rounded-3xl p-3 backdrop-blur-xl"> {props.children}</div>
  );
};
export default BlurredBackgroundContainer;
