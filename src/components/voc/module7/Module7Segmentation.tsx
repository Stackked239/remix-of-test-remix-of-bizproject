import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Target, DollarSign, Briefcase, Lightbulb, Download, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SEGMENTATION_MODELS = [
  {
    id: "lifecycle",
    title: "Lifecycle Stage Segmentation",
    icon: Target,
    description: "Segment by customer journey stage",
    segments: [
      { name: "New/Trial", priority: "Are we delivering on our promise?" },
      { name: "Growing", priority: "What's working? What's missing?" },
      { name: "Core/Loyal", priority: "How do we keep you?" },
      { name: "At-Risk", priority: "What went wrong?" }
    ],
    pros: "Catches churn early, identifies upsell opportunities",
    cons: "Can overlap (new to feature but loyal overall)",
    bestFor: "Reducing churn"
  },
  {
    id: "value",
    title: "Revenue/Value Segmentation",
    icon: DollarSign,
    description: "Segment by customer value",
    segments: [
      { name: "VIP/Strategic", priority: "Executive reviews, dedicated success" },
      { name: "Core/Valuable", priority: "Regular surveys, feature requests" },
      { name: "Growth/Small", priority: "Enable success, remove barriers" },
      { name: "Transactional", priority: "Self-service feedback, automation" }
    ],
    pros: "Allocates resources to highest-impact customers",
    cons: "Can feel cold to lower-revenue customers",
    bestFor: "Maximizing revenue"
  },
  {
    id: "needs",
    title: "Use Case/Needs-Based",
    icon: Briefcase,
    description: "Segment by how customers use your product",
    segments: [
      { name: "Use Case A", priority: "Feature priorities for this use case" },
      { name: "Use Case B", priority: "Different onboarding path" },
      { name: "Use Case C", priority: "Tailored help resources" }
    ],
    pros: "Addresses root needs, not surface preferences",
    cons: "Requires deeper customer understanding",
    bestFor: "Product-led companies"
  }
];

const DECISION_QUESTIONS = [
  {
    question: "What's your primary VoC goal?",
    options: [
      { label: "Reduce churn", result: "lifecycle" },
      { label: "Maximize revenue per customer", result: "value" },
      { label: "Improve product for use cases", result: "needs" }
    ]
  }
];

const Module7Segmentation = () => {
  const { toast } = useToast();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [decisionResult, setDecisionResult] = useState<string | null>(null);

  const handleDownload = (asset: string) => {
    toast({ title: "Download Started!", description: `${asset} is downloading.` });
  };

  return (
    <section id="segmentation" className="py-16 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--biz-green))]/15 text-[hsl(var(--biz-green))] text-sm font-medium mb-4">
            Section 02
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Customer Segmentation: Stop Treating Everyone the Same
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A complaint about price from a new customer is very different from the same complaint from a 5-year loyal customer. Smart segmentation means better action.
          </p>
        </div>

        {/* Why Segmentation Changes Everything */}
        <div className="bg-card border rounded-xl p-6 md:p-8 mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Why Segmentation Changes Everything</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-[hsl(var(--biz-green))]/10 rounded-lg text-center">
              <p className="text-2xl font-bold text-[hsl(var(--biz-green))]">30%</p>
              <p className="text-xs text-muted-foreground">NPS improvement with segmentation</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-[hsl(var(--biz-navy))]">↑</p>
              <p className="text-xs text-muted-foreground">Targeted actions that stick</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-[hsl(var(--biz-navy))]">↓</p>
              <p className="text-xs text-muted-foreground">Reduced at-risk churn</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-[hsl(var(--biz-navy))]">✓</p>
              <p className="text-xs text-muted-foreground">Better prioritization</p>
            </div>
          </div>
        </div>

        {/* Three Segmentation Models */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {SEGMENTATION_MODELS.map((model) => {
            const Icon = model.icon;
            const isSelected = selectedModel === model.id;
            
            return (
              <motion.button
                key={model.id}
                onClick={() => setSelectedModel(isSelected ? null : model.id)}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  isSelected 
                    ? 'border-[hsl(var(--biz-green))] bg-[hsl(var(--biz-green))]/5' 
                    : 'border-border bg-card hover:border-muted-foreground/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 rounded-lg bg-[hsl(var(--biz-green))]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[hsl(var(--biz-green))]" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{model.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
                
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t pt-4 mt-4"
                  >
                    <div className="space-y-2 mb-4">
                      {model.segments.map((seg, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-[hsl(var(--biz-green))] flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-foreground">{seg.name}: </span>
                            <span className="text-muted-foreground text-sm">{seg.priority}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-[hsl(var(--biz-green))]">✓ {model.pros}</p>
                    <p className="text-xs text-muted-foreground">⚠️ {model.cons}</p>
                    <p className="text-xs font-medium text-foreground mt-2">Best for: {model.bestFor}</p>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Decision Framework */}
        <div className="bg-[hsl(var(--biz-teal))]/8 border border-[hsl(var(--biz-teal))]/20 rounded-xl p-6 md:p-8 mb-8">
          <h3 className="text-xl font-bold text-foreground mb-6">Choosing Your Model</h3>
          
          <div className="mb-6">
            <p className="font-medium text-foreground mb-4">{DECISION_QUESTIONS[0].question}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {DECISION_QUESTIONS[0].options.map((option) => (
                <Button
                  key={option.result}
                  variant={decisionResult === option.result ? "default" : "outline"}
                  onClick={() => setDecisionResult(option.result)}
                  className={decisionResult === option.result ? "bg-[hsl(var(--biz-green))] text-white" : ""}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {decisionResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-background rounded-lg"
            >
              <p className="font-medium text-foreground mb-2">
                Recommendation: {SEGMENTATION_MODELS.find(m => m.id === decisionResult)?.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {SEGMENTATION_MODELS.find(m => m.id === decisionResult)?.pros}
              </p>
            </motion.div>
          )}
        </div>

        {/* Key Takeaway */}
        <div className="bg-[hsl(var(--biz-gold))]/20 border border-[hsl(var(--biz-gold))]/40 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
            <p className="text-foreground">
              <strong>Key Takeaway:</strong> One feedback statement has 10 different meanings depending on the segment. Segmentation is how you find the real meaning.
            </p>
          </div>
        </div>

        {/* Downloads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Segmentation Worksheet", format: "Excel" },
            { title: "Sample Segment Profiles", format: "PDF" },
            { title: "Segment-to-Action Mapping", format: "PDF" }
          ].map((asset) => (
            <Button
              key={asset.title}
              variant="outline"
              onClick={() => handleDownload(asset.title)}
              className="justify-start gap-2 h-auto py-3"
            >
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

export default Module7Segmentation;
