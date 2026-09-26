import { CircleDollarSign } from "lucide-react";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";
import { db } from "@/app/_lib/prisma";

const TotalSalesCard = async() => {
  const totalSales = await db.sale.count();
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <CircleDollarSign />
      </SummaryCardIcon>
      <SummaryCardTitle>Vendas totais</SummaryCardTitle>
      <SummaryCardValue>{totalSales}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalSalesCard;
