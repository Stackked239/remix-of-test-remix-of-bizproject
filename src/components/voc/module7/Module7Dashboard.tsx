import { motion } from "framer-motion";
import { BarChart3, Lightbulb, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const DASHBOARD_ESSENTIALS = [
  { title: "Real-time Sentiment Overview", desc: "Overall positive/neutral/negative at a glance" },
  { title: "Trend Indicators", desc: "Week-over-week, month-over-month changes" },
  { title: "Action Tracking", desc: "Open vs. closed loops by category" },
  { title: "Team Accountability", desc: "Ownership matrix showing who handles what" },
  { title: "Segment Performance", desc: "NPS/CSAT comparison by customer type" }
];

const Module7Dashboard = () => {
  const { toast } = useToast();

  const handleDownload = (asset: string) => {
    toast({ title: "Download Started!", description: `${asset} is downloading.` });
  };

  return (
    <section id="dashboard" className="py-16 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--biz-teal))]/15 text-[hsl(var(--biz-teal))] text-sm font-medium mb-4">
            Section 04
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Dashboard Setup & Visibility
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Where's all your feedback? How do you see trends? A dashboard turns scattered data into shared visibility.
          </p>
        </div>

        <div className="bg-card border rounded-xl p-6 md:p-8 mb-8">
          <h3 className="text-xl font-bold text-foreground mb-6">Dashboard Essentials: 5 Must-Have Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DASHBOARD_ESSENTIALS.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--biz-teal))] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[hsl(var(--biz-gold))]/20 border border-[hsl(var(--biz-gold))]/40 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
            <p className="text-foreground">
              <strong>Key Takeaway:</strong> What gets measured, gets managed. Your dashboard is your window into customer reality.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Google Sheets Dashboard", format: "Google Sheets" },
            { title: "Metrics Glossary", format: "PDF" }
          ].map((asset) => (
            <Button key={asset.title} variant="outline" onClick={() => handleDownload(asset.title)} className="justify-start gap-2 h-auto py-3">
              <Download className="w-4 h-4 text-[hsl(var(--biz-green))]" />
              <div className="text-left">
                <p className="font-medium">{asset.title}</p>
                <p className="text-xs text-muted-foreground">{asset.format}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Module7Dashboard;
