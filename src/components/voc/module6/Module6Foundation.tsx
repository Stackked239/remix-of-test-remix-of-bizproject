import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Trophy, Download, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { VOC_URLS } from "@/config/vocUrls";

interface Module6FoundationProps {
  expandedWeeks: number[];
  onToggleWeek: (week: number) => void;
}

const WEEKS = [
  {
    week: 1,
    title: "Set Up Collection System",
    tasks: [
      { text: "Identify 3-5 feedback channels to monitor", hint: "(Google Reviews, support tickets, social mentions, etc.)" },
      { text: "Create centralized tracker (Google Sheets works great)", hint: "Template provided in Module 2" },
      { text: "Set up review process — who checks what, when?" },
      { text: "Train anyone who'll touch feedback (15-minute overview)" }
    ],
    quickWin: "By end of Week 1, you're capturing feedback from multiple sources in one place.",
    resourceLink: VOC_URLS.modules[2].url,
    resourceText: "Get the Feedback Tracker Template (Module 2)"
  },
  {
    week: 2,
    title: "Establish Your Metrics",
    tasks: [
      { text: "Choose 1-2 metrics to start", hint: "Recommendation: CSAT or Sentiment based on your business stage" },
      { text: "Establish your baseline — what's your starting point?" },
      { text: "Create a simple dashboard (one page, key numbers)" },
      { text: "Set tracking cadence — weekly or monthly?" }
    ],
    quickWin: "By end of Week 2, you're measuring what matters — not just collecting data.",
    resourceLink: VOC_URLS.modules[3].url,
    resourceText: "Get the Metrics Dashboard Template (Module 3)"
  },
  {
    week: 3,
    title: "Build the Daily Habit",
    tasks: [
      { text: "Daily check: Someone reviews new feedback (5-10 minutes)", hint: "Morning ritual works best — before email overwhelms the day" },
      { text: "Assign owners to feedback items by category" },
      { text: "Start closing loops on recent feedback", hint: "Use templates from Module 4" },
      { text: "Log in tracker immediately — not \"later\"" }
    ],
    quickWin: "By end of Week 3, checking feedback is automatic — like checking email.",
    rhythm: [
      { frequency: "Daily", task: "Check new feedback (5-10 min)" },
      { frequency: "Weekly", task: "Review patterns (30 min)" }
    ]
  },
  {
    week: 4,
    title: "Identify Your First Theme",
    tasks: [
      { text: "Review all feedback collected (sit down, read everything)" },
      { text: "What patterns are emerging? Group similar complaints/praise." },
      { text: "Tag the #1 issue — what's mentioned most?" },
      { text: "Create your first action plan to address it" },
      { text: "Assign owner and set deadline" }
    ],
    quickWin: "By end of Week 4, you've moved from \"collecting data\" to \"taking action.\""
  }
];

const Module6Foundation = ({ expandedWeeks, onToggleWeek }: Module6FoundationProps) => {
  return (
    <section id="foundation-phase" className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Phase Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--biz-teal))]/15 text-[hsl(var(--biz-teal))] text-sm font-bold mb-4">
            PHASE 1
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Days 1-30: Building Your Foundation
          </h2>
          <p className="text-lg text-muted-foreground">
            Get the basics working before you optimize
          </p>
        </div>

        {/* Week Cards */}
        <div className="space-y-4 mb-8">
          {WEEKS.map((weekData) => {
            const isExpanded = expandedWeeks.includes(weekData.week);
            
            return (
              <div 
                key={weekData.week}
                className="border rounded-xl bg-card overflow-hidden"
              >
                <button
                  onClick={() => onToggleWeek(weekData.week)}
                  className="w-full p-4 md:p-6 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
                  aria-expanded={isExpanded}
                  aria-controls={`week-${weekData.week}-content`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--biz-teal))]/15 flex items-center justify-center text-[hsl(var(--biz-teal))] font-bold">
                      {weekData.week}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Week {weekData.week}
                      </span>
                      <h3 className="text-lg font-semibold text-foreground">
                        {weekData.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      id={`week-${weekData.week}-content`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-6 pb-6 border-t pt-4">
                        <h4 className="font-medium text-foreground mb-3">What You'll Do:</h4>
                        <ul className="space-y-3 mb-6">
                          {weekData.tasks.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[hsl(var(--biz-teal))] flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="text-foreground">{task.text}</span>
                                {task.hint && (
                                  <span className="block text-sm text-muted-foreground mt-0.5">{task.hint}</span>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>

                        {/* Rhythm Preview (Week 3 only) */}
                        {weekData.rhythm && (
                          <div className="mb-6">
                            <h5 className="text-sm font-medium text-foreground mb-3">The Rhythm That Works:</h5>
                            <div className="grid grid-cols-2 gap-3">
                              {weekData.rhythm.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                  {item.frequency === 'Daily' ? (
                                    <Clock className="w-4 h-4 text-[hsl(var(--biz-teal))]" />
                                  ) : (
                                    <Calendar className="w-4 h-4 text-[hsl(var(--biz-teal))]" />
                                  )}
                                  <div>
                                    <span className="text-xs font-medium text-[hsl(var(--biz-teal))] uppercase">{item.frequency}</span>
                                    <p className="text-sm text-foreground">{item.task}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Quick Win */}
                        <div className="flex items-start gap-3 p-4 bg-[hsl(var(--biz-gold))]/20 border border-[hsl(var(--biz-gold))]/40 rounded-lg mb-4">
                          <Trophy className="w-5 h-5 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
                          <p className="text-foreground">
                            <strong>Quick Win:</strong> {weekData.quickWin}
                          </p>
                        </div>

                        {/* Resource Link */}
                        {weekData.resourceLink && (
                          <Link 
                            to={weekData.resourceLink}
                            className="inline-flex items-center gap-2 text-[hsl(var(--biz-teal))] hover:text-[hsl(var(--biz-teal))]/80 font-medium transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            {weekData.resourceText}
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Phase 1 Milestone Summary */}
        <div className="p-6 bg-[hsl(var(--biz-teal))]/10 border border-[hsl(var(--biz-teal))]/30 rounded-xl">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[hsl(var(--biz-teal))]" />
            Phase 1 Complete: Foundation Built
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {[
              "Collection system running from 3+ channels",
              "1-2 metrics being tracked with baseline",
              "Weekly feedback review habit established",
              "First action plan in motion"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--biz-teal))]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground italic">
            You now have more customer insight than 80% of SMBs. The foundation is solid. Time to refine.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Module6Foundation;
