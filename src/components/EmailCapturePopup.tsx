import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mail, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailCapturePopupProps {
  hubColor?: string;
}

const EmailCapturePopup: React.FC<EmailCapturePopupProps> = ({ hubColor = "biz-navy" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000); // Show popup after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Success!",
      description: "You're all set for launch day! Check your email for updates.",
    });
    
    setEmail("");
    setIsSubmitting(false);
    setIsOpen(false);
  };

  const getBrandColors = () => {
    switch (hubColor) {
      case "biz-guides":
        return {
          bg: "bg-biz-guides",
          text: "text-white",
          accent: "text-biz-guides-light",
          button: "bg-white text-biz-guides hover:bg-gray-100"
        };
      case "biz-tools":
        return {
          bg: "bg-biz-tools",
          text: "text-white", 
          accent: "text-biz-tools-light",
          button: "bg-white text-biz-tools hover:bg-gray-100"
        };
      case "biz-leader":
        return {
          bg: "bg-biz-leader",
          text: "text-white",
          accent: "text-biz-leader-light", 
          button: "bg-white text-biz-leader hover:bg-gray-100"
        };
      case "biz-growth":
        return {
          bg: "bg-biz-growth",
          text: "text-white",
          accent: "text-biz-growth-light",
          button: "bg-white text-biz-growth hover:bg-gray-100"
        };
      default:
        return {
          bg: "bg-biz-navy",
          text: "text-white",
          accent: "text-biz-orange",
          button: "bg-biz-orange text-white hover:bg-biz-orange/90"
        };
    }
  };

  const colors = getBrandColors();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={`${colors.bg} border-0 max-w-md mx-auto`}>
        <button
          onClick={() => setIsOpen(false)}
          className={`absolute right-4 top-4 ${colors.text} hover:opacity-70 transition-opacity`}
        >
          <X className="h-4 w-4" />
        </button>
        
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className={`p-3 rounded-full bg-white/10 backdrop-blur-sm`}>
              <Sparkles className={`h-8 w-8 ${colors.text}`} />
            </div>
          </div>
          
          <DialogTitle className={`text-2xl font-bold ${colors.text}`}>
            Get Ready for Launch!
          </DialogTitle>
          
          <div className="space-y-2">
            <p className={`${colors.accent} font-semibold text-lg`}>
              BizHealth.ai launches in the U.S. on Nov. 30th
            </p>
            <p className={`${colors.text} text-base`}>
              The guesswork stops on Nov. 30 and the Growth begins.
            </p>
            <p className={`${colors.text}/80 text-sm`}>
              Be first to get exclusive updates, insights, and launch discounts!
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="relative">
            <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${colors.text}/60`} />
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${colors.button} font-semibold transition-all duration-200`}
          >
            {isSubmitting ? "Signing Up..." : "Reserve My Spot"}
          </Button>
        </form>
        
        <p className={`text-xs ${colors.text}/60 text-center mt-4`}>
          No spam, ever. Unsubscribe anytime.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCapturePopup;