import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/images/bizguides-hero-consultation.jpg";

const BizGuidesHero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[600px] lg:min-h-[650px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Business professionals in strategic consultation session" 
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--biz-teal))]/95 via-[hsl(var(--biz-teal))]/85 to-[hsl(var(--biz-teal))]/70" />
      </div>

      {/* Subtle accent elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-background/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-[hsl(var(--biz-navy))]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[450px]">
          {/* Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span className="text-background font-montserrat font-semibold text-sm">BizGuides</span>
              <span className="text-background/70 text-sm">•</span>
              <span className="text-background/90 font-open-sans text-sm">Coaching & Consulting</span>
            </motion.div>

            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-[56px] leading-tight text-[hsl(var(--biz-navy))] mb-4">
              Awareness Is Just
              <br />
              <span className="text-background">the Start.</span>
            </h1>
            
            <p className="font-montserrat font-semibold text-xl md:text-2xl text-background/95 mb-4">
              Now Comes the Challenging Part.
            </p>
            
            <p className="font-open-sans text-lg text-background/90 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Your trusted source for dedicated business coaching and consulting—providing personalized guidance powered by expertise, insight, and real-world experience. Navigate challenges with confidence and accelerate your growth journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                onClick={() => scrollToSection('tier-comparison')}
                className="bg-[hsl(var(--biz-navy))] hover:bg-[hsl(237,40%,25%)] text-background font-montserrat font-semibold text-base px-8 py-6 rounded-lg shadow-lg shadow-[hsl(var(--biz-navy))]/30 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Schedule a Session
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('tier-comparison')}
                className="border-2 border-background text-background hover:bg-background/10 font-montserrat font-semibold text-base px-8 py-6 rounded-lg bg-transparent transition-all"
              >
                View Services
              </Button>
            </div>
          </motion.div>

          {/* Right side - floating stats or trust indicators */}
          <motion.div 
            className="hidden lg:flex flex-col gap-6 items-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Trust indicators */}
            <div className="bg-background/15 backdrop-blur-sm rounded-2xl p-6 border border-background/20 max-w-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--biz-navy))] flex items-center justify-center">
                  <span className="text-background font-montserrat font-bold text-lg">✓</span>
                </div>
                <div>
                  <p className="font-montserrat font-bold text-background text-lg">Vetted Experts</p>
                  <p className="font-open-sans text-background/80 text-sm">Industry-specific advisors</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--biz-navy))] flex items-center justify-center">
                  <span className="text-background font-montserrat font-bold text-lg">⚡</span>
                </div>
                <div>
                  <p className="font-montserrat font-bold text-background text-lg">Rapid Results</p>
                  <p className="font-open-sans text-background/80 text-sm">Actionable guidance in one session</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--biz-navy))] flex items-center justify-center">
                  <span className="text-background font-montserrat font-bold text-lg">🎯</span>
                </div>
                <div>
                  <p className="font-montserrat font-bold text-background text-lg">Tailored Solutions</p>
                  <p className="font-open-sans text-background/80 text-sm">Matched to your growth stage</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BizGuidesHero;
