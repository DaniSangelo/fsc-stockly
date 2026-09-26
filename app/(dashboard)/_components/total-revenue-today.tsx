import { DollarSign } from "lucide-react";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";
import { formatCurrency } from "@/app/_helpers/currency";
import { getTotalRevenueToday } from "@/app/_data-access/dashboard/get-total-revenue-today";

const TotalRevenueToday = async () => {
  const todayRevenue = await getTotalRevenueToday();
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <DollarSign />
      </SummaryCardIcon>
      <SummaryCardTitle>Receita hoje</SummaryCardTitle>
      <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalRevenueToday;
