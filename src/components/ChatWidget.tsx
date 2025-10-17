import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "What is BizHealth.ai?",
  "Tell me about your ecosystem hubs",
  "How does business health analysis work?",
  "What services do you offer?",
  "How do I get started?",
  "Contact support"
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Hi there! 👋 Welcome to BizHealth.ai - Your Business Health Coach. I'm here to help you stop guessing and start growing. What can I help you with today?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    setShowSuggestions(false);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call edge function directly via fetch for reliability
      const FUNCTION_URL = 'https://lnthvnzounlxjedsbkgc.supabase.co/functions/v1/bizhealth-chat';
      const PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxudGh2bnpvdW5seGplZHNia2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMTQyMzMsImV4cCI6MjA3Mzg5MDIzM30.qxcL_cxGzYNo_z68OGfGrmHMn7VGeaBEFcHiX4SeSXg';

      const resp = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!resp.ok) {
        if (resp.status === 429) {
          toast.error('Too many requests. Please try again in a moment.');
        } else if (resp.status === 402) {
          toast.error('Service temporarily unavailable. Please try again later.');
        }
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || `Request failed with status ${resp.status}`);
      }

      const data = await resp.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please email us at support@bizhealth.ai or visit our Contact page for assistance.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-[60px] w-[60px] rounded-full shadow-elegant text-white p-0 bg-gradient-to-br from-biz-navy to-biz-green animate-gradient bg-[length:200%_200%] hover:shadow-xl transition-shadow"
        aria-label="Open chat"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
    );
  }

  return (
    <div 
      className="fixed bottom-6 right-6 top-[140px] w-[380px] max-h-[calc(100vh-164px)] h-auto bg-white rounded-xl shadow-2xl flex flex-col z-40 md:w-[380px] sm:w-full sm:h-screen sm:top-0 sm:bottom-0 sm:right-0 sm:rounded-none"
      role="region"
      aria-label="Chat widget"
    >
      {/* Header */}
      <div className="bg-[#212653] text-white p-4 rounded-t-xl flex items-center justify-between sm:rounded-none">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#969423] rounded-full flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-['Montserrat'] font-semibold text-sm">BizHealth.ai</h3>
            <p className="text-xs text-white/80 font-['Open_Sans']">Stop Guessing, Start Growing</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/10"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4" role="log" aria-live="polite" aria-atomic="false">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex gap-2 max-w-[80%]">
                {message.role === 'assistant' && (
                  <div className="h-8 w-8 bg-[#969423] rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                )}
                <div>
                  <div
                    className={`rounded-[18px] px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-[#969423] text-white'
                        : 'bg-[#F5F7FA] text-[#333333]'
                    }`}
                  >
                    <p className="text-sm font-['Open_Sans'] whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <p className="text-[11px] text-[#7C7C7C] mt-1 font-['Open_Sans']">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[80%]">
                <div className="h-8 w-8 bg-[#969423] rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div className="bg-[#F5F7FA] rounded-[18px] px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#7C7C7C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-[#7C7C7C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-[#7C7C7C] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        {showSuggestions && messages.length === 1 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-[#7C7C7C] font-['Open_Sans']">Quick questions:</p>
            {SUGGESTED_QUESTIONS.map((question) => (
              <button
                key={question}
                onClick={() => handleSuggestedQuestion(question)}
                className="block w-full text-left px-3 py-2 text-sm rounded-lg border border-[#969423] text-[#212653] hover:bg-[#969423]/10 transition-colors font-['Open_Sans']"
              >
                {question}
              </button>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 font-['Open_Sans']"
            disabled={isLoading}
            aria-label="Chat message input"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="bg-[#969423] hover:bg-[#7a7b1c] text-white"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
