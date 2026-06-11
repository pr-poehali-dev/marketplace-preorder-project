import { Product } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface CartPageProps {
  cartItems: Product[];
  onRemoveFromCart: (id: string) => void;
  onProductClick: (id: string) => void;
}

export default function CartPage({ cartItems, onRemoveFromCart, onProductClick }: CartPageProps) {
  const total = cartItems.reduce((sum, p) => sum + p.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="pt-20 md:pt-24 pb-24 md:pb-8 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <p className="text-5xl mb-5">🛍️</p>
        <h2 className="text-xl font-bold mb-2">Корзина пуста</h2>
        <p className="text-muted-foreground text-sm">Добавляйте понравившиеся вещи из каталога</p>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-24 pb-32 md:pb-8 animate-fade-in">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Корзина · {cartItems.length}</h1>

        <div className="space-y-3 mb-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-card rounded-2xl border border-border"
            >
              <button
                onClick={() => onProductClick(item.id)}
                className="w-20 h-20 rounded-xl overflow-hidden bg-secondary shrink-0"
              >
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
              </button>
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => onProductClick(item.id)}
                  className="text-sm font-semibold line-clamp-1 hover:text-muted-foreground transition-colors text-left"
                >
                  {item.title}
                </button>
                {item.brand && (
                  <p className="text-xs text-muted-foreground mt-0.5">{item.brand}{item.size ? ` · ${item.size}` : ""}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">{item.seller.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold">{item.price.toLocaleString()} ₽</span>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Icon name="Trash2" size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Товары ({cartItems.length})</span>
              <span>{total.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Доставка</span>
              <span className="text-emerald-600 font-medium">Бесплатно</span>
            </div>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between font-bold text-lg">
            <span>Итого</span>
            <span>{total.toLocaleString()} ₽</span>
          </div>
          <button className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-80 transition-opacity">
            Оформить заказ
          </button>
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Оплата происходит напрямую продавцу после подтверждения сделки
          </p>
        </div>
      </div>
    </div>
  );
}
