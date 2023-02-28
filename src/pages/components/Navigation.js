import Link from "next/link";
import LinkText from "./Linktext";

const Navigation = () => {
  return (
    <div className="flex w-screen min-w-fit backdrop-blur-xl">
      <h1 className="m-auto  w-1/2 p-3 text-left align-middle font-display text-3xl">
        Stable Standoff
      </h1>
      <div className=" w1/2  flex w-96  flex-row justify-between p-5 text-center">
        <Link href="/submitEntry">
          <LinkText text="Enter" />
        </Link>
        <Link href="/">
          <LinkText text="Standoff" />
        </Link>
        <Link href="/leaderboard">
          <LinkText text="Leaderboard" />
        </Link>
      </div>
    </div>
  );
};
export default Navigation;
