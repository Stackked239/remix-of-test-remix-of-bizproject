import { motion } from "framer-motion";
import { Clock, BarChart3, CheckCircle, MessageSquare, Globe, RefreshCw, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Module2Hero = () => {
  const componentPreviews = [
    { icon: MessageSquare, title: "Active + Passive", color: "from-blue-500 to-blue-600" },
    { icon: Globe, title: "Omnichannel", color: "from-emerald-500 to-emerald-600" },
    { icon: RefreshCw, title: "Close the Loop", color: "from-amber-500 to-amber-600" },
    { icon: Database, title: "Centralized Data", color: "from-purple-500 to-purple-600" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[hsl(var(--biz-navy))] via-[hsl(var(--biz-navy))]/95 to-[hsl(var(--biz-blue))] text-white py-16 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Module Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="bg-[hsl(var(--biz-gold))]/20 text-[hsl(var(--biz-gold))] border-[hsl(var(--biz-gold))]/30 mb-6">
            Module 2 of 7
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          The Four Core Components
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
        >
          Every effective VoC program has these four elements working together. 
          Get all four right, and you'll have a self-reinforcing system.
        </motion.p>

        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 text-sm mb-12"
        >
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[hsl(var(--biz-gold))]" />
            18-22 minutes
          </span>
          <span className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-[hsl(var(--biz-gold))]" />
            Module 2 of 7
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-[hsl(var(--biz-green))]" />
            Builds on Module 1
          </span>
        </motion.div>

        {/* 4 Component Preview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {componentPreviews.map((component, index) => (
            <motion.div
              key={component.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-colors"
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${component.color} flex items-center justify-center`}>
                <component.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-medium">{component.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Module2Hero;
