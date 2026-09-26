import { getMostSoldProducts } from "@/app/_data-access/dashboard/get-most-sold-products";
import MostSoldProductsItem, { MostSoldProductItemSkeleton } from "./most-sold-products";
import { Skeleton } from "@/app/_components/ui/skeleton";

const MostSoldProductsCard = async () => {
  const { mostSoldProducts } = await getMostSoldProducts();
  return (
    <div className="mt-4 space-y-7 overflow-y-auto px-4 pb-4">
      {mostSoldProducts.map((item, i) => {
        return <MostSoldProductsItem product={item} key={i} />;
      })}
    </div>
  );
};

export const MostSoldProductsSkeleton = () => {
  return (
    <Skeleton className="bg-white p-6">
      <div className="space-y-2">
        <MostSoldProductItemSkeleton />
        <MostSoldProductItemSkeleton />
        <MostSoldProductItemSkeleton />
      </div>
    </Skeleton>
  );
};

export default MostSoldProductsCard;
