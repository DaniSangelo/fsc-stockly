import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Suspense } from "react";
import TotalRevenueToday from "./_components/total-revenue-today-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalStockCard from "./_components/total-stock-card";
import TotalProductsCard from "./_components/total-products-card";
import { SummaryCardSkeleton } from "./_components/summary-card";
import Last14DaysRevenueCard from "./_components/last-14-days-revenue-card";
import { Skeleton } from "../_components/ui/skeleton";
import MostSoldProductsCard, { MostSoldProductsSkeleton } from "./_components/most-sold-products-card";

const Home = async () => {
  return (
    <div className="m-8 flex h-[calc(100vh-4rem)] min-w-0 flex-1 flex-col gap-8 rounded-lg p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle> Dashboard</HeaderSubtitle>
          <HeaderTitle> Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueCard />
        </Suspense>
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueToday />
        </Suspense>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalSalesCard />
        </Suspense>
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalStockCard />
        </Suspense>
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalProductsCard />
        </Suspense>
      </div>
      <div className="grid grid-cols-[2.5fr_1fr] gap-6">
        <Suspense
          fallback={
            <Skeleton className="bg-white p-6">
              <div className="space-y-2">
                <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
                <div className="h-4 w-48 rounded-md bg-gray-200" />
              </div>
            </Skeleton>
          }
        >
          <Last14DaysRevenueCard />
        </Suspense>
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
          <p className="p-6 text-lg font-semibold text-slate-900">
            Produtos mais vendidos
          </p>
          <Suspense fallback={<MostSoldProductsSkeleton />}>
            <MostSoldProductsCard />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
