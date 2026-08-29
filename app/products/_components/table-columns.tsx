"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@/app/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import DeleteDialogContent from "./delete-dialog-content";

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreHorizontalIcon size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuLabel>Ações</DropdownMenuLabel> */}
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                className="gap-1.5"
                onClick={() => {
                  navigator.clipboard.writeText(product.id);
                }}
              >
                <ClipboardCopyIcon size={16} /> Copiar id
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-1.5">
                <EditIcon size={16} /> Editar
              </DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="gap-1.5">
                  <TrashIcon size={16} /> Remover
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteDialogContent productId={product.id} />
        </AlertDialog>
      );
    },
  },
];
