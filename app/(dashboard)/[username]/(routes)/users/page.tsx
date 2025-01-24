import MainTitle from "@/components/main-title";
import React from "react";
import prismadb from "@/lib/prismadb";
import UserWrapper from "./components/users-wrapper";

async function UsersPage() {
  const users = await prismadb.user.findMany({});
  return (
    <>
      <MainTitle title="Utilisateurs" />
      <UserWrapper users={users}></UserWrapper>
    </>
  );
}

export default UsersPage;
