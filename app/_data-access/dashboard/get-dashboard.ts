import 'server-only'
import { db } from '@/app/_lib/prisma';
import dayjs from 'dayjs'
import { ProductStockStatus } from '../product/get-products';

export interface DayTotalRevenue {
  day: string;
  todayRevenue: number;
}
export interface MostSoldProductDto {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStockStatus;
  price: number;
}

interface DashboardDto {
  totalLast14DaysRevenue: DayTotalRevenue[];
  mostSoldProducts: MostSoldProductDto[];
}

export const getDashboard = async (): Promise<DashboardDto> => {
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
    `;
  const mostSoldProductsQuery = `
    SELECT
      "Product"."name",
      SUM("SaleProduct"."quantity") as "totalSold",
      "Product"."price",
      "Product"."stock",
      "Product"."id" as "productId"
    FROM
      "SaleProduct"
    INNER JOIN "Product"
      ON "SaleProduct"."productId" = "Product"."id"
    GROUP BY
      "Product"."name",
      "Product"."price",
      "Product"."stock",
      "Product"."id"
    ORDER BY
      "totalSold" DESC
    LIMIT 5;
  `;
  const mostSoldProductsPromise = db.$queryRawUnsafe<
    {
      productId: string;
      name: string;
      totalSold: number;
      stock: number;
      price: number;
    }[]
  >(mostSoldProductsQuery);
  const totalRevenueLast14DaysPromise = db.$queryRawUnsafe<DayTotalRevenue[]>(totalRevenueLast14DaysQuery, fourteenDaysAgo, todayEndOf)
  const [
    totalLast14DaysRevenue,
    mostSoldProducts
  ] = await Promise.all([
    totalRevenueLast14DaysPromise,
    mostSoldProductsPromise
  ])

  return {
    totalLast14DaysRevenue,
    mostSoldProducts: mostSoldProducts.map((product) => ({
      ...product,
      totalSold: Number(product.totalSold),
      price: Number(product.price),
      status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    })),
  }
}