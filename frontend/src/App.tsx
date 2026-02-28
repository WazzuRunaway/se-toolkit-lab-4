import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-zinc-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
          <p className="text-lg text-slate-500">Loading products…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-zinc-100">
        <div className="rounded-xl border border-red-200 bg-red-50 px-8 py-6 text-center shadow">
          <p className="text-lg font-medium text-red-700">Error</p>
          <p className="mt-1 text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-100 p-6 md:p-10">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-indigo-200">
            <svg
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M10 4v4" />
              <path d="M2 8h20" />
              <path d="M6 4v4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Product Data Table
            </h1>
            <p className="text-sm text-slate-500">
              {products.length} products loaded from API
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-700">
                    ID
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-700">
                    Title
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-700">
                    Price
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-700">
                    Category
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-700">
                    Description
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-700">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-slate-50/60"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                      {product.id}
                    </td>
                    <td className="max-w-[220px] truncate px-6 py-4 font-medium text-slate-800">
                      {product.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-slate-700">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        ${product.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 capitalize text-slate-600">
                      <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="max-w-[320px] px-6 py-4 text-slate-600">
                      <p className="line-clamp-2">{product.description}</p>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4 text-amber-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium">{product.rating.rate}</span>
                        <span className="text-slate-400">
                          ({product.rating.count})
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}