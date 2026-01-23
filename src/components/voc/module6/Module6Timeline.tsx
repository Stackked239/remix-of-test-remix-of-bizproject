import { motion } from "framer-motion";
import { Target, TrendingUp, Users, CheckCircle2, Lightbulb } from "lucide-react";

interface Module6TimelineProps {
  activePhase: 1 | 2 | 3;
  onPhaseClick: (phase: 1 | 2 | 3) => void;
}

const PHASES = [
  {
    number: 1,
    days: "Days 1-30",
    title: "Foundation",
    description: "Get the basics working",
    color: "blue",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-500",
    borderClass: "border-blue-500",
    icon: Target,
    activities: [
      "Set up collection from 3-5 channels",
      "Establish 1-2 metrics to track",
      "Build the daily review habit",
      "Analyze first patterns"
    ],
    milestone: "Collection system running, metrics tracked, weekly review habit established"
  },
  {
    number: 2,
    days: "Days 31-60",
    title: "Refinement",
    description: "Optimize what's working",
    color: "teal",
    bgClass: "bg-[hsl(var(--biz-green))]/10",
    textClass: "text-[hsl(var(--biz-green))]",
    borderClass: "border-[hsl(var(--biz-green))]",
    icon: TrendingUp,
    activities: [
      "Optimize collection channels",
      "Improve survey response rates",
      "Deepen analysis with segmentation",
      "Identify root causes (not just symptoms)"
    ],
    milestone: "Multiple channels monitored, root cause analysis on top 3 issues"
  },
  {
    number: 3,
    days: "Days 61-90",
    title: "Optimization",
    description: "Make it stick",
    color: "charcoal",
    bgClass: "bg-[hsl(var(--biz-navy))]/10",
    textClass: "text-[hsl(var(--biz-navy))]",
    borderClass: "border-[hsl(var(--biz-navy))]",
    icon: Users,
    activities: [
      "Train team on VoC processes",
      "Assign clear ownership by category",
      "Establish reporting rhythm",
      "Measure impact vs. baseline"
    ],
    milestone: "Team trained, metrics improving from baseline, system self-sustaining"
  }
];

const Module6Timeline = ({ activePhase, onPhaseClick }: Module6TimelineProps) => {
  return (
    <section id="timeline-overview" className="py-12 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--biz-navy))]/10 text-[hsl(var(--biz-navy))] text-sm font-medium mb-4">
            Section 01
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The 90-Day Framework
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You've completed your 7-day quick start. Now it's time to build something that lasts.
            The next 90 days transform VoC from "something you tried" into "how we operate."
          </p>
        </div>

        {/* Timeline Visual */}
        <div className="relative mb-10">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0" />
          
          {/* Phase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {PHASES.map((phase) => {
              const Icon = phase.icon;
              const isActive = activePhase === phase.number;
              
              return (
                <motion.button
                  key={phase.number}
                  onClick={() => onPhaseClick(phase.number as 1 | 2 | 3)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-6 rounded-xl border-2 text-left transition-all bg-card
                    ${isActive ? phase.borderClass + ' shadow-lg' : 'border-border hover:border-muted-foreground/30'}`}
                >
                  {/* Phase Number Badge */}
                  <div className={`w-12 h-12 rounded-full ${phase.bgClass} flex items-center justify-center mb-4 ${isActive ? 'ring-4 ring-offset-2 ' + phase.bgClass : ''}`}>
                    <Icon className={`w-6 h-6 ${phase.textClass}`} />
                  </div>
                  
                  <span className={`text-xs font-bold uppercase tracking-wide ${phase.textClass}`}>
                    {phase.days}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>
                  
                  {/* Activities Preview */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t"
                    >
                      <h4 className="text-sm font-semibold text-foreground mb-2">Key Activities:</h4>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className={`w-4 h-4 ${phase.textClass} flex-shrink-0 mt-0.5`} />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 p-3 rounded-lg bg-muted/50">
                        <p className="text-xs font-medium text-foreground">
                          Milestone: {phase.milestone}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Key Insight */}
        <div className="flex items-start gap-4 p-6 bg-[hsl(var(--biz-yellow))]/10 rounded-xl border border-[hsl(var(--biz-yellow))]/30">
          <Lightbulb className="w-6 h-6 text-[hsl(var(--biz-yellow))] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-foreground">
              <strong>The Goal:</strong> By Day 90, VoC should run without you pushing it daily. 
              Your team knows what to do, when to do it, and why it matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Module6Timeline;
