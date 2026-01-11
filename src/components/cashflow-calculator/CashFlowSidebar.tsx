import React from 'react';
import { Lightbulb, BookOpen, ArrowRight, CheckCircle, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const CashFlowSidebar: React.FC = () => {
  const tips = [
    'Keep 3-6 months of expenses as a cash buffer',
    "Invoice immediately—the clock starts when you send it",
    'Follow up on late payments at 7, 14, and 30 days',
    'Negotiate longer payment terms with vendors',
    'Time large purchases for high-cash months',
    'Review your projection monthly against actuals'
  ];

  const terms = [
    {
      term: 'Cash Flow',
      definition: "The movement of money in and out of your business. Positive means more coming in than going out. Unlike profit, it reflects when money actually moves—not when sales are made."
    },
    {
      term: 'Opening Balance',
      definition: "Cash at the start of each month. For month 1, it's your starting cash. After that, it's the previous month's closing balance."
    },
    {
      term: 'Cash Inflows',
      definition: 'Money coming into your business: customer payments, loans, investments, refunds. The timing matters—cash in when paid, not when ordered.'
    },
    {
      term: 'Cash Outflows',
      definition: "Money leaving your business: payroll, rent, supplies, loan payments, taxes, owner draws. Counted when paid, not when invoiced."
    },
    {
      term: 'Net Cash Flow',
      definition: "Cash In minus Cash Out for a period. Positive = surplus. Negative = you're drawing down or need funding."
    },
    {
      term: 'Closing Balance',
      definition: "Cash at end of month: Opening + Net Flow. Becomes next month's opening balance. This reveals your true cash runway."
    },
    {
      term: 'Cash Runway',
      definition: 'How many months you can operate before running out of cash at your current spending rate. Critical for planning.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Tips Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-border/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-biz-citrine/20">
            <Lightbulb className="w-5 h-5 text-biz-citrine" />
          </div>
          <h3 className="font-bold text-foreground font-montserrat">Cash Flow Tips</h3>
        </div>
        
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-biz-green mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Terms Card - Always Visible (NOT Accordion) */}
      <div className="bg-white rounded-2xl shadow-lg border border-border/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-biz-navy/10">
            <BookOpen className="w-5 h-5 text-biz-navy" />
          </div>
          <h3 className="font-bold text-foreground font-montserrat">Cash Flow Terms Explained</h3>
        </div>
        
        <div className="space-y-4">
          {terms.map((item, index) => (
            <div key={index} className={index < terms.length - 1 ? 'pb-4 border-b border-border' : ''}>
              <h4 className="font-semibold text-sm text-biz-navy">{item.term}</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #242553 0%, #363688 100%)' }}>
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-biz-citrine" />
          <h3 className="font-bold font-montserrat">"Cash Flow is Just One Piece"</h3>
        </div>
        <p className="text-sm text-white/80 mb-4 leading-relaxed">
          Get a complete health check across all 12 areas of your business—from financial health to operations, sales, and leadership.
        </p>
        <Link 
          to="/register"
          className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-biz-citrine text-biz-navy font-semibold rounded-xl hover:bg-biz-citrine/90 transition-colors"
        >
          Complete Business Health Assessment
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default CashFlowSidebar;
