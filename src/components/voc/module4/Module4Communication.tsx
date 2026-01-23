import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Megaphone, ClipboardList, ChevronDown, ChevronUp } from "lucide-react";

interface Module4CommunicationProps {
  onView: () => void;
}

const Module4Communication = ({ onView }: Module4CommunicationProps) => {
  const [expandedStory, setExpandedStory] = useState(false);
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

  const methods = [
    {
      icon: Mail,
      title: "One-to-One Outreach",
      description: "Personal email or phone call",
      bestFor: ["Detractors", "High-value customers", "Serious issues"],
      effort: "Medium",
      impact: "Very High",
    },
    {
      icon: Megaphone,
      title: "Public Updates",
      description: '"You Asked, We Delivered" blog posts or emails',
      bestFor: ["Common issues", "Process changes", "New features"],
      effort: "Medium",
      impact: "High",
    },
    {
      icon: ClipboardList,
      title: "Transparent Tracking",
      description: "Public board, feature voting, roadmap",
      bestFor: ["Building trust", "Product feedback", "Long-term engagement"],
      effort: "High initial",
      impact: "Very High",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 px-4 bg-background"
      data-section="communication"
      data-section-number="4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
            Three Ways to Close the Loop
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the right communication method based on the situation and customer.
          </p>
        </motion.div>

        {/* Method Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {methods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-background rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--biz-blue))]/10 flex items-center justify-center mb-4">
                <method.icon className="h-6 w-6 text-[hsl(var(--biz-blue))]" />
              </div>

              <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                {method.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {method.description}
              </p>

              <div className="border-t pt-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Best for:
                  </p>
                  <ul className="space-y-1">
                    {method.bestFor.map((item, i) => (
                      <li key={i} className="text-sm text-foreground/80 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--biz-green))]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 pt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Effort</p>
                    <p className="text-sm font-medium text-foreground">{method.effort}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Impact</p>
                    <p className="text-sm font-medium text-[hsl(var(--biz-green))]">
                      {method.impact}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Story Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[hsl(var(--biz-blue))]/5 to-[hsl(var(--biz-green))]/5 rounded-xl border p-6"
        >
          <button
            onClick={() => setExpandedStory(!expandedStory)}
            className="w-full flex items-center justify-between text-left"
            aria-expanded={expandedStory}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📖</span>
              <h3 className="font-heading font-bold text-lg text-foreground">
                Success Story: 1-800 Contacts
              </h3>
            </div>
            {expandedStory ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          <AnimatePresence>
            {expandedStory && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 space-y-4">
                  <p className="text-foreground/80">
                    The contact lens company implemented a personal response program:
                  </p>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-[hsl(var(--biz-green))]">•</span>
                      Responded personally to every piece of feedback
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[hsl(var(--biz-green))]">•</span>
                      Sent small, thoughtful gifts with difficult responses
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[hsl(var(--biz-green))]">•</span>
                      Made customers feel heard, not processed
                    </li>
                  </ul>

                  <div className="bg-background rounded-lg p-4 border">
                    <p className="text-sm font-semibold text-foreground mb-2">Results:</p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xl font-bold text-[hsl(var(--biz-green))]">+13</p>
                        <p className="text-xs text-muted-foreground">NPS Points</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-[hsl(var(--biz-green))]">+4%</p>
                        <p className="text-xs text-muted-foreground">Reorder Rate</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-[hsl(var(--biz-green))]">↑</p>
                        <p className="text-xs text-muted-foreground">Vocal Ambassadors</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm italic text-muted-foreground border-l-2 border-[hsl(var(--biz-yellow))] pl-4">
                    Key insight: "The difference wasn't collecting more feedback. It was
                    what they did with it."
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Module4Communication;
