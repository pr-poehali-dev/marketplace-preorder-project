import { useState } from "react";
import { Product, MOCK_PRODUCTS } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface MyItemsPageProps {
  onProductClick: (id: string) => void;
}

const MY_ITEMS = MOCK_PRODUCTS.slice(0, 2);

const CONDITION_STYLES: Record<string, string> = {
  "новое": "bg-emerald-50 text-emerald-700",
  "отличное": "bg-blue-50 text-blue-700",
  "хорошее": "bg-amber-50 text-amber-700",
  "б/у": "bg-zinc-100 text-zinc-600",
};

export default function MyItemsPage({ onProductClick }: MyItemsPageProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-8 animate-fade-in">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Мои товары</h1>
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            <Icon name="Plus" size={16} />
            Добавить
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Активных", value: MY_ITEMS.length, icon: "Package" },
            { label: "Продано", value: 14, icon: "CheckCircle" },
            { label: "Просмотров", value: 342, icon: "Eye" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Items list */}
        <div className="space-y-3">
          {MY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-card rounded-2xl border border-border hover-lift cursor-pointer"
              onClick={() => onProductClick(item.id)}
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary shrink-0">
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sm line-clamp-1">{item.title}</p>
                  <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${CONDITION_STYLES[item.condition]}`}>
                    {item.condition}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{item.brand}{item.size ? ` · ${item.size}` : ""}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold">{item.price.toLocaleString()} ₽</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Eye" size={12} />
                    <span>48</span>
                    <span className="mx-1">·</span>
                    <Icon name="MessageCircle" size={12} />
                    <span>3</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {MY_ITEMS.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-5">📦</p>
            <h2 className="text-xl font-bold mb-2">Нет товаров</h2>
            <p className="text-muted-foreground text-sm mb-6">Добавьте первую вещь для продажи</p>
            <button
              onClick={() => setAddOpen(true)}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-80 transition-opacity"
            >
              Добавить товар
            </button>
          </div>
        )}
      </div>

      {/* Add item modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-background rounded-2xl border border-border shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-bold text-lg">Новый товар</h3>
              <button onClick={() => setAddOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Название</label>
                <input
                  type="text"
                  placeholder="Например: Куртка зимняя"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Цена, ₽</label>
                <input
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Описание</label>
                <textarea
                  placeholder="Расскажите о состоянии, размере, бренде..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <button
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-80 transition-opacity"
                onClick={() => setAddOpen(false)}
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
