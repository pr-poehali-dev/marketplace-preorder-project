import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { MOCK_PRODUCTS } from "@/data/mockData";

interface Chat {
  id: string;
  productImg: string;
  productTitle: string;
  sellerName: string;
  sellerAvatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const MOCK_CHATS: Chat[] = [
  {
    id: "1",
    productImg: MOCK_PRODUCTS[0].images[0],
    productTitle: "Кожаная куртка винтаж",
    sellerName: "Анна М.",
    sellerAvatar: "А",
    lastMessage: "Да, всё актуально! Готов к осмотру в любое время.",
    time: "10:31",
    unread: 1,
  },
  {
    id: "2",
    productImg: MOCK_PRODUCTS[1].images[0],
    productTitle: "Плёночный фотоаппарат Canon",
    sellerName: "Илья В.",
    sellerAvatar: "И",
    lastMessage: "Могу скинуть больше фото, если нужно",
    time: "вчера",
    unread: 2,
  },
  {
    id: "3",
    productImg: MOCK_PRODUCTS[2].images[0],
    productTitle: "Кроссовки Nike Air Force",
    sellerName: "Дима С.",
    sellerAvatar: "Д",
    lastMessage: "Договорились, жду вас в субботу!",
    time: "пн",
    unread: 0,
  },
  {
    id: "4",
    productImg: MOCK_PRODUCTS[4].images[0],
    productTitle: "Наушники Sony WH-1000XM4",
    sellerName: "Мария Л.",
    sellerAvatar: "М",
    lastMessage: "Цена окончательная, торг неуместен 😊",
    time: "вс",
    unread: 0,
  },
  {
    id: "5",
    productImg: MOCK_PRODUCTS[5].images[0],
    productTitle: "Рюкзак кожаный коричневый",
    sellerName: "Петр К.",
    sellerAvatar: "П",
    lastMessage: "Отправлю фото завтра",
    time: "сб",
    unread: 0,
  },
];

interface Message {
  id: string;
  from: "me" | "them";
  text?: string;
  image?: string;
  time: string;
}

const CHAT_MESSAGES: Record<string, Message[]> = {
  "1": [
    { id: "1", from: "me", text: "Добрый день! Ещё актуально?", time: "10:24" },
    { id: "2", from: "them", text: "Да, всё актуально! Готов к осмотру в любое время.", time: "10:31" },
    { id: "3", from: "me", text: "Отлично, можно торговаться?", time: "10:35" },
    { id: "4", from: "them", text: "Немного можно, напишите сколько предлагаете", time: "10:38" },
  ],
  "2": [
    { id: "1", from: "me", text: "Здравствуйте, фотоаппарат ещё у вас?", time: "вчера 14:10" },
    { id: "2", from: "them", text: "Да, есть! Могу скинуть больше фото, если нужно", time: "вчера 14:22" },
    { id: "3", from: "me", text: "Пожалуйста пришлите", time: "вчера 14:25" },
    { id: "4", from: "them", image: MOCK_PRODUCTS[1].images[0], time: "вчера 14:30" },
    { id: "5", from: "them", text: "Вот, состояние хорошее как видите", time: "вчера 14:30" },
  ],
  "3": [
    { id: "1", from: "me", text: "Привет! Размер 42 есть?", time: "пн 11:00" },
    { id: "2", from: "them", text: "Да, 42 есть, новые в коробке", time: "пн 11:05" },
    { id: "3", from: "me", text: "Беру! Когда можно забрать?", time: "пн 11:10" },
    { id: "4", from: "them", text: "Договорились, жду вас в субботу!", time: "пн 11:15" },
  ],
  "4": [
    { id: "1", from: "me", text: "Здравствуйте! Наушники ещё в продаже?", time: "вс 16:00" },
    { id: "2", from: "them", text: "Да, в отличном состоянии. Год использования.", time: "вс 16:10" },
    { id: "3", from: "me", text: "А 11 000 не отдадите?", time: "вс 16:12" },
    { id: "4", from: "them", text: "Цена окончательная, торг неуместен 😊", time: "вс 16:20" },
  ],
  "5": [
    { id: "1", from: "me", text: "Добрый день! Рюкзак ещё актуален?", time: "сб 09:00" },
    { id: "2", from: "them", text: "Да! Натуральная кожа, очень качественный", time: "сб 09:15" },
    { id: "3", from: "me", text: "Можете показать фото изнутри?", time: "сб 09:20" },
    { id: "4", from: "them", text: "Отправлю фото завтра", time: "сб 09:25" },
  ],
};

export default function ChatsPage() {
  const [chats, setChats] = useState<Chat[]>(MOCK_CHATS);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(CHAT_MESSAGES);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const chat = activeChat ? chats.find((c) => c.id === activeChat) : null;
  const chatMessages = activeChat ? (messages[activeChat] ?? []) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const now = () => new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });

  const send = () => {
    if (!newMsg.trim() || !activeChat) return;
    const t = now();
    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] ?? []), { id: Date.now().toString(), from: "me", text: newMsg.trim(), time: t }],
    }));
    setChats((prev) => prev.map((c) => c.id === activeChat ? { ...c, lastMessage: newMsg.trim(), time: t, unread: 0 } : c));
    setNewMsg("");

    // Автоответ для демо
    const replies: Record<string, string[]> = {
      "1": ["Хорошо, подумаю!", "Договорились, когда вам удобно встретиться?", "Отлично! Жду вас 👍"],
      "2": ["Конечно, сейчас пришлю", "Хорошо, напишите если надумаете", "Спасибо за интерес!"],
      "3": ["Окей!", "Буду ждать", "Хорошо, до встречи 👋"],
      "4": ["Понял вас", "Всё верно", "Ждём!"],
      "5": ["Хорошо!", "Завтра пришлю обязательно", "Спасибо за ожидание"],
    };
    const pool = replies[activeChat] ?? ["Хорошо!", "Окей, понял"];
    const reply = pool[Math.floor(Math.random() * pool.length)];
    setTimeout(() => {
      const rt = now();
      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] ?? []), { id: (Date.now() + 1).toString(), from: "them", text: reply, time: rt }],
      }));
    }, 1200);
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeChat) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const t = now();
      const src = ev.target?.result as string;
      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] ?? []), { id: Date.now().toString(), from: "me", image: src, time: t }],
      }));
      setChats((prev) => prev.map((c) => c.id === activeChat ? { ...c, lastMessage: "📷 Фото", time: t } : c));
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const openChat = (id: string) => {
    setActiveChat(id);
    setChats((prev) => prev.map((c) => c.id === id ? { ...c, unread: 0 } : c));
  };

  const totalUnread = chats.reduce((s, c) => s + c.unread, 0);

  return (
    <div className="pt-16 md:pt-20 pb-16 md:pb-0 h-screen flex flex-col animate-fade-in">

      {!activeChat ? (
        /* ── Список чатов ── */
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 pt-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Чаты</h1>
              {totalUnread > 0 && (
                <span className="px-2.5 py-1 bg-accent text-white text-xs font-bold rounded-full">
                  {totalUnread} новых
                </span>
              )}
            </div>

            <div className="space-y-2 pb-4">
              {chats.map((c) => (
                <button
                  key={c.id}
                  onClick={() => openChat(c.id)}
                  className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:bg-secondary transition-colors text-left"
                >
                  <div className="relative shrink-0">
                    <img src={c.productImg} alt="" className="w-14 h-14 rounded-xl object-cover bg-secondary" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold border-2 border-background">
                      {c.sellerAvatar}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-sm font-bold truncate">{c.sellerName}</p>
                      <span className="text-xs text-muted-foreground shrink-0">{c.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{c.productTitle}</p>
                    <p className={`text-xs truncate mt-0.5 ${c.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {c.lastMessage}
                    </p>
                  </div>
                  {c.unread > 0 && (
                    <span className="w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                      {c.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── Открытый чат ── */
        <div className="flex-1 flex flex-col min-h-0 max-w-2xl w-full mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-3 py-3 border-b border-border shrink-0">
            <button
              onClick={() => setActiveChat(null)}
              className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
            >
              <Icon name="ArrowLeft" size={18} />
            </button>
            <img src={chat!.productImg} alt="" className="w-10 h-10 rounded-xl object-cover bg-secondary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-tight">{chat!.sellerName}</p>
              <p className="text-xs text-muted-foreground truncate">{chat!.productTitle}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="онлайн" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-2">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                {msg.image ? (
                  <div className={`max-w-[70%] rounded-2xl overflow-hidden ${msg.from === "me" ? "rounded-br-sm" : "rounded-bl-sm"}`}>
                    <img src={msg.image} alt="фото" className="w-full object-cover max-h-64" />
                    <div className={`px-2 py-1 text-[10px] ${msg.from === "me" ? "bg-primary text-primary-foreground/60 text-right" : "bg-secondary text-muted-foreground"}`}>
                      {msg.time}
                    </div>
                  </div>
                ) : (
                  <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "me"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm"
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-primary-foreground/60 text-right" : "text-muted-foreground"}`}>
                      {msg.time}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 pb-2 pt-2 border-t border-border flex gap-2 items-end">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhoto}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl border border-border hover:bg-secondary transition-colors text-muted-foreground shrink-0"
            >
              <Icon name="ImagePlus" size={20} />
            </button>
            <input
              type="text"
              placeholder="Напишите сообщение..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={send}
              disabled={!newMsg.trim()}
              className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-80 transition-opacity disabled:opacity-40 shrink-0"
            >
              <Icon name="Send" size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
