import { useState } from "react";
import { Product, Message, MOCK_MESSAGES } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (id: string) => void;
}

const CONDITION_STYLES: Record<string, string> = {
  "новое": "bg-emerald-50 text-emerald-700",
  "отличное": "bg-blue-50 text-blue-700",
  "хорошее": "bg-amber-50 text-amber-700",
  "б/у": "bg-zinc-100 text-zinc-600",
};

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        const id = `half-product-${star}`;
        return (
          <svg key={star} width={size} height={size} viewBox="0 0 12 12" fill="none">
            <defs>
              <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M6 1l1.236 2.504L10 3.927l-2 1.95.472 2.753L6 7.25 3.528 8.63 4 5.877 2 3.927l2.764-.423L6 1z"
              fill={filled ? "#f59e0b" : half ? `url(#${id})` : "none"}
              stroke="#f59e0b"
              strokeWidth="0.8"
            />
          </svg>
        );
      })}
    </div>
  );
}

const SELLER_REVIEWS = [
  { id: "r1", author: "Сергей П.", rating: 5, text: "Всё как описано, доставил быстро. Рекомендую!", date: "3 недели назад" },
  { id: "r2", author: "Юлия К.", rating: 5, text: "Отличный продавец, вещь в идеальном состоянии.", date: "1 месяц назад" },
  { id: "r3", author: "Антон В.", rating: 4, text: "Всё хорошо, чуть задержал ответ. Вещь понравилась.", date: "2 месяца назад" },
];

export default function ProductPage({ product, onBack, onToggleFavorite, onAddToCart }: ProductPageProps) {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMsg, setNewMsg] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), from: "buyer", text: newMsg.trim(), time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setNewMsg("");
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div className="pt-16 md:pt-20 pb-32 md:pb-12 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-6 mb-6"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CONDITION_STYLES[product.condition]}`}>
                  {product.condition}
                </span>
                <h1 className="text-2xl font-bold mt-3 leading-tight">{product.title}</h1>
                {product.brand && (
                  <p className="text-muted-foreground text-sm mt-1">
                    {product.brand}{product.size ? ` · Размер ${product.size}` : ""}
                  </p>
                )}
              </div>
              <button
                onClick={() => onToggleFavorite(product.id)}
                className={`p-2.5 rounded-xl border transition-all ${
                  product.isFavorite
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "border-border hover:border-red-200 hover:text-red-400 text-muted-foreground"
                }`}
              >
                <Icon name="Heart" size={20} />
              </button>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">{product.price.toLocaleString()} ₽</span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{product.oldPrice.toLocaleString()} ₽</span>
                  <span className="bg-accent text-white text-sm font-bold px-2.5 py-0.5 rounded-lg">-{discount}%</span>
                </>
              )}
            </div>

            {/* Seller */}
            <div className="p-4 rounded-xl border border-border bg-card space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-base">
                  {product.seller.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{product.seller.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <StarRating rating={product.seller.rating} size={13} />
                    <span className="text-xs font-semibold text-amber-500">{product.seller.rating}</span>
                    <span className="text-xs text-muted-foreground">· {product.seller.deals} сделок</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground justify-end">
                    <Icon name="MapPin" size={11} />
                    <span>{product.location}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{product.createdAt}</p>
                </div>
              </div>
              {/* Rating bar */}
              <div className="grid grid-cols-5 gap-1 pt-1 border-t border-border">
                {[
                  { label: "Точность", val: 98 },
                  { label: "Скорость", val: 95 },
                  { label: "Упаковка", val: 100 },
                  { label: "Связь", val: 92 },
                  { label: "Повторно", val: 96 },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-xs font-bold">{s.val}%</p>
                    <p className="text-[9px] text-muted-foreground leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm font-semibold mb-2">Описание</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => onAddToCart(product.id)}
                className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
              >
                <Icon name="ShoppingBag" size={18} />
                В корзину
              </button>
              <button
                onClick={() => setChatOpen(true)}
                className="flex-1 py-3 rounded-xl border border-border font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Icon name="MessageCircle" size={18} />
                Написать
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12 mb-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">Отзывы о продавце</h2>
            <div className="flex items-center gap-2">
              <StarRating rating={product.seller.rating} size={14} />
              <span className="font-bold text-sm">{product.seller.rating}</span>
              <span className="text-sm text-muted-foreground">({product.seller.deals} сделок)</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {SELLER_REVIEWS.map((review) => (
              <div key={review.id} className="bg-card border border-border rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-xs font-bold">
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{review.author}</p>
                      <p className="text-[10px] text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size={11} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-background rounded-2xl border border-border shadow-2xl animate-slide-up">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
              <div className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center font-bold text-sm">
                {product.seller.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{product.seller.name}</p>
                <p className="text-xs text-muted-foreground">{product.title}</p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
              >
                <Icon name="X" size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="p-4 h-72 overflow-y-auto flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === "buyer" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === "buyer"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-foreground rounded-bl-sm"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.from === "buyer" ? "text-primary-foreground/60 text-right" : "text-muted-foreground"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border flex gap-2">
              <input
                type="text"
                placeholder="Напишите сообщение..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={sendMessage}
                disabled={!newMsg.trim()}
                className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-80 transition-opacity disabled:opacity-40"
              >
                <Icon name="Send" size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}