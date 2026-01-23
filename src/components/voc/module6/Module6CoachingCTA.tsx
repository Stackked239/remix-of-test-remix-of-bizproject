import { motion } from "framer-motion";
import { Users, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VOC_URLS } from "@/config/vocUrls";

const Module6CoachingCTA = () => {
  return (
    <section id="coaching-cta" className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[hsl(var(--biz-navy))] to-[hsl(var(--biz-navy))]/80 rounded-2xl p-8 md:p-10 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Building Team Buy-In Can Be Challenging
              </h3>
              <p className="text-white/80 mb-6">
                Getting your team excited about VoC — and keeping them accountable — 
                is one of the hardest parts of implementation. Our BizGuides specialize 
                in change management and helping teams embrace customer-centric culture.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "1-on-1 coaching session (30-60 minutes)",
                  "Focus: Team alignment, ownership, accountability",
                  "Walk away with a clear action plan for your team"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--biz-green))] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link to={VOC_URLS.external.coaching}>
                  <Button 
                    size="lg"
                    className="bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white"
                  >
                    Book Team Alignment Coaching
                  </Button>
                </Link>
                <span className="px-3 py-1 bg-[hsl(var(--biz-yellow))]/20 text-[hsl(var(--biz-yellow))] text-sm font-medium rounded-full">
                  15% off for curriculum completers
                </span>
              </div>
            </div>
            <div className="lg:col-span-2 hidden lg:flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center">
                <Users className="w-16 h-16 text-white/60" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Assessment Cross-Sell */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8 bg-card border rounded-xl p-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--biz-green))]/10 text-[hsl(var(--biz-green))] rounded-full text-sm font-medium mb-4">
            <CheckCircle2 className="w-4 h-4" />
            VoC Module 6 Complete
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Your VoC Knowledge Is Just One Piece
          </h3>
          <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
            Voice of Customer is critical — but it's part of a bigger picture. 
            Understand your complete business health across Strategy, Finance, 
            Operations, HR, and more.
          </p>
          <Link 
            to="/pricing"
            className="inline-flex items-center gap-2 text-[hsl(var(--biz-green))] hover:text-[hsl(var(--biz-green))]/80 font-medium transition-colors"
          >
            Take the Full BizHealth Assessment →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Module6CoachingCTA;
