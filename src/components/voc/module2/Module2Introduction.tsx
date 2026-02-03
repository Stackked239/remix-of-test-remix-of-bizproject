import { motion } from "framer-motion";
import { MessageSquare, Globe, RefreshCw, Database, ArrowRight } from "lucide-react";

const Module2Introduction = () => {
  const components = [
    { 
      icon: MessageSquare, 
      title: "Collect", 
      subtitle: "Active + Passive",
      color: "bg-blue-500"
    },
    { 
      icon: Globe, 
      title: "Listen", 
      subtitle: "Omnichannel",
      color: "bg-emerald-500"
    },
    { 
      icon: RefreshCw, 
      title: "Respond", 
      subtitle: "Close the Loop",
      color: "bg-amber-500"
    },
    { 
      icon: Database, 
      title: "Centralize", 
      subtitle: "One Place",
      color: "bg-purple-500"
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            The VoC System That Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get all four components right, and you'll have a <strong className="text-foreground">self-reinforcing system</strong> that 
            gets better over time. Miss one, and you'll wonder why things aren't clicking.
          </p>
        </motion.div>

        {/* Connected Components Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0"
        >
          {components.map((component, index) => (
            <div key={component.title} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 ${component.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <component.icon className="h-8 w-8 text-white" />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-semibold text-foreground">{component.title}</p>
                  <p className="text-xs text-muted-foreground">{component.subtitle}</p>
                </div>
              </div>
              {index < components.length - 1 && (
                <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground mx-4" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Explanation Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/20 rounded-xl p-6"
        >
          <p className="text-center text-foreground">
            <span className="font-semibold">In this module:</span> You'll learn exactly what each component does, 
            why it matters, and how to implement it — starting today.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Module2Introduction;
