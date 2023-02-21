import Link from "next/link";
const Navigation = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="w-screen p-10 text-center text-5xl">
        {"Diffusion Royale"}
      </h1>
      <div className=" w-96 space-x-2.5 p-5 text-center">
        <Link href="/submitEntry">Enter</Link>
        <Link href="/">Battle</Link>
        <Link href="/leaderboard">Leaderboard</Link>
      </div>
    </div>
  );
};
export default Navigation;
