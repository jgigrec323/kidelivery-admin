// app/commandes/page.tsx (Server Component)
import MainTitle from "@/components/main-title";
import CommandeWrapper from "./components/commande-wrapper";
import prismadb from "@/lib/prismadb";
import React from "react";

async function Commandes() {
  const parcels = await prismadb.parcel.findMany({
    include: { delivery: true },
  }); // Fetch parcels on the server

  return (
    <>
      <MainTitle title="Commandes" />
      <CommandeWrapper parcels={parcels} />
    </>
  );
}

export default Commandes;
