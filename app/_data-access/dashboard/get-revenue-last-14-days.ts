import 'server-only';
import { db } from "@/app/_lib/prisma";
import dayjs from 'dayjs';

export interface DayTotalRevenue {
  day: string;
  todayRevenue: number;
}

export const getRevenueLast14Days = async () => {
  const todayStartOf = dayjs().startOf('day').toDate();
  const todayEndOf = dayjs().endOf('day').toDate();
  const fourteenDaysAgo = dayjs(todayStartOf).subtract(14, 'day').toDate();
  const totalRevenueLast14DaysQuery = `
  SELECT
    SUM("sp"."unitPrice" * "sp"."quantity") as "todayRevenue",
    TO_CHAR("s"."date", 'DD/MM') AS day
  FROM
    "SaleProduct" AS "sp"
  INNER JOIN "Sale" AS "s"
    ON "s"."id" = "sp"."saleId"
  WHERE
    "s"."date" BETWEEN $1 AND $2
  GROUP BY
    TO_CHAR("s"."date", 'DD/MM')
  ORDER BY TO_CHAR("s"."date", 'DD/MM') ASC
  `;
  const totalRevenueLast14Days= await db.$queryRawUnsafe<DayTotalRevenue[]>(totalRevenueLast14DaysQuery, fourteenDaysAgo, todayEndOf)
  return totalRevenueLast14Days;
}
