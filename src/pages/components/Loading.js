const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center p-7">
      <div class="flex h-14 w-14 animate-spin items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500">
        <div class="h-9 w-9 rounded-full bg-black"></div>
      </div>
    </div>
  );
};
export default Loading;
