import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Compass, Wrench, Crown, TrendingUp } from "lucide-react";
import bizHealthLogo from "@/assets/bizhealth-logo-horizontal.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hubNavigation = [
    {
      name: 'BizGuides',
      tagline: 'From Gaps to Guided Wins',
      icon: Compass,
      color: 'text-teal-600',
      href: '/bizguides'
    },
    {
      name: 'BizTools', 
      tagline: 'Scalable Essentials at Your Fingertips',
      icon: Wrench,
      color: 'text-amber-600',
      href: '/biztools'
    },
    {
      name: 'BizLeaDeR',
      tagline: 'Drive Scale with Confidence', 
      icon: Crown,
      color: 'text-lime-600',
      href: '/bizleader'
    },
    {
      name: 'BizGrowth',
      tagline: 'Strategic Advancement Awaits',
      icon: TrendingUp, 
      color: 'text-yellow-600',
      href: '/bizgrowth'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img 
              src={bizHealthLogo} 
              alt="BizHealth.ai Logo" 
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
            
            {/* Hubs Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                  Hubs
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-background border border-border shadow-lg z-50">
                {hubNavigation.map((hub) => {
                  const IconComponent = hub.icon;
                  return (
                    <DropdownMenuItem key={hub.name} asChild>
                      <a 
                        href={hub.href}
                        className="flex items-start gap-3 p-3 hover:bg-accent transition-colors"
                      >
                        <IconComponent className={`w-5 h-5 mt-0.5 ${hub.color}`} />
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">{hub.name}</span>
                          <span className="text-sm text-muted-foreground">{hub.tagline}</span>
                        </div>
                      </a>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a 
                    href="/"
                    className="flex items-center gap-2 p-3 hover:bg-accent transition-colors"
                  >
                    <span className="text-primary font-medium">← Back to Main Hub</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <a 
              href="/pricing"
              className="text-foreground hover:text-primary transition-colors"
            >
              Pricing
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
                href="/"
                className="text-left text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              
              {/* Mobile Hubs Section */}
              <div className="border-t border-border pt-4">
                <h4 className="font-semibold text-foreground mb-3">Hubs</h4>
                <div className="space-y-3 pl-4">
                  {hubNavigation.map((hub) => {
                    const IconComponent = hub.icon;
                    return (
                      <a 
                        key={hub.name}
                        href={hub.href}
                        className="flex items-start gap-3 text-left hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <IconComponent className={`w-5 h-5 mt-0.5 ${hub.color}`} />
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{hub.name}</span>
                          <span className="text-sm text-muted-foreground">{hub.tagline}</span>
                        </div>
                      </a>
                    );
                  })}
                  <a 
                    href="/"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-sm font-medium">← Back to Main Hub</span>
                  </a>
                </div>
              </div>
              
              <a 
                href="/pricing"
                className="text-left text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
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