import { useState, useEffect } from "react";
import { useProducts } from "./api/products";
import ProductCard, { Product } from "./components/productCard";
import CustomPagination from "./components/customPagination";
import CustomSkeleton from "./components/customSkeleton";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(pageParam);
  const limit = 10;

  const { data, isLoading, isError } = useProducts(page, limit);
  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  useEffect(() => {
    if (totalPages === 0) return;
    let newPage = page;
    if (page < 1) newPage = 1;
    if (page > totalPages) newPage = totalPages;

    if (newPage !== page) {
      setPage(newPage);
      setSearchParams({ page: newPage.toString() });
    }
  }, [page, totalPages, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isError)
    return <div className="p-4 text-red-500">Error fetching data</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 9 }).map((_, i) => (
              <CustomSkeleton key={i} />
            ))
          : data.products.map((product: Product) => (
              <div
                key={product.id}
                className="border rounded-xl p-3 shadow hover:shadow-lg 
                   transition-all duration-500 ease-out
                   opacity-0 translate-y-4"
                style={{ animation: "fadeIn 0.5s forwards" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
      </div>

      <CustomPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
