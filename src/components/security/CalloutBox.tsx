import { Lightbulb } from 'lucide-react';
import { ReactNode } from 'react';

interface CalloutBoxProps {
  title: string;
  children: ReactNode;
}

const CalloutBox = ({ title, children }: CalloutBoxProps) => {
  return (
    <div className="mt-6 p-6 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border-l-4 border-biz-green">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-biz-green flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-biz-navy dark:text-biz-green mb-2">{title}</h4>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CalloutBox;
