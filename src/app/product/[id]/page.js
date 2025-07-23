import { getAllProducts, getProductById } from "@/app/services/api";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
    const products = await getAllProducts();
    return products.map((prd) => ({
        id: prd.id.toString(),
    }));
}

export async function generateMetaData({ params }) {
    const product = await getProductById(params.id);
    return {
        title: product.title,
        description: product.description,
    };
}

export default async function ProductDetailPage({ params }) {
    const { id } = params;
    const product = await getProductById(id);

    return <ProductDetailClient product={product} />;

}