import Icon from "@/components/ui/icon";

type Page = "home" | "catalog" | "profile" | "my-items" | "cart" | "favorites";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
  favCount: number;
}

export default function Navbar({ currentPage, onNavigate, cartCount, favCount }: NavbarProps) {
  const navItems: { id: Page; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "catalog", label: "Каталог", icon: "LayoutGrid" },
    { id: "favorites", label: "Избранное", icon: "Heart" },
    { id: "cart", label: "Корзина", icon: "ShoppingBag" },
    { id: "profile", label: "Профиль", icon: "User" },
  ];

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

          <nav className="flex items-center gap-1">
            {navItems.slice(0, 3).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
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
              onClick={() => onNavigate("my-items")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === "my-items"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              Мои товары
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
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-all ${
                currentPage === item.id ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <Icon name={item.icon} size={22} />
                {item.id === "cart" && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                {item.id === "favorites" && favCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {favCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
