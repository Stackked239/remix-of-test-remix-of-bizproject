import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BarChart3, Lightbulb, Square, CheckSquare, FileSpreadsheet, ExternalLink, Calendar } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Module5Day3Props {
  isComplete: boolean;
  onToggleComplete: () => void;
}

const ACTION_ITEMS = [
  "Click the link below to open our Google Sheets feedback tracker template",
  "Copy it to your own Google Drive: File → Make a copy",
  'Rename it: "[Your Company] Feedback Tracker"',
  "Skim the column headers (Date, Channel, Feedback, Category, Sentiment)",
  "Add 2-3 pieces of feedback you remember from this week (test it out)",
  "Share the link with your team (if you have one)"
];

const TRACKER_PREVIEW = [
  { date: "Jan 20", channel: "Email", customer: "Sarah M.", feedback: '"Love the fast shipping!"', category: "Product", sentiment: "Positive", status: "Read" },
  { date: "Jan 20", channel: "Phone", customer: "Mike K.", feedback: '"Website checkout is confusing"', category: "UX", sentiment: "Negative", status: "Investigating" },
];

const Module5Day3 = ({ isComplete, onToggleComplete }: Module5Day3Props) => {
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleTemplateClick = (type: string) => {
    toast({
      title: `${type} Template`,
      description: `Opening ${type} template...`,
    });
  };

  return (
    <section ref={ref} className="py-12 md:py-16 scroll-mt-48" id="day-3">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`bg-card border-2 rounded-2xl overflow-hidden shadow-sm transition-colors
            ${isComplete ? 'border-[hsl(var(--biz-green))]' : 'border-border'}`}
        >
          {/* Day Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-[hsl(var(--biz-green))]/15 to-[hsl(var(--biz-green))]/5">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                ${isComplete ? 'bg-[hsl(var(--biz-green))]/10' : 'bg-[hsl(var(--biz-navy))]/10'}`}>
                <BarChart3 className={`w-6 h-6 ${isComplete ? 'text-[hsl(var(--biz-green))]' : 'text-[hsl(var(--biz-navy))]'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[hsl(var(--biz-navy))] uppercase tracking-wide">Day 3</span>
                  <span className="text-sm text-muted-foreground">⏱ 10 minutes</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Build Your Tracker</h2>
              </div>
            </div>
            <button
              onClick={onToggleComplete}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isComplete ? (
                <CheckSquare className="w-6 h-6 text-[hsl(var(--biz-green))]" />
              ) : (
                <Square className="w-6 h-6 text-muted-foreground" />
              )}
              <span className={`text-sm font-medium ${isComplete ? 'text-[hsl(var(--biz-green))]' : 'text-muted-foreground'}`}>
                {isComplete ? 'Completed' : 'Mark Done'}
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-6">
            {/* The Concept */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">The Concept</h3>
              <p className="text-muted-foreground leading-relaxed">
                Data without organization is just noise. A simple spreadsheet (or Airtable, or Notion) turns feedback into patterns.
              </p>
            </div>

            {/* Action Items */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Action Items</h3>
              <div className="space-y-3">
                {ACTION_ITEMS.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Checkbox id={`day3-action-${index}`} className="mt-1" />
                    <label htmlFor={`day3-action-${index}`} className="text-foreground cursor-pointer">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracker Preview */}
            <div className="bg-[hsl(var(--biz-teal))]/8 border border-[hsl(var(--biz-teal))]/20 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">Tracker Columns Preview:</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium text-muted-foreground">Date</th>
                      <th className="text-left p-2 font-medium text-muted-foreground">Channel</th>
                      <th className="text-left p-2 font-medium text-muted-foreground">Customer</th>
                      <th className="text-left p-2 font-medium text-muted-foreground">Feedback</th>
                      <th className="text-left p-2 font-medium text-muted-foreground">Category</th>
                      <th className="text-left p-2 font-medium text-muted-foreground">Sentiment</th>
                      <th className="text-left p-2 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRACKER_PREVIEW.map((row, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="p-2 text-foreground">{row.date}</td>
                        <td className="p-2 text-foreground">{row.channel}</td>
                        <td className="p-2 text-foreground">{row.customer}</td>
                        <td className="p-2 text-foreground italic">{row.feedback}</td>
                        <td className="p-2 text-foreground">{row.category}</td>
                        <td className="p-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium
                            ${row.sentiment === 'Positive' ? 'bg-[hsl(var(--biz-green))]/15 text-[hsl(var(--biz-green))]' : 'bg-destructive/15 text-destructive'}`}>
                            {row.sentiment}
                          </span>
                        </td>
                        <td className="p-2 text-foreground">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Tip */}
            <div className="bg-[hsl(var(--biz-gold))]/20 border border-[hsl(var(--biz-gold))]/40 rounded-xl p-4 md:p-5">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Quick Tip</span>
                  <p className="text-muted-foreground mt-1">
                    "Prefer a different tool? Airtable, Notion, or even a sticky note on your desk works. Consistency matters more than perfection."
                  </p>
                </div>
              </div>
            </div>

            {/* Template Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={() => handleTemplateClick('Google Sheets')}
                className="gap-2"
              >
                <FileSpreadsheet className="w-4 h-4 text-[hsl(var(--biz-green))]" />
                Google Sheets Template
                <ExternalLink className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleTemplateClick('Airtable')}
                className="gap-2"
              >
                <BarChart3 className="w-4 h-4 text-[hsl(var(--biz-blue))]" />
                Airtable Template
                <ExternalLink className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleTemplateClick('Excel')}
                className="gap-2"
              >
                <FileSpreadsheet className="w-4 h-4 text-[hsl(var(--biz-green))]" />
                Excel Template
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>

            {/* Coaching CTA */}
            <div className="bg-[hsl(var(--biz-navy))]/5 border border-[hsl(var(--biz-navy))]/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--biz-navy))]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-[hsl(var(--biz-navy))]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">Expert Help Available</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Getting stuck with setup? Book a 20-minute setup call with a coach. They've helped 500+ businesses configure this.
                  </p>
                  <Button asChild variant="secondary" size="sm">
                    <Link to="/bizguides">
                      Schedule Setup Call
                      <span className="ml-2 text-xs text-[hsl(var(--biz-green))]">FREE for BizGrowth users</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module5Day3;
