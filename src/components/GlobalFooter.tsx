import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LayoutGrid, Linkedin, Twitter, Mail } from 'lucide-react';

const GlobalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-biz-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <LayoutGrid className="w-5 h-5 text-white" />
              </div>
              <span className="font-montserrat font-bold text-xl">BizHealth.ai</span>
            </Link>
            <p className="font-open-sans text-biz-grey text-sm leading-relaxed">
              Your AI-powered business health diagnostic platform. Stop guessing, start growing with data-driven insights for SMBs.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/company/bizhealth-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-biz-grey hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/bizhealthai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-biz-grey hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="mailto:hello@bizhealth.ai"
                className="text-biz-grey hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-bold text-lg">Quick Links</h3>
            <ul className="space-y-3 font-open-sans text-sm">
              <li>
                <Link to="/pricing" className="text-biz-grey hover:text-white transition-colors">
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-biz-grey hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-biz-grey hover:text-white transition-colors">
                  Blog & Resources
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-biz-grey hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-biz-grey hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-bold text-lg">Support & Legal</h3>
            <ul className="space-y-3 font-open-sans text-sm">
              <li>
                <Link to="/privacy" className="text-biz-grey hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-biz-grey hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-biz-grey hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:support@bizhealth.ai" 
                  className="text-biz-grey hover:text-white transition-colors"
                >
                  Support Center
                </a>
              </li>
              <li>
                <Link to="/security" className="text-biz-grey hover:text-white transition-colors">
                  Security & Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-bold text-lg">Stay Updated</h3>
            <p className="font-open-sans text-sm text-biz-grey">
              Get the latest business health insights, tips, and exclusive offers delivered to your inbox.
            </p>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-biz-grey focus:ring-biz-green focus:border-biz-green"
                />
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-biz-green hover:bg-biz-green/90 text-white font-open-sans shrink-0"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-biz-grey">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm font-open-sans text-biz-grey">
              <p>
                © 2025 Business Health Analyzer. All rights reserved.
              </p>
              <p className="text-center md:text-left">
                Your Business Health Coach - Stop Guessing, Start Growing
              </p>
            </div>
            
            {/* Business Hours & Contact */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm font-open-sans text-biz-grey">
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <a href="tel:+1-888-BIZ-HLTH" className="hover:text-white transition-colors">
                  1-888-BIZ-HLTH
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>🕒</span>
                <span>Mon-Fri 9AM-6PM EST</span>
              </div>
            </div>
          </div>
          
          {/* Additional Compliance & Trust Signals */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-xs font-open-sans text-biz-grey">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <span>🔒</span>
                <span>SSL Secured</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>🛡️</span>
                <span>GDPR Compliant</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>🏆</span>
                <span>SOC 2 Type II</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;