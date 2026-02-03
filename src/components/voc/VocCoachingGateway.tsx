import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Live coaching sessions with experienced operators",
  "Personalized feedback on your VoC implementation",
  "Access to the full BizGrowth curriculum library",
  "Private community of growth-minded SMB owners"
];

const VocCoachingGateway = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: `linear-gradient(135deg, hsl(var(--biz-blue)) 0%, hsl(var(--biz-green)) 100%)`
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left content */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-[hsl(var(--biz-yellow))]" />
                  <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                    BizGrowth Academy
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
                  Want More Than Self-Paced Learning?
                </h2>
                
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  Get personalized coaching, live workshops, and a community of fellow owners 
                  who are building customer-centric businesses.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-[hsl(var(--biz-yellow))] shrink-0 mt-0.5" />
                      <span className="text-white/90">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-[hsl(var(--biz-yellow))] text-[hsl(var(--biz-blue))] hover:bg-[hsl(var(--biz-yellow))]/90 font-semibold"
                  >
                    <Link to="/bizgrowth">
                      Explore BizGrowth Academy
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link to="/sherpas">
                      <Users className="h-4 w-4 mr-2" />
                      Meet Our Coaches
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Right content - visual element */}
              <div className="hidden lg:flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-[hsl(var(--biz-yellow))]/20 rounded-full blur-3xl" />
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-[hsl(var(--biz-yellow))]/20 flex items-center justify-center">
                        <Users className="h-6 w-6 text-[hsl(var(--biz-yellow))]" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Live Coaching</p>
                        <p className="text-white/60 text-sm">Weekly sessions</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-white/20 rounded-full w-3/4" />
                      <div className="h-3 bg-white/20 rounded-full w-1/2" />
                      <div className="h-3 bg-white/20 rounded-full w-2/3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VocCoachingGateway;
