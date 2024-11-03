import Link from "next/link";
import { ChartBarIcon } from "@heroicons/react/24/outline";



export default function LevelupLogo() {
  return (
    <Link href="/">
      <div className="flex flex-row items-center text-white">
        <ChartBarIcon className="w-10 md:w-11"/>
        <p>Dashboard</p>
      </div>
    </Link>
  );
}
