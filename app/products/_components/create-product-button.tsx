"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog, DialogTrigger
} from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertProductDialogContent from "./upsert-product-dialog-content";

const CreatProductButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" variant="default">
          <PlusIcon size={20} />
          Novo produto
        </Button>
      </DialogTrigger>
      <UpsertProductDialogContent onSuccess={() => setIsDialogOpen(false)}/>
    </Dialog>
  );
};

export default CreatProductButton;
