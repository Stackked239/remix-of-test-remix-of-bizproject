import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-[hsl(var(--biz-navy))] relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
            Ready to Check Your Small Business Health?
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
            Get comprehensive diagnostics across 12 critical business areas in just 90 minutes. 
            Join 2,500+ small business owners who've discovered what's holding their business back.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-[hsl(var(--biz-navy))] hover:bg-white/90 font-semibold px-8 py-6 text-lg"
            >
              <Link to="/pricing">Start Your Assessment Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg bg-transparent"
            >
              <Link to="/contact">Have Questions? Contact Us</Link>
            </Button>
          </div>

          {/* Guarantee Badge */}
          <div className="inline-flex items-center gap-2 text-white/80">
            <ShieldCheck className="w-5 h-5 text-[hsl(var(--biz-citrine))]" />
            <span className="text-sm">
              <strong>Money-back guarantee:</strong> Not satisfied? Full refund within 7 days, no questions asked.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
