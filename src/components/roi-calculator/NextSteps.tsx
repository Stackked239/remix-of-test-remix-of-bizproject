import React from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, Calendar, Wrench, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ScenarioType } from '@/lib/roiCalculations';

interface NextStepsProps {
  scenario: ScenarioType;
  onDownloadPDF: () => void;
}

const NextSteps: React.FC<NextStepsProps> = ({ scenario, onDownloadPDF }) => {
  const getScenarioLinks = () => {
    switch (scenario) {
      case 'equipment':
        return {
          learnMore: {
            title: 'Cash Flow Planning for Equipment Purchases',
            link: '/bizgrowth/launch/step-2-fix-cash-squeeze',
          },
          tools: [
            { name: 'Cash Flow Forecaster', link: '/biztools/toolbox/cash-flow-tracker' },
            { name: 'Break-Even Calculator', link: '/biztools/toolbox' },
          ],
        };
      case 'hire':
        return {
          learnMore: {
            title: 'Building Your First Hire Strategy',
            link: '/bizgrowth',
          },
          tools: [
            { name: 'Workforce Planning Tools', link: '/biztools/toolbox' },
            { name: 'Financial Health Check', link: '/biztools/financials/health-check' },
          ],
        };
      case 'campaign':
        return {
          learnMore: {
            title: 'Marketing ROI Best Practices',
            link: '/blog/overcoming-marketing-challenges-small-business',
          },
          tools: [
            { name: 'Customer Journey Maps', link: '/biztools/toolbox/customer-journey-maps-tool' },
            { name: 'SWOT Analysis Tool', link: '/biztools/toolbox/swot-analysis-tool' },
          ],
        };
    }
  };

  const links = getScenarioLinks();

  return (
    <div className="bg-white rounded-xl shadow-card border border-border p-6">
      <h3 className="font-montserrat font-bold text-biz-navy text-xl mb-6">
        NEXT STEPS
      </h3>

      <div className="space-y-5">
        {/* Download PDF */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-biz-citrine flex items-center justify-center flex-shrink-0">
            <Download className="w-4 h-4 text-biz-navy" />
          </div>
          <div className="flex-1">
            <p className="font-montserrat font-semibold text-biz-navy mb-2">Save this calculation</p>
            <Button
              onClick={onDownloadPDF}
              className="bg-biz-citrine text-biz-navy hover:bg-biz-citrine/90 font-semibold"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Learn More */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-biz-green/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4 h-4 text-biz-green" />
          </div>
          <div className="flex-1">
            <p className="font-montserrat font-semibold text-biz-navy mb-1">Learn more about smart investing</p>
            <Link 
              to={links.learnMore.link}
              className="text-biz-navy hover:text-biz-green underline-offset-4 hover:underline font-open-sans"
            >
              → {links.learnMore.title}
            </Link>
          </div>
        </div>

        {/* Book a Call */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-biz-teal/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4 text-biz-teal" />
          </div>
          <div className="flex-1">
            <p className="font-montserrat font-semibold text-biz-navy mb-1">Need help deciding?</p>
            <Link 
              to="/bizguides"
              className="text-biz-navy hover:text-biz-teal underline-offset-4 hover:underline font-open-sans"
            >
              → Book a 30-minute call with BizGuides
            </Link>
          </div>
        </div>

        {/* More Tools */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-biz-copper/10 flex items-center justify-center flex-shrink-0">
            <Wrench className="w-4 h-4 text-biz-copper" />
          </div>
          <div className="flex-1">
            <p className="font-montserrat font-semibold text-biz-navy mb-2">More helpful tools</p>
            <div className="space-y-1">
              {links.tools.map((tool, index) => (
                <Link 
                  key={index}
                  to={tool.link}
                  className="block text-biz-navy hover:text-biz-copper underline-offset-4 hover:underline font-open-sans"
                >
                  → {tool.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextSteps;
