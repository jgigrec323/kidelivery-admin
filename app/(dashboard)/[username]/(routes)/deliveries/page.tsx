// app/commandes/page.tsx (Server Component)
import MainTitle from "@/components/main-title";
import CommandeWrapper from "./components/commande-wrapper";
import prismadb from "@/lib/prismadb";
import React from "react";

async function Deliveries() {
  const deliveries = await prismadb.delivery.findMany({
    include: { parcel: true },
  }); // Fetch deliveries on the server

  return (
    <>
      <MainTitle title="Livraisons" />
      <CommandeWrapper deliveries={deliveries} />
    </>
  );
}

export default Deliveries;
