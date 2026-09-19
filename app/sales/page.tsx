import { ComboboxOption } from "../_components/ui/combobox";
import { getProducts } from "../_data-access/product/get-products";
import CreateSaleButton from "./_components/create-sale-button";

const SalesPage = async () => {
  const products = await getProducts();
  const mappedProducts: ComboboxOption[] = products.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  return (
    <div className="m-8 flex h-[calc(100vh-4rem)] min-w-0 flex-1 flex-col gap-8 rounded-lg bg-white p-8">
      <div className="flex w-full shrink-0 items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-primary">Gestão de vendas</span>
          <h2 className="text-xl font-semibold"> Vendas </h2>
        </div>
        <CreateSaleButton productOptions={mappedProducts} products={products} />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      /> */}
      </div>
    </div>
  );
};

export default SalesPage;
