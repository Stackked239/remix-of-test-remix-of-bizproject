import { motion } from "framer-motion";
import { Download, FileText, Table, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { VOC_URLS } from "@/config/vocUrls";

const DOWNLOADS = [
  {
    title: "90-Day Implementation Roadmap",
    description: "Visual PDF showing all phases, weeks, and milestones. Print it and post it.",
    format: "PDF",
    size: "1.2 MB",
    icon: FileText,
    featured: true
  },
  {
    title: "Team Alignment Worksheet",
    description: "Editable RACI matrix and ownership assignment template for your team.",
    format: "Google Sheets",
    size: "245 KB",
    icon: Table,
    featured: false
  },
  {
    title: "Weekly Review Agenda",
    description: "Ready-to-use agenda for your 30-minute weekly VoC sync.",
    format: "PDF + DOCX",
    size: "156 KB",
    icon: FileText,
    featured: false
  }
];

const PREVIOUS_DOWNLOADS = [
  { text: "Feedback Tracker Template", url: VOC_URLS.modules[2].url },
  { text: "Survey Templates Bundle", url: VOC_URLS.modules[3].url },
  { text: "Loop Closure Email Templates", url: VOC_URLS.modules[4].url },
  { text: "7-Day Quick Start Checklist", url: VOC_URLS.modules[5].url }
];

const Module6Downloads = () => {
  const { toast } = useToast();

  const handleDownload = (title: string) => {
    toast({
      title: "Download Started!",
      description: `Your ${title} is downloading.`,
    });
  };

  return (
    <section id="downloads" className="py-12 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--biz-navy))]/10 text-[hsl(var(--biz-navy))] text-sm font-medium mb-4">
            Section 09
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your 90-Day VoC Toolkit
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Everything you need to implement what you learned. Download now, reference often.
          </p>
        </div>

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {DOWNLOADS.map((download, idx) => {
            const Icon = download.icon;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative bg-card border rounded-xl p-6 ${download.featured ? 'ring-2 ring-[hsl(var(--biz-green))]' : ''}`}
              >
                {download.featured && (
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-[hsl(var(--biz-green))] text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}
                <Icon className="w-10 h-10 text-[hsl(var(--biz-green))] mb-4" />
                <h4 className="font-semibold text-foreground mb-2">{download.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{download.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground">{download.format}</span>
                  <span className="text-xs text-muted-foreground">{download.size}</span>
                </div>
                <Button
                  onClick={() => handleDownload(download.title)}
                  className="w-full gap-2 bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Previously Unlocked */}
        <div className="bg-card border rounded-xl p-6">
          <h4 className="font-semibold text-foreground mb-4">Previously Unlocked (Modules 1-5)</h4>
          <div className="flex flex-wrap gap-3">
            {PREVIOUS_DOWNLOADS.map((item, idx) => (
              <Link 
                key={idx}
                to={item.url}
                className="px-4 py-2 bg-muted rounded-lg text-sm text-foreground hover:bg-muted/80 transition-colors"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Module6Downloads;
