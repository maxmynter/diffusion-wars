import Link from "next/link";
const Navigation = () => {
  return (
    <div className="flex w-full ">
      <div className="flex w-96 space-x-2.5">
        <Link href="/submitEntry">Enter</Link>
        <Link href="/">Battle</Link>
      </div>
    </div>
  );
};
export default Navigation;
