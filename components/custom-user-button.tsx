"use client";

import COLORS from "@/constants/Colors";
import { SignInButton, SignOutButton, useAuth, useUser } from "@clerk/nextjs";
import { FaUserCircle } from "react-icons/fa";

export default function Home() {
  const { sessionId } = useAuth();
  const { user } = useUser();

  if (!sessionId) {
    return (
      <SignInButton>
        <button className="cursor-pointer text-orange">Se connecter</button>
      </SignInButton>
    );
  }

  return (
    <SignOutButton>
      <button>
        <div className="text-white flex items-center gap-2">
          <FaUserCircle size={24} color={COLORS.orange}></FaUserCircle>
          {user && user.username}
        </div>
        <div className="ml-5 cursor-pointer text-orange">Se deconnecter</div>
      </button>
    </SignOutButton>
  );
}
