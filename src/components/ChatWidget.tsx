import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-[60px] w-[60px] rounded-full shadow-lg text-white p-0 bg-gradient-to-br from-biz-navy to-biz-green bg-[length:200%_200%] animate-gradient-shift hover:shadow-2xl transition-shadow duration-300 z-[70]"
        aria-label="Open chat"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
    );
  }

  return (
    <div 
      className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-[80] sm:w-[90vw] sm:h-[80vh]"
      role="region"
      aria-label="Chat widget"
    >
      {/* Header */}
      <div className="bg-biz-navy text-white p-4 rounded-t-xl flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-biz-green rounded-full flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">BizHealth.ai Chat</h3>
            <p className="text-xs text-white/80">We're here to help</p>
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

      {/* Iframe Container */}
      <div className="flex-1 overflow-hidden">
        <iframe 
          src="https://embed.cody.bot/a0273a0d-bd73-4772-b4e6-aaf5cb7c4aef" 
          className="w-full h-full border-0"
          name="codyai" 
          scrolling="no" 
          title="BizHealth.ai Chat Assistant"
          allowFullScreen
        />
      </div>
    </div>
  );
}
