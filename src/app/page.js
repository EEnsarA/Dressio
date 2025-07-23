import Image from "next/image";
import { getAllProducts } from "./services/api";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import ProductSlider from "./components/ProductSlider";

export const revalidate = 3600;

export default async function Home() {


  const products = await getAllProducts();
  const bannerProduct = products[0];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2   gap-6 p-3 mt-8">

        <div className="h-[550px]">
          <ProductCard product={bannerProduct} large={true} />
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.slice(3, 7).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="my-20">
        <ProductSlider products={products} />
      </div>

    </>
  );
}
