import "server-only";

import { db } from "@/app/_lib/prisma";
import { Product } from "@/app/generated/prisma/client";
import { unstable_cache } from "next/cache";

export type ProductStockStatus = "IN_STOCK" | "OUT_OF_STOCK"
export interface ProductDto extends Product {
  status: ProductStockStatus,
}

export const getProducts = async (): Promise<ProductDto[]> => {
  const products = await db.product.findMany({});
  return products.map((p) => ({
    ...p,
    status: p.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
  }))
}

export const cachedGetProducts = unstable_cache(getProducts, ['getProducts'], { tags: ['get-products'], revalidate: 60 })