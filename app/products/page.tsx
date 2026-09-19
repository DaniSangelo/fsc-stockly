import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import { cachedGetProducts } from "../_data-access/product/get-products";
import CreateProductButton from "./_components/create-product-button";

const ProductsPage = async () => {
  const products = await cachedGetProducts();
  return (
    <div className="m-8 flex h-[calc(100vh-4rem)] min-w-0 flex-1 flex-col gap-8 rounded-lg bg-white p-8">
      <div className="flex w-full shrink-0 items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-primary">
            {" "}
            Gestão de produtos{" "}
          </span>
          <h2 className="text-xl font-semibold"> Produtos </h2>
        </div>
        <CreateProductButton />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <DataTable
          columns={productTableColumns}
          data={JSON.parse(JSON.stringify(products))}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
