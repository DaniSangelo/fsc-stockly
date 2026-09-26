import { CircleIcon } from "lucide-react";
import { ProductStockStatus } from "../_data-access/product/get-products";
import { Badge } from "./ui/badge";

const getStatusLabel = (status: string): string => {
  return status === "IN_STOCK" ? "Em estoque" : "Esgotado";
};

interface ProducStatusBadgeProps {
  status: ProductStockStatus;
}

const ProducStatusBadge = ({ status }: ProducStatusBadgeProps) => {
  const label = getStatusLabel(status);
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
};

export default ProducStatusBadge;
