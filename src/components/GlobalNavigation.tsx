import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import bizHealthLogo from '@/assets/bizhealth-logo-main.jpg';
import bizHealthHeroLogo from '@/assets/bizhealth-logo-hero.jpg';
import bizHealthNewLogo from '@/assets/bizhealth-logo-new.jpg';
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
} from '@/components/ui/dropdown-menu';

const GlobalNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const location = useLocation();

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

  return (
    <nav className="bg-biz-white border-b border-border sticky top-0 z-50 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img 
              src={bizHealthNewLogo} 
              alt="BizHealth.ai" 
              className="h-8 w-auto object-contain"
            />
          </Link>

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
              
              {/* Mega Menu Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <button className="font-open-sans font-medium text-biz-navy hover:text-biz-green transition-colors flex items-center space-x-1">
                  <span>Hubs</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Mega Menu Dropdown */}
                {isMegaMenuOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-4xl bg-biz-white rounded-lg shadow-elegant p-8 border border-border/20">
                    {/* BizHealth.ai Logo */}
                    <div className="flex justify-center mb-6">
                      <img 
                        src={bizHealthLogo} 
                        alt="BizHealth.ai Logo" 
                        className="h-12 w-auto"
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {hubNavigation.map((hub) => {
                        const IconComponent = hub.icon;
                        return (
                          <div key={hub.name} className="space-y-4">
                            <div className="flex items-center space-x-2 mb-3">
                              <IconComponent className={`w-5 h-5 text-${hub.color}`} />
                              <h3 className="font-montserrat font-bold text-biz-navy">{hub.name}</h3>
                            </div>
                            <p className="text-sm text-biz-grey font-open-sans mb-4">{hub.tagline}</p>
                            <ul className="space-y-2">
                              {hub.links.map((link) => (
                                <li key={link.name}>
                                  <Link
                                    to={link.href}
                                    className={`text-sm font-open-sans text-biz-navy/70 hover:text-${hub.color} transition-colors block`}
                                  >
                                    {link.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              <Link 
                to="/pricing" 
                className={`font-open-sans font-medium hover:text-biz-green transition-colors ${
                  isActiveRoute('/pricing') ? 'text-biz-green' : 'text-biz-navy'
                }`}
              >
                Pricing
              </Link>
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
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-biz-grey" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 w-64 bg-background border-border focus:ring-biz-green focus:border-biz-green"
              />
            </div>

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
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-biz-grey" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 w-full"
              />
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <Link to="/" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green">
                Home
              </Link>
              <Link to="/pricing" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green">
                Pricing
              </Link>
              <Link to="/contact" className="block font-open-sans font-medium text-biz-navy hover:text-biz-green">
                Contact
              </Link>
              
              {/* Mobile Hub Navigation */}
              <div className="pt-4 border-t border-border">
                <h4 className="font-montserrat font-bold text-biz-navy mb-3">Hubs</h4>
                <div className="space-y-4">
                  {hubNavigation.map((hub) => (
                    <div key={hub.name} className="space-y-2">
                      <h5 className={`font-montserrat font-semibold text-${hub.color}`}>{hub.name}</h5>
                      <ul className="pl-4 space-y-1">
                        {hub.links.map((link) => (
                          <li key={link.name}>
                           <Link
                             to={link.href}
                             className="text-sm font-open-sans text-biz-navy hover:text-biz-green block"
                             onClick={() => setIsMenuOpen(false)}
                           >
                             {link.name}
                           </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
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