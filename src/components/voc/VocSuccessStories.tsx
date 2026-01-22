import { motion } from "framer-motion";
import { Quote, Star, TrendingUp, Users, DollarSign } from "lucide-react";

const stories = [
  {
    quote: "We thought we knew what customers wanted. VoC showed us we were solving the wrong problems. Within 3 months, our retention rate jumped 40%.",
    author: "Regional Auto Service Chain Owner",
    industry: "Automotive",
    result: "40% retention increase",
    icon: TrendingUp
  },
  {
    quote: "The feedback templates alone saved me 10 hours a week. Now I actually have time to act on what customers tell me.",
    author: "Independent Retailer",
    industry: "Retail",
    result: "10 hrs/week saved",
    icon: Users
  },
  {
    quote: "I was losing customers and didn't know why. Module 3 helped me see patterns I'd been blind to for years.",
    author: "Service Business Owner",
    industry: "Professional Services",
    result: "23% revenue growth",
    icon: DollarSign
  }
];

const VocSuccessStories = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-[hsl(var(--biz-blue))]/10 text-[hsl(var(--biz-blue))] font-heading text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            Success Stories
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Real Owners. Real Results.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These business owners started exactly where you are. Here's what happened when they built their VoC system.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Result badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 bg-[hsl(var(--biz-green))]/10 px-3 py-1.5 rounded-full">
                  <story.icon className="h-4 w-4 text-[hsl(var(--biz-green))]" />
                  <span className="text-sm font-semibold text-[hsl(var(--biz-green))]">
                    {story.result}
                  </span>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[hsl(var(--biz-gold))] text-[hsl(var(--biz-gold))]" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-1 h-8 w-8 text-muted/30" />
                <p className="text-foreground leading-relaxed pl-6 italic">
                  "{story.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-heading font-semibold text-foreground">
                  {story.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {story.industry}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Join 500+</span> small business owners 
            who've transformed their customer feedback into growth
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VocSuccessStories;
