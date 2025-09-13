
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}
export default function ProductCard({ product }: {product:Product}) {
  return (
    <div className="">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h2 className="font-semibold mt-2">{product.title}</h2>
      <p className="text-gray-600 text-sm">${product.price}</p>
    </div>
  );
}
