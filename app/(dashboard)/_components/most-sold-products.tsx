import ProducStatusBadge from "@/app/_components/product-status-badge";
import { MostSoldProductDto } from "@/app/_data-access/dashboard/get-dashboard";
import { formatCurrency } from "@/app/_helpers/currency";

interface MostSoldProductsProps {
  product: MostSoldProductDto;
}

const MostSoldProductsItem = ({ product }: MostSoldProductsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-[6px]">
        <ProducStatusBadge status={product.status} />
        <p className="font-semibold">{product.name}</p>
        <p className="font-medium text-slate-500">
          {formatCurrency(product.price)}
        </p>
      </div>
      <div className="text-sm font-semibold">{product.totalSold} vendidos</div>
    </div>
  );
};

export default MostSoldProductsItem;
