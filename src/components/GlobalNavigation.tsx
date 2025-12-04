import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import bizHealthLogo from '@/assets/bizhealth-logo-main.jpg';
import bizHealthHeroLogo from '@/assets/bizhealth-logo-hero.jpg';
import bizHealthNewLogo from '@/assets/bizhealth-logo-new.jpg';
import bizHealthIcon from '@/assets/bizhealth-growth-icon.png';
import { 
  LayoutGrid, 
  Search, 
  ChevronDown, 
  Menu, 
  X,
  MapPin,
  Compass,
  Wrench,
  Crown,
  TrendingUp
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// FEATURE FLAG: Temporarily hide Hubs menu from navigation
// Set to true when ready to launch - Direct URL access still works for testing
const SHOW_HUBS = false;

const GlobalNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const countries = [
    { code: 'US', flag: '🇺🇸', name: 'United States', hreflang: 'en-US' },
    { code: 'GB', flag: '🇬🇧', name: 'United Kingdom', hreflang: 'en-GB' },
    { code: 'AU', flag: '🇦🇺', name: 'Australia', hreflang: 'en-AU' },
    { code: 'DE', flag: '🇩🇪', name: 'Germany', hreflang: 'de-DE' }
  ];

  const hubNavigation = [
    {
      name: 'BizGuides',
      tagline: 'From Gaps to Guided Wins',
      icon: Compass,
      color: 'biz-teal',
      links: [
        { name: 'Home', href: '/bizguides' },
        { name: 'Services', href: '/bizguides/services' },
        { name: 'Booking', href: '/bizguides/booking' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      name: 'BizTools', 
      tagline: 'Scalable Essentials at Your Fingertips',
      icon: Wrench,
      color: 'biz-copper',
      links: [
        { name: 'Home', href: '/biztools' },
        { name: 'Downloads', href: '/biztools/downloads' },
        { name: 'Shop', href: '/biztools/shop' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      name: 'BizLeaDeR',
      tagline: 'Drive Scale with Confidence', 
      icon: Crown,
      color: 'biz-lime',
      links: [
        { name: 'Home', href: '/bizleader' },
        { name: 'Courses', href: '/bizleader/courses' },
        { name: 'Webinars', href: '/bizleader/webinars' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      name: 'BizGrowth',
      tagline: 'Strategic Advancement Awaits',
      icon: TrendingUp, 
      color: 'biz-citrine',
      links: [
        { name: 'Home', href: '/bizgrowth' },
        { name: 'Enroll', href: '/bizgrowth/enroll' },
        { name: 'Guides', href: '/bizgrowth/guides' },
        { name: 'Contact', href: '/contact' }
      ]
    }
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <nav className="bg-biz-white border-b border-border fixed top-20 left-0 w-full z-40 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Main Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={`font-open-sans font-medium hover:text-biz-green transition-colors ${
                  isActiveRoute('/') ? 'text-biz-green' : 'text-biz-navy'
                }`}
              >
                Home
              </Link>
              
              {/* Hubs Dropdown - Temporarily hidden via feature flag */}
              {SHOW_HUBS && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 font-open-sans font-medium text-biz-navy hover:text-biz-green transition-colors">
                      Hubs
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 bg-biz-white border border-border shadow-lg z-50">
                    {/* BizHealth.ai Main Hub Option */}
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/"
                        className="flex items-start gap-3 p-3 hover:bg-biz-accent transition-colors"
                      >
                        <img 
                          src={bizHealthIcon} 
                          alt="BizHealth.ai" 
                          className="w-5 h-5 mt-0.5 rounded object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-biz-navy">BizHealth.ai</span>
                          <span className="text-sm text-biz-grey">Return to Main Hub</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {hubNavigation.map((hub) => {
                      const IconComponent = hub.icon;
                      return (
                        <DropdownMenuItem key={hub.name} asChild>
                          <Link 
                            to={hub.links[0].href}
                            className="flex items-start gap-3 p-3 hover:bg-biz-accent transition-colors"
                          >
                            <IconComponent className={`w-5 h-5 mt-0.5 text-${hub.color}`} />
                            <div className="flex flex-col">
                              <span className="font-semibold text-biz-navy">{hub.name}</span>
                              <span className="text-sm text-biz-grey">{hub.tagline}</span>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/"
                        className="flex items-center gap-2 p-3 hover:bg-biz-accent transition-colors"
                      >
                        <span className="text-biz-green font-medium">← Back to Main Hub</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              
              {/* Pricing Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`flex items-center gap-1 font-open-sans font-medium hover:text-biz-green transition-colors ${
                    isActiveRoute('/pricing') || isActiveRoute('/reports') || isActiveRoute('/how-it-works') || isActiveRoute('/faqs') ? 'text-biz-green' : 'text-biz-navy'
                  }`}>
                    Pricing
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-biz-white border border-border shadow-lg z-50">
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/pricing"
                      className="flex items-center p-3 hover:bg-biz-accent transition-colors"
                    >
                      <span className="font-medium text-biz-navy">Pricing & Tier Plans</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/how-it-works"
                      className="flex items-center p-3 hover:bg-biz-accent transition-colors"
                    >
                      <span className="font-medium text-biz-navy">How It Works</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/reports"
                      className="flex items-center p-3 hover:bg-biz-accent transition-colors"
                    >
                      <span className="font-medium text-biz-navy">Reports</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/faqs"
                      className="flex items-center p-3 hover:bg-biz-accent transition-colors"
                    >
                      <span className="font-medium text-biz-navy">FAQs</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`flex items-center gap-1 font-open-sans font-medium hover:text-biz-green transition-colors ${
                    isActiveRoute('/blog') || isActiveRoute('/glossary-of-terms') || isActiveRoute('/biztools') ? 'text-biz-green' : 'text-biz-navy'
                  }`}>
                    Tools
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-biz-white border border-border shadow-lg z-50">
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/biztools"
                      className="flex items-center p-3 hover:bg-biz-accent transition-colors"
                    >
                      <span className="font-medium text-biz-navy">BizTools - Tools & Resources</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/blog"
                      className="flex items-center p-3 hover:bg-biz-accent transition-colors"
                    >
                      <span className="font-medium text-biz-navy">Business Insights & Strategies</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/glossary-of-terms"
                      className="flex items-center p-3 hover:bg-biz-accent transition-colors"
                    >
                      <span className="font-medium text-biz-navy">Business Terms Glossary</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* About Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`flex items-center gap-1 font-open-sans font-medium hover:text-biz-green transition-colors ${
                    isActiveRoute('/about') || isActiveRoute('/legal') ? 'text-biz-green' : 'text-biz-navy'
                  }`}>
                    About
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-biz-white border border-border shadow-lg z-50">
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/about"
                      className="flex items-center p-3 hover:bg-biz-accent transition-colors"
                    >
                      <span className="font-medium text-biz-navy">About Us</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/legal"
                      className="flex items-center p-3 hover:bg-biz-accent transition-colors"
                    >
                      <span className="font-medium text-biz-navy">Legal</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link 
                to="/contact" 
                className={`font-open-sans font-medium hover:text-biz-green transition-colors ${
                  isActiveRoute('/contact') ? 'text-biz-green' : 'text-biz-navy'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-biz-grey" />
              <Input
                type="search"
                placeholder="Search site..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="pl-10 w-64 bg-background border-border focus:ring-biz-green focus:border-biz-green"
              />
            </form>

            {/* Country Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <span className="text-lg">{countries.find(c => c.code === selectedCountry)?.flag}</span>
                  <span className="text-sm font-open-sans">{selectedCountry}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {countries.map((country) => (
                  <DropdownMenuItem 
                    key={country.code}
                    onClick={() => setSelectedCountry(country.code)}
                    className="flex items-center space-x-3"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="font-open-sans">{country.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="font-open-sans font-medium">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-biz-green hover:bg-biz-green/90 text-white font-open-sans font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-biz-navy hover:bg-secondary"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-biz-white border-t border-border">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-biz-grey" />
              <Input
                type="search"
                placeholder="Search site..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="pl-10 w-full"
              />
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <Link to="/" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green">
                Home
              </Link>
              <div className="space-y-2">
                <Link to="/pricing" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green">
                  Pricing & Tier Plans
                </Link>
                <Link to="/how-it-works" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green pl-4">
                  How It Works
                </Link>
                <Link to="/reports" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green pl-4">
                  Reports
                </Link>
                <Link to="/faqs" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green pl-4">
                  FAQs
                </Link>
              </div>
              <div className="space-y-2">
                <Link to="/biztools" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green">
                  Tools
                </Link>
                <Link to="/biztools" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green pl-4">
                  BizTools - Tools & Resources
                </Link>
                <Link to="/blog" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green pl-4">
                  Business Insights & Strategies
                </Link>
                <Link to="/glossary-of-terms" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green pl-4">
                  Business Terms Glossary
                </Link>
              </div>
              <div className="space-y-2">
                <Link to="/about" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green">
                  About
                </Link>
                <Link to="/about" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green pl-4">
                  About Us
                </Link>
                <Link to="/legal" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green pl-4">
                  Legal
                </Link>
              </div>
              <Link to="/contact" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green">
                Contact
              </Link>
              
              {/* Mobile Hub Navigation - Temporarily hidden via feature flag */}
              {SHOW_HUBS && (
                <div className="pt-4 border-t border-border">
                  <h4 className="font-montserrat font-bold text-biz-navy mb-3">Hubs</h4>
                  {/* BizHealth.ai Main Hub Option */}
                  <div className="mb-4 pb-4 border-b border-border">
                    <Link 
                      to="/"
                      className="flex items-center space-x-3 text-left hover:text-biz-green transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <img 
                        src={bizHealthIcon} 
                        alt="BizHealth.ai" 
                        className="w-6 h-6 rounded object-cover"
                      />
                      <div>
                        <span className="font-montserrat font-semibold text-biz-navy block">BizHealth.ai</span>
                        <span className="text-sm text-biz-grey font-open-sans">Return to Main Hub</span>
                      </div>
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {hubNavigation.map((hub) => {
                      const IconComponent = hub.icon;
                      return (
                        <Link 
                          key={hub.name}
                          to={hub.links[0].href}
                          className="flex items-start gap-3 text-left hover:text-biz-green transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <IconComponent className={`w-5 h-5 mt-0.5 text-${hub.color}`} />
                          <div className="flex flex-col">
                            <span className="font-medium text-biz-navy">{hub.name}</span>
                            <span className="text-sm text-biz-grey">{hub.tagline}</span>
                          </div>
                        </Link>
                      );
                    })}
                    <Link 
                      to="/"
                      className="flex items-center gap-2 text-biz-green hover:text-biz-green/80 transition-colors mt-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-sm font-medium">← Back to Main Hub</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-border space-y-3">
              <Link to="/login">
                <Button variant="outline" className="w-full font-open-sans">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-biz-green hover:bg-biz-green/90 text-white font-open-sans">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GlobalNavigation;