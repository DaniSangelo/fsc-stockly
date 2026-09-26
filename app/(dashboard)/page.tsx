import {
  CircleDollarSign,
  DollarSign,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-card";
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import { formatCurrency } from "../_helpers/currency";
import RevenueChart from "./_components/revenue-chart";
import MostSoldProductsItem from "./_components/most-sold-products";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Suspense } from "react";
import { Skeleton } from "../_components/ui/skeleton";

const Home = async () => {
  const {
    todayRevenue,
    totalSales,
    totalStock,
    totalProducts,
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
        <Suspense
          fallback={
            <div className="rounded-xl bg-white p-6">
              <Skeleton className="mb-2 h-9 w-9 rounded-md" />
              <Skeleton className="mb-1 h-4 w-24" />
              <Skeleton className="h-8 w-32" />
            </div>
          }
        >
          <TotalRevenueCard />
        </Suspense>
        <SummaryCard>
          <SummaryCardIcon>
            <DollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>Receita hoje</SummaryCardTitle>
          <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
        </SummaryCard>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <CircleDollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>Vendas totais</SummaryCardTitle>
          <SummaryCardValue>{totalSales}</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardIcon>
            <PackageIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
          <SummaryCardValue>{totalStock}</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Produtos</SummaryCardTitle>
          <SummaryCardValue>{totalProducts}</SummaryCardValue>
        </SummaryCard>
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
