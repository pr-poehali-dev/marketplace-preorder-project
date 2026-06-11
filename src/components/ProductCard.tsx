import Icon from "@/components/ui/icon";
import { Product } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (id: string) => void;
  onClick: (id: string) => void;
}

const CONDITION_STYLES: Record<string, string> = {
  "новое": "bg-emerald-50 text-emerald-700",
  "отличное": "bg-blue-50 text-blue-700",
  "хорошее": "bg-amber-50 text-amber-700",
  "б/у": "bg-zinc-100 text-zinc-600",
};

export default function ProductCard({ product, onToggleFavorite, onAddToCart, onClick }: ProductCardProps) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden border border-border hover-lift cursor-pointer animate-fade-in"
      onClick={() => onClick(product.id)}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount && (
          <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-md">
            -{discount}%
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            product.isFavorite
              ? "bg-white text-red-500 shadow-md"
              : "bg-white/80 text-muted-foreground opacity-0 group-hover:opacity-100"
          }`}
        >
          <Icon name={product.isFavorite ? "Heart" : "Heart"} size={15} />
        </button>
      </div>

      <div className="p-4 space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold text-sm leading-tight line-clamp-1">{product.title}</p>
            {product.brand && (
              <p className="text-xs text-muted-foreground mt-0.5">{product.brand}{product.size ? ` · ${product.size}` : ""}</p>
            )}
          </div>
          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${CONDITION_STYLES[product.condition]}`}>
            {product.condition}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base font-bold">{product.price.toLocaleString()} ₽</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {product.oldPrice.toLocaleString()} ₽
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="w-5 h-5 rounded-full bg-secondary border border-border flex items-center justify-center text-[10px] font-bold">
              {product.seller.avatar}
            </div>
            <span>{product.seller.name}</span>
            <span>·</span>
            <Icon name="Star" size={11} className="text-amber-400 fill-amber-400" />
            <span>{product.seller.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="MapPin" size={11} />
            <span>{product.location}</span>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(product.id); }}
          className="w-full py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-80 transition-opacity active:scale-95"
        >
          В корзину
        </button>
      </div>
    </div>
  );
}
