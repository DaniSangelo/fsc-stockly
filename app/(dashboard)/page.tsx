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
import SimpleSkeleton from "./_components/simple-skeleton";
import TotalStockCard from "./_components/total-stock";
import TotalProductsCard from "./_components/total-products-card";

const Home = async () => {
  const {
    totalLast14DaysRevenue,
    mostSoldProducts,
  } = await getDashboard();
  return (
    <div className="m-8 flex h-[calc(100vh-4rem)] min-w-0 flex-1 flex-col gap-8 rounded-lg p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle> Dashboard</HeaderSubtitle>
          <HeaderTitle> Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<SimpleSkeleton />}>
          <TotalRevenueCard />
        </Suspense>
        <Suspense fallback={<SimpleSkeleton />}>
          <TotalRevenueToday />
        </Suspense>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<SimpleSkeleton />}>
          <TotalSalesCard />
        </Suspense>
        <Suspense fallback={<SimpleSkeleton />}>
          <TotalStockCard />
        </Suspense>
        <Suspense fallback={<SimpleSkeleton />}>
          <TotalProductsCard />
        </Suspense>
      </div>
      <div className="grid grid-cols-[2.5fr_1fr] gap-6">
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
          <p className="text-lg font-semibold text-slate-900">Receita</p>
          <p className="text-sm text-slate-400">Últimos 14 dias</p>
          <RevenueChart data={totalLast14DaysRevenue} />
        </div>
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
