import { motion } from "framer-motion";
import { GraduationCap, Download, Share2, BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Module7CompletionRewardsProps {
  isComplete: boolean;
  onMarkComplete: () => void;
}

const Module7CompletionRewards = ({ isComplete, onMarkComplete }: Module7CompletionRewardsProps) => {
  const { toast } = useToast();

  const handleDownload = (asset: string) => {
    toast({ title: "Download Started!", description: `${asset} is downloading.` });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "I completed the VoC Curriculum!", text: "Just earned my VoC Practitioner Certificate from BizHealth.ai!", url: window.location.href });
    } else {
      toast({ title: "Share your achievement!", description: "Copy this page URL to share." });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[hsl(var(--biz-navy))]/5 to-[hsl(var(--biz-green))]/10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {!isComplete ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GraduationCap className="w-16 h-16 text-[hsl(var(--biz-gold))] mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Complete the Curriculum?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Mark this module complete to unlock your VoC Practitioner Certificate and the complete reference guide.
            </p>
            <Button onClick={onMarkComplete} size="lg" className="bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white">
              Complete Module 7 & Graduate 🎓
            </Button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--biz-lime))]/20 text-[hsl(var(--biz-lime))] font-bold mb-6">
              <CheckCircle2 className="w-5 h-5" />
              🎓 Curriculum Complete!
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Congratulations, VoC Practitioner!
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              You've completed all 7 modules. You're now equipped to build and lead a world-class Voice of Customer program.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              <div className="bg-card border rounded-xl p-6 text-left">
                <BookOpen className="w-10 h-10 text-[hsl(var(--biz-green))] mb-4" />
                <h3 className="font-bold text-foreground mb-2">VoC Reference Guide</h3>
                <p className="text-sm text-muted-foreground mb-4">40+ page playbook with all templates and tools</p>
                <Button onClick={() => handleDownload("VoC Reference Guide")} className="w-full bg-[hsl(var(--biz-green))] text-white gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
              </div>
              <div className="bg-card border rounded-xl p-6 text-left">
                <GraduationCap className="w-10 h-10 text-[hsl(var(--biz-gold))] mb-4" />
                <h3 className="font-bold text-foreground mb-2">VoC Practitioner Certificate</h3>
                <p className="text-sm text-muted-foreground mb-4">Your official certification to share</p>
                <div className="flex gap-2">
                  <Button onClick={() => handleDownload("Certificate")} variant="outline" className="flex-1 gap-2">
                    <Download className="w-4 h-4" /> PDF
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" /> Share
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Module7CompletionRewards;
