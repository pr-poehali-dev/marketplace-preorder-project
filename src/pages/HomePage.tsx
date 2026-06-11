import { Product, MOCK_PRODUCTS, CATEGORIES } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

interface HomePageProps {
  products: Product[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (id: string) => void;
  onProductClick: (id: string) => void;
  onNavigateCatalog: () => void;
}

export default function HomePage({ products, onToggleFavorite, onAddToCart, onProductClick, onNavigateCatalog }: HomePageProps) {
  const featured = products.slice(0, 3);
  const recent = products.slice(3, 6);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 px-4 max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
            Маркетплейс перепродажи
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
            Находи вещи,<br />
            <span className="text-muted-foreground font-normal">которые тебе нравятся</span>
          </h1>
          <p className="text-base text-muted-foreground mb-8 max-w-md leading-relaxed">
            Покупай и продавай напрямую. Общайся с продавцами, торгуйся — без посредников.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onNavigateCatalog}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              Смотреть каталог
              <Icon name="ArrowRight" size={16} />
            </button>
            <button className="px-6 py-3 bg-secondary text-foreground rounded-full font-semibold hover:bg-border transition-colors">
              Продать вещь
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-3 gap-4 max-w-sm">
          {[
            { num: "1 200+", label: "товаров" },
            { num: "340", label: "продавцов" },
            { num: "4.8", label: "рейтинг" },
          ].map((s) => (
            <div key={s.label} className="text-center py-4 px-2 rounded-2xl border border-border bg-card">
              <p className="text-xl font-bold">{s.num}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 max-w-6xl mx-auto mb-16">
        <h2 className="text-xl font-bold mb-5">Категории</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
            <button
              key={cat.id}
              onClick={onNavigateCatalog}
              className="px-4 py-2 rounded-full border border-border bg-card text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="px-4 max-w-6xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Популярные</h2>
          <button
            onClick={onNavigateCatalog}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Все <Icon name="ChevronRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onClick={onProductClick}
            />
          ))}
        </div>
      </section>

      {/* Recent */}
      <section className="px-4 max-w-6xl mx-auto mb-24 md:mb-16">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Свежие поступления</h2>
          <button
            onClick={onNavigateCatalog}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Все <Icon name="ChevronRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onClick={onProductClick}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
