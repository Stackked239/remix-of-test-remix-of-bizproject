import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Module6QuickWin = () => {
  const { toast } = useToast();
  const [vocOwner, setVocOwner] = useState("");

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent("Weekly VoC Review");
    const details = encodeURIComponent("30-minute team sync to review customer feedback patterns and assign action items.");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&recur=RRULE:FREQ=WEEKLY`;
    window.open(url, '_blank');
    toast({ title: "Google Calendar opened!", description: "Complete the event creation in the new tab." });
  };

  const handleOutlookCalendar = () => {
    toast({ title: "Coming Soon", description: "Outlook calendar integration will be available shortly." });
  };

  const handleAppleCalendar = () => {
    toast({ title: "Coming Soon", description: "Apple calendar integration will be available shortly." });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "I'm starting my 90-day VoC system!",
        text: "Just completed Module 6 of the BizHealth.ai Voice of Customer curriculum. Building a sustainable customer feedback system!",
        url: window.location.href
      });
    } else {
      toast({ title: "Share your progress!", description: "Copy this link and share it with your network." });
    }
  };

  const saveOwner = () => {
    if (vocOwner.trim()) {
      localStorage.setItem('voc_owner', vocOwner);
      toast({ title: "VoC Owner Saved!", description: `${vocOwner} is now documented as your VoC owner.` });
    }
  };

  return (
    <section id="quick-win" className="py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <Trophy className="w-12 h-12 text-[hsl(var(--biz-yellow))] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Quick Win: Take Action Now
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just read this page — do something before you leave.
          </p>
        </div>

        {/* Action Steps */}
        <div className="bg-card border rounded-xl p-6 md:p-8 mb-6">
          <h3 className="font-bold text-foreground mb-6">
            Complete these two actions in the next 10 minutes:
          </h3>

          {/* Step 1 */}
          <div className="flex items-start gap-4 mb-8 pb-8 border-b">
            <div className="w-10 h-10 rounded-full bg-[hsl(var(--biz-green))]/10 flex items-center justify-center text-[hsl(var(--biz-green))] font-bold flex-shrink-0">
              1
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-2">Assign your VoC owner</h4>
              <p className="text-muted-foreground mb-4">
                Who will own the VoC program in your organization? If it's you, write it down. 
                If it's someone else, send them a message right now.
              </p>
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Name or 'Me'"
                  value={vocOwner}
                  onChange={(e) => setVocOwner(e.target.value)}
                  className="max-w-xs"
                />
                <Button 
                  variant="outline" 
                  onClick={saveOwner}
                  disabled={!vocOwner.trim()}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[hsl(var(--biz-green))]/10 flex items-center justify-center text-[hsl(var(--biz-green))] font-bold flex-shrink-0">
              2
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-2">Schedule your first weekly review</h4>
              <p className="text-muted-foreground mb-4">
                Put a 30-minute meeting on the calendar for next week. 
                Use the agenda template we provided.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleGoogleCalendar}
                  className="gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM12 17.25a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75zm0-7.5a.75.75 0 110-1.5.75.75 0 010 1.5z"/>
                  </svg>
                  Google Calendar
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleOutlookCalendar}
                  className="gap-2"
                >
                  Outlook
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleAppleCalendar}
                  className="gap-2"
                >
                  Apple Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Share Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-3">Share your progress:</p>
          <Button 
            variant="outline" 
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="w-4 h-4" />
            "I'm starting my 90-day VoC system!"
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Module6QuickWin;
