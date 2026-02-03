import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, BookOpen, Lock } from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { VOC_URLS, getModuleConfig } from "@/config/vocUrls";

const VocModulePlaceholder = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find module by slug
  const moduleEntry = Object.entries(VOC_URLS.modules).find(
    ([, config]) => config.slug === slug
  );
  
  const moduleNumber = moduleEntry ? parseInt(moduleEntry[0]) : 1;
  const moduleConfig = getModuleConfig(moduleNumber);
  
  if (!moduleConfig) {
    return <div>Module not found</div>;
  }

  const isGated = 'gated' in moduleConfig && moduleConfig.gated;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${moduleConfig.title} | VoC Curriculum | BizGrowth Academy`}
        description={`Module ${moduleNumber}: ${moduleConfig.title} - Voice of Customer curriculum from BizGrowth Academy.`}
        canonical={`https://bizhealth.ai${moduleConfig.url}`}
        noindex={true}
      />
      
      <GlobalNavigation />

      <main className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link 
            to={VOC_URLS.landing}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to VoC Curriculum
          </Link>

          {/* Module Header */}
          <div className="bg-gradient-to-br from-[hsl(var(--biz-blue))] to-[#1a1b3d] rounded-2xl p-8 md:p-12 text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[hsl(var(--biz-yellow))] rounded-xl mb-6">
              {isGated ? (
                <Lock className="h-8 w-8 text-[hsl(var(--biz-blue))]" />
              ) : (
                <BookOpen className="h-8 w-8 text-[hsl(var(--biz-blue))]" />
              )}
            </div>
            
            <span className="block text-[hsl(var(--biz-yellow))] font-heading font-semibold mb-2">
              Module {moduleNumber}
            </span>
            
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {moduleConfig.title}
            </h1>
            
            <div className="flex items-center justify-center gap-4 text-white/70">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {moduleConfig.duration} min
              </span>
              <span>•</span>
              <span>{moduleConfig.level}</span>
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-[hsl(var(--biz-yellow))]/10 border-2 border-[hsl(var(--biz-yellow))]/30 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              🚧 Coming Soon
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              This module is currently under development. Complete the quiz on the landing page to get your personalized learning path, and check back soon for the full content.
            </p>
            
            <Button asChild className="bg-[hsl(var(--biz-yellow))] hover:bg-[hsl(var(--biz-yellow))]/90 text-[hsl(var(--biz-blue))] font-semibold">
              <Link to={VOC_URLS.landing}>
                Return to VoC Curriculum
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default VocModulePlaceholder;
