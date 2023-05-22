"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import UserList from "@/components/UserList";
import useUserStore from "@/hooks/useUserStore";

export default function Auth() {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    isLoggedIn ? router.push("/") : null;
  }, [isLoggedIn]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full bg-opacity-50 flex items-center justify-center">
        <div className="bg-black bg-opacity-70 p-4 sm:p-16 flex flex-col items-center mt-2 w-[300px] sm:w-[480px] rounded-md ">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
          <h2 className="text-white text-4xl mt-4 mb-8 font-semibold">
            Sign in
          </h2>
          <div className="flex flex-column w-full min-h-[150px]">
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
}
