import { Check, FileText, Users, Rocket, BarChart3, GraduationCap } from "lucide-react";

interface ProcessStep {
  step: number;
  icon: React.ElementType;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

const processSteps: ProcessStep[] = [
  {
    step: 1,
    icon: FileText,
    title: "Intake & Discovery",
    duration: "2–3 hours (1–2 weeks)",
    description: "Deep conversation about your business, challenges, timeline, and success metrics.",
    deliverables: [
      "Scope document",
      "Solution approach",
      "Preliminary estimate",
    ],
  },
  {
    step: 2,
    icon: FileText,
    title: "Solution Design & Proposal",
    duration: "1 week",
    description: "Customized proposal with detailed deliverables, timeline, investment.",
    deliverables: [
      "Proposal document",
      "Statement of Work",
      "Signed agreement",
    ],
  },
  {
    step: 3,
    icon: Users,
    title: "Kickoff & Team Alignment",
    duration: "1 week",
    description: "Project kick-off, advisor introduction, communication plan.",
    deliverables: [
      "Kick-off notes",
      "Communication plan",
      "PM platform access",
    ],
  },
  {
    step: 4,
    icon: Rocket,
    title: "Execution & Active Support",
    duration: "90–240 days",
    description: "Strategy sessions, facilitation, coaching, weekly check-ins.",
    deliverables: [
      "Roadmaps",
      "Implementation plans",
      "Progress updates",
    ],
  },
  {
    step: 5,
    icon: BarChart3,
    title: "Measurement & Iteration",
    duration: "Ongoing",
    description: "Monthly progress reviews, course corrections, transparent reporting.",
    deliverables: [
      "Monthly reports",
      "Executive summaries",
      "Metric dashboards",
    ],
  },
  {
    step: 6,
    icon: GraduationCap,
    title: "Transition & Sustainability",
    duration: "2–4 weeks",
    description: "Final handoff, team training, 30-day post-engagement support.",
    deliverables: [
      "Playbooks",
      "Training materials",
      "30-day alumni access",
    ],
  },
];

const CustomRequestProcess = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[hsl(var(--biz-navy))] mb-4">
            How Custom Solutions Work: A Clear, Transparent Process
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Every custom engagement follows a proven framework designed to deliver 
            measurable outcomes. Here's what you can expect from your partnership 
            with the BizHealth team.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step) => {
            const isEngagementSpecific = step.step >= 3;
            const badgeColor = isEngagementSpecific 
              ? "bg-[hsl(var(--biz-gold))]" 
              : "bg-[hsl(var(--biz-teal))]";
            
            return (
              <div
                key={step.step}
                className="bg-card rounded-xl p-7 border border-[hsl(var(--biz-teal))]/10 shadow-sm hover:shadow-md transition-all duration-300 relative"
              >
                {/* Step Badge */}
                <div className={`w-12 h-12 ${badgeColor} text-white rounded-full flex items-center justify-center text-lg font-bold font-montserrat mb-5`}>
                  {step.step}
                </div>

              {/* Title */}
              <h3 className="text-lg font-montserrat font-semibold text-[hsl(var(--biz-navy))] mb-2">
                {step.title}
              </h3>

              {/* Duration */}
              <p className="text-xs text-muted-foreground italic mb-4">
                {step.duration}
              </p>

              {/* Description */}
              <p className="text-sm text-[hsl(var(--biz-navy))] leading-relaxed mb-5">
                {step.description}
              </p>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Deliverables
                </h4>
                <ul className="space-y-2">
                  {step.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-[hsl(var(--biz-teal))] flex-shrink-0" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CustomRequestProcess;
