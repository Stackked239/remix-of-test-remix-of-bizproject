import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 hover:scale-110 transition-transform"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-md h-[600px] bg-background rounded-lg shadow-2xl z-50 flex flex-col border">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-foreground">Chat with us</h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Iframe Container */}
          <div className="flex-1 overflow-hidden">
            <iframe
              src="https://embed.cody.bot/a0273a0d-bd73-4772-b4e6-aaf5cb7c4aef"
              style={{ border: "0px" }}
              name="codyai"
              scrolling="no"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              height="100%"
              width="100%"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
