"use client";

import { AlertDialog } from "@/app/_components/ui/alert-dialog";
import { ColumnDef } from "@tanstack/react-table";
import ProductDialog from "./product-dialog";
import { formatCurrency } from "@/app/_helpers/currency";
import { ProductDto } from "@/app/_data-access/product/get-products";
import ProducStatusBadge from "@/app/_components/product-status-badge";

export const productTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Vr. Unitário",
    cell: (row) => {
      const product = row.row.original;
      return formatCurrency(+product.price);
    },
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
      return <ProducStatusBadge status={product.status} />;
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
