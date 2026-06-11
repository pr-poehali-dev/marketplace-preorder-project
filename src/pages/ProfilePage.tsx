import Icon from "@/components/ui/icon";

export default function ProfilePage() {
  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-8 animate-fade-in">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Профиль</h1>

        {/* Avatar block */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
              А
            </div>
            <div>
              <p className="text-lg font-bold">Анна Михайлова</p>
              <p className="text-sm text-muted-foreground">@anna_m · Москва</p>
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

        {/* Actions */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          {[
            { icon: "User", label: "Редактировать профиль" },
            { icon: "MapPin", label: "Адрес доставки" },
            { icon: "CreditCard", label: "Способы оплаты" },
            { icon: "Bell", label: "Уведомления" },
          ].map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-secondary transition-colors text-left ${
                i > 0 ? "border-t border-border" : ""
              }`}
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
          {[
            { icon: "ShieldCheck", label: "Безопасность" },
            { icon: "HelpCircle", label: "Помощь и поддержка" },
          ].map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-secondary transition-colors text-left ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
                <Icon name={item.icon} size={18} />
              </div>
              <span className="flex-1 text-sm font-medium">{item.label}</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <button className="w-full flex items-center gap-4 px-5 py-4 bg-card border border-border rounded-2xl hover:bg-destructive/5 hover:border-destructive/30 transition-colors text-destructive">
          <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center">
            <Icon name="LogOut" size={18} />
          </div>
          <span className="text-sm font-medium">Выйти</span>
        </button>
      </div>
    </div>
  );
}
