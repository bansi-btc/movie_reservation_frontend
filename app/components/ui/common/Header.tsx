"use client";

import Link from "next/link";

export default function Header() {
  return (
    <div className="shadow-xs shadow-gray-700 py-6">
      <div className="max-w-[1280px] mx-auto flex flex-row justify-between ">
        <div className="text-2xl font-medium">Ticketory</div>

        <div className="flex flex-row gap-6">
          <Link href={"/login"} className="bg-gray-800 px-8 py-2 rounded-full">
            Login
          </Link>
          <Link href={"/signup"} className="bg-gray-800 px-8 py-2 rounded-full">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}
