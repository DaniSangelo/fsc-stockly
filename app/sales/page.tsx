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
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-primary">Vendas</span>
          <h2 className="text-xl font-semibold"> Produtos </h2>
        </div>
        <CreateSaleButton productOptions={mappedProducts} products={products}/>
      </div>
      {/* <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      /> */}
    </div>
  );
};

export default SalesPage;
