import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  AlertTriangle, 
  Lightbulb, 
  Smartphone, 
  MessageCircle, 
  Ticket, 
  FileText, 
  Mail, 
  MessagesSquare,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Quote
} from "lucide-react";

interface Module3SentimentProps {
  onView: () => void;
}

const Module3Sentiment = ({ onView }: Module3SentimentProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  const sources = [
    { icon: Smartphone, label: "Online reviews", desc: "Google, Yelp, industry sites" },
    { icon: MessageCircle, label: "Social media", desc: "Posts and comments" },
    { icon: Ticket, label: "Support tickets", desc: "Ticket text content" },
    { icon: FileText, label: "Survey responses", desc: "Open-ended answers" },
    { icon: Mail, label: "Email feedback", desc: "Direct messages" },
    { icon: MessagesSquare, label: "Chat transcripts", desc: "Live chat logs" },
  ];

  const categories = [
    {
      color: "green",
      icon: ThumbsUp,
      label: "POSITIVE",
      sentiment: "Happy, satisfied, enthusiastic",
      keywords: '"love," "great," "excellent," "amazing," "would recommend"',
      example: '"Best product I\'ve ever bought. Customer service was phenomenal!"'
    },
    {
      color: "red",
      icon: ThumbsDown,
      label: "NEGATIVE",
      sentiment: "Unhappy, frustrated, angry",
      keywords: '"terrible," "hate," "disappointed," "broken," "waste of money"',
      example: '"Ordered 2 weeks ago, still waiting. Support ignored my emails."'
    },
    {
      color: "gray",
      icon: Minus,
      label: "NEUTRAL",
      sentiment: "Factual, no strong emotion",
      keywords: '"okay," "fine," "average," "as expected"',
      example: '"It does what it says. Nothing special, nothing wrong."'
    },
  ];

  const diySteps = [
    { step: "Collect", desc: "Read your last 20 reviews, support tickets, or social posts" },
    { step: "Tag", desc: "For each, write: Positive, Negative, or Neutral" },
    { step: "Calculate", desc: "Count up. What percentage is each?" },
    { step: "Repeat", desc: "Do this monthly. Watch for trends." },
    { step: "Investigate", desc: "Sentiment dropped? Something changed. Find it and fix it." },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Sentiment Analysis: Reading the Mood
        </motion.h2>

        {/* What It Measures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-3">What It Measures</h3>
          <p className="text-muted-foreground leading-relaxed">
            The emotional tone behind customer feedback — positive, negative, or neutral. 
            It answers: <strong className="text-foreground">"Is my customer base happy, frustrated, or indifferent?"</strong>
          </p>
        </motion.div>

        {/* Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Sources to Analyze</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sources.map((source, i) => (
              <div key={i} className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                <source.icon className="h-5 w-5 text-[hsl(var(--biz-blue))]" />
                <div>
                  <p className="text-sm font-medium text-foreground">{source.label}</p>
                  <p className="text-xs text-muted-foreground">{source.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Two Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">Two Methods</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border rounded-xl p-5">
              <h4 className="font-semibold text-foreground mb-2">Method 1: Manual Tagging</h4>
              <p className="text-sm text-muted-foreground mb-3">Read feedback yourself and tag as Positive, Negative, or Neutral</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-600">✓ Accurate for nuance</span>
                  <span className="text-red-500">✗ Time-consuming</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">✓ Catches context</span>
                  <span className="text-red-500">✗ Doesn't scale</span>
                </div>
              </div>
            </div>
            <div className="bg-card border rounded-xl p-5">
              <h4 className="font-semibold text-foreground mb-2">Method 2: AI/Automated Tools</h4>
              <p className="text-sm text-muted-foreground mb-3">Software analyzes text automatically</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-600">✓ Fast, scales well</span>
                  <span className="text-red-500">✗ Can miss sarcasm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">✓ Consistent</span>
                  <span className="text-red-500">✗ Costs money</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* The Three Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">The Three Categories</h3>
          <div className="space-y-4">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`border-l-4 rounded-r-xl p-5 ${
                  cat.color === 'green' 
                    ? 'bg-green-50 dark:bg-green-900/10 border-green-500' 
                    : cat.color === 'red'
                      ? 'bg-red-50 dark:bg-red-900/10 border-red-500'
                      : 'bg-muted/50 border-muted-foreground'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <cat.icon className={`h-5 w-5 ${
                    cat.color === 'green' ? 'text-green-500' : 
                    cat.color === 'red' ? 'text-red-500' : 'text-muted-foreground'
                  }`} />
                  <h4 className="font-semibold text-foreground">{cat.label}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  <strong>Sentiment:</strong> {cat.sentiment}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Keywords:</strong> {cat.keywords}
                </p>
                <p className="text-sm italic text-foreground">
                  <strong>Example:</strong> {cat.example}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real Business Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-[hsl(var(--biz-blue))]/5 to-[hsl(var(--biz-green))]/5 border-l-4 border-[hsl(var(--biz-blue))] rounded-r-xl p-6 mb-8"
        >
          <Quote className="absolute top-4 right-4 h-8 w-8 text-[hsl(var(--biz-blue))]/20" />
          <h4 className="font-semibold text-foreground mb-3">Real Business Example</h4>
          <p className="text-muted-foreground mb-3">A bakery in Portland tracked review sentiment monthly.</p>
          
          <div className="bg-background rounded-lg p-4 mb-3">
            <p className="text-sm font-medium text-foreground mb-2">Finding:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <span className="text-green-500 font-medium">Croissants:</span> 100% positive ("flaky," "best in town")</li>
              <li>• <span className="text-red-500 font-medium">Coffee:</span> 70% negative ("weak," "bland," "tastes instant")</li>
            </ul>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Action:</strong> Switched to a local specialty roaster, promoted new brew on social media.
          </p>
          <p className="text-sm text-[hsl(var(--biz-green))] font-medium">
            <strong>Result:</strong> Repeat visits up 20% in 3 months.
          </p>
          <p className="text-sm text-muted-foreground mt-3 italic">
            The information was ALREADY in their reviews. They just needed to organize it to see it.
          </p>
        </motion.div>

        {/* DIY Sentiment Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[hsl(var(--biz-green))]/5 border border-[hsl(var(--biz-green))]/20 rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">DIY Sentiment Analysis (Start Today)</h3>
          <p className="text-muted-foreground mb-4">Simple process anyone can do TODAY:</p>
          <div className="space-y-3">
            {diySteps.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[hsl(var(--biz-green))] text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <span className="font-medium text-foreground">{item.step}: </span>
                  <span className="text-muted-foreground">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tools to Try */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[hsl(var(--biz-blue))]/5 border border-[hsl(var(--biz-blue))]/20 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="h-5 w-5 text-[hsl(var(--biz-blue))]" />
            <h4 className="font-semibold text-foreground">Tools to Try (Beginner-Friendly)</h4>
          </div>
          <p className="text-muted-foreground mb-4">You DON'T need expensive software to start:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-background rounded-lg p-4">
              <p className="font-medium text-foreground text-sm mb-1">Google Sheets (Free)</p>
              <p className="text-xs text-muted-foreground">Create tracker, tag manually, use COUNTIF()</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="font-medium text-foreground text-sm mb-1">Sprout Social (Free tier)</p>
              <p className="text-xs text-muted-foreground">Monitor social mentions, basic sentiment</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="font-medium text-foreground text-sm mb-1">MonkeyLearn (Free tier)</p>
              <p className="text-xs text-muted-foreground">Paste text, get sentiment tags</p>
            </div>
          </div>
        </motion.div>

        {/* Common Mistake */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[hsl(var(--biz-gold))]/10 border-l-4 border-[hsl(var(--biz-gold))] rounded-r-xl p-5"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Common Mistake</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                "Tracking sentiment without asking WHY. If 30% of your feedback is negative, 
                you need to know <em>specifically</em> what the complaints are."
              </p>
              <p className="text-sm text-foreground mt-2">
                <strong>'Negative sentiment'</strong> is data. <strong>'Customers complain about shipping time'</strong> is insight.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module3Sentiment;
