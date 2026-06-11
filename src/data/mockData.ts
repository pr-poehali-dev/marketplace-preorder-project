export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  category: string;
  condition: "новое" | "отличное" | "хорошее" | "б/у";
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    deals: number;
  };
  images: string[];
  description: string;
  location: string;
  createdAt: string;
  isFavorite?: boolean;
  size?: string;
  brand?: string;
}

export const CATEGORIES = [
  { id: "all", label: "Все" },
  { id: "clothes", label: "Одежда" },
  { id: "shoes", label: "Обувь" },
  { id: "electronics", label: "Электроника" },
  { id: "accessories", label: "Аксессуары" },
  { id: "sport", label: "Спорт" },
  { id: "home", label: "Дом" },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Кожаная куртка винтаж",
    price: 4500,
    oldPrice: 7000,
    category: "clothes",
    condition: "отличное",
    seller: { id: "u1", name: "Анна М.", avatar: "А", rating: 4.9, deals: 47 },
    images: ["https://cdn.poehali.dev/projects/0006a429-c51a-4ddc-9177-799512cac0ac/files/220673f9-ee01-4ba7-af8c-9c2d06e0b879.jpg"],
    description: "Классическая кожаная куртка в отличном состоянии. Носила пару сезонов, хранилась аккуратно. Натуральная кожа, без дефектов.",
    location: "Москва",
    createdAt: "2 дня назад",
    size: "M",
    brand: "Reserved",
    isFavorite: false,
  },
  {
    id: "2",
    title: "Плёночный фотоаппарат Canon",
    price: 3200,
    category: "electronics",
    condition: "хорошее",
    seller: { id: "u2", name: "Илья В.", avatar: "И", rating: 4.7, deals: 23 },
    images: ["https://cdn.poehali.dev/projects/0006a429-c51a-4ddc-9177-799512cac0ac/files/2e9d9fe3-dec9-4949-8df7-830717150c07.jpg"],
    description: "Canon AE-1 Program, рабочий. Есть небольшие потёртости на корпусе, механика в порядке. Батарейка новая.",
    location: "Санкт-Петербург",
    createdAt: "5 дней назад",
    brand: "Canon",
    isFavorite: true,
  },
  {
    id: "3",
    title: "Кроссовки Nike Air Force",
    price: 5800,
    oldPrice: 9500,
    category: "shoes",
    condition: "новое",
    seller: { id: "u3", name: "Дима С.", avatar: "Д", rating: 5.0, deals: 112 },
    images: ["https://cdn.poehali.dev/projects/0006a429-c51a-4ddc-9177-799512cac0ac/files/b42e34a4-8fec-4daf-b432-1c718c3adbed.jpg"],
    description: "Новые кроссовки, не подошёл размер. Коробка сохранена, все бирки на месте.",
    location: "Москва",
    createdAt: "1 день назад",
    size: "42",
    brand: "Nike",
    isFavorite: false,
  },
  {
    id: "4",
    title: "Шерстяной свитер оверсайз",
    price: 1800,
    category: "clothes",
    condition: "хорошее",
    seller: { id: "u1", name: "Анна М.", avatar: "А", rating: 4.9, deals: 47 },
    images: ["https://cdn.poehali.dev/projects/0006a429-c51a-4ddc-9177-799512cac0ac/files/220673f9-ee01-4ba7-af8c-9c2d06e0b879.jpg"],
    description: "Мягкий шерстяной свитер оверсайз, уютный и тёплый. Цвет — кремовый.",
    location: "Екатеринбург",
    createdAt: "неделю назад",
    size: "L",
    brand: "Zara",
    isFavorite: false,
  },
  {
    id: "5",
    title: "Наушники Sony WH-1000XM4",
    price: 12000,
    oldPrice: 25000,
    category: "electronics",
    condition: "отличное",
    seller: { id: "u4", name: "Мария Л.", avatar: "М", rating: 4.8, deals: 31 },
    images: ["https://cdn.poehali.dev/projects/0006a429-c51a-4ddc-9177-799512cac0ac/files/2e9d9fe3-dec9-4949-8df7-830717150c07.jpg"],
    description: "Топовые наушники с шумоподавлением. Полный комплект, чехол, кабели. Год использования.",
    location: "Казань",
    createdAt: "3 дня назад",
    brand: "Sony",
    isFavorite: false,
  },
  {
    id: "6",
    title: "Рюкзак кожаный коричневый",
    price: 6500,
    category: "accessories",
    condition: "отличное",
    seller: { id: "u5", name: "Петр К.", avatar: "П", rating: 4.6, deals: 18 },
    images: ["https://cdn.poehali.dev/projects/0006a429-c51a-4ddc-9177-799512cac0ac/files/220673f9-ee01-4ba7-af8c-9c2d06e0b879.jpg"],
    description: "Стильный кожаный рюкзак. Вмещает 15\" ноутбук, много отделений.",
    location: "Новосибирск",
    createdAt: "4 дня назад",
    brand: "Uniqlo",
    isFavorite: true,
  },
];

export const CART_ITEMS = [MOCK_PRODUCTS[0], MOCK_PRODUCTS[2]];

export interface Message {
  id: string;
  from: "buyer" | "seller";
  text: string;
  time: string;
}

export const MOCK_MESSAGES: Message[] = [
  { id: "1", from: "buyer", text: "Добрый день! Ещё актуально?", time: "10:24" },
  { id: "2", from: "seller", text: "Да, всё актуально! Готов к осмотру в любое время.", time: "10:31" },
  { id: "3", from: "buyer", text: "Отлично, можно торговаться?", time: "10:35" },
];
