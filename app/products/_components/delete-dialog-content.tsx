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
import { toast } from "sonner";

interface DeleteDialogContentProps {
  productId: string;
}

const DeleteDialogContent = ({ productId }: DeleteDialogContentProps) => {
  const handleConfirmClick = async () => {
    try {
      await deleteProduct({ id: productId });
      toast.success("Produto removido com sucesso")
    } catch (error) {
      console.log(error);
    }
  };

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
        <AlertDialogAction onClick={handleConfirmClick}>Confirmar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteDialogContent;
