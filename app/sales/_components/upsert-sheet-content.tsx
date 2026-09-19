"use client";

import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { Button } from "@/app/_components/ui/button";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Product } from "@/app/generated/prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/currency";
import SalesTableDropdownMenu from "./table-dropdown-menu";
import { createSale } from "@/app/_actions/sale/create-sale";
import { toast } from "sonner";

const formSchema = z.object({
  productId: z.string().uuid({ message: "Produto deve ser informado" }),
  quantity: z.coerce
    .number()
    .int("Somente números inteiros")
    .positive("Quantidade do produto deve ser maior que zero")
    .min(0, { message: "Quantidade do produto deve ser informada" }),
});

type FormType = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  products: Product[];
  productOptions: ComboboxOption[];
  onSubmitSucces: () => void;
}

interface SelectedProducts {
  id: string;
  price: number;
  quantity: number;
  name: string;
}

const UpsertSheetContent = ({
  productOptions,
  products,
  onSubmitSucces,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>(
    [],
  );

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const handleDelete = (productId: string) => {
    setSelectedProducts((currentProducts) => {
      return currentProducts.filter((p) => p.id !== productId);
    });
  };

  const onSubmit = (data: FormType) => {
    const selectedProduct = products.find((p) => p.id === data.productId);
    if (!selectedProduct) return;
    setSelectedProducts((prev) => {
      const existingProduct = prev.find(
        (prod) => prod.id === selectedProduct.id,
      );

      if (existingProduct) {
        if (existingProduct.quantity + data.quantity > selectedProduct.stock) {
          form.setError("quantity", {
            message: "Quantidade indisponível no estoque",
          });
          return prev;
        }
        form.reset();
        return prev.map((p) => {
          if (p.id === selectedProduct.id) {
            return {
              ...p,
              quantity: p.quantity + data.quantity,
            };
          }
          return p;
        });
      }

      if (data.quantity > selectedProduct.stock) {
        form.setError("quantity", {
          message: "Quantidade indisponível no estoque",
        });
        return prev;
      }
      form.reset();
      return [
        ...prev,
        {
          ...selectedProduct,
          quantity: data.quantity,
          price: +selectedProduct.price,
        },
      ];
    });
    form.reset;
  };

  const productsTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);

  const onSubmitSale = async () => {
    try {
      await createSale({
        products: selectedProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
      });
      toast.success("Venda inserida com sucesso")
      onSubmitSucces();
    } catch (error) {
      toast.error("Erro ao inserir a venda")
    }
  };

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle> Nova venda</SheetTitle>
        <SheetDescription> Insira as informações abaixo </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className="space-y-8 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel> Produto </FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    placeholder="Selecione um produto"
                    options={productOptions}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel> Quantidade </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite a quantiade do produto"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full gap-2" type="submit" variant="secondary">
            <PlusIcon size={20} />
            Adicionar produto
          </Button>
        </form>
      </Form>
      <Table>
        <TableCaption>Produtos adicionados à venda</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Produto</TableHead>
            <TableHead className="text-right">Pr.Unitário</TableHead>
            <TableHead className="text-right">Qtd.</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(p.price)}
              </TableCell>
              <TableCell className="text-right">{p.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(p.quantity * p.price)}
              </TableCell>
              <TableCell className="text-right">
                <SalesTableDropdownMenu product={p} onDelete={handleDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {formatCurrency(productsTotal)}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <SheetFooter className="mt-5">
        <Button
          className="w-full gap-2"
          variant="default"
          onClick={onSubmitSale}
          disabled={selectedProducts.length === 0}
        >
          {" "}
          <CheckIcon size={20} /> Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
