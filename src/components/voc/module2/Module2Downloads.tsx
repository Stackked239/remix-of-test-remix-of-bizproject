import { motion } from "framer-motion";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Module2Downloads = () => {
  const handleDownload = (format: string) => {
    toast.success(`${format} template ready! Check your downloads.`);
    // In production, trigger actual download
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Download className="h-8 w-8 text-[hsl(var(--biz-blue))]" />
            <h2 className="text-2xl font-bold text-foreground">Download Your Templates</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Primary Download */}
            <div className="bg-card border-2 border-[hsl(var(--biz-blue))]/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileSpreadsheet className="h-8 w-8 text-[hsl(var(--biz-blue))]" />
                <div>
                  <h3 className="font-bold text-foreground">Feedback Tracker Template</h3>
                  <p className="text-sm text-muted-foreground">Track all customer feedback in one place</p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-xs text-muted-foreground">Preview: Pre-built fields, sample data, and setup instructions included.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => handleDownload('Airtable')}>Airtable</Button>
                <Button size="sm" variant="outline" onClick={() => handleDownload('Excel')}>Excel</Button>
                <Button size="sm" variant="outline" onClick={() => handleDownload('Google Sheets')}>Google Sheets</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">⏱️ Use this within 10 minutes. Start tracking today.</p>
            </div>

            {/* Secondary Download */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-8 w-8 text-[hsl(var(--biz-gold))]" />
                <div>
                  <h3 className="font-bold text-foreground">Channel Prioritization Worksheet</h3>
                  <p className="text-sm text-muted-foreground">Identify your top 3 listening channels</p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-xs text-muted-foreground">Includes scoring system and implementation roadmap.</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => handleDownload('PDF')}>Download PDF</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module2Downloads;
