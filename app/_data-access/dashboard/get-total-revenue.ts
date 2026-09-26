import 'server-only';
import { db } from "@/app/_lib/prisma"

export const getTotalRevenue = async () => {
  const totalRevenueQuery = `SELECT SUM("unitPrice" * "quantity") as "totalRevenue" FROM "SaleProduct"`
  const totalRevenue = await db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery)
  return Number(totalRevenue[0].totalRevenue) || 0
}