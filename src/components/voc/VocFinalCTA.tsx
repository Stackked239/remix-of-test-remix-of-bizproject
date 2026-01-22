import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const VocFinalCTA = () => {
  const scrollToQuiz = () => {
    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Decorative icons */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-[hsl(var(--biz-blue))]/10">
              <Zap className="h-6 w-6 text-[hsl(var(--biz-blue))]" />
            </div>
            <div className="p-3 rounded-full bg-[hsl(var(--biz-green))]/10">
              <Target className="h-6 w-6 text-[hsl(var(--biz-green))]" />
            </div>
            <div className="p-3 rounded-full bg-[hsl(var(--biz-gold))]/10">
              <Sparkles className="h-6 w-6 text-[hsl(var(--biz-gold))]" />
            </div>
          </div>

          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Ready to Hear What Your Customers<br />Are Really Saying?
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Take the 60-second quiz above to get your personalized starting point. 
            No email required — just immediate clarity on where to begin.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={scrollToQuiz}
              className="bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white font-semibold"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Take the Quiz Now
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg"
            >
              <Link to="/bizgrowth/voice-of-customer-checklist">
                Get Free VoC Checklist
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Trust element */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            ✓ 100% Free  ·  ✓ No Sign-up Required  ·  ✓ Personalized Path in 60 Seconds
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default VocFinalCTA;
