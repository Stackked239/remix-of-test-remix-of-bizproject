import { motion } from "framer-motion";
import { FileText, Table, Calculator, Mail, CheckSquare, Download, ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { vocState } from "@/state/vocStateManager";

const Module3Downloads = () => {
  const handleDownload = (toolId: string) => {
    vocState.trackDownload(toolId, 3);
    // In production, this would trigger actual file download
    console.log(`Downloading: ${toolId}`);
  };

  const assets = [
    {
      icon: FileText,
      title: "Survey Question Library",
      description: "12 pre-written questions organized by metric type (NPS, CSAT, CES)",
      meta: "PDF • 1.2 MB",
      toolId: "survey-question-library",
      action: "Download PDF"
    },
    {
      icon: Table,
      title: "Feedback Tracker Spreadsheet",
      description: "Ready-to-use Google Sheet with columns for tracking feedback across channels. Auto-calculates sentiment breakdown.",
      meta: "Google Sheets • Editable",
      toolId: "feedback-tracker-sheet",
      action: "Open in Sheets",
      external: true
    },
    {
      icon: Calculator,
      title: "NPS Calculator Spreadsheet",
      description: "Drop in your response data. Auto-calculates NPS, segments, and compares to benchmarks.",
      meta: "Excel/Sheets • 500 KB",
      toolId: "nps-calculator-sheet",
      action: "Download Template"
    },
    {
      icon: Mail,
      title: "Close-the-Loop Email Templates",
      description: "5 email templates for responding to feedback: positive, negative, feature request, resolution follow-up, and 'You Asked, We Delivered' announcements.",
      meta: "PDF + Word • 800 KB",
      toolId: "email-templates",
      action: "Download Templates"
    },
    {
      icon: CheckSquare,
      title: "7-Day Implementation Checklist",
      description: "Print this out and check it off as you go. Print-friendly, includes space for notes.",
      meta: "PDF • 200 KB",
      toolId: "7day-checklist",
      action: "Download Checklist"
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Module 3 Toolkit
          </h2>
          <p className="text-lg text-muted-foreground">
            Download templates to start measuring this week
          </p>
        </motion.div>

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {assets.map((asset, index) => (
            <motion.div
              key={asset.toolId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border rounded-xl p-5 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--biz-blue))]/10 flex items-center justify-center mb-4">
                <asset.icon className="h-6 w-6 text-[hsl(var(--biz-blue))]" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{asset.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 flex-1">{asset.description}</p>
              <div className="text-xs text-muted-foreground mb-4">{asset.meta}</div>
              <Button
                onClick={() => handleDownload(asset.toolId)}
                className="w-full bg-[hsl(var(--biz-blue))] hover:bg-[hsl(var(--biz-blue))]/90"
              >
                {asset.external ? (
                  <ExternalLink className="h-4 w-4 mr-2" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                {asset.action}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Coaching CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[hsl(var(--biz-blue))]/10 via-[hsl(var(--biz-green))]/10 to-[hsl(var(--biz-gold))]/10 border rounded-xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--biz-green))]/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="h-8 w-8 text-[hsl(var(--biz-green))]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Feeling overwhelmed?
              </h3>
              <p className="text-muted-foreground">
                You don't have to do this alone. Our VoC coaches have helped 500+ businesses 
                measure what matters and grow faster. We'll help you set up your system, 
                analyze your first feedback, and close the loop.
              </p>
            </div>
            <Link to="/bizguides">
              <Button 
                variant="outline" 
                size="lg"
                className="border-[hsl(var(--biz-green))] text-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/10"
              >
                Let's Talk
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module3Downloads;
