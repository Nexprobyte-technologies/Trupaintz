import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, Sparkles, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../data/mockData';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  action?: {
    label: string;
    targetPath?: string;
  };
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: `Welcome to TruPaintz & Interiors! I am your architectural finish advisor. How can I assist with your living space or painting requirements today?`,
    time: 'Just now',
  },
];

export const LiveChatConcierge: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let action: ChatMessage['action'] | undefined = undefined;
      const lower = text.toLowerCase();

      if (lower.includes('upvc') || lower.includes('window') || lower.includes('door') || lower.includes('sliding') || lower.includes('eiti') || lower.includes('badyee')) {
        replyText = `Our certified UPVC profiles (EITI 2.5mm & BADYEE 2mm) come with 4mm glass, machine welding, EPDM gaskets, and 15–20 years warranty. Open from ₹440–460/sq.ft, Sliding from ₹340–360/sq.ft.`;
        action = { label: 'View UPVC Catalogue', targetPath: '/services' };
      } else if (lower.includes('paint') || lower.includes('painting') || lower.includes('stucco') || lower.includes('asian') || lower.includes('birla')) {
        replyText = `We specialize in dustless interior & exterior home painting with Asian Paints & Birla Paints. Interior: ₹22 (3-yr), ₹28 (7-yr), ₹32 (10-yr). Exterior: ₹25 (3-yr), ₹32 (7-yr), ₹38 (10-yr).`;
        action = { label: 'Explore Painting Rates', targetPath: '/services' };
      } else if (lower.includes('netlon') || lower.includes('mosquito') || lower.includes('mesh') || lower.includes('saint')) {
        replyText = `We provide Saint-Gobain mosquito nets and Netlon doors: Magnet Type (₹300), Pleated (₹300), Normal Lock (₹250), Velcro (₹45), and Saint-Gobain mesh (₹55–62/sq.ft).`;
        action = { label: 'Explore Mosquito Nets', targetPath: '/services' };
      } else if (lower.includes('floor') || lower.includes('action tesa') || lower.includes('surya') || lower.includes('wooden')) {
        replyText = `We install Action Tesa AC3 (₹140), AC4 (₹150), AC5 (₹160) and Surya AC3 (₹150), AC4 (₹160) with 10–20 years warranty, skirting, and laying.`;
        action = { label: 'View Flooring Details', targetPath: '/services' };
      } else if (lower.includes('visit') || lower.includes('book') || lower.includes('quote') || lower.includes('estimate') || lower.includes('price')) {
        replyText = `You can calculate a transparent estimate across our 10 specialized services or schedule a site inspection with physical swatch verification.`;
        action = { label: 'Go to Cost Estimator', targetPath: '/estimator' };
      } else {
        replyText = `Welcome to TruPaintz & Interiors! We offer 10 specialized architectural services: UPVC Windows, Painting, Curtains, Blinds, Wallpapers, Wooden Flooring, False Ceilings, Mosquito Nets, Louvers, and Artificial Grass.`;
        action = { label: 'View Our Services', targetPath: '/services' };
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleActionClick = (action: ChatMessage['action']) => {
    if (action?.targetPath) {
      setIsOpen(false);
      navigate(action.targetPath);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      
      {/* Floating Toggle Button (Icon Only - text removed as requested) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center justify-center h-14 w-14 rounded-full bg-amber-600 text-white shadow-2xl hover:bg-amber-500 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open Live Design Concierge"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-amber-600" />
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-[380px] max-h-[82vh] h-[480px] rounded-3xl border border-neutral-200 bg-white shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3.5 bg-neutral-900 text-white">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">TruPaintz Design Concierge</h4>
                <p className="text-[10px] text-amber-300">Live Architectural Advisor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF7F2]/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-600 text-white rounded-br-none'
                      : 'bg-white border border-neutral-200 text-neutral-900 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{m.text}</p>

                  {m.action && (
                    <button
                      onClick={() => handleActionClick(m.action)}
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-amber-500 transition-colors cursor-pointer"
                    >
                      <span>{m.action.label}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-neutral-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] ml-1">Advisor typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 border-t border-neutral-100 bg-white flex gap-1.5 overflow-x-auto">
            {[
              'UPVC Windows pricing?',
              'Painting warranty rates',
              'Mosquito Nets & Netlon?',
              'Action Tesa Flooring?',
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap rounded-lg border border-neutral-200 px-2 py-1 text-[10px] text-neutral-600 hover:text-amber-700 hover:border-amber-500 bg-neutral-50 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-neutral-100 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about textures, timeline, finishes..."
              className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="h-8 w-8 rounded-xl bg-amber-600 flex items-center justify-center text-white hover:bg-amber-500 disabled:opacity-40 transition-colors shrink-0 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
