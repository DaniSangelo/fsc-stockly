"use client";

import { AlertDialog } from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@/app/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";
import ProductDialog from "./product-dialog";
import { formatCurrency } from "@/app/_helpers/currency";

const getStatusLabel = (status: string): string => {
  return status === "IN_STOCK" ? "Em estoque" : "Esgotado";
};

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Vr. Unitário",
    cell: (row) => {
      const product = row.row.original;
      return formatCurrency(+product.price)
    }
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);
      return (
        <Badge
          className={`gap-1.5 ${label === "Em estoque" ? "bg-[#00A180]/20 text-[#00A180] hover:bg-[#00A180]/20" : "bg-[#5d5e5e]/20 text-[#5d5e5e] hover:bg-[#5d5e5e]/20"}`}
        >
          <CircleIcon
            size={10}
            className={`${label === "Em estoque" ? "fill-[#00A180] text-[#00A180]" : "fill-[#5c5c5c] text-[#5c5c5c]"}`}
          />
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      return (
        <AlertDialog>
          <ProductDialog product={product} />
        </AlertDialog>
      );
    },
  },
];
