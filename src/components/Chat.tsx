import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, User, Sparkles, ArrowLeft } from "lucide-react";
import Markdown from "react-markdown";

interface ChatProps {
  onBack: () => void;
}

export function Chat({ onBack }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting when opening chat
    if (messages.length === 0) {
      setMessages([
        {
          id: "init",
          role: "assistant",
          content: "Halo! Saya **Sandra**, Asisten SiakEdu. Ada materi kependudukan yang belum kamu pahami? Mari belajar bersama!",
        }
      ]);
    }
  }, [messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menghubungi Sandra.");
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Maaf, sistem Sandra sedang ada gangguan sementara. Coba lagi nanti ya!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] max-w-3xl mx-auto w-full bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white flex items-center gap-4 shadow-md z-10">
         <button onClick={onBack} className="md:hidden p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
         </button>
         <div className="flex items-center gap-3">
           <div className="w-12 h-12 rounded-2xl bg-white/20 flex flex-col items-center justify-center shadow-inner relative">
             <span className="font-display font-bold text-xl">S</span>
             <div className="absolute -bottom-1 -right-1 bg-amber-400 p-1 rounded-full text-white border-2 border-emerald-600">
               <Sparkles className="w-3 h-3 text-white fill-current" />
             </div>
           </div>
           <div>
             <h2 className="font-bold text-lg leading-tight font-display">Tanya Sandra</h2>
             <p className="text-emerald-50 text-xs font-medium">Tutor AI SiakEdu</p>
           </div>
         </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50/50 relative">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" ? (
                <div className="flex gap-3 max-w-[85%] md:max-w-[75%] items-end">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mb-1 z-10">
                     <span className="font-display font-bold text-xs">S</span>
                   </div>
                   <div className="bg-white p-4 rounded-3xl rounded-bl-sm border-2 border-emerald-100 shadow-sm">
                      <div className="markdown-body prose prose-slate prose-sm md:prose-base prose-p:leading-relaxed prose-a:text-emerald-600 prose-strong:font-bold break-words">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="flex gap-3 max-w-[85%] md:max-w-[75%] flex-row-reverse items-end">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex flex-col items-center justify-center flex-shrink-0 mb-1 z-10">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="bg-blue-600 text-white p-4 rounded-3xl rounded-br-sm shadow-sm shadow-blue-200 whitespace-pre-wrap leading-relaxed text-sm md:text-base font-medium">
                    {msg.content}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start max-w-[85%] md:max-w-[75%]"
            >
              <div className="flex gap-3 items-end">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mb-1 z-10">
                   <span className="font-display font-bold text-xs">S</span>
                 </div>
                 <div className="flex gap-4 p-4 bg-white rounded-3xl rounded-bl-sm border-2 border-emerald-100 items-center h-12">
                   <div className="flex gap-1.5 items-center px-1">
                     <motion.div className="w-2 h-2 rounded-full bg-emerald-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                     <motion.div className="w-2 h-2 rounded-full bg-emerald-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                     <motion.div className="w-2 h-2 rounded-full bg-emerald-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                   </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t-2 border-slate-100 z-10 relative">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanya Sandra di sini..."
            disabled={isLoading}
            className="flex-1 bg-slate-100 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-400 font-medium text-slate-700 placeholder-slate-400 disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 top-2 bottom-2 rounded-xl flex items-center justify-center w-12 transition-colors ${
              input.trim() && !isLoading ? 'bg-emerald-500 shadow-md shadow-emerald-200 text-white hover:bg-emerald-600' : 'bg-slate-200 text-slate-400'
            }`}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
          </button>
        </div>
      </form>
    </div>
  );
}
