import Link from "next/link";
const Navigation = () => {
  return (
    <div className="flex w-full ">
      <div className="flex w-96 space-x-2.5">
        <Link href="/">Enter</Link>
        <Link href="/battle">Battle</Link>
      </div>
    </div>
  );
};
export default Navigation;
