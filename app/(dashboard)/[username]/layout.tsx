import CustomError from "@/components/custom-error";
import MainWrapper from "@/components/main-wrapper";
import Sidebar from "@/components/sidebar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userExist = await prismadb.user.findFirst({
    where: { name: params.username },
  });

  if (!userExist) {
    return <CustomError message="User not found. Please contact your admin." />;
  }

  return (
    <>
      <MainWrapper>
        <div>{children}</div>
      </MainWrapper>
    </>
  );
}
