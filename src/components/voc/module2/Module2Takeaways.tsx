import { motion } from "framer-motion";
import { CheckCircle, MessageSquare, Globe, RefreshCw, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Module2TakeawaysProps {
  onAcknowledge: () => void;
  acknowledged: boolean;
}

const Module2Takeaways = ({ onAcknowledge, acknowledged }: Module2TakeawaysProps) => {
  const takeaways = [
    { icon: MessageSquare, number: 1, title: "Collect BOTH Active AND Passive Feedback", description: "Active (you ask) + Passive (they share anyway) = complete picture" },
    { icon: Globe, number: 2, title: "Listen Across Multiple Channels", description: "Different customers use different channels. One channel = massive blind spots." },
    { icon: RefreshCw, number: 3, title: "Close the Loop With Customers", description: "Respond + act + tell them what changed = 12-21% retention boost" },
    { icon: Database, number: 4, title: "Centralize All Data in ONE Place", description: "Can be a spreadsheet — the tool doesn't matter, the habit does." },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[hsl(var(--biz-blue))]/5 to-[hsl(var(--biz-green))]/5 border-2 border-[hsl(var(--biz-blue))]/20 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Key Takeaways: The Four Components</h2>
          <div className="space-y-4">
            {takeaways.map((item) => (
              <div key={item.number} className="flex items-start gap-4 p-4 bg-background rounded-lg">
                <div className="w-10 h-10 bg-[hsl(var(--biz-blue))] rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={onAcknowledge}
            disabled={acknowledged}
            className="w-full mt-6 bg-[hsl(var(--biz-blue))] hover:bg-[hsl(var(--biz-blue))]/90"
          >
            {acknowledged ? (
              <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> I Understand the Components</span>
            ) : "I Understand the Components"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Module2Takeaways;
