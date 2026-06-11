import { useState } from "react";
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
    unread: 0,
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
];

interface Message {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
}

const CHAT_MESSAGES: Record<string, Message[]> = {
  "1": [
    { id: "1", from: "me", text: "Добрый день! Ещё актуально?", time: "10:24" },
    { id: "2", from: "them", text: "Да, всё актуально! Готов к осмотру в любое время.", time: "10:31" },
    { id: "3", from: "me", text: "Отлично, можно торговаться?", time: "10:35" },
  ],
  "2": [
    { id: "1", from: "me", text: "Здравствуйте, фотоаппарат ещё у вас?", time: "вчера 14:10" },
    { id: "2", from: "them", text: "Да, есть! Могу скинуть больше фото, если нужно", time: "вчера 14:22" },
  ],
  "3": [
    { id: "1", from: "me", text: "Привет! Размер 42 есть?", time: "пн 11:00" },
    { id: "2", from: "them", text: "Да, 42 есть, новые в коробке", time: "пн 11:05" },
    { id: "3", from: "me", text: "Беру! Когда можно забрать?", time: "пн 11:10" },
    { id: "4", from: "them", text: "Договорились, жду вас в субботу!", time: "пн 11:15" },
  ],
};

export default function ChatsPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(CHAT_MESSAGES);
  const [newMsg, setNewMsg] = useState("");

  const chat = activeChat ? MOCK_CHATS.find((c) => c.id === activeChat) : null;
  const chatMessages = activeChat ? (messages[activeChat] ?? []) : [];

  const send = () => {
    if (!newMsg.trim() || !activeChat) return;
    setMessages((prev) => ({
      ...prev,
      [activeChat]: [
        ...(prev[activeChat] ?? []),
        { id: Date.now().toString(), from: "me", text: newMsg.trim(), time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) },
      ],
    }));
    setNewMsg("");
  };

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-8 animate-fade-in">
      <div className="max-w-2xl mx-auto px-4">

        {!activeChat ? (
          <>
            <h1 className="text-2xl font-bold mb-6">Чаты</h1>

            {MOCK_CHATS.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">💬</p>
                <p className="font-semibold text-lg mb-2">Нет сообщений</p>
                <p className="text-muted-foreground text-sm">Напишите продавцу на странице товара</p>
              </div>
            ) : (
              <div className="space-y-2">
                {MOCK_CHATS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveChat(c.id)}
                    className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:bg-secondary transition-colors text-left"
                  >
                    <div className="relative shrink-0">
                      <img src={c.productImg} alt={c.productTitle} className="w-12 h-12 rounded-xl object-cover bg-secondary" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold border-2 border-background">
                        {c.sellerAvatar}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold truncate">{c.sellerName}</p>
                        <span className="text-xs text-muted-foreground shrink-0">{c.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{c.productTitle}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMessage}</p>
                    </div>
                    {c.unread > 0 && (
                      <span className="w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                        {c.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col h-[calc(100vh-160px)]">
            {/* Chat header */}
            <div className="flex items-center gap-3 pb-4 border-b border-border mb-4">
              <button
                onClick={() => setActiveChat(null)}
                className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
              >
                <Icon name="ArrowLeft" size={18} />
              </button>
              <img src={chat!.productImg} alt="" className="w-10 h-10 rounded-xl object-cover bg-secondary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{chat!.sellerName}</p>
                <p className="text-xs text-muted-foreground truncate">{chat!.productTitle}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
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
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 pt-3 border-t border-border">
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
                className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-80 transition-opacity disabled:opacity-40"
              >
                <Icon name="Send" size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
