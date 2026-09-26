import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import RevenueChart from "./_components/revenue-chart";
import MostSoldProductsItem from "./_components/most-sold-products";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Suspense } from "react";
import TotalRevenueToday from "./_components/total-revenue-today";
import TotalSalesCard from "./_components/total-sales-card";
import TotalStockCard from "./_components/total-stock";
import TotalProductsCard from "./_components/total-products-card";
import { SummaryCardSkeleton } from "./_components/summary-card";
import Last14DaysRevenueCard from "./_components/last-14-days-revenue-card";
import { Skeleton } from "../_components/ui/skeleton";

const Home = async () => {
  const { mostSoldProducts } = await getDashboard();
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
          <div className="mt-4 space-y-7 overflow-y-auto px-4 pb-4">
            {mostSoldProducts.map((item, i) => {
              return <MostSoldProductsItem product={item} key={i} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
