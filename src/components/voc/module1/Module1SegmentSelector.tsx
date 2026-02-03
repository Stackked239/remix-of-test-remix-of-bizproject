import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const segments = [
  {
    id: 'launch',
    emoji: '🚀',
    title: 'Launch',
    subtitle: '0-3 years old',
    description: 'Finding product-market fit',
    color: 'hsl(var(--biz-green))',
    borderColor: 'border-[hsl(var(--biz-green))]',
    bgColor: 'bg-[hsl(var(--biz-green))]/10',
  },
  {
    id: 'growth',
    emoji: '📈',
    title: 'Growth',
    subtitle: '3-5 years old',
    description: 'Building team & systems',
    color: '#3B82F6',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'scaling',
    emoji: '🎯',
    title: 'Scaling',
    subtitle: '5-10 years old',
    description: 'Expanding market presence',
    color: '#8B5CF6',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: 'enterprise',
    emoji: '🏢',
    title: 'Enterprise',
    subtitle: '10+ years old',
    description: 'Complex operations',
    color: '#EC4899',
    borderColor: 'border-pink-500',
    bgColor: 'bg-pink-500/10',
  },
];

interface Module1SegmentSelectorProps {
  selectedSegment: string | null;
  onSelect: (segment: string) => void;
  onContinue: () => void;
  quizCompleted: boolean;
}

const Module1SegmentSelector = ({
  selectedSegment,
  onSelect,
  onContinue,
  quizCompleted,
}: Module1SegmentSelectorProps) => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
            Quick Question: What Stage Is Your Business?
          </h2>

          <p className="text-muted-foreground mb-10">
            We'll customize the rest of this curriculum based on your answer. You can always change this later.
          </p>

          {/* Segment Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {segments.map((segment) => (
              <button
                key={segment.id}
                onClick={() => onSelect(segment.id)}
                className={`p-5 rounded-xl border-2 text-center transition-all ${
                  selectedSegment === segment.id
                    ? `${segment.borderColor} ${segment.bgColor} shadow-lg`
                    : "border-border bg-background hover:border-muted-foreground/50"
                }`}
              >
                <span className="text-3xl block mb-2">{segment.emoji}</span>
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {segment.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">{segment.subtitle}</p>
                <p className="text-sm text-foreground">{segment.description}</p>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <div className="space-y-4">
            <Button
              onClick={onContinue}
              disabled={!selectedSegment || !quizCompleted}
              className="bg-[hsl(var(--biz-yellow))] hover:bg-[hsl(var(--biz-yellow))]/90 text-[hsl(var(--biz-blue))] font-semibold text-base px-10 py-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Module Completion
            </Button>

            {!selectedSegment && (
              <p className="text-sm text-muted-foreground">
                Please select your business stage to continue
              </p>
            )}

            {!quizCompleted && selectedSegment && (
              <p className="text-sm text-muted-foreground">
                Please complete the self-assessment above first
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module1SegmentSelector;
