import { getRevenueLast14Days } from "@/app/_data-access/dashboard/get-revenue-last-14-days";
import RevenueChart from "./revenue-chart";

const Last14DaysRevenueCard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const totalLast14DaysRevenue = await getRevenueLast14Days();
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
      <p className="text-lg font-semibold text-slate-900">Receita</p>
      <p className="text-sm text-slate-400 mb-3">Últimos 14 dias</p>
      <RevenueChart data={totalLast14DaysRevenue} />
    </div>
  );
};

export default Last14DaysRevenueCard;
