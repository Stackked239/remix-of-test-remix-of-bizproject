import { motion } from "framer-motion";
import { Sun, Calendar, CalendarDays, CalendarClock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const RHYTHMS = [
  {
    frequency: "DAILY",
    icon: Sun,
    time: "5-10 minutes",
    task: "Someone checks new feedback",
    items: [
      "Review new reviews, tickets, mentions",
      "Flag urgent issues for immediate action",
      "Log in tracker"
    ],
    owner: "CX Lead or rotating team member",
    colorClass: "bg-[hsl(var(--biz-yellow))]/10 border-[hsl(var(--biz-yellow))]/30"
  },
  {
    frequency: "WEEKLY",
    icon: Calendar,
    time: "30 minutes",
    task: "Team reviews patterns",
    items: [
      "What themes emerged this week?",
      "Assign owners to new issues",
      "Check loop closure status",
      "Celebrate wins"
    ],
    owner: "VoC Program Lead",
    colorClass: "bg-[hsl(var(--biz-green))]/10 border-[hsl(var(--biz-green))]/30"
  },
  {
    frequency: "MONTHLY",
    icon: CalendarDays,
    time: "1 hour",
    task: "Leadership reviews metrics",
    items: [
      "NPS/CSAT trends",
      "Top 3 issues and progress",
      "Impact of changes made",
      "Resource decisions"
    ],
    owner: "Leadership Team",
    colorClass: "bg-[hsl(var(--biz-navy))]/10 border-[hsl(var(--biz-navy))]/30"
  },
  {
    frequency: "QUARTERLY",
    icon: CalendarClock,
    time: "Half day",
    task: "Deep dive on trends",
    items: [
      "Strategic review of all feedback",
      "Competitive benchmarking",
      "Roadmap adjustments",
      "VoC program improvements"
    ],
    owner: "Leadership + VoC Lead",
    colorClass: "bg-purple-500/10 border-purple-500/30"
  }
];

const Module6Rhythm = () => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Download Started!",
      description: "Your Weekly Review Agenda Template is downloading.",
    });
  };

  return (
    <section id="building-rhythm" className="py-12 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--biz-navy))]/10 text-[hsl(var(--biz-navy))] text-sm font-medium mb-4">
            Section 07
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Building the Rhythm That Sticks
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Sustainable VoC isn't about working harder — it's about consistent rhythms that 
            become automatic. Here's the cadence that works.
          </p>
        </div>

        {/* Rhythm Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {RHYTHMS.map((rhythm, idx) => {
            const Icon = rhythm.icon;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-card border rounded-xl overflow-hidden ${rhythm.colorClass}`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-foreground" />
                    <span className="text-sm font-bold uppercase tracking-wide text-foreground">
                      {rhythm.frequency}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-1">{rhythm.time}</h4>
                  <p className="text-muted-foreground mb-4">{rhythm.task}</p>
                  <ul className="space-y-2 mb-4">
                    {rhythm.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-muted-foreground">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    <strong>Owner:</strong> {rhythm.owner}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Download CTA */}
        <div className="flex flex-col md:flex-row items-center gap-4 p-6 bg-card border rounded-xl">
          <Download className="w-8 h-8 text-[hsl(var(--biz-green))]" />
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-semibold text-foreground">Download: Weekly Review Agenda Template</h4>
            <p className="text-sm text-muted-foreground">Ready-to-use agenda for your 30-minute weekly VoC sync</p>
          </div>
          <Button
            onClick={handleDownload}
            className="bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white"
          >
            Download Template
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Module6Rhythm;
