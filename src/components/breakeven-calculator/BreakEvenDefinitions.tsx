import React from 'react';
import { BookOpen } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const definitions = [
  {
    term: 'Fixed Costs',
    definition: 'Expenses that stay the same every month regardless of how many items you sell. Examples: office rent, full-time salaries, annual software subscriptions, insurance premiums. These are your baseline costs just to keep the doors open.',
  },
  {
    term: 'Variable Costs',
    definition: 'Expenses that change based on how much you produce or sell. Each sale or product you make adds to this cost. Examples: raw materials, packaging, payment processing fees, hourly labor for production, shipping costs. The more you sell, the higher your variable costs go.',
  },
  {
    term: 'Break-Even Point',
    definition: 'The exact moment when your total revenue equals your total costs (fixed + variable). Before this point, you\'re losing money. After this point, you\'re profitable. It\'s the minimum sales target you need to reach just to cover all your expenses.',
  },
  {
    term: 'Contribution Margin',
    definition: 'The percentage of each sale that\'s left over after paying variable costs. This "leftover" money contributes toward paying your fixed costs and eventually profit. Formula: (Price - Variable Cost) ÷ Price. A higher contribution margin is better—it means you keep more from each sale.',
  },
  {
    term: 'Profitability',
    definition: 'The state where your revenue exceeds your costs. Breaking even is the minimum; true profit comes when you sell more than your break-even quantity. This is when you can reinvest in growth or take home earnings.',
  },
];

const BreakEvenDefinitions: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-card border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-biz-navy/10">
          <BookOpen className="w-6 h-6 text-biz-navy" />
        </div>
        <h2 className="font-montserrat font-bold text-biz-navy text-xl">
          Key Business Terms Explained
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {definitions.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-semibold text-foreground hover:text-biz-teal">
              {item.term}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {item.definition}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default BreakEvenDefinitions;
