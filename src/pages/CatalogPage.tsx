import { useState } from "react";
import { Product, CATEGORIES } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

interface CatalogPageProps {
  products: Product[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (id: string) => void;
  onProductClick: (id: string) => void;
}

export default function CatalogPage({ products, onToggleFavorite, onAddToCart, onProductClick }: CatalogPageProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = products
    .filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.brand?.toLowerCase().includes(search.toLowerCase()) ?? false);
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.seller.rating - a.seller.rating;
      return 0;
    });

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-8 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Каталог</h1>

        {/* Search + sort */}
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1">
            <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по названию или бренду..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          >
            <option value="newest">Новые</option>
            <option value="price-asc">Цена ↑</option>
            <option value="price-desc">Цена ↓</option>
            <option value="rating">Рейтинг</option>
          </select>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-sm text-muted-foreground mb-5">
          {filtered.length} {filtered.length === 1 ? "товар" : filtered.length < 5 ? "товара" : "товаров"}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
                onClick={onProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-semibold text-lg mb-2">Ничего не найдено</p>
            <p className="text-muted-foreground text-sm">Попробуй изменить фильтры или поисковый запрос</p>
          </div>
        )}
      </div>
    </div>
  );
}
