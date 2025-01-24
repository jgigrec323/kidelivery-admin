"use client";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { user } from "@prisma/client";

interface UserWrapperProps {
  users: user[]; // Expect an array of users
}

const UserWrapper: React.FC<UserWrapperProps> = ({ users }) => {
  return (
    <div className="p-4 flex flex-col gap-10 bg-white shadow-md rounded-lg">
      <DataTable data={users} columns={columns} searchKey="name" />
    </div>
  );
};

export default UserWrapper;
