import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StoryBrandHeader = () => {
  return (
    <section className="bg-gradient-to-br from-background via-muted to-background pt-40 pb-16 px-6 animate-fade-in" style={{ paddingTop: '180px' }}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-6">
          {/* Headline */}
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-bizNavy dark:text-primary leading-tight">
            Break Free from Business Uncertainty—Unlock Growth with Proven Insights.
          </h1>
          
          {/* Subheadline */}
          <p className="font-['Open_Sans'] text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            As an SMB leader juggling cash flow pressures, scaling obstacles, and unseen operational gaps, you need a streamlined AI tool that delivers comprehensive diagnostics and strategies in under an hour, empowering smarter decisions without the guesswork.
          </p>
          
          {/* CTA Button */}
          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="bg-bizGreen hover:bg-bizGreen/90 text-white font-montserrat font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/register">Assess Your Business Today</Link>
            </Button>
          </div>
          
          {/* Credibility Badge */}
          <div className="pt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-bizNavy dark:text-primary" />
            <span className="font-['Open_Sans']">Empowering 2,500+ SMBs Worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryBrandHeader;
