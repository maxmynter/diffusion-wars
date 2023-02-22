import Link from "next/link";
import LinkText from "./Linktext";

const Navigation = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="w-screen p-10 text-center text-5xl">
        {"Diffusion Royale"}
      </h1>
      <div className=" flex w-96 flex-row justify-between p-5 text-center">
        <Link href="/submitEntry">
          <LinkText text="Enter" />
        </Link>
        <Link href="/">
          <LinkText text="Battle" />
        </Link>
        <Link href="/leaderboard">
          <LinkText text="Leaderboard" />
        </Link>
      </div>
    </div>
  );
};
export default Navigation;
