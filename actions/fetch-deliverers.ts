import { deliverer } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/deliverers`;

const getDeliverers = async (): Promise<deliverer[]> => {
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error("Failed to fetch deliverers");
  }
  return res.json();
};

export default getDeliverers;
