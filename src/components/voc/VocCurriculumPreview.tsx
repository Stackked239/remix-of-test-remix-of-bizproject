import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Ear, 
  ClipboardList, 
  BarChart3, 
  Lightbulb, 
  RotateCcw, 
  Users, 
  TrendingUp,
  Clock,
  ChevronRight
} from "lucide-react";
import { VOC_URLS, getAllModules } from "@/config/vocUrls";

const iconMap: Record<number, React.ElementType> = {
  1: Ear,
  2: ClipboardList,
  3: BarChart3,
  4: Lightbulb,
  5: RotateCcw,
  6: Users,
  7: TrendingUp
};

const colorMap: Record<number, string> = {
  1: "biz-blue",
  2: "biz-green",
  3: "biz-gold",
  4: "biz-yellow",
  5: "biz-blue",
  6: "biz-green",
  7: "biz-gold"
};

const subtitleMap: Record<number, string> = {
  1: "Understand why customer feedback is your competitive advantage",
  2: "Master the four pillars of effective VoC",
  3: "Track the metrics that actually matter",
  4: "Show customers their voice leads to action",
  5: "Get your first win in just one week",
  6: "Build a sustainable 90-day VoC system",
  7: "Advanced techniques for scaling your VoC program"
};

const VocCurriculumPreview = () => {
  const modules = getAllModules();
  return (
    <section className="py-20 px-4 bg-background" id="curriculum">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-[hsl(var(--biz-green))]/10 text-[hsl(var(--biz-green))] font-heading text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            7 Modules
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Your Complete Learning Path
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each module builds on the last. Complete at your own pace — most owners finish in under 2 hours total.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const Icon = iconMap[module.number] || Ear;
            const color = colorMap[module.number] || "biz-blue";
            const subtitle = subtitleMap[module.number] || module.title;
            
            return (
              <motion.div
                key={module.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={module.url}
                  className="group block h-full bg-card border border-border rounded-xl p-6 hover:border-[hsl(var(--biz-green))]/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-[hsl(var(--${color}))]/10`}>
                      <Icon className={`h-6 w-6 text-[hsl(var(--${color}))]`} />
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Clock className="h-4 w-4" />
                      <span>~{module.duration} min</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Module {module.number}
                    </span>
                    {module.level && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        module.level === 'Beginner' ? 'bg-[hsl(var(--biz-green))]/10 text-[hsl(var(--biz-green))]' :
                        module.level === 'Intermediate' ? 'bg-[hsl(var(--biz-gold))]/10 text-[hsl(var(--biz-gold))]' :
                        'bg-[hsl(var(--biz-blue))]/10 text-[hsl(var(--biz-blue))]'
                      }`}>
                        {module.level}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-[hsl(var(--biz-green))] transition-colors">
                    {module.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {subtitle}
                  </p>
                  
                  <div className="flex items-center text-[hsl(var(--biz-green))] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Start Module</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Total time indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-muted/50 px-6 py-3 rounded-full">
            <Clock className="h-5 w-5 text-[hsl(var(--biz-green))]" />
            <span className="text-foreground font-medium">
              Total Learning Time: ~90 minutes
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VocCurriculumPreview;
