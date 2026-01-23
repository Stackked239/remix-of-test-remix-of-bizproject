import { Button } from "@/components/ui/button";
import { Compass, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const BizGuidesHero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--biz-navy))] via-[hsl(237,40%,28%)] to-[hsl(237,35%,35%)]">
      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[hsl(var(--biz-teal))]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-background/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-5 gap-12 items-center min-h-[500px]">
          {/* Content - 60% */}
          <motion.div 
            className="lg:col-span-3 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-[52px] leading-tight text-background mb-6">
              Your Diagnostic is Done.
              <br />
              <span className="text-[hsl(var(--biz-teal))]">Now Comes the Execution.</span>
            </h1>
            
            <p className="font-open-sans text-lg md:text-xl text-background/90 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              Expert coaching powered by your BizHealth insights—get unstuck in one focused session.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                onClick={() => scrollToSection('tier-comparison')}
                className="bg-[hsl(var(--biz-teal))] hover:bg-[hsl(180,100%,30%)] text-background font-montserrat font-semibold text-base px-8 py-6 rounded-lg shadow-lg shadow-[hsl(var(--biz-teal))]/20 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Browse Free Resources
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('tier-comparison')}
                className="border-2 border-[hsl(var(--biz-teal))] text-[hsl(var(--biz-teal))] hover:bg-[hsl(var(--biz-teal))]/10 font-montserrat font-semibold text-base px-8 py-6 rounded-lg bg-transparent transition-all"
              >
                Schedule a Session
              </Button>
            </div>
          </motion.div>

          {/* Visual - 40% */}
          <motion.div 
            className="lg:col-span-2 hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Compass container */}
              <div className="w-64 h-64 bg-gradient-to-br from-[hsl(var(--biz-teal))]/20 to-[hsl(var(--biz-teal))]/5 rounded-full flex items-center justify-center border border-[hsl(var(--biz-teal))]/30">
                <div className="w-48 h-48 bg-gradient-to-br from-background/10 to-background/5 rounded-full flex items-center justify-center border border-background/20">
                  <Compass className="w-24 h-24 text-[hsl(var(--biz-teal))] animate-pulse" strokeWidth={1.5} />
                </div>
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[hsl(var(--biz-teal))]/20 rounded-full blur-md" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-background/10 rounded-full blur-lg" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BizGuidesHero;
