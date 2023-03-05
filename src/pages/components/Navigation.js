import Link from "next/link";
import LinkText from "./Linktext";

const Navigation = () => {
  return (
    <div className="mb-5 flex w-full flex-wrap items-center px-11 backdrop-blur-xl">
      <h1 className="m-auto w-1/2 p-3 text-center align-middle font-display text-3xl font-bold">
        Diffusion Standoff
      </h1>
      <div className=" m-auto flex flex-row justify-between p-5 text-center">
        <div className="px-2">
          <Link href="/">
            <LinkText text="Standoff" />
          </Link>
        </div>
        <div className="px-2">
          <Link href="/leaderboard">
            <LinkText text="Leaderboard" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
