import React, { useState, useEffect, useRef } from "react";
import { Sparkles, X, Send, Bot, User, HelpCircle, Archive, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { PRODUCTS_DATA } from "../data";

interface AICraftAssistantProps {
  onSuggestProduct: (product: Product) => void;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  suggestedProduct?: Product;
}

export default function AICraftAssistant({ onSuggestProduct }: AICraftAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "bot-init-1",
      sender: "bot",
      text: "Namaste! I am your AI Heritage & Craft Guide. I can share the historical provenance behind each masterpiece or recommend specific ancient art forms for your living spaces. What are you inspired to discover today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const presetPrompts = [
    { label: "Madhubani pigments?", query: "How are Madhubani paint pigments sourced?" },
    { label: "Lost-wax bronze?", query: "What is Bastar lost-wax Dhokra casting?" },
    { label: "Gift under ₹5000?", query: "Recommend a high-quality gift under ₹5,000" },
    { label: "Blue Jaipur pottery", query: "Can you tell me about Blue Pottery?" }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate educational response
    setTimeout(() => {
      let responseText = "";
      let suggestion: Product | undefined = undefined;

      const cleanQuery = text.toLowerCase();

      if (cleanQuery.includes("madhubani") || cleanQuery.includes("pigment") || cleanQuery.includes("paint")) {
        responseText = "Traditionally, Mithila women extracted Madhubani paint pigments directly from nature: soot from kerosene lamps created rich carbon blacks, turmeric juice yielded marigold yellows, ground red clay offered terracotta reds, and pounded sesbania leaves created deep greens. All bound with sap from the Babul acacia tree for permanent adhesion.";
        suggestion = PRODUCTS_DATA.find((p) => p.id === "madhubani-peacock");
      } else if (cleanQuery.includes("lost-wax") || cleanQuery.includes("dhokra") || cleanQuery.includes("metal") || cleanQuery.includes("bronze")) {
        responseText = "Dhokra uses the ancient 'lost-wax' (cire perdue) casting technique dating back to Mohenjo-daro. Every sculpture is entirely unique: a clay core is sculpted, wrapped in hand-drawn wax wires, and covered in more clay. When molten metal (brass and bronze scrap alloys) is poured inside, the wax melts away ('lost') and the beautiful hollow bronze art replaces it.";
        suggestion = PRODUCTS_DATA.find((p) => p.id === "dhokra-musician") || PRODUCTS_DATA.find((p) => p.id === "dhokra-figure");
      } else if (cleanQuery.includes("gift") || cleanQuery.includes("5000") || cleanQuery.includes("under")) {
        responseText = "For an extraordinary gift under ₹5,000, I highly suggest the hand-carved 'Brass Inlay Walnut Box' from Saharanpur (₹4,250) or the gorgeous 'Indigo Ikat Cotton Throw' from Pochampally (₹4,250). Both represent pristine utility crafts of ancient lineages.";
        suggestion = PRODUCTS_DATA.find((p) => p.id === "brass-inlay-box");
      } else if (cleanQuery.includes("blue") || cleanQuery.includes("pottery") || cleanQuery.includes("jaipur")) {
        responseText = "Jaipur Blue Pottery is fundamentally unique because it is the only pottery form in the world that does not use clay! Instead, the master craftsman grinds quartz powder, glass frit, organic volcanic gum, and Multani mitti (Fuller's earth) into an translucent paste. Glazed with cobalt oxide (blue) and copper oxide (turquoise) prior to firing at mild temperatures.";
        suggestion = PRODUCTS_DATA.find((p) => p.id === "blue-pottery-vase");
      } else {
        responseText = "Indian crafts carry ancient timelines of continuous visual narrative. From Kashmir's fine Pashmina cashmere weaving to the deep terracotta tiles fired in West Bengal, each purchase supports fair-wages for our master weavers and clay-potters.";
        // pick random product
        suggestion = PRODUCTS_DATA[Math.floor(Math.random() * PRODUCTS_DATA.length)];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: responseText,
        timestamp: new Date(),
        suggestedProduct: suggestion
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1250);
  };

  return (
    <>
      {/* Immersive Floating Action Starry button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-5 md:right-10 w-14 h-14 bg-primary text-white hover:bg-primary-container rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-all duration-300 cursor-pointer z-[80] group"
        title="Open AI Craft Expert"
      >
        <Sparkles className="w-6 h-6 animate-pulse group-hover:rotate-12 transition-transform duration-300" />
      </button>

      {/* Slide in chatbot overlay panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-[120] cursor-pointer"
            />

            {/* Chat Drawer */}
            <motion.aside
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              className="fixed bottom-6 right-4 md:right-10 top-20 md:top-auto md:h-[580px] w-[calc(100%-2rem)] md:w-96 bg-background rounded-l-2xl rounded-r-2xl border border-outline-variant/30 shadow-2xl z-[130] flex flex-col overflow-hidden font-sans"
            >
              {/* Header */}
              <div className="bg-primary text-white p-4 flex justify-between items-center select-none shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-300 fill-current" />
                  <div>
                    <h4 className="font-serif italic font-medium">AI Craft Expert</h4>
                    <p className="text-[10px] text-white/80 font-sans tracking-wider uppercase">Authentic Provenance Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white/10 hover:bg-white/25 hover:scale-105 active:scale-95 p-1 rounded-full transition-all cursor-pointer"
                  title="Close AI helper"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Message scroll container */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#faf7f3] dark:bg-zinc-950/20">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
                        msg.sender === "user" ? "bg-secondary" : "bg-primary"
                      }`}
                    >
                      {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className="space-y-2">
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-secondary text-white rounded-tr-none"
                            : "bg-white dark:bg-zinc-900 text-on-surface border border-outline-variant/20 rounded-tl-none shadow-sm"
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Display suggested product card in-line */}
                      {msg.suggestedProduct && (
                        <div className="bg-white dark:bg-zinc-900 border border-primary/20 rounded-xl p-3 shadow-md max-w-sm animate-fadeIn flex flex-col gap-2">
                          <div className="flex gap-3">
                            <img
                              className="w-12 h-12 object-cover rounded-md border border-outline-variant/20 shrink-0"
                              src={msg.suggestedProduct.img}
                              alt={msg.suggestedProduct.title}
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <h5 className="font-serif font-bold text-[11px] text-primary truncate">
                                {msg.suggestedProduct.title}
                              </h5>
                              <p className="text-[9px] text-on-surface-variant">Origin: {msg.suggestedProduct.region}</p>
                              <p className="text-xs font-bold text-on-surface mt-0.5">
                                ₹{msg.suggestedProduct.price.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              onSuggestProduct(msg.suggestedProduct!);
                              setIsOpen(false);
                            }}
                            className="bg-primary/5 hover:bg-primary hover:text-white text-primary text-[10px] py-1.5 rounded-lg transition-colors font-semibold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Inspect Art Masterpiece</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2 mr-auto max-w-[80%] items-center text-xs text-on-surface-variant">
                    <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">
                      <Bot className="w-4 h-4 animate-bounce" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl animate-pulse border border-outline-variant/30 font-semibold shadow-sm">
                      Consulting ancient scrolls...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Preset helpful prompt chips */}
              <div className="p-3 bg-surface border-t border-outline-variant/20 select-none flex overflow-x-auto gap-2 hide-scrollbar shrink-0">
                {presetPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(p.query)}
                    className="flex-shrink-0 bg-surface-container hover:bg-primary hover:text-white border border-outline-variant/40 px-3 py-1.5 rounded-full text-[10px] text-primary transition-all font-semibold cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Input Footer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputText.trim()) {
                    handleSendMessage(inputText);
                  }
                }}
                className="p-3 bg-white dark:bg-zinc-950 border-t border-outline-variant/20 flex gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputText}
                  placeholder="Ask about block printing, dyes, or prices..."
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-grow bg-background border border-outline-variant/30 rounded-xl px-3 outline-none text-xs md:text-sm"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-container text-white p-2.5 rounded-xl cursor-pointer transition-colors shrink-0"
                  title="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
