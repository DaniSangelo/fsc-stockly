import { db } from '@/app/_lib/prisma';
import dayjs from 'dayjs';
import 'server-only';

export const getTotalRevenueToday = async () => {
  const todayRevenueQuery = `
  SELECT
    SUM("sp"."unitPrice" * "sp"."quantity") AS "todayRevenue"
  FROM
    "SaleProduct" AS "sp"
  INNER JOIN "Sale" AS "s"
    ON "s"."id" = "sp"."saleId"
  WHERE
    "s"."date" BETWEEN $1 AND $2`;

  const todayStartOf = dayjs().startOf('day').toDate();
  const todayEndOf = dayjs().endOf('day').toDate();
  const todayRevenue = await db.$queryRawUnsafe<{ todayRevenue: number }[]>(todayRevenueQuery, todayStartOf, todayEndOf)
  return Number(todayRevenue[0].todayRevenue) || 0
}