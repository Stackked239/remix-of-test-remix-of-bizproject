import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, BarChart3 } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              BizHealth.ai
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="/how-it-works"
              className="text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a 
              href="/pricing"
              className="text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a 
              href="/resources"
              className="text-foreground hover:text-primary transition-colors"
            >
              Resources
            </a>
            <a 
              href="/about"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a 
              href="/blog"
              className="text-foreground hover:text-primary transition-colors"
            >
              Blog
            </a>
            <a 
              href="/contact"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => window.location.href = '/pricing'}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col gap-4 pt-4">
              <a 
                href="/how-it-works"
                className="text-left text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="/pricing"
                className="text-left text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="/resources"
                className="text-left text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </a>
              <a 
                href="/about"
                className="text-left text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="/blog"
                className="text-left text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <a 
                href="/contact"
                className="text-left text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <Button 
                variant="hero" 
                size="sm"
                onClick={() => window.location.href = '/pricing'}
                className="w-fit"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;