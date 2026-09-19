import { deleteProduct } from "@/app/_actions/product/delete-product";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DeleteDialogContentProps {
  productId: string;
}

const DeleteDialogContent = ({ productId }: DeleteDialogContentProps) => {
  const { execute: executeDeleteProduct } = useAction(deleteProduct, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenErrors = flattenValidationErrors(validationErrors);
      console.log(flattenErrors);
      toast.error(serverError ?? flattenErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Produto excluído com sucesso");
    },
  });

  const handleConfirmClick = () => executeDeleteProduct({id: productId});

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Você tem certeza que deseja remover esse produto?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a realizar uma ação irreversível.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleConfirmClick}>
          Confirmar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteDialogContent;
