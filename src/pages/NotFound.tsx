import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Compass, Home, ClipboardCheck } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | BizHealth.ai</title>
        <meta 
          name="description" 
          content="Lost your way? BizHealth.ai helps small and mid-sized business leaders navigate back to growth with AI-driven insights and strategic guidance." 
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 px-4 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Animated Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Compass className="w-24 h-24 text-primary animate-pulse" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              404: Lost in the Business Maze?
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary via-growth to-primary-hover mx-auto rounded-full" />
          </div>

          {/* Empathetic Copy */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Running an SMB is tough enough without hitting dead ends. Don't worry—we're here to guide you back to growth. <strong className="text-foreground">BizHealth.ai</strong> empowers you with clear, AI-driven insights to overcome obstacles and unlock your potential. Let's get you back on track!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              asChild
              variant="hero"
              size="lg"
              className="w-full sm:w-auto min-w-[200px]"
            >
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Link>
            </Button>
            
            <Button
              asChild
              variant="growth"
              size="lg"
              className="w-full sm:w-auto min-w-[200px]"
            >
              <Link to="/register">
                <ClipboardCheck className="mr-2 h-5 w-5" />
                Try Our Assessment
              </Link>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-3">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link to="/about" className="text-primary hover:text-primary-hover transition-colors underline-offset-4 hover:underline">
                About Us
              </Link>
              <Link to="/pricing" className="text-primary hover:text-primary-hover transition-colors underline-offset-4 hover:underline">
                Pricing
              </Link>
              <Link to="/blog" className="text-primary hover:text-primary-hover transition-colors underline-offset-4 hover:underline">
                Blog
              </Link>
              <Link to="/contact" className="text-primary hover:text-primary-hover transition-colors underline-offset-4 hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
