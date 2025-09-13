import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const fetchProducts = async ({ page, limit }: { page: number; limit: number }) => {
  const skip = (page - 1) * limit;
  const { data } = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  return data;
};

export const useProducts = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts({ page, limit }),
  });
};
