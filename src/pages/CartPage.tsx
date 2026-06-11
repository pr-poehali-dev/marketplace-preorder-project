import { useState } from "react";
import { Product } from "@/data/mockData";
import Icon from "@/components/ui/icon";

interface CartPageProps {
  cartItems: Product[];
  onRemoveFromCart: (id: string) => void;
  onProductClick: (id: string) => void;
  onClearCart: () => void;
}

type Step = "cart" | "checkout" | "success";

const DELIVERY_OPTIONS = [
  { id: "pickup", label: "Самовывоз", sub: "Встреча с продавцом", price: 0, icon: "MapPin" },
  { id: "courier", label: "Курьер", sub: "1–2 дня", price: 299, icon: "Truck" },
  { id: "post", label: "Почта России", sub: "3–7 дней", price: 199, icon: "Mail" },
  { id: "cdek", label: "СДЭК", sub: "2–4 дня", price: 249, icon: "Package" },
];

const PAYMENT_OPTIONS = [
  { id: "cash", label: "Наличные при получении", icon: "💵" },
  { id: "card", label: "Карта при получении", icon: "💳" },
  { id: "sbp", label: "СБП — перевод продавцу", icon: "📱" },
];

export default function CartPage({ cartItems, onRemoveFromCart, onProductClick, onClearCart }: CartPageProps) {
  const [step, setStep] = useState<Step>("cart");
  const [delivery, setDelivery] = useState("pickup");
  const [payment, setPayment] = useState("cash");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const deliveryCost = DELIVERY_OPTIONS.find((d) => d.id === delivery)?.price ?? 0;
  const subtotal = cartItems.reduce((sum, p) => sum + p.price, 0);
  const total = subtotal + deliveryCost;

  const canSubmit = name.trim() && phone.trim() && (delivery === "pickup" || address.trim());

  if (cartItems.length === 0 && step !== "success") {
    return (
      <div className="pt-20 md:pt-24 pb-24 md:pb-8 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <p className="text-5xl mb-5">🛍️</p>
        <h2 className="text-xl font-bold mb-2">Корзина пуста</h2>
        <p className="text-muted-foreground text-sm">Добавляйте понравившиеся вещи из каталога</p>
      </div>
    );
  }

  // Успешный заказ
  if (step === "success") {
    return (
      <div className="pt-20 md:pt-24 pb-24 md:pb-8 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in px-4">
        <div className="max-w-sm w-full text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle" size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Заказ оформлен!</h2>
          <p className="text-muted-foreground text-sm mb-1">Номер заказа: <span className="font-semibold text-foreground">#ВЩ-{Math.floor(Math.random() * 9000) + 1000}</span></p>
          <p className="text-muted-foreground text-sm mb-8">Продавец свяжется с вами в ближайшее время для подтверждения</p>

          <div className="bg-card border border-border rounded-2xl p-4 text-left space-y-3 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Получатель</span>
              <span className="font-medium">{name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Телефон</span>
              <span className="font-medium">{phone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Доставка</span>
              <span className="font-medium">{DELIVERY_OPTIONS.find((d) => d.id === delivery)?.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Оплата</span>
              <span className="font-medium">{PAYMENT_OPTIONS.find((p) => p.id === payment)?.label}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-bold">
              <span>Итого</span>
              <span>{total.toLocaleString()} ₽</span>
            </div>
          </div>

          <button
            onClick={() => { onClearCart(); setStep("cart"); }}
            className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-80 transition-opacity"
          >
            Отлично, спасибо!
          </button>
        </div>
      </div>
    );
  }

  // Оформление заказа
  if (step === "checkout") {
    return (
      <div className="pt-20 md:pt-24 pb-32 md:pb-8 animate-fade-in">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setStep("cart")}
              className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground"
            >
              <Icon name="ArrowLeft" size={18} />
            </button>
            <h1 className="text-2xl font-bold">Оформление заказа</h1>
          </div>

          {/* Steps indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground line-through">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <Icon name="Check" size={11} />
              </div>
              Корзина
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-2 text-xs font-semibold">
              <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">2</div>
              Доставка и оплата
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-[10px]">3</div>
              Готово
            </div>
          </div>

          <div className="space-y-5">
            {/* Contact */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="User" size={16} className="text-muted-foreground" />
                Контактные данные
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Имя *</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как вас зовут?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Телефон *</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 999 000-00-00"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Truck" size={16} className="text-muted-foreground" />
                Способ получения
              </h2>
              <div className="space-y-2">
                {DELIVERY_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setDelivery(opt.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${
                      delivery === opt.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-foreground/20"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      delivery === opt.id ? "border-primary" : "border-muted-foreground/40"
                    }`}>
                      {delivery === opt.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <Icon name={opt.icon} size={16} className="text-muted-foreground shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.sub}</p>
                    </div>
                    <span className={`text-sm font-semibold shrink-0 ${opt.price === 0 ? "text-emerald-600" : ""}`}>
                      {opt.price === 0 ? "Бесплатно" : `${opt.price} ₽`}
                    </span>
                  </button>
                ))}
              </div>

              {delivery !== "pickup" && (
                <div className="mt-3">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Адрес доставки *</label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Город, улица, дом, квартира"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="CreditCard" size={16} className="text-muted-foreground" />
                Способ оплаты
              </h2>
              <div className="space-y-2">
                {PAYMENT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPayment(opt.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${
                      payment === opt.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-foreground/20"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      payment === opt.id ? "border-primary" : "border-muted-foreground/40"
                    }`}>
                      {payment === opt.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <span className="text-lg shrink-0">{opt.icon}</span>
                    <p className="text-sm font-medium">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
                Комментарий к заказу
                <span className="text-xs text-muted-foreground font-normal">(необязательно)</span>
              </h2>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Пожелания, удобное время встречи..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            {/* Order summary */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
              <h2 className="font-semibold">Итого</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover bg-secondary shrink-0" />
                  <p className="text-sm flex-1 line-clamp-1">{item.title}</p>
                  <span className="text-sm font-semibold shrink-0">{item.price.toLocaleString()} ₽</span>
                </div>
              ))}
              <div className="h-px bg-border" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Товары</span>
                <span>{subtotal.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Доставка</span>
                <span className={deliveryCost === 0 ? "text-emerald-600 font-medium" : ""}>
                  {deliveryCost === 0 ? "Бесплатно" : `${deliveryCost} ₽`}
                </span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between font-bold text-lg">
                <span>К оплате</span>
                <span>{total.toLocaleString()} ₽</span>
              </div>

              <button
                onClick={() => { if (canSubmit) setStep("success"); }}
                disabled={!canSubmit}
                className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Подтвердить заказ
              </button>
              {!canSubmit && (
                <p className="text-xs text-muted-foreground text-center">Заполните обязательные поля выше</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Корзина
  return (
    <div className="pt-20 md:pt-24 pb-32 md:pb-8 animate-fade-in">
      <div className="max-w-2xl mx-auto px-4">
        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">1</div>
            Корзина
          </div>
          <div className="flex-1 h-px bg-border" />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-[10px]">2</div>
            Доставка и оплата
          </div>
          <div className="flex-1 h-px bg-border" />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-[10px]">3</div>
            Готово
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">Корзина · {cartItems.length}</h1>

        <div className="space-y-3 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 bg-card rounded-2xl border border-border">
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

        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Товары ({cartItems.length})</span>
              <span>{subtotal.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Доставка</span>
              <span className="text-muted-foreground">Выберите на следующем шаге</span>
            </div>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between font-bold text-lg">
            <span>Итого</span>
            <span>{subtotal.toLocaleString()} ₽</span>
          </div>
          <button
            onClick={() => setStep("checkout")}
            className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
          >
            Перейти к оформлению
            <Icon name="ArrowRight" size={18} />
          </button>
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Оплата происходит напрямую продавцу после подтверждения сделки
          </p>
        </div>
      </div>
    </div>
  );
}
