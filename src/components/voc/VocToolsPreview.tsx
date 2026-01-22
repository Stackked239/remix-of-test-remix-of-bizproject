import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FileText, 
  BarChart2, 
  Mail, 
  MessageSquare,
  Download,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
  {
    name: "Customer Feedback Template",
    description: "Ready-to-use survey templates for collecting actionable feedback",
    icon: FileText,
    status: "included"
  },
  {
    name: "VoC Analysis Spreadsheet",
    description: "Track, categorize, and prioritize customer insights",
    icon: BarChart2,
    status: "included"
  },
  {
    name: "Email Scripts Library",
    description: "Follow-up templates that get responses",
    icon: Mail,
    status: "included"
  },
  {
    name: "Response Framework",
    description: "How to respond to feedback (positive and negative)",
    icon: MessageSquare,
    status: "included"
  }
];

const VocToolsPreview = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-[hsl(var(--biz-gold))]/10 text-[hsl(var(--biz-gold))] font-heading text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Tools Included
            </span>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Everything You Need to Start Today
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Each module includes downloadable templates, scripts, and frameworks you can use immediately. 
              No fancy software required — just the essentials that actually work.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                variant="default"
                className="bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90"
              >
                <Link to="/bizgrowth/voice-of-customer-checklist">
                  <Download className="h-4 w-4 mr-2" />
                  Get Free VoC Checklist
                </Link>
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Find Your Starting Point
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Right side - tools grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--biz-gold))]/50 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[hsl(var(--biz-gold))]/10">
                    <tool.icon className="h-5 w-5 text-[hsl(var(--biz-gold))]" />
                  </div>
                  <span className="text-xs font-medium text-[hsl(var(--biz-green))] uppercase tracking-wide">
                    {tool.status}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VocToolsPreview;
