import { db } from "@/app/_lib/prisma";

export async function GET() {
  const products = await db.product.findMany({});
  return Response.json(products, { status: 200 })
}

export async function POST(req: Request) {
  const payload = await req.json()
  const { name, price, stock } = payload
  await db.product.create({
    data: {
      name,
      price,
      stock,
    }
  })
  return Response.json({}, { status: 201 })
}