import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, BarChart3, Clock, Target, TrendingDown } from "lucide-react";

interface Module4HeroProps {
  onView: () => void;
}

const Module4Hero = ({ onView }: Module4HeroProps) => {
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

  const stats = [
    {
      value: "21%",
      label: "Higher likelihood of responding to next survey",
      icon: BarChart3,
    },
    {
      value: "12%",
      label: "Retention increase with 48-hour response",
      icon: Clock,
    },
    {
      value: "78%",
      label: "Of customers who see action become promoters",
      icon: Target,
    },
    {
      value: "-25%",
      label: "Reduction in customer churn",
      icon: TrendingDown,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 px-4 bg-gradient-to-br from-[hsl(var(--biz-navy))] via-[hsl(var(--biz-navy))]/95 to-[hsl(var(--biz-blue))]"
      data-section="hero"
      data-section-number="1"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Critical Badge - High visibility */}
            <div className="inline-flex items-center gap-2 bg-[hsl(var(--biz-gold))] text-[hsl(var(--biz-navy))] px-4 py-2 rounded-lg font-heading font-bold text-sm mb-6 shadow-lg">
              <Star className="h-4 w-4 fill-current" />
              CRITICAL COMPONENT
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 drop-shadow-md">
              Closing the Loop:{" "}
              <span className="text-[hsl(var(--biz-gold))] drop-shadow-sm">
                Your #1 Success Factor
              </span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed font-medium">
              Collecting feedback is good. Closing the loop is what turns
              customers into advocates.
            </p>

            {/* Glassmorphism content card with better contrast */}
            <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-xl">
              <p className="text-white leading-relaxed mb-4">
                Here's the uncomfortable truth:{" "}
                <strong className="text-[hsl(var(--biz-gold))] font-bold">
                  Asking for feedback without responding is worse than not asking
                  at all.
                </strong>
              </p>
              <p className="text-white/90 leading-relaxed mb-4">
                When customers tell you something and nothing happens, you've
                taught them two lessons:
              </p>
              <ol className="list-decimal list-inside text-white/90 space-y-2 ml-2 font-medium">
                <li>Their feedback doesn't matter to you</li>
                <li>They shouldn't bother giving it again</li>
              </ol>
              <p className="text-white leading-relaxed mt-4">
                But when you{" "}
                <strong className="text-[hsl(var(--biz-gold))] font-bold">
                  CLOSE THE LOOP
                </strong>{" "}
                — when you tell customers what you did with their feedback —
                something magical happens. They don't just stay.{" "}
                <em className="text-[hsl(var(--biz-green))] font-semibold">They become advocates.</em>
              </p>
            </div>
          </motion.div>

          {/* Right Column - Stats Grid with enhanced contrast */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white/15 backdrop-blur-md rounded-xl p-5 border border-white/30 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--biz-gold))]/30 flex items-center justify-center border border-[hsl(var(--biz-gold))]/40">
                    <stat.icon className="h-5 w-5 text-[hsl(var(--biz-gold))]" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--biz-gold))] mb-2 drop-shadow-sm">
                  {stat.value}
                </div>
                <p className="text-sm text-white/90 leading-snug font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Module Info Bar - Better visibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 mx-auto w-fit border border-white/20"
        >
          <span className="flex items-center gap-2 font-medium">
            <Clock className="h-4 w-4 text-[hsl(var(--biz-gold))]" />
            15 min read
          </span>
          <span className="text-white/40">•</span>
          <span className="font-medium">Intermediate Level</span>
          <span className="text-white/40">•</span>
          <span className="font-medium">5 Email Templates Included</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Module4Hero;