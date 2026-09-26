import 'server-only'
import { db } from '@/app/_lib/prisma';
import dayjs from 'dayjs'

export interface DayTotalRevenue {
  day: string;
  todayRevenue: number;
}

interface DashboardDto {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
  totalLast14DaysRevenue: DayTotalRevenue[];
}

export const getDashboard = async (): Promise<DashboardDto> => {
  const todayStartOf = dayjs().startOf('day').toDate();
  const todayEndOf = dayjs().endOf('day').toDate();
  const fourteenDaysAgo = dayjs(todayStartOf).subtract(14, 'day').toDate();
  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0))
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999))
  const totalRevenueQuery = `SELECT SUM("unitPrice" * "quantity") as "totalRevenue" FROM "SaleProduct"`
  const todayRevenueQuery = `SELECT SUM("unitPrice" * "quantity") as "todayRevenue" FROM "SaleProduct" WHERE "createdAt" >= $1 AND "createdAt" <= $2`
  const totalRevenueLast14DaysQuery = `
    SELECT
      SUM("sp"."unitPrice" * "sp"."quantity") as "todayRevenue",
      TO_CHAR("s"."createdAt", 'DD/MM') AS day
    FROM
      "SaleProduct" AS "sp"
    INNER JOIN "Sale" AS "s"
      ON "s"."id" = "sp"."saleId"
    WHERE
      "s"."createdAt" BETWEEN $1 AND $2
    GROUP BY
      TO_CHAR("s"."createdAt", 'DD/MM')
    `;
  
  const totalRevenueLast14DaysPromise = db.$queryRawUnsafe<DayTotalRevenue[]>(totalRevenueLast14DaysQuery, fourteenDaysAgo, todayEndOf)
  const totalRevenuePromise = db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery)
  const todayRevenuePromise = db.$queryRawUnsafe<{ todayRevenue: number }[]>(todayRevenueQuery, startOfDay, endOfDay)
  const totalSalesPromise = db.sale.count();
  const totalStockPromise = db.product.aggregate({
    _sum: {
      stock: true,
    }
  })
  const totalProductsPromise = db.product.count();
  const [
    totalRevenue,
    todayRevenue,
    totalSales,
    totalStock,
    totalProducts,
    totalLast14DaysRevenue
  ] = await Promise.all([
    totalRevenuePromise,
    todayRevenuePromise,
    totalSalesPromise,
    totalStockPromise,
    totalProductsPromise,
    totalRevenueLast14DaysPromise,
  ])

  return {
    totalRevenue: Number(totalRevenue[0].totalRevenue) || 0,
    todayRevenue: Number(todayRevenue[0].todayRevenue) || 0,
    totalSales,
    totalStock: Number(totalStock._sum.stock) || 0,
    totalProducts,
    totalLast14DaysRevenue,
  }
}