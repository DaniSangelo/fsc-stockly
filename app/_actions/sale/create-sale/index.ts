'use server';

import { db } from "@/app/_lib/prisma";
import { createSaleSchema, CreateSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const createSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data)
  await db.$transaction(async (trans) => {
    const sale = await trans.sale.create({
      data: {
        date: new Date(),
      }
    })
  
    for (const product of data.products) {
      const prod = (
        await trans.product.findUnique({
          where: {
            id: product.id,
          },
        })
      );
  
      if (!prod) throw new Error('Product not found');
  
      const isOutOfStock = product.quantity > prod.stock;
      if (isOutOfStock) throw new Error('Product out of stock');
  
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
}