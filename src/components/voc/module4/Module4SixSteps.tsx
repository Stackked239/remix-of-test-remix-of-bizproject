import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Inbox,
  MessageCircle,
  Search,
  UserCheck,
  Mail,
  BarChart3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Module4SixStepsProps {
  onView: () => void;
}

const Module4SixSteps = ({ onView }: Module4SixStepsProps) => {
  const [expandedStep, setExpandedStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const steps = [
    {
      id: 1,
      title: "Receive Feedback",
      icon: Inbox,
      description:
        "Customer leaves review, sends email, completes survey, etc.",
      example:
        '3-star Yelp review: "Food was great, but parking was a nightmare."',
      keyPoint: "All feedback enters your centralized tracker (from Module 2)",
      keyEmoji: "📋",
    },
    {
      id: 2,
      title: "Acknowledge Quickly",
      subtitle: "(within 24 hours)",
      icon: MessageCircle,
      description:
        "Even if you don't have a solution yet, let them know you heard them.",
      example:
        '"Hi Sarah, thank you for letting us know about parking. We\'re looking into this and will follow up within 48 hours."',
      keyPoint: "Speed matters. 48-hour response = 12% retention boost",
      keyEmoji: "⏱️",
    },
    {
      id: 3,
      title: "Investigate",
      icon: Search,
      description:
        "Is this an isolated incident or a pattern? How many are affected? What's the root cause?",
      example:
        '"3 other reviews mention parking. Parking lot is shared with office building. Owner isn\'t maintaining lines."',
      keyPoint: "Don't fix symptoms. Find root causes. (Use 5 Whys from Module 7)",
      keyEmoji: "🔍",
    },
    {
      id: 4,
      title: "Assign Owner & Take Action",
      icon: UserCheck,
      description:
        "Someone specific owns the resolution. Set a deadline. Make the change.",
      example:
        '"Manager: Contact building owner. Deadline: 1 week. Action: Negotiate reserved spaces."',
      keyPoint: "Ownership + deadline = action. Vague responsibility = nothing happens",
      keyEmoji: "✅",
    },
    {
      id: 5,
      title: "Communicate Back to Customer",
      icon: Mail,
      description:
        "Tell them what you did. Be honest if you decided not to act.",
      example:
        '"Sarah, we took action! Negotiated reserved spaces with the building owner. Here\'s what changed: [photo of improved lot]. You were right, and we\'re grateful you spoke up."',
      keyPoint:
        "This is where the magic happens. Customers become advocates when they see results.",
      keyEmoji: "💬",
    },
    {
      id: 6,
      title: "Measure Impact",
      icon: BarChart3,
      description:
        "Did satisfaction improve? Did similar complaints decrease?",
      example:
        '"Parking-related complaints: 0 last month (was 3). Yelp rating +0.3 stars. Repeat visit rate +18%"',
      keyPoint: "Track the ROI. Shows leadership this is worth doing.",
      keyEmoji: "📈",
    },
  ];

  const toggleStep = (stepId: number) => {
    if (isMobile) {
      setExpandedStep(expandedStep === stepId ? -1 : stepId);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 px-4 bg-muted/30"
      data-section="six-steps"
      data-section-number="3"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
            The 6-Step Closed-Loop Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow this proven process to transform every piece of feedback into
            an opportunity for loyalty.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line (Desktop) */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[hsl(var(--biz-yellow))] via-[hsl(var(--biz-green))] to-[hsl(var(--biz-blue))]" />

          <div className="space-y-4 md:space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Mobile: Accordion */}
                {isMobile ? (
                  <div className="bg-background rounded-xl border shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="w-full flex items-center gap-4 p-4 text-left"
                      aria-expanded={expandedStep === step.id}
                      aria-controls={`step-${step.id}-content`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-[hsl(var(--biz-yellow))]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-heading font-bold text-[hsl(var(--biz-blue))]">
                          {step.id}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-foreground">
                          {step.title}
                        </h3>
                        {step.subtitle && (
                          <p className="text-xs text-muted-foreground">
                            {step.subtitle}
                          </p>
                        )}
                      </div>
                      {expandedStep === step.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedStep === step.id && (
                        <motion.div
                          id={`step-${step.id}-content`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-3">
                            <p className="text-sm text-foreground/80">
                              {step.description}
                            </p>
                            <div className="bg-muted/50 rounded-lg p-3">
                              <p className="text-sm italic text-muted-foreground">
                                Example: {step.example}
                              </p>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                              <span>{step.keyEmoji}</span>
                              <p className="text-foreground font-medium">
                                Key: {step.keyPoint}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Desktop: Full Timeline */
                  <div className="flex gap-6 md:ml-0">
                    {/* Step Number Circle */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-background border-4 border-[hsl(var(--biz-yellow))] flex items-center justify-center z-10 relative">
                        <span className="text-xl font-heading font-bold text-[hsl(var(--biz-blue))]">
                          {step.id}
                        </span>
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-background rounded-xl border p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <step.icon className="h-5 w-5 text-[hsl(var(--biz-green))]" />
                        <h3 className="font-heading font-bold text-lg text-foreground">
                          {step.title}{" "}
                          {step.subtitle && (
                            <span className="font-normal text-muted-foreground text-base">
                              {step.subtitle}
                            </span>
                          )}
                        </h3>
                      </div>

                      <p className="text-foreground/80 mb-4">{step.description}</p>

                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <p className="text-sm italic text-muted-foreground">
                          <span className="font-semibold not-italic">Example:</span>{" "}
                          {step.example}
                        </p>
                      </div>

                      <div className="flex items-start gap-2 text-sm bg-[hsl(var(--biz-yellow))]/10 rounded-lg p-3">
                        <span className="text-lg">{step.keyEmoji}</span>
                        <p className="text-foreground">
                          <span className="font-semibold">Key:</span> {step.keyPoint}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Module4SixSteps;
