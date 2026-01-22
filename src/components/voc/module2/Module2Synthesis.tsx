import { motion } from "framer-motion";
import { Coffee, ArrowRight } from "lucide-react";

const Module2Synthesis = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[hsl(var(--biz-gold))]/10 to-[hsl(var(--biz-blue))]/5 border rounded-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Coffee className="h-8 w-8 text-[hsl(var(--biz-gold))]" />
            <h2 className="text-2xl font-bold text-foreground">The Four Components In Action</h2>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">Meet Sarah, owner of a local coffee shop.</strong> She was frustrated—customers weren't coming back, but she didn't know why.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-background rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-foreground">Active + Passive Collection</p>
                  <p className="text-sm text-muted-foreground">She started a monthly email survey (active) AND began monitoring Google Reviews weekly (passive).</p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex gap-4 p-4 bg-background rounded-lg">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-foreground">Omnichannel Listening</p>
                  <p className="text-sm text-muted-foreground">She added Instagram DMs to her monitoring. Customers were sharing photos but also complaints she'd missed.</p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex gap-4 p-4 bg-background rounded-lg">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-foreground">Closing the Loop</p>
                  <p className="text-sm text-muted-foreground">When 5 customers mentioned slow WiFi, she upgraded it AND posted about the change on social media.</p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex gap-4 p-4 bg-background rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <p className="font-semibold text-foreground">Centralized Data</p>
                  <p className="text-sm text-muted-foreground">All feedback goes into one Google Sheet. Now she spots patterns weekly and tracks what she's fixed.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/20 rounded-lg">
              <p className="text-[hsl(var(--biz-green))] font-semibold">
                Result: 6 months later, repeat customer visits up 34%. Sarah now knows exactly what her customers want—before they leave.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module2Synthesis;
