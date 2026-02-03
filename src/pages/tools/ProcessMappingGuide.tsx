import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  GitBranch, 
  Download,
  Lightbulb,
  Target,
  Users,
  Clock
} from 'lucide-react';

const ProcessMappingGuide = () => {
  const steps = [
    {
      step: 1,
      title: "Define Your Process",
      icon: Target,
      description: "Start by clicking 'Create New Process Map' and provide basic information about your process.",
      details: [
        "Enter a clear, descriptive process name",
        "Select the department or team responsible",
        "Choose the process frequency (daily, weekly, monthly)",
        "Add the process owner's name",
        "Provide a brief description of what the process accomplishes"
      ]
    },
    {
      step: 2,
      title: "Map Your Workflow",
      icon: GitBranch,
      description: "Use the visual drag-and-drop interface to create your process flow diagram.",
      details: [
        "Drag task nodes onto the canvas to represent each step",
        "Connect nodes with arrows to show the flow sequence",
        "Add decision points for conditional branches",
        "Use different node types for different task categories",
        "Arrange nodes logically from start to finish"
      ]
    },
    {
      step: 3,
      title: "Add Task Details",
      icon: FileText,
      description: "Document each task with comprehensive information for complete SOPs.",
      details: [
        "Write step-by-step instructions for each task",
        "Assign responsible roles or team members",
        "Estimate time required for completion",
        "Add required tools, systems, or resources",
        "Include quality checks and success criteria"
      ]
    },
    {
      step: 4,
      title: "Review & Export",
      icon: Download,
      description: "Review your complete process map and export it in your preferred format.",
      details: [
        "Review the full process summary",
        "Check for missing steps or unclear instructions",
        "Export as Word document (.docx) for easy editing",
        "Export as Excel spreadsheet for task tracking",
        "Save as PDF for sharing and distribution"
      ]
    }
  ];

  const bestPractices = [
    {
      icon: Users,
      title: "Involve Your Team",
      tip: "Collaborate with team members who actually perform the tasks to ensure accuracy and completeness."
    },
    {
      icon: Clock,
      title: "Keep It Current",
      tip: "Update your process maps regularly as workflows evolve and improve over time."
    },
    {
      icon: Lightbulb,
      title: "Start Simple",
      tip: "Begin with your most critical or frequently-used processes before tackling complex workflows."
    },
    {
      icon: CheckCircle,
      title: "Test & Validate",
      tip: "Have someone unfamiliar with the process follow your SOP to identify gaps or unclear instructions."
    }
  ];

  return (
    <>
      <SEO
        title="Process Mapping Guide - How to Use the SOP Builder | BizHealth.ai"
        description="Learn how to create professional process maps and standard operating procedures with our comprehensive step-by-step guide. Master the Process Mapping & SOP Builder tool."
        keywords="process mapping guide, SOP tutorial, workflow documentation, process builder guide, business process documentation"
        canonical="https://bizhealth.ai/biztools/toolbox/process-mapping-tools/guide"
        ogImage="/og-images/og-process-mapping-guide.jpg"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <PromotionalBanner />
        <GlobalNavigation />

        <main className="flex-1 pt-40">
          <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-biz-navy mb-4">
                Getting Started with Process Mapping
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Create professional process maps and SOPs in 4 simple steps. Follow this guide to document, optimize, and standardize your business workflows.
              </p>
              <Button asChild size="lg" className="mt-6 bg-gradient-to-r from-primary to-biz-green hover:from-primary/90 hover:to-biz-green/90">
                <Link to="/biztools/toolbox/process-mapping-tools">
                  Start Creating Process Maps
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* What You'll Create */}
            <Card className="mb-12 border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  What You'll Create
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  The Process Mapping & SOP Builder helps you create comprehensive documentation including:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-biz-green mt-0.5" />
                    <div>
                      <strong className="text-foreground">Visual Process Flowcharts</strong>
                      <p className="text-sm text-muted-foreground">Easy-to-follow diagrams showing task sequences</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-biz-green mt-0.5" />
                    <div>
                      <strong className="text-foreground">Standard Operating Procedures</strong>
                      <p className="text-sm text-muted-foreground">Detailed step-by-step instructions for each task</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-biz-green mt-0.5" />
                    <div>
                      <strong className="text-foreground">Exportable Documentation</strong>
                      <p className="text-sm text-muted-foreground">Word, Excel, and PDF formats for easy sharing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-biz-green mt-0.5" />
                    <div>
                      <strong className="text-foreground">Team Training Materials</strong>
                      <p className="text-sm text-muted-foreground">Ready-to-use resources for onboarding and training</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step-by-Step Guide */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-biz-navy mb-8 text-center">
                4 Steps to Professional Process Documentation
              </h2>
              <div className="space-y-8">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <Card key={index} className="border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-biz-green flex items-center justify-center text-white font-bold text-xl">
                              {step.step}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <IconComponent className="w-6 h-6 text-primary" />
                              <CardTitle className="text-2xl text-biz-navy">{step.title}</CardTitle>
                            </div>
                            <p className="text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                              <span className="text-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Best Practices */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-biz-navy mb-8 text-center">
                Best Practices & Tips
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {bestPractices.map((practice, index) => {
                  const IconComponent = practice.icon;
                  return (
                    <Card key={index} className="border-2 border-biz-copper/20 hover:border-biz-copper/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-biz-copper/10 rounded-lg">
                            <IconComponent className="w-6 h-6 text-biz-copper" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-biz-navy mb-2">{practice.title}</h3>
                            <p className="text-muted-foreground">{practice.tip}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Common Use Cases */}
            <Card className="mb-12 border-2 border-biz-green/20 bg-gradient-to-br from-background to-biz-green/5">
              <CardHeader>
                <CardTitle className="text-2xl text-biz-navy">Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-foreground mb-2">🏭 Operations & Manufacturing</h4>
                    <p className="text-muted-foreground">Document production workflows, quality control procedures, and maintenance routines.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">💼 Sales & Customer Service</h4>
                    <p className="text-muted-foreground">Map customer onboarding, sales processes, and support ticket handling procedures.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">👥 HR & Onboarding</h4>
                    <p className="text-muted-foreground">Create employee onboarding checklists, hiring processes, and training workflows.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">💰 Finance & Accounting</h4>
                    <p className="text-muted-foreground">Document invoice processing, expense approval, and month-end closing procedures.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-br from-primary/10 via-biz-green/10 to-biz-copper/10 rounded-2xl p-8 border-2 border-primary/20">
              <h2 className="text-3xl font-bold text-biz-navy mb-4">
                Ready to Start Mapping?
              </h2>
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                Create your first process map now and start building a library of standardized procedures for your business.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-biz-green hover:from-primary/90 hover:to-biz-green/90 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/biztools/toolbox/process-mapping-tools">
                  Launch Process Mapping Tool
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </main>

        <GlobalFooter />
      </div>
    </>
  );
};

export default ProcessMappingGuide;
