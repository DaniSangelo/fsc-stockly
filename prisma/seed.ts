import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const productData = [
  ["Caderno pontilhado", 24.9, 80],
  ["Caneta esferográfica azul", 3.5, 240],
  ["Caneta marca-texto amarela", 6.9, 120],
  ["Lápis HB", 2.4, 180],
  ["Borracha branca", 1.9, 150],
  ["Agenda anual", 39.9, 45],
  ["Pasta catálogo", 18.5, 65],
  ["Bloco adesivo", 8.9, 95],
  ["Estojo escolar", 29.9, 35],
  ["Régua 30 cm", 5.9, 75],
  ["Tesoura escolar", 12.9, 50],
  ["Cola branca", 7.5, 90],
] as const;

async function main() {
  await prisma.saleProduct.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.product.deleteMany();

  const products = await Promise.all(
    productData.map(([name, price, stock]) =>
      prisma.product.create({ data: { name, price, stock } }),
    ),
  );

  for (let saleIndex = 0; saleIndex < 12; saleIndex += 1) {
    const sale = await prisma.sale.create({
      data: {
        date: new Date(2026, 7, 1 + saleIndex),
      },
    });

    const firstProduct = products[saleIndex % products.length];
    const secondProduct = products[(saleIndex + 1) % products.length];

    await prisma.saleProduct.createMany({
      data: [
        {
          saleId: sale.id,
          productId: firstProduct.id,
          unitPrice: firstProduct.price,
          quantity: (saleIndex % 4) + 1,
        },
        {
          saleId: sale.id,
          productId: secondProduct.id,
          unitPrice: secondProduct.price,
          quantity: (saleIndex % 3) + 1,
        },
      ],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });