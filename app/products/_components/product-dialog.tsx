"use client";

import { AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@/app/generated/prisma/client";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import DeleteDialogContent from "./delete-dialog-content";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import UpsertProductDialogContent from "./upsert-product-dialog-content";
import { useState } from "react";

interface ProductDialogProps {
  product: Product;
}

const ProductDialog = ({ product }: ProductDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
          <DialogTrigger asChild>
            <DropdownMenuItem className="gap-1.5">
              <EditIcon size={16} /> Editar
            </DropdownMenuItem>
          </DialogTrigger>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="gap-1.5">
              <TrashIcon size={16} /> Remover
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpsertProductDialogContent
        defaultValues={{
          id: product.id,
          name: product.name,
          stock: product.stock,
          price: Number(product.price),
        }}
        onSuccess={() => setIsDialogOpen(false)}
      />
      <DeleteDialogContent productId={product.id} />
    </Dialog>
  );
};

export default ProductDialog;
