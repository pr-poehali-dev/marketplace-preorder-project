import { useState } from "react";
import Icon from "@/components/ui/icon";

type Modal = null | "edit" | "address" | "payment" | "notifications" | "security" | "help" | "logout";

export default function ProfilePage() {
  const [modal, setModal] = useState<Modal>(null);
  const [name, setName] = useState("Анна Михайлова");
  const [username, setUsername] = useState("anna_m");
  const [city, setCity] = useState("Москва");
  const [phone, setPhone] = useState("+7 999 123-45-67");
  const [address, setAddress] = useState("ул. Тверская, 12, кв. 34");
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifOrders, setNotifOrders] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);

  const close = () => setModal(null);

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-8 animate-fade-in">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Профиль</h1>

        {/* Avatar block */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                {name[0]}
              </div>
              <button
                onClick={() => setModal("edit")}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center shadow-md hover:opacity-80 transition-opacity"
              >
                <Icon name="Pencil" size={11} />
              </button>
            </div>
            <div>
              <p className="text-lg font-bold">{name}</p>
              <p className="text-sm text-muted-foreground">@{username} · {city}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1 text-xs">
                  <Icon name="Star" size={12} className="text-amber-400 fill-amber-400" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-muted-foreground">рейтинг</span>
                </div>
                <span className="text-border">·</span>
                <span className="text-xs text-muted-foreground">47 сделок</span>
                <span className="text-border">·</span>
                <span className="text-xs text-muted-foreground">С 2023 года</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main actions */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          {([
            { icon: "User", label: "Редактировать профиль", id: "edit" },
            { icon: "MapPin", label: "Адрес доставки", id: "address" },
            { icon: "CreditCard", label: "Способы оплаты", id: "payment" },
            { icon: "Bell", label: "Уведомления", id: "notifications" },
          ] as { icon: string; label: string; id: Modal }[]).map((item, i) => (
            <button
              key={item.label}
              onClick={() => setModal(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-secondary transition-colors text-left ${i > 0 ? "border-t border-border" : ""}`}
            >
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
                <Icon name={item.icon} size={18} />
              </div>
              <span className="flex-1 text-sm font-medium">{item.label}</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          {([
            { icon: "ShieldCheck", label: "Безопасность", id: "security" },
            { icon: "HelpCircle", label: "Помощь и поддержка", id: "help" },
          ] as { icon: string; label: string; id: Modal }[]).map((item, i) => (
            <button
              key={item.label}
              onClick={() => setModal(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-secondary transition-colors text-left ${i > 0 ? "border-t border-border" : ""}`}
            >
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
                <Icon name={item.icon} size={18} />
              </div>
              <span className="flex-1 text-sm font-medium">{item.label}</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <button
          onClick={() => setModal("logout")}
          className="w-full flex items-center gap-4 px-5 py-4 bg-card border border-border rounded-2xl hover:bg-destructive/5 hover:border-destructive/30 transition-colors text-destructive"
        >
          <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center">
            <Icon name="LogOut" size={18} />
          </div>
          <span className="text-sm font-medium">Выйти</span>
        </button>
      </div>

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={close}>
          <div className="w-full max-w-md bg-background rounded-2xl border border-border shadow-2xl animate-slide-up" onClick={(e) => e.stopPropagation()}>

            {/* EDIT PROFILE */}
            {modal === "edit" && (
              <>
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <h3 className="font-bold text-lg">Редактировать профиль</h3>
                  <button onClick={close} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"><Icon name="X" size={18} /></button>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Имя</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Никнейм</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                      <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Город</label>
                    <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Телефон</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <button onClick={close} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-80 transition-opacity">Сохранить</button>
                </div>
              </>
            )}

            {/* ADDRESS */}
            {modal === "address" && (
              <>
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <h3 className="font-bold text-lg">Адрес доставки</h3>
                  <button onClick={close} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"><Icon name="X" size={18} /></button>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Город</label>
                    <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Адрес</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div className="p-3.5 rounded-xl bg-secondary border border-border flex items-center gap-3">
                    <Icon name="MapPin" size={16} className="text-accent shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">Адрес используется для самовывоза и встреч с покупателями</p>
                  </div>
                  <button onClick={close} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-80 transition-opacity">Сохранить</button>
                </div>
              </>
            )}

            {/* PAYMENT */}
            {modal === "payment" && (
              <>
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <h3 className="font-bold text-lg">Способы оплаты</h3>
                  <button onClick={close} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"><Icon name="X" size={18} /></button>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { icon: "💳", label: "Visa •••• 4821", sub: "Основная карта" },
                    { icon: "📱", label: "СБП", sub: "Быстрые платежи" },
                    { icon: "💰", label: "Наличные при встрече", sub: "Для личных сделок" },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-secondary">
                      <span className="text-xl">{m.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{m.label}</p>
                        <p className="text-xs text-muted-foreground">{m.sub}</p>
                      </div>
                      <Icon name="Check" size={16} className="text-emerald-500" />
                    </div>
                  ))}
                  <button className="w-full py-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-foreground transition-colors flex items-center justify-center gap-2">
                    <Icon name="Plus" size={16} />
                    Добавить карту
                  </button>
                  <button onClick={close} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-80 transition-opacity">Готово</button>
                </div>
              </>
            )}

            {/* NOTIFICATIONS */}
            {modal === "notifications" && (
              <>
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <h3 className="font-bold text-lg">Уведомления</h3>
                  <button onClick={close} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"><Icon name="X" size={18} /></button>
                </div>
                <div className="p-5 space-y-1">
                  {[
                    { label: "Сообщения", sub: "Новые сообщения от покупателей и продавцов", value: notifMessages, set: setNotifMessages },
                    { label: "Заказы и сделки", sub: "Статус ваших заказов и предложений", value: notifOrders, set: setNotifOrders },
                    { label: "Акции и скидки", sub: "Специальные предложения и новинки", value: notifPromo, set: setNotifPromo },
                  ].map((n, i) => (
                    <div key={n.label} className={`flex items-center gap-4 py-4 ${i > 0 ? "border-t border-border" : ""}`}>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{n.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.sub}</p>
                      </div>
                      <button
                        onClick={() => n.set(!n.value)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${n.value ? "bg-primary" : "bg-border"}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${n.value ? "translate-x-5" : "translate-x-0.5"}`} />
                      </button>
                    </div>
                  ))}
                  <div className="pt-2">
                    <button onClick={close} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-80 transition-opacity">Сохранить</button>
                  </div>
                </div>
              </>
            )}

            {/* SECURITY */}
            {modal === "security" && (
              <>
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <h3 className="font-bold text-lg">Безопасность</h3>
                  <button onClick={close} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"><Icon name="X" size={18} /></button>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { icon: "Lock", label: "Изменить пароль", sub: "Последнее изменение 3 месяца назад" },
                    { icon: "Smartphone", label: "Двухфакторная аутентификация", sub: "Не подключена" },
                    { icon: "Eye", label: "Активные сессии", sub: "1 устройство" },
                  ].map((s, i) => (
                    <button key={s.label} className={`w-full flex items-center gap-3 p-4 rounded-xl border border-border bg-secondary hover:bg-border/50 transition-colors text-left`}>
                      <div className="w-9 h-9 rounded-xl bg-background flex items-center justify-center text-muted-foreground shrink-0">
                        <Icon name={s.icon} size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{s.label}</p>
                        <p className="text-xs text-muted-foreground">{s.sub}</p>
                      </div>
                      <Icon name="ChevronRight" size={15} className="text-muted-foreground shrink-0" />
                    </button>
                  ))}
                  <button onClick={close} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-80 transition-opacity mt-2">Закрыть</button>
                </div>
              </>
            )}

            {/* HELP */}
            {modal === "help" && (
              <>
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <h3 className="font-bold text-lg">Помощь и поддержка</h3>
                  <button onClick={close} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"><Icon name="X" size={18} /></button>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { emoji: "💬", label: "Написать в поддержку", sub: "Ответим в течение часа" },
                    { emoji: "📖", label: "Как продавать", sub: "Инструкция для продавцов" },
                    { emoji: "🛡️", label: "Правила площадки", sub: "Условия использования" },
                    { emoji: "❓", label: "Частые вопросы", sub: "FAQ по платформе" },
                  ].map((h) => (
                    <button key={h.label} className="w-full flex items-center gap-3 p-4 rounded-xl border border-border bg-secondary hover:bg-border/50 transition-colors text-left">
                      <span className="text-xl shrink-0">{h.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{h.label}</p>
                        <p className="text-xs text-muted-foreground">{h.sub}</p>
                      </div>
                      <Icon name="ChevronRight" size={15} className="text-muted-foreground shrink-0" />
                    </button>
                  ))}
                  <button onClick={close} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-80 transition-opacity">Закрыть</button>
                </div>
              </>
            )}

            {/* LOGOUT */}
            {modal === "logout" && (
              <>
                <div className="p-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                    <Icon name="LogOut" size={24} className="text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Выйти из аккаунта?</h3>
                    <p className="text-sm text-muted-foreground mt-1">Вы сможете войти снова в любое время</p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={close} className="flex-1 py-3 rounded-xl border border-border font-semibold text-sm hover:bg-secondary transition-colors">Отмена</button>
                    <button onClick={close} className="flex-1 py-3 rounded-xl bg-destructive text-white font-semibold text-sm hover:opacity-80 transition-opacity">Выйти</button>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
