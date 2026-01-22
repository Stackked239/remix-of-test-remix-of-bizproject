import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, X, Database, Tag, BarChart3, CheckSquare, Clock } from "lucide-react";

const Module2Component4 = () => {
  const dataTypes = [
    { icon: '🎭', title: 'Customer Sentiment', description: 'How they\'re feeling (happy, frustrated, neutral)' },
    { icon: '🏷️', title: 'Issue Tags', description: 'What problems they\'re mentioning (pricing, shipping, quality)' },
    { icon: '📊', title: 'Frequency', description: 'How often the same issue appears' },
    { icon: '✅', title: 'Action Taken', description: 'What you did about it (investigating, resolved, no action)' },
    { icon: '⏱️', title: 'Response Time', description: 'How fast you responded (and closed the loop)' },
  ];

  const sampleData = [
    { date: 'Jan 15', customer: 'John S.', channel: 'Email', feedback: 'Hard to find pricing', sentiment: 'Negative', action: 'Updated nav', closed: true },
    { date: 'Jan 16', customer: 'Sarah L.', channel: 'Review', feedback: 'Love the fast delivery', sentiment: 'Positive', action: 'Thanked', closed: true },
    { date: 'Jan 17', customer: 'Mike R.', channel: 'Support', feedback: 'Checkout error on mobile', sentiment: 'Negative', action: 'Bug fixed', closed: true },
  ];

  return (
    <section id="component-4" className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
            4
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Centralized Data (The Hub)
          </h2>
        </motion.div>

        {/* The Problem Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <X className="h-6 w-6 text-red-500" />
            <h3 className="font-bold text-red-700 dark:text-red-300">THE SCATTERED DATA PROBLEM</h3>
          </div>
          
          <div className="grid grid-cols-5 gap-2 mb-4">
            {['Google Reviews', 'Support Tickets', 'Email Inbox', 'Social Media', 'CRM Notes'].map((source) => (
              <div key={source} className="text-center">
                <div className="w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-2">
                  <Database className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-xs text-red-700 dark:text-red-300">Data Silo</p>
              </div>
            ))}
          </div>
          
          <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
            <li>❌ Nobody has the complete picture</li>
            <li>❌ Patterns go undetected</li>
            <li>❌ Same issue mentioned 10 times, nobody realizes</li>
            <li>❌ Departments duplicate work</li>
          </ul>
        </motion.div>

        {/* The Solution Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/20 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-6 w-6 text-[hsl(var(--biz-green))]" />
            <h3 className="font-bold text-[hsl(var(--biz-green))]">THE CENTRALIZED SOLUTION</h3>
          </div>
          
          <div className="flex flex-col items-center mb-4">
            <div className="grid grid-cols-5 gap-2 mb-4">
              {['Reviews', 'Tickets', 'Email', 'Social', 'CRM'].map((source) => (
                <div key={source} className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">{source}</p>
                  <div className="w-1 h-4 bg-[hsl(var(--biz-green))]/50 mx-auto" />
                </div>
              ))}
            </div>
            <div className="w-32 h-12 bg-[hsl(var(--biz-green))] rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">ONE PLACE</span>
            </div>
          </div>
          
          <ul className="text-sm text-foreground space-y-1">
            <li>✅ Complete picture of customer experience</li>
            <li>✅ Patterns visible instantly</li>
            <li>✅ Clear ownership and status</li>
            <li>✅ Impact measurable</li>
          </ul>
        </motion.div>

        {/* What Centralization Means */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <h4 className="font-bold text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
              <X className="h-4 w-4" />
              NOT This:
            </h4>
            <p className="text-red-700 dark:text-red-300">"Buy expensive enterprise software"</p>
          </div>
          <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/20 rounded-xl p-4">
            <h4 className="font-bold text-[hsl(var(--biz-green))] mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              YES This:
            </h4>
            <p className="text-foreground">All feedback flows to ONE place — could be a spreadsheet, CRM field, or simple tool</p>
          </div>
        </motion.div>

        <p className="text-center text-muted-foreground mb-8 text-sm">
          <strong className="text-foreground">The tool doesn't matter. The habit of centralizing does.</strong>
        </p>

        {/* Types of Data to Centralize */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-foreground mb-4">Types of Data to Centralize</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {dataTypes.map((type) => (
              <div key={type.title} className="bg-card border rounded-xl p-4 text-center">
                <span className="text-2xl block mb-2">{type.icon}</span>
                <p className="font-medium text-foreground text-sm mb-1">{type.title}</p>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sample Tracker Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="bg-card border rounded-xl p-6 mb-8"
        >
          <h3 className="font-semibold text-foreground mb-4">Sample Feedback Tracker:</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[hsl(var(--biz-blue))]/10">
                  <th className="border border-border p-2 text-left">Date</th>
                  <th className="border border-border p-2 text-left">Customer</th>
                  <th className="border border-border p-2 text-left">Channel</th>
                  <th className="border border-border p-2 text-left">Feedback</th>
                  <th className="border border-border p-2 text-left">Sentiment</th>
                  <th className="border border-border p-2 text-left">Action</th>
                  <th className="border border-border p-2 text-left">Closed?</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-border p-2 text-muted-foreground">{row.date}</td>
                    <td className="border border-border p-2 text-muted-foreground">{row.customer}</td>
                    <td className="border border-border p-2 text-muted-foreground">{row.channel}</td>
                    <td className="border border-border p-2 text-muted-foreground">{row.feedback}</td>
                    <td className={`border border-border p-2 ${row.sentiment === 'Positive' ? 'text-[hsl(var(--biz-green))]' : 'text-red-500'}`}>
                      {row.sentiment}
                    </td>
                    <td className="border border-border p-2 text-muted-foreground">{row.action}</td>
                    <td className="border border-border p-2 text-[hsl(var(--biz-green))]">
                      {row.closed ? '✓' : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            This is exactly what you'll get in the template below.
          </p>
        </motion.div>

        {/* Getting Started: 3 Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-foreground">Getting Started: 3 Simple Steps</h3>
          
          {/* Step 1 */}
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[hsl(var(--biz-blue))] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">Choose Your "Home"</h4>
                <p className="text-muted-foreground mb-3">Where will all feedback live? Pick ONE:</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[hsl(var(--biz-blue))] rounded-full mt-1.5" />
                    <span><strong className="text-foreground">Simple spreadsheet</strong> — Google Sheets or Excel (free, familiar)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[hsl(var(--biz-blue))] rounded-full mt-1.5" />
                    <span><strong className="text-foreground">CRM field</strong> — HubSpot, Pipedrive, Salesforce (if you already use one)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[hsl(var(--biz-blue))] rounded-full mt-1.5" />
                    <span><strong className="text-foreground">Dedicated tool</strong> — Airtable, Notion, Featurebase (when you scale)</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3 italic">
                  <strong className="text-foreground">Our recommendation:</strong> Start with a spreadsheet. Graduate when you prove value.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[hsl(var(--biz-blue))] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">Define Your Tracking Tags</h4>
                <p className="text-muted-foreground mb-3">These are the "buckets" for organizing feedback:</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <Tag className="h-4 w-4 text-[hsl(var(--biz-blue))] mt-0.5" />
                    <span><strong className="text-foreground">Sentiment:</strong> Positive / Negative / Neutral</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Tag className="h-4 w-4 text-[hsl(var(--biz-blue))] mt-0.5" />
                    <span><strong className="text-foreground">Category:</strong> Pricing / Features / Support / UX / Delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Tag className="h-4 w-4 text-[hsl(var(--biz-blue))] mt-0.5" />
                    <span><strong className="text-foreground">Status:</strong> New / In Review / Action Taken / Closed</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3 italic">
                  (All included in our template below)
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[hsl(var(--biz-blue))] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">Pick ONE Data Point This Week</h4>
                <p className="text-muted-foreground mb-3">Don't track everything yet. Build the habit first:</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-[hsl(var(--biz-blue))] mt-0.5" />
                    <span><strong className="text-foreground">Week 1:</strong> Just collect and categorize</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-[hsl(var(--biz-blue))] mt-0.5" />
                    <span><strong className="text-foreground">Week 2:</strong> Add sentiment tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-[hsl(var(--biz-blue))] mt-0.5" />
                    <span><strong className="text-foreground">Week 3:</strong> Add action tracking</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3 italic">
                  This is how you build a sustainable system, not a project that dies in a week.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module2Component4;
