import { db } from "@/app/_lib/prisma";

export const getTotalStock = async () => {
  const totalStock = await db.product.aggregate({
    _sum: {
      stock: true,
    }
  })

  return Number(totalStock._sum.stock) || 0
}
