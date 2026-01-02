import React from 'react';
import { cn } from '@/lib/utils';
import { Wrench, Users, Megaphone } from 'lucide-react';
import type { ScenarioType } from '@/lib/roiCalculations';

interface ScenarioSelectorProps {
  selectedScenario: ScenarioType;
  onSelectScenario: (scenario: ScenarioType) => void;
}

const scenarios = [
  {
    id: 'equipment' as ScenarioType,
    label: 'Equipment Investment',
    icon: Wrench,
  },
  {
    id: 'hire' as ScenarioType,
    label: 'New Hire',
    icon: Users,
  },
  {
    id: 'campaign' as ScenarioType,
    label: 'Marketing Campaign',
    icon: Megaphone,
  },
];

const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  selectedScenario,
  onSelectScenario,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {scenarios.map((scenario) => {
        const Icon = scenario.icon;
        const isActive = selectedScenario === scenario.id;
        
        return (
          <button
            key={scenario.id}
            onClick={() => onSelectScenario(scenario.id)}
            className={cn(
              "flex items-center justify-center gap-3 px-6 py-4 rounded-lg border-2 font-montserrat font-semibold",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-biz-navy focus:ring-offset-2",
              "min-h-[56px]",
              isActive 
                ? "bg-biz-navy text-white border-biz-navy shadow-elegant" 
                : "bg-white text-biz-navy border-biz-navy hover:bg-biz-navy/5"
            )}
            aria-pressed={isActive}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm md:text-base">{scenario.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ScenarioSelector;
