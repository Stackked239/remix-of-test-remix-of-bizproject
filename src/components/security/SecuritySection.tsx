import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface SecuritySectionProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  iconColor?: string;
  bgColor?: string;
}

const SecuritySection = ({ 
  icon: Icon, 
  title, 
  children, 
  iconColor = "text-biz-green",
  bgColor = "bg-background" 
}: SecuritySectionProps) => {
  return (
    <section className={`py-16 md:py-20 ${bgColor}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-start gap-4 mb-8">
          <div className={`${iconColor} flex-shrink-0`}>
            <Icon className="w-10 h-10" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-biz-navy">
              {title}
            </h2>
          </div>
        </div>

        <div className="mt-8">
          {children}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
