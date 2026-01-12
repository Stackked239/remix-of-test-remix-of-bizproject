import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface IdeasHeroProps {
  onScrollToForm: () => void;
}

const IdeasHero = ({ onScrollToForm }: IdeasHeroProps) => {
  return (
    <section 
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16"
      style={{
        background: "linear-gradient(135deg, #242553 0%, #1a1b3d 50%, #242553 100%)"
      }}
    >
      {/* Decorative blur circles */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-biz-green/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-biz-green/15 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-biz-green/5 blur-2xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Voice of Customer Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-biz-green" />
          <span className="text-white/90 text-sm font-montserrat font-medium">You're Our #1 Priority</span>
        </motion.div>
        
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-montserrat font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mb-6"
        >
          Help Us Help You{" "}
          <span className="relative inline-block text-biz-green">
            Grow
            <svg 
              className="absolute -bottom-2 left-0 w-full" 
              viewBox="0 0 100 8" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0 4 Q 25 0, 50 4 T 100 4" 
                fill="none" 
                stroke="#969423" 
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-source-sans text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10"
        >
          Your ideas fuel the tools, insights, and resources that help your business—and others—thrive.
        </motion.p>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            onClick={onScrollToForm}
            size="lg"
            className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
          >
            Submit Your Idea
            <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </Button>
        </motion.div>
      </div>
      
      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center cursor-pointer"
          onClick={onScrollToForm}
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
          <span className="text-white/50 text-xs mt-2 font-source-sans">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default IdeasHero;
