import { db } from "@/app/_lib/prisma";
import { Product } from "@/app/generated/prisma/client";

export const getProducts = async (): Promise<Product[]> => {
  return await db.product.findMany({});
}