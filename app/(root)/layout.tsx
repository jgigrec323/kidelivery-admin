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
        // Redirect to sign-in if no user is found
        router.push("/");
      } else {
        // Redirect to the user's dashboard if authenticated
        router.push(`/${user.username}/dashboard`);
      }
    }
  }, [isLoaded, user, router]);

  // If the user data hasn't loaded yet, render a loading state
  if (!isLoaded) {
    return <p>Loading...</p>; // You can also display a spinner here
  }

  // Once all checks pass and user is authenticated, render the children
  return <>{children}</>;
}
