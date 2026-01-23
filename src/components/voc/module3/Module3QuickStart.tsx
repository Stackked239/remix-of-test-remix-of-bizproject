import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, CheckCircle2, Lightbulb, PartyPopper } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Module3QuickStartProps {
  onView: () => void;
  onAction: () => void;
}

const Module3QuickStart = ({ onView, onAction }: Module3QuickStartProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  const handleCheckItem = (id: string) => {
    setCompletedItems(prev => {
      const newState = { ...prev, [id]: !prev[id] };
      if (Object.values(newState).some(v => v)) {
        onAction();
      }
      return newState;
    });
  };

  const days = [
    {
      day: 1,
      title: "Identify Critical Feedback Moments",
      time: "5 minutes",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">List 3 moments when customer feedback would help you MOST:</p>
          <div className="space-y-2">
            {[
              { id: "d1-1", label: "After first purchase (onboarding)" },
              { id: "d1-2", label: "After support interaction" },
              { id: "d1-3", label: "When they cancel/leave" },
              { id: "d1-4", label: "30 days into using your product/service" },
              { id: "d1-5", label: "After major updates or changes" },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <Checkbox 
                  id={item.id}
                  checked={completedItems[item.id] || false}
                  onCheckedChange={() => handleCheckItem(item.id)}
                />
                <label htmlFor={item.id} className="text-sm text-foreground cursor-pointer">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          <div className="bg-[hsl(var(--biz-green))]/10 rounded-lg p-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[hsl(var(--biz-green))]" />
            <span className="text-sm text-foreground">Deliverable: List of 3 critical feedback moments</span>
          </div>
        </div>
      )
    },
    {
      day: 2,
      title: "Write 5 Simple Survey Questions",
      time: "10 minutes",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">These 5 questions work for almost any business:</p>
          <div className="space-y-3">
            {[
              { q: "Q1 (NPS)", text: '"How likely are you to recommend us to a friend or colleague?"', scale: "Scale: 0-10" },
              { q: "Q2 (CSAT)", text: '"How satisfied were you with [specific interaction]?"', scale: "Scale: 1-5 stars" },
              { q: "Q3 (Follow-up)", text: '"What\'s the main reason for your score?"', scale: "Open text — THIS IS THE GOLD" },
              { q: "Q4 (Improvement)", text: '"What\'s one thing we could do better?"', scale: "Open text" },
              { q: "Q5 (Open)", text: '"Is there anything else you\'d like to share?"', scale: "Open text" },
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs font-semibold text-[hsl(var(--biz-blue))] mb-1">{item.q}</p>
                <p className="text-sm text-foreground italic">{item.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.scale}</p>
              </div>
            ))}
          </div>
          <div className="bg-[hsl(var(--biz-green))]/10 rounded-lg p-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[hsl(var(--biz-green))]" />
            <span className="text-sm text-foreground">Deliverable: 5 questions ready to copy</span>
          </div>
        </div>
      )
    },
    {
      day: 3,
      title: "Set Up Your Survey Tool",
      time: "15-20 minutes",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">Pick ONE tool. Don't overthink it.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: "Google Forms", note: "Free, simple, works" },
              { name: "Typeform", note: "Free tier, beautiful" },
              { name: "SurveyMonkey", note: "Free tier, standard" },
            ].map((tool, i) => (
              <div key={i} className="bg-background rounded-lg p-3 text-center border">
                <p className="font-medium text-foreground text-sm">{tool.name}</p>
                <p className="text-xs text-muted-foreground">{tool.note}</p>
              </div>
            ))}
          </div>
          <div className="bg-[hsl(var(--biz-gold))]/10 border-l-4 border-[hsl(var(--biz-gold))] rounded-r-lg p-3">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Pro Tip:</strong> Google Forms connects directly to Sheets. 
                Easiest way to track responses over time.
              </p>
            </div>
          </div>
          <div className="bg-[hsl(var(--biz-green))]/10 rounded-lg p-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[hsl(var(--biz-green))]" />
            <span className="text-sm text-foreground">Deliverable: Survey created with 5 questions</span>
          </div>
        </div>
      )
    },
    {
      day: 4,
      title: "Send Your First Survey",
      time: "10-15 minutes",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">Select 10-20 recent customers. Email them.</p>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Email Template:</p>
            <p className="text-sm text-foreground mb-2"><strong>Subject:</strong> Quick question — 30 seconds</p>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Hi [Name],</p>
              <p>We'd love your honest feedback. 30-second survey:</p>
              <p className="text-[hsl(var(--biz-blue))]">[SURVEY LINK]</p>
              <p>Your thoughts help us improve.</p>
              <p>Thanks,<br />[Your Name]</p>
            </div>
          </div>
          <div className="bg-[hsl(var(--biz-blue))]/10 border-l-4 border-[hsl(var(--biz-blue))] rounded-r-lg p-3">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Pro Tip:</strong> Send to customers you VALUE most. 
              You want feedback from people you actually want to keep.
            </p>
          </div>
          <div className="bg-[hsl(var(--biz-green))]/10 rounded-lg p-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[hsl(var(--biz-green))]" />
            <span className="text-sm text-foreground">Deliverable: First survey sent to 10-20 customers</span>
          </div>
        </div>
      )
    },
    {
      day: 5,
      title: "Review Responses & Find Patterns",
      time: "20-30 minutes",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">Read EVERYTHING. Yes, all of it. As you read:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-foreground">
            <li>Tag sentiment (Positive / Negative / Neutral)</li>
            <li>Note themes (What comes up repeatedly?)</li>
            <li>Mark quick wins (Easy things to fix)</li>
            <li>Flag complex issues (Require deeper work)</li>
          </ol>
          <p className="text-muted-foreground mt-4"><strong className="text-foreground">Questions to ask yourself:</strong></p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• What 3 themes appear most?</li>
            <li>• What 1 complaint surprised you?</li>
            <li>• What 1 compliment surprised you?</li>
            <li>• Is there a pattern you were NOT expecting?</li>
          </ul>
          <div className="bg-[hsl(var(--biz-green))]/10 rounded-lg p-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[hsl(var(--biz-green))]" />
            <span className="text-sm text-foreground">Deliverable: List of top 3 themes from feedback</span>
          </div>
        </div>
      )
    },
    {
      day: 6,
      title: "Pick ONE Thing to Change",
      time: "15 minutes",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">Based on feedback, identify one improvement.</p>
          <p className="text-foreground font-medium">
            Not the biggest thing. Not the most important thing.<br />
            The ONE THING you can actually make happen THIS WEEK.
          </p>
          <div className="space-y-3">
            <div className="bg-background border rounded-lg p-3">
              <p className="text-sm text-muted-foreground mb-2"><strong>Feedback:</strong> "Setup is confusing"</p>
              <p className="text-sm text-green-600">✓ Do: Record a 2-minute setup video (Thursday)</p>
              <p className="text-sm text-red-500">✗ Not: Completely redesign onboarding (8 weeks)</p>
            </div>
            <div className="bg-background border rounded-lg p-3">
              <p className="text-sm text-muted-foreground mb-2"><strong>Feedback:</strong> "Response time is slow"</p>
              <p className="text-sm text-green-600">✓ Do: Add auto-response to support email (Tuesday)</p>
              <p className="text-sm text-red-500">✗ Not: Hire 2 new support people (3 months)</p>
            </div>
          </div>
          <p className="text-sm italic text-muted-foreground">Real wins build momentum. Big projects exhaust you.</p>
          <div className="bg-[hsl(var(--biz-green))]/10 rounded-lg p-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[hsl(var(--biz-green))]" />
            <span className="text-sm text-foreground">Deliverable: 1 specific, doable change identified</span>
          </div>
        </div>
      )
    },
    {
      day: 7,
      title: "Close the Loop",
      time: "15 minutes",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">Email customers who gave feedback:</p>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Email Template:</p>
            <p className="text-sm text-foreground mb-2"><strong>Subject:</strong> We listened. Here's what changed.</p>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Hi [Name],</p>
              <p>Thank you for your feedback last week.</p>
              <p>Based on what you (and others) told us, we're making this change:</p>
              <p className="font-medium text-foreground">[Specific change you made]</p>
              <p>This matters because: [Why it helps customers]</p>
              <p>We appreciate you helping us improve.</p>
              <p>[Your Name]</p>
            </div>
          </div>
          <div className="bg-[hsl(var(--biz-blue))]/10 rounded-lg p-4 flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold text-[hsl(var(--biz-blue))]">21%</span>
              <p className="text-xs text-muted-foreground">higher response rate on future surveys when you close the loop</p>
            </div>
          </div>
          <p className="text-sm italic text-muted-foreground">Customers who feel heard become your best advocates.</p>
          <div className="bg-[hsl(var(--biz-green))]/10 rounded-lg p-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[hsl(var(--biz-green))]" />
            <span className="text-sm text-foreground">Deliverable: Close-the-loop emails sent</span>
          </div>
        </div>
      )
    },
  ];

  // Define day badge colors for visual variety
  const dayColors = [
    'bg-[hsl(var(--biz-blue))]',
    'bg-[hsl(var(--biz-green))]',
    'bg-[hsl(var(--biz-gold))] text-[hsl(var(--biz-navy))]',
    'bg-[hsl(var(--biz-blue))]',
    'bg-[hsl(var(--biz-green))]',
    'bg-[hsl(var(--biz-gold))] text-[hsl(var(--biz-navy))]',
    'bg-gradient-to-r from-[hsl(var(--biz-green))] to-[hsl(var(--biz-blue))]',
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-br from-[hsl(var(--biz-navy))]/5 via-background to-[hsl(var(--biz-green))]/10">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1.5 bg-[hsl(var(--biz-green))]/10 text-[hsl(var(--biz-green))] text-sm font-semibold rounded-full mb-4 border border-[hsl(var(--biz-green))]/20">
            Action Plan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your <span className="text-[hsl(var(--biz-green))]">7-Day</span> Quick Start
          </h2>
          <p className="text-lg text-muted-foreground">
            No software. No perfect system. Just action.<br />
            Complete these 7 steps and you'll have a working VoC measurement system.
          </p>
        </motion.div>

        {/* Day Cards */}
        <div className="space-y-3">
          {days.map((day) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: day.day * 0.05 }}
              className={`bg-card border-2 rounded-xl overflow-hidden shadow-sm transition-all ${
                expandedDay === day.day 
                  ? 'border-[hsl(var(--biz-green))]/40 shadow-md' 
                  : 'border-border hover:border-[hsl(var(--biz-blue))]/30'
              }`}
            >
              <button
                onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${dayColors[day.day - 1]} text-white flex items-center justify-center font-bold text-sm shadow-sm`}>
                    {day.day}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">{day.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 text-[hsl(var(--biz-blue))]" />
                      {day.time}
                    </div>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${
                  expandedDay === day.day ? 'rotate-180 text-[hsl(var(--biz-green))]' : 'text-muted-foreground'
                }`} />
              </button>
              
              <AnimatePresence>
                {expandedDay === day.day && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2 border-t border-[hsl(var(--biz-green))]/20">
                      {day.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Completion Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-xl p-6 text-center"
        >
          <PartyPopper className="h-10 w-10 text-[hsl(var(--biz-green))] mx-auto mb-3" />
          <h3 className="text-xl font-bold text-foreground mb-2">Congratulations!</h3>
          <p className="text-muted-foreground">
            You now have a working Voice of Customer measurement system.<br />
            More importantly: You've proven to yourself you can do this.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Module3QuickStart;
