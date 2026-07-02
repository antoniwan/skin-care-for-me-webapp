import { ProductsPage } from "@/components/pages/products-page";
import { PAGE_METADATA } from "@/lib/constants/metadata";

export const metadata = PAGE_METADATA.products;

export default function Page() {
  return <ProductsPage />;
}
