"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.push("/");
      } else {
        router.push(`/${user.username}/dashboard`);
      }
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
}
