import MainTitle from "@/components/main-title";
import React from "react";
import ShopWrapper from "./components/commande-wrapper";
import prismadb from "@/lib/prismadb";

async function ShopsPage() {
  const shops = await prismadb.shop.findMany({
    include: { user: true },
  });
  return (
    <>
      <MainTitle title="Boutiques" />
      <ShopWrapper shops={shops}></ShopWrapper>
    </>
  );
}

export default ShopsPage;
