import { motion } from "framer-motion";
import { ChevronDown, CheckCircle, Clock, Gift } from "lucide-react";

interface Module1HeroProps {
  onStartClick: () => void;
}

const Module1Hero = ({ onStartClick }: Module1HeroProps) => {
  return (
    <section className="relative bg-background py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Text Content - 60% */}
          <div className="md:col-span-3 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight"
            >
              Why Voice of Customer Is Your{" "}
              <span className="text-[hsl(var(--biz-green))]">#1 Competitive Advantage</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              The businesses winning in your industry aren't smarter. They're just listening better. 
              Here's how to listen—and actually do something about it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={onStartClick}
                className="inline-flex items-center gap-2 bg-[hsl(var(--biz-yellow))] hover:bg-[hsl(var(--biz-yellow))]/90 text-[hsl(var(--biz-blue))] font-semibold text-base px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-[1.02]"
              >
                Start the Module
                <ChevronDown className="h-5 w-5" />
              </button>
            </motion.div>

            {/* Benefit Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 md:gap-6 pt-4"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-[hsl(var(--biz-green))]" />
                <span>No software required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-[hsl(var(--biz-green))]" />
                <span>12-15 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Gift className="h-4 w-4 text-[hsl(var(--biz-green))]" />
                <span>Free assessment inside</span>
              </div>
            </motion.div>
          </div>

          {/* Visual - 40% */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="md:col-span-2"
          >
            <div className="relative bg-gradient-to-br from-[hsl(var(--biz-blue))]/5 to-[hsl(var(--biz-green))]/10 rounded-2xl p-8 aspect-square flex items-center justify-center">
              {/* Abstract VoC Illustration */}
              <div className="relative w-full h-full">
                {/* Central Circle - Business Owner */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[hsl(var(--biz-blue))] rounded-full flex items-center justify-center shadow-lg z-10">
                  <span className="text-3xl">👤</span>
                </div>

                {/* Orbiting Feedback Sources */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  {/* Google Reviews */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-background rounded-full shadow-md flex items-center justify-center border-2 border-[hsl(var(--biz-yellow))]">
                    <span className="text-xl">⭐</span>
                  </div>
                  
                  {/* Support Ticket */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-background rounded-full shadow-md flex items-center justify-center border-2 border-[hsl(var(--biz-blue))]">
                    <span className="text-xl">🎫</span>
                  </div>
                  
                  {/* Social Media */}
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 bg-background rounded-full shadow-md flex items-center justify-center border-2 border-[hsl(var(--biz-green))]">
                    <span className="text-xl">💬</span>
                  </div>
                  
                  {/* Email */}
                  <div className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 bg-background rounded-full shadow-md flex items-center justify-center border-2 border-muted">
                    <span className="text-xl">✉️</span>
                  </div>
                </motion.div>

                {/* Connecting Lines (Static) */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="hsl(var(--biz-green))"
                    strokeWidth="0.5"
                    strokeDasharray="4 2"
                    opacity="0.4"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Module1Hero;
