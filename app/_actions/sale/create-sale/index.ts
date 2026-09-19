'use server';

import { db } from "@/app/_lib/prisma";
import { createSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const createSale = actionClient.schema(createSaleSchema).action(async ({ parsedInput: { products } }) => {
  await db.$transaction(async (trans) => {
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

      if (!prod) returnValidationErrors(createSaleSchema, { _errors: ['Product not found'] })

      const isOutOfStock = product.quantity > prod.stock;
      if (isOutOfStock) returnValidationErrors(createSaleSchema, { _errors: ['Product out of stock'] })

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
  revalidatePath('/products');

});