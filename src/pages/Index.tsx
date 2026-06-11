import { useState } from "react";
import { MOCK_PRODUCTS, Product } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import FavoritesPage from "@/pages/FavoritesPage";
import MyItemsPage from "@/pages/MyItemsPage";
import ProfilePage from "@/pages/ProfilePage";
import ChatsPage from "@/pages/ChatsPage";

type Page = "home" | "catalog" | "profile" | "my-items" | "cart" | "favorites" | "chats";

const Index = () => {
  const [page, setPage] = useState<Page>("home");
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cartItems, setCartItems] = useState<Product[]>([MOCK_PRODUCTS[2]]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const favorites = products.filter((p) => p.isFavorite);

  const toggleFavorite = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const addToCart = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product && !cartItems.find((c) => c.id === id)) {
      setCartItems((prev) => [...prev, product]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigate = (p: Page) => {
    setSelectedProductId(null);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedProduct = selectedProductId
    ? products.find((p) => p.id === selectedProductId)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        currentPage={page}
        onNavigate={navigate}
        cartCount={cartItems.length}
        favCount={favorites.length}
        unreadChats={1}
      />

      {selectedProduct ? (
        <ProductPage
          product={selectedProduct}
          onBack={() => setSelectedProductId(null)}
          onToggleFavorite={toggleFavorite}
          onAddToCart={addToCart}
        />
      ) : (
        <>
          {page === "home" && (
            <HomePage
              products={products}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
              onProductClick={handleProductClick}
              onNavigateCatalog={() => navigate("catalog")}
            />
          )}
          {page === "catalog" && (
            <CatalogPage
              products={products}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
              onProductClick={handleProductClick}
            />
          )}
          {page === "cart" && (
            <CartPage
              cartItems={cartItems}
              onRemoveFromCart={removeFromCart}
              onProductClick={handleProductClick}
            />
          )}
          {page === "favorites" && (
            <FavoritesPage
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
              onProductClick={handleProductClick}
            />
          )}
          {page === "my-items" && (
            <MyItemsPage onProductClick={handleProductClick} />
          )}
          {page === "chats" && <ChatsPage />}
          {page === "profile" && <ProfilePage />}
        </>
      )}
    </div>
  );
};

export default Index;
