import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StoryBrandHeader = () => {
  return (
    <section className="bg-gradient-to-br from-biz-navy via-biz-navy/95 to-biz-navy pt-40 pb-16 px-6 animate-fade-in relative overflow-hidden" style={{ paddingTop: '180px' }}>
      {/* Background accent elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-biz-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-biz-green/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center space-y-6">
          {/* Headline */}
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Break Free from Business Uncertainty—
            <span className="text-biz-green block mt-2">Unlock Growth with Proven Insights.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="font-['Open_Sans'] text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            As an SMB leader juggling cash flow pressures, scaling obstacles, and unseen operational gaps, you need a streamlined AI tool that delivers comprehensive diagnostics and strategies in under an hour, empowering smarter decisions without the guesswork.
          </p>
          
          {/* CTA Button */}
          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/register">Assess Your Business Today</Link>
            </Button>
          </div>
          
          {/* Credibility Badge */}
          <div className="pt-6 flex items-center justify-center gap-2 text-sm text-white/80 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 inline-flex mx-auto">
            <Shield className="h-4 w-4 text-biz-green" />
            <span className="font-['Open_Sans']">Empowering 2,500+ SMBs Worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryBrandHeader;
