import Icon from "@/components/ui/icon";

type Page = "home" | "catalog" | "profile" | "my-items" | "cart" | "favorites" | "chats";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
  favCount: number;
  unreadChats?: number;
}

export default function Navbar({ currentPage, onNavigate, cartCount, favCount, unreadChats = 1 }: NavbarProps) {
  // Mobile bottom nav — 5 главных вкладок
  const mobileNav: { id: Page; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "catalog", label: "Каталог", icon: "LayoutGrid" },
    { id: "chats", label: "Чаты", icon: "MessageCircle" },
    { id: "my-items", label: "Объявления", icon: "Package" },
    { id: "profile", label: "Профиль", icon: "User" },
  ];

  const badges: Partial<Record<Page, number>> = {
    cart: cartCount,
    favorites: favCount,
    chats: unreadChats,
  };

  return (
    <>
      {/* Desktop top nav */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto w-full px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => onNavigate("home")}
            className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            вещи
          </button>

          {/* Center nav */}
          <nav className="flex items-center gap-1">
            {(["home", "catalog", "chats", "my-items"] as Page[]).map((id) => {
              const labels: Record<string, string> = { home: "Главная", catalog: "Каталог", chats: "Чаты", "my-items": "Мои объявления" };
              return (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentPage === id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {labels[id]}
                  {badges[id] ? (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {badges[id]}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onNavigate("favorites")}
              className={`relative p-2.5 rounded-lg transition-all ${
                currentPage === "favorites" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name="Heart" size={20} />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate("cart")}
              className={`relative p-2.5 rounded-lg transition-all ${
                currentPage === "cart" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name="ShoppingBag" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate("profile")}
              className={`p-2.5 rounded-lg transition-all ${
                currentPage === "profile" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name="User" size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 h-14 flex items-center justify-between">
          <button onClick={() => onNavigate("home")} className="text-lg font-bold tracking-tight">
            вещи
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onNavigate("favorites")}
              className={`relative p-2 rounded-lg ${currentPage === "favorites" ? "text-accent" : "text-muted-foreground"}`}
            >
              <Icon name="Heart" size={22} />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate("cart")}
              className={`relative p-2 rounded-lg ${currentPage === "cart" ? "text-accent" : "text-muted-foreground"}`}
            >
              <Icon name="ShoppingBag" size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
        <div className="flex">
          {mobileNav.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-all ${
                currentPage === item.id ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <Icon name={item.icon} size={22} />
                {badges[item.id] ? (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {badges[item.id]}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
