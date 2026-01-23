import { motion } from "framer-motion";
import { CheckCircle2, Search, Pencil, BarChart3, Rocket, TrendingUp, Target, RefreshCw } from "lucide-react";
import type { DayProgress } from "@/pages/bizgrowth/voc/SevenDayQuickstart";

interface Module5TimelineProps {
  daysCompleted: DayProgress[];
  currentActiveDay: number;
  onDayClick: (day: number) => void;
}

const DAYS_DATA = [
  { day: 1, title: "Identify Feedback Moments", time: "15 min", icon: Search },
  { day: 2, title: "Write Your Survey", time: "20 min", icon: Pencil },
  { day: 3, title: "Build Your Tracker", time: "10 min", icon: BarChart3 },
  { day: 4, title: "Launch Your Survey", time: "15 min", icon: Rocket },
  { day: 5, title: "Review & Find Patterns", time: "20 min", icon: TrendingUp },
  { day: 6, title: "Pick ONE Thing to Change", time: "15 min", icon: Target },
  { day: 7, title: "Close the Loop", time: "15 min", icon: RefreshCw },
];

const Module5Timeline = ({ daysCompleted, currentActiveDay, onDayClick }: Module5TimelineProps) => {
  const isDayComplete = (day: number) => daysCompleted.find(d => d.dayNumber === day)?.completed || false;

  return (
    <section className="py-4 bg-background border-b sticky top-[108px] z-30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile: Horizontal Scrollable */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4 lg:hidden">
          <div className="flex gap-2 min-w-max">
            {DAYS_DATA.map(({ day, title, icon: Icon }) => {
              const isComplete = isDayComplete(day);
              const isActive = day === currentActiveDay && !isComplete;
              
              return (
                <button
                  key={day}
                  onClick={() => onDayClick(day)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0
                    ${isComplete 
                      ? 'bg-[hsl(var(--biz-green))]/10 text-[hsl(var(--biz-green))]' 
                      : isActive 
                        ? 'bg-[hsl(var(--biz-navy))]/10 text-[hsl(var(--biz-navy))] ring-2 ring-[hsl(var(--biz-navy))]' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  Day {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop: Full Timeline */}
        <div className="hidden lg:grid lg:grid-cols-7 gap-2">
          {DAYS_DATA.map(({ day, title, time, icon: Icon }) => {
            const isComplete = isDayComplete(day);
            const isActive = day === currentActiveDay && !isComplete;
            
            return (
              <motion.button
                key={day}
                onClick={() => onDayClick(day)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-xl border-2 text-left transition-all
                  ${isComplete 
                    ? 'border-[hsl(var(--biz-green))] bg-[hsl(var(--biz-green))]/5' 
                    : isActive 
                      ? 'border-[hsl(var(--biz-navy))] bg-[hsl(var(--biz-navy))]/5 ring-2 ring-[hsl(var(--biz-navy))]/20' 
                      : 'border-border bg-card hover:border-muted-foreground/30'
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wide
                    ${isComplete ? 'text-[hsl(var(--biz-green))]' : isActive ? 'text-[hsl(var(--biz-navy))]' : 'text-muted-foreground'}`}>
                    Day {day}
                  </span>
                  {isComplete ? (
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--biz-green))]" />
                  ) : (
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[hsl(var(--biz-navy))]' : 'text-muted-foreground'}`} />
                  )}
                </div>
                <p className={`text-sm font-medium leading-tight mb-1
                  ${isComplete || isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {title}
                </p>
                <span className="text-xs text-muted-foreground">⏱ {time}</span>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeDay"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[hsl(var(--biz-navy))]"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Module5Timeline;
