import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, AlertCircle, MessageSquare, Ear, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Module2Component1Props {
  onComplete: () => void;
}

const Module2Component1 = ({ onComplete }: Module2Component1Props) => {
  const [selectedActive, setSelectedActive] = useState<string | null>(null);
  const [selectedPassive, setSelectedPassive] = useState<string[]>([]);
  const [selectionSaved, setSelectionSaved] = useState(false);

  const activeMethods = [
    { id: 'email-survey', label: 'Post-purchase email survey' },
    { id: 'nps-survey', label: 'Quarterly NPS survey' },
    { id: 'exit-survey', label: 'Exit survey when someone cancels' },
    { id: 'interviews', label: 'Call 5 customers this month' },
  ];

  const passiveMethods = [
    { id: 'google-reviews', label: 'Google Reviews' },
    { id: 'support-tickets', label: 'Support tickets' },
    { id: 'social-media', label: 'Social media mentions' },
    { id: 'sales-notes', label: 'Sales call notes' },
    { id: 'website-analytics', label: 'Website analytics' },
  ];

  const handleActiveSelect = (id: string) => {
    setSelectedActive(id);
  };

  const handlePassiveToggle = (id: string) => {
    setSelectedPassive(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length < 2) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const canProceed = selectedActive && selectedPassive.length === 2;

  const handleSaveSelection = () => {
    if (canProceed) {
      setSelectionSaved(true);
      onComplete();
      // Save to localStorage for persistence
      localStorage.setItem('voc_module2_sources', JSON.stringify({
        active: selectedActive,
        passive: selectedPassive
      }));
    }
  };

  return (
    <section id="component-1" className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
            1
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Active + Passive Feedback Collection
          </h2>
        </motion.div>

        {/* The Mistake Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2">THE COMMON MISTAKE</h3>
              <p className="text-amber-700 dark:text-amber-300 font-medium mb-2">"VoC = surveys"</p>
              <p className="text-amber-700 dark:text-amber-300">
                Most businesses think feedback collection is just sending surveys. That's only half the picture.
              </p>
              <p className="text-amber-800 dark:text-amber-200 font-medium mt-2">
                Reality: You need BOTH active AND passive feedback to see the complete picture.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Active Feedback */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card border rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">ACTIVE FEEDBACK</h3>
                <p className="text-sm text-muted-foreground">You Ask Directly</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">
              This is feedback you solicit — you initiate the conversation.
            </p>

            <h4 className="font-semibold text-foreground mb-2">Methods:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Email or text surveys
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Customer interviews (phone, video, in-person)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Focus groups
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Post-purchase questionnaires
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Exit interviews when someone cancels
              </li>
            </ul>

            {/* Best For */}
            <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/20 rounded-lg p-4 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-[hsl(var(--biz-green))]" />
                <span className="font-semibold text-[hsl(var(--biz-green))]">BEST FOR:</span>
              </div>
              <ul className="text-sm text-foreground space-y-1">
                <li>• Getting specific answers</li>
                <li>• Measuring satisfaction at moments</li>
                <li>• Testing new ideas before investing</li>
              </ul>
            </div>

            {/* Watch Out */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="font-semibold text-amber-700 dark:text-amber-300">WATCH OUT FOR:</span>
              </div>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                <li>• Survey fatigue (too many requests)</li>
                <li>• Response bias (only extremes reply)</li>
              </ul>
            </div>
          </motion.div>

          {/* Passive Feedback */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-card border rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <Ear className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">PASSIVE FEEDBACK</h3>
                <p className="text-sm text-muted-foreground">You Listen to What's Already Happening</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">
              This is feedback customers share without you asking — you just capture it.
            </p>

            <h4 className="font-semibold text-foreground mb-2">Methods:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Online reviews (Google, Yelp, industry sites)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Social media mentions and comments
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Support tickets and chat logs
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Product usage data
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Website behavior (abandonment, dwell time)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Sales call notes & cancellation reasons
              </li>
            </ul>

            {/* Best For */}
            <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/20 rounded-lg p-4 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-[hsl(var(--biz-green))]" />
                <span className="font-semibold text-[hsl(var(--biz-green))]">BEST FOR:</span>
              </div>
              <ul className="text-sm text-foreground space-y-1">
                <li>• Catching things you didn't ask about</li>
                <li>• Understanding natural sentiment</li>
                <li>• Continuous monitoring</li>
              </ul>
            </div>

            {/* Watch Out */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="font-semibold text-amber-700 dark:text-amber-300">WATCH OUT FOR:</span>
              </div>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                <li>• Requires more analysis (unstructured)</li>
                <li>• Might miss specific issues</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Why You Need Both */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-[hsl(var(--biz-navy))]/5 dark:bg-[hsl(var(--biz-navy))]/20 border rounded-xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-center text-foreground mb-6">Why You Need Both</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-blue-100/50 dark:bg-blue-900/20 rounded-lg">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">ACTIVE FEEDBACK</p>
              <p className="text-sm text-muted-foreground">
                tells you what you <strong className="text-foreground">WANT</strong> to know
              </p>
              <p className="text-xs text-muted-foreground mt-2 italic">"Rate our checkout" → You asked</p>
            </div>
            <div className="text-center p-4 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-lg">
              <p className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">PASSIVE FEEDBACK</p>
              <p className="text-sm text-muted-foreground">
                tells you what you <strong className="text-foreground">NEED</strong> to know but didn't ask
              </p>
              <p className="text-xs text-muted-foreground mt-2 italic">"Parking is terrible" → You didn't ask, but now you know</p>
            </div>
          </div>
        </motion.div>

        {/* Real Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="bg-[hsl(var(--biz-gold))]/10 border border-[hsl(var(--biz-gold))]/20 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-[hsl(var(--biz-gold))] flex-shrink-0" />
            <div>
              <h3 className="font-bold text-foreground mb-2">REAL EXAMPLE</h3>
              <p className="text-muted-foreground mb-3">
                A restaurant sends email surveys after visits (active). Customers rate food <strong className="text-foreground">4.2 out of 5</strong> — looks good!
              </p>
              <p className="text-muted-foreground mb-3">
                But when they monitor Yelp reviews (passive), they notice multiple mentions of <strong className="text-foreground">terrible parking</strong>.
              </p>
              <p className="text-muted-foreground mb-3">
                The survey never asked about parking. Passive feedback caught what active missed.
              </p>
              <p className="text-[hsl(var(--biz-green))] font-medium">
                Result: They added a "parking available at [location]" note to their website → complaints dropped 60%.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Interactive Action Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="bg-card border-2 border-[hsl(var(--biz-blue))]/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-foreground mb-2">YOUR ACTION THIS WEEK</h3>
          <p className="text-muted-foreground mb-6">
            Pick ONE active method and TWO passive sources to start monitoring
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            {/* Active selection */}
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Pick ONE active method:</h4>
              <div className="space-y-3">
                {activeMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedActive === method.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
                        : 'hover:bg-muted/50 border-border'
                    }`}
                  >
                    <Checkbox
                      checked={selectedActive === method.id}
                      onCheckedChange={() => handleActiveSelect(method.id)}
                    />
                    <span className="text-sm text-foreground">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Passive selection */}
            <div>
              <h4 className="font-semibold mb-3 text-foreground">
                Pick TWO passive sources: <span className="text-muted-foreground font-normal">({selectedPassive.length}/2)</span>
              </h4>
              <div className="space-y-3">
                {passiveMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedPassive.includes(method.id)
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700'
                        : 'hover:bg-muted/50 border-border'
                    } ${selectedPassive.length >= 2 && !selectedPassive.includes(method.id) ? 'opacity-50' : ''}`}
                  >
                    <Checkbox
                      checked={selectedPassive.includes(method.id)}
                      onCheckedChange={() => handlePassiveToggle(method.id)}
                      disabled={selectedPassive.length >= 2 && !selectedPassive.includes(method.id)}
                    />
                    <span className="text-sm text-foreground">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSaveSelection}
            disabled={!canProceed || selectionSaved}
            className="w-full md:w-auto bg-[hsl(var(--biz-blue))] hover:bg-[hsl(var(--biz-blue))]/90"
          >
            {selectionSaved ? "✓ Sources Selected" : "I've Picked My Sources"}
          </Button>

          {selectionSaved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/20 rounded-lg"
            >
              <p className="text-[hsl(var(--biz-green))] font-medium flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Great! You've selected: {activeMethods.find(m => m.id === selectedActive)?.label} + {selectedPassive.map(id => passiveMethods.find(m => m.id === id)?.label).join(', ')}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Module2Component1;
