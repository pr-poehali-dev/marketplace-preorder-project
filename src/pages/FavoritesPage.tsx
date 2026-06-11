import { Product } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";

interface FavoritesPageProps {
  favorites: Product[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (id: string) => void;
  onProductClick: (id: string) => void;
}

export default function FavoritesPage({ favorites, onToggleFavorite, onAddToCart, onProductClick }: FavoritesPageProps) {
  if (favorites.length === 0) {
    return (
      <div className="pt-20 md:pt-24 pb-24 md:pb-8 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <p className="text-5xl mb-5">🤍</p>
        <h2 className="text-xl font-bold mb-2">Нет избранного</h2>
        <p className="text-muted-foreground text-sm">Нажми на сердечко на карточке товара, чтобы сохранить</p>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-8 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Избранное · {favorites.length}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favorites.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
