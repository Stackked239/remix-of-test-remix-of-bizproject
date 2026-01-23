import { useState } from "react";
import { motion } from "framer-motion";
import { Info, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const RACI_LEGEND = [
  { letter: "R", label: "Responsible", desc: "Does the work" },
  { letter: "A", label: "Accountable", desc: "Makes final decisions, owns outcome" },
  { letter: "C", label: "Consulted", desc: "Provides input before decisions" },
  { letter: "I", label: "Informed", desc: "Kept in the loop after decisions" }
];

const RACI_MATRIX = [
  { task: "Daily feedback review", owner: "I", cx: "R", support: "R", marketing: "I" },
  { task: "Weekly pattern analysis", owner: "C", cx: "A", support: "R", marketing: "C" },
  { task: "Loop closure on detractors", owner: "I", cx: "A", support: "R", marketing: "I" },
  { task: "Monthly metrics report", owner: "A", cx: "R", support: "C", marketing: "I" },
  { task: "Action plan decisions", owner: "A", cx: "R", support: "C", marketing: "C" },
  { task: "VoC program ownership", owner: "A", cx: "R", support: "I", marketing: "I" }
];

const getRACIColor = (letter: string) => {
  switch (letter) {
    case "R": return "bg-[hsl(var(--biz-green))]/20 text-[hsl(var(--biz-green))]";
    case "A": return "bg-[hsl(var(--biz-navy))]/20 text-[hsl(var(--biz-navy))]";
    case "C": return "bg-[hsl(var(--biz-yellow))]/20 text-[hsl(var(--biz-yellow))]";
    case "I": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const Module6RACI = () => {
  const { toast } = useToast();
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const handleDownload = () => {
    toast({
      title: "Download Started!",
      description: "Your Team Alignment Worksheet is downloading.",
    });
  };

  return (
    <section id="ownership-raci" className="py-12 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--biz-navy))]/10 text-[hsl(var(--biz-navy))] text-sm font-medium mb-4">
            Section 05
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Assigning Ownership: Who Does What?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            The #1 reason VoC programs fail? No clear owner. Everyone assumes someone else is handling it. 
            Use this RACI model to assign accountability.
          </p>
        </div>

        {/* RACI Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {RACI_LEGEND.map((item) => (
            <div key={item.letter} className="bg-card border rounded-lg p-4 text-center">
              <div className={`inline-flex w-10 h-10 rounded-full items-center justify-center text-lg font-bold mb-2 ${getRACIColor(item.letter)}`}>
                {item.letter}
              </div>
              <h4 className="font-semibold text-foreground">{item.label}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* RACI Matrix */}
        <div className="bg-card border rounded-xl overflow-hidden mb-6">
          <div className="p-4 border-b bg-muted/50">
            <h3 className="font-semibold text-foreground">VoC RACI Matrix Template</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-muted/30">
                  <th className="text-left p-4 font-medium text-foreground">VoC Task</th>
                  <th className="text-center p-4 font-medium text-foreground">Owner / Founder</th>
                  <th className="text-center p-4 font-medium text-foreground">CX / Operations</th>
                  <th className="text-center p-4 font-medium text-foreground">Support Team</th>
                  <th className="text-center p-4 font-medium text-foreground">Marketing</th>
                </tr>
              </thead>
              <tbody>
                {RACI_MATRIX.map((row, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-4 text-foreground">{row.task}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex w-8 h-8 rounded-full items-center justify-center font-bold ${getRACIColor(row.owner)}`}>
                        {row.owner}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex w-8 h-8 rounded-full items-center justify-center font-bold ${getRACIColor(row.cx)}`}>
                        {row.cx}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex w-8 h-8 rounded-full items-center justify-center font-bold ${getRACIColor(row.support)}`}>
                        {row.support}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex w-8 h-8 rounded-full items-center justify-center font-bold ${getRACIColor(row.marketing)}`}>
                        {row.marketing}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t bg-muted/30">
            <p className="text-sm text-muted-foreground italic">
              Adjust for your team size. Solo owner? You're R and A for everything. That's okay — 
              but document it so you know what you're committing to.
            </p>
          </div>
        </div>

        {/* Download CTA */}
        <div className="flex flex-col md:flex-row items-center gap-4 p-6 bg-card border rounded-xl">
          <Download className="w-8 h-8 text-[hsl(var(--biz-green))]" />
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-semibold text-foreground">Download: Team Alignment Worksheet</h4>
            <p className="text-sm text-muted-foreground">Editable RACI matrix + role assignment template for your team</p>
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

export default Module6RACI;
