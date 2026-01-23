import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { VOC_URLS } from "@/config/vocUrls";

interface Module4CoachingCTAProps {
  onView: () => void;
}

const Module4CoachingCTA = ({ onView }: Module4CoachingCTAProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  const benefits = [
    "How to apologize without over-apologizing",
    "How to say \"no\" and keep the customer",
    "How to turn a complaint into a loyalty opportunity",
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 px-4"
      data-section="coaching"
      data-section-number="7"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--biz-blue))] via-[hsl(var(--biz-blue))]/95 to-[hsl(var(--biz-green))]/80 p-8 md:p-12"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              Need Help Crafting Difficult Responses?
            </h2>

            <p className="text-white/80 text-lg mb-6 max-w-2xl">
              Some feedback is easier to respond to than others. Negative feedback,
              complaints, feature requests you can't fulfill — these require finesse.
            </p>

            <p className="text-white/90 mb-6">
              Our BizGuides specialize in helping businesses respond to tough
              feedback without losing the customer.
            </p>

            <div className="mb-8">
              <p className="text-white font-semibold mb-3">
                Get personalized coaching on:
              </p>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/90">
                    <Check className="h-5 w-5 text-[hsl(var(--biz-yellow))] flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Button
                asChild
                size="lg"
                className="bg-[hsl(var(--biz-gold))] hover:bg-[hsl(var(--biz-gold))]/90 text-[hsl(var(--biz-navy))] font-bold text-lg px-8 gap-2"
              >
                <Link to="/bizguides">
                  Learn more about BizGuides
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module4CoachingCTA;
