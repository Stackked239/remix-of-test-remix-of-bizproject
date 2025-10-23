import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mail, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

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

    setIsSubmitting(true);

    try {
      // Client-side validation
      const emailSchema = z.string().trim().email().max(255);
      emailSchema.parse(email);

      const payload = {
        type: 'popup_subscriber',
        email,
        hubColor,
      };

      // Primary: Supabase client
console.log('[EmailPopup] invoking edge function', payload);
      const { data: invokeData, error: invokeError } = await supabase.functions.invoke('send-notification', {
        body: payload,
      });
      console.log('[EmailPopup] invoke response', invokeData);
      if (invokeError) {
        console.error('[EmailPopup] invoke error', invokeError);
      }

      let respData: any = invokeData;
      if (invokeError) {
        // If the SDK couldn't reach the function, try a direct fetch as a fallback
        try {
          console.log('[EmailPopup] fallback: calling edge function via fetch');
          const res = await fetch('https://lnthvnzounlxjedsbkgc.supabase.co/functions/v1/send-notification', {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {
              'Content-Type': 'application/json',
              // Publishable anon key required by Supabase functions
              'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxudGh2bnpvdW5seGplZHNia2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMTQyMzMsImV4cCI6MjA3Mzg5MDIzM30.qxcL_cxGzYNo_z68OGfGrmHMn7VGeaBEFcHiX4SeSXg',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxudGh2bnpvdW5seGplZHNia2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMTQyMzMsImV4cCI6MjA3Mzg5MDIzM30.qxcL_cxGzYNo_z68OGfGrmHMn7VGeaBEFcHiX4SeSXg'
            },
            body: JSON.stringify(payload),
          });
          console.log('[EmailPopup] fallback response status', res.status);
          const json = await res.json().catch(() => null);
          console.log('[EmailPopup] fallback response body', json);
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }
          respData = json;
        } catch (fallbackErr: any) {
          console.error('[EmailPopup] fallback error', fallbackErr);
          throw new Error(invokeError?.message || fallbackErr?.message || 'Failed to reach edge function');
        }
      }

      if (respData && respData.success === false) {
        throw new Error(respData.error || 'Failed to subscribe');
      }

      toast({
        title: 'Success!',
        description: "You're all set for launch day! Check your email for updates.",
      });

      setEmail('');
      setIsOpen(false);
    } catch (error: any) {
      console.error('Error submitting email:', error);
      toast({
        title: 'Error',
        description: error?.message || 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBrandColors = () => {
    switch (hubColor) {
      case "biz-guides":
        return {
          bg: "bg-white/95 backdrop-blur-md border border-white/20",
          text: "text-biz-navy",
          accent: "text-[hsl(var(--biz-teal))]",
          button: "bg-[hsl(var(--biz-teal))] text-white hover:bg-[hsl(var(--biz-teal))]/90",
          shadow: "shadow-hub-teal"
        };
      case "biz-tools":
        return {
          bg: "bg-white/95 backdrop-blur-md border border-white/20",
          text: "text-biz-navy", 
          accent: "text-[hsl(var(--biz-copper))]",
          button: "bg-[hsl(var(--biz-copper))] text-white hover:bg-[hsl(var(--biz-copper))]/90",
          shadow: "shadow-hub-copper"
        };
      case "biz-leader":
        return {
          bg: "bg-white/95 backdrop-blur-md border border-white/20",
          text: "text-biz-navy",
          accent: "text-[hsl(var(--biz-lime))]", 
          button: "bg-[hsl(var(--biz-lime))] text-white hover:bg-[hsl(var(--biz-lime))]/90",
          shadow: "shadow-hub-lime"
        };
      case "biz-growth":
        return {
          bg: "bg-white/95 backdrop-blur-md border border-white/20",
          text: "text-biz-navy",
          accent: "text-[hsl(var(--biz-citrine))]",
          button: "bg-[hsl(var(--biz-citrine))] text-white hover:bg-[hsl(var(--biz-citrine))]/90",
          shadow: "shadow-hub-citrine"
        };
      default:
        return {
          bg: "bg-white/95 backdrop-blur-md border border-white/20",
          text: "text-biz-navy",
          accent: "text-[hsl(var(--biz-green))]",
          button: "bg-[hsl(var(--biz-green))] text-white hover:bg-[hsl(var(--biz-green))]/90",
          shadow: "shadow-feature"
        };
    }
  };

  const colors = getBrandColors();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={`${colors.bg} ${colors.shadow} max-w-md mx-auto`}>
        <button
          onClick={() => setIsOpen(false)}
          className={`absolute right-4 top-4 ${colors.text} hover:opacity-70 transition-opacity`}
        >
          <X className="h-4 w-4" />
        </button>
        
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className={`p-3 rounded-full ${colors.accent}/10 backdrop-blur-sm`}>
              <Rocket className={`h-8 w-8 ${colors.accent}`} />
            </div>
          </div>
          
          <DialogTitle className={`text-2xl font-bold ${colors.text} text-center`}>
            Get Ready for Launch!
          </DialogTitle>
          
          <div className="space-y-2 text-center">
            <p className={`${colors.accent} font-semibold text-lg`}>
              {hubColor === "biz-growth" 
                ? "Official Launch on June 10th"
                : hubColor === "biz-leader"
                ? "Official Launch on April 26th"
                : hubColor === "biz-tools"
                ? "Official Launch on February 28th"
                : hubColor === "biz-guides"
                ? "Official Launch on January 30th"
                : "Official Launch on Nov. 30th"
              }
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
              className={`pl-10 bg-white/50 border-gray-300 ${colors.text} placeholder:text-gray-500 focus:border-[hsl(var(--biz-navy))] focus:ring-1 focus:ring-[hsl(var(--biz-navy))]`}
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