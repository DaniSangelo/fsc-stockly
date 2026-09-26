import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-access/product/get-products";
import { getSales } from "../_data-access/sale/get-sales";
import UpsertSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";

const SalesPage = async () => {
  const [products, sales] = await Promise.all([getProducts(), getSales()]);

  const productOptions: ComboboxOption[] = products.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
  }));

  return (
    <div className="m-8 flex h-[calc(100vh-4rem)] min-w-0 flex-1 flex-col gap-8 rounded-lg bg-white p-8">
      <div className="flex w-full shrink-0 items-center justify-between">
        <Header>
          <HeaderLeft>
            <HeaderSubtitle> Gestão de Vendas</HeaderSubtitle>
            <HeaderTitle> Vendas</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <UpsertSaleButton
              productOptions={productOptions}
              products={products}
            />
          </HeaderRight>
        </Header>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <DataTable columns={saleTableColumns} data={tableData} />
      </div>
    </div>
  );
};

export default SalesPage;
