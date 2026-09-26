import { ReactNode } from "react";

export const SummaryCardIcon = ({
  children,
}: {
  children: ReactNode,
}) => {
  return (
    <div
      className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500 bg-opacity-10 text-emerald-500"
    >
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({ children }: { children: ReactNode }) => {
  return <p className="text-xs font-medium text-primary">{children}</p>;
};

export const SummaryCardValue = ({ children }: { children: ReactNode }) => {
  return <p className="text-2xl font-semibold">{children}</p>;
};

const SummaryCard = ({ children }: { children: ReactNode }) => {
  return <div className="rounded-xl bg-white p-6">{children}</div>;
};

export const SummaryCardSkeleton = () => {
  return (
    <div className="rounded-xl bg-white p-6">
      <div className="space-y-2">
        <div className="h-9 w-9 rounded-md bg-gray-200" />
        <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
        <div className="h-8 w-48 rounded-md bg-gray-200" />
      </div>
    </div>
  );
};

export default SummaryCard;
