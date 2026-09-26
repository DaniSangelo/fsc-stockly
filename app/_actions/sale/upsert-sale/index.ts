'use server';

import { db } from "@/app/_lib/prisma";
import { upsertSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const upsertSale = actionClient.schema(upsertSaleSchema).action(async ({ parsedInput: { products, id } }) => {
  const isUpdate = Boolean(id);
  await db.$transaction(async (trans) => {
    if (isUpdate) {
      const existingSale = await trans.sale.findUnique({ where: { id: id }, include: { saleProducts: true } })
      await trans.sale.delete({
        where: { id }
      })

      if (!existingSale?.saleProducts) return;

      for (const product of existingSale.saleProducts) {
        await trans.product.update({
          where: {
            id: product.productId,
          },
          data: {
            stock: {
              increment: product.quantity,
            },
          },
        })
      }
    }
    const sale = await trans.sale.create({
      data: {
        date: new Date(),
      }
    })

    for (const product of products) {
      const prod = (
        await trans.product.findUnique({
          where: {
            id: product.id,
          },
        })
      );

      if (!prod) returnValidationErrors(upsertSaleSchema, { _errors: ['Product not found'] })

      const isOutOfStock = product.quantity > prod.stock;
      if (isOutOfStock) returnValidationErrors(upsertSaleSchema, { _errors: ['Product out of stock'] })

      await trans.saleProduct.create({
        data: {
          saleId: sale.id,
          productId: product.id,
          quantity: product.quantity,
          unitPrice: prod.price,
        }
      })

      await trans.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            decrement: product.quantity,
          },
        },
      })
    }
  })
  revalidatePath('/', 'layout');
});
