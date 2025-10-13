import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Twitter, Mail, HelpCircle, Facebook } from 'lucide-react';
import { toast } from 'sonner';
import bizhealthLogo from '@/assets/bizhealth-logo-footer.png';

const GlobalFooter = () => {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  return (
    <>
      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BizHealth.ai",
            "alternateName": "Business Health Analyzer",
            "url": "https://bizhealth.ai",
            "logo": "https://bizhealth.ai/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-888-249-4584",
              "contactType": "customer service",
              "availableLanguage": ["English"]
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "sameAs": [
              "https://linkedin.com/company/bizhealth-ai",
              "https://twitter.com/bizhealthai"
            ]
          })
        }}
      />
      
      {/* hreflang links */}
      <link rel="alternate" hrefLang="en-US" href="https://bizhealth.ai" />
      <link rel="alternate" hrefLang="en-GB" href="https://bizhealth.ai" />
      <link rel="alternate" hrefLang="en-AU" href="https://bizhealth.ai" />
      <link rel="alternate" hrefLang="de-DE" href="https://de.bizhealth.ai" />

      <footer 
        className="relative bg-gradient-to-b from-biz-navy/90 to-biz-white/90 py-8 md:py-12"
        role="contentinfo"
        aria-label="Footer"
      >
        {/* Gradient Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-biz-navy via-biz-navy/80 to-biz-white/20 opacity-90 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content - Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            
            {/* Quick Links Card */}
            <Card className="bg-biz-white border border-biz-grey/30 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 md:p-8">
                <h3 className="font-montserrat font-bold text-lg text-biz-navy mb-4">
                  Quick Links
                </h3>
                <nav aria-label="Quick navigation links">
                  <ul className="space-y-3 font-open-sans text-sm md:text-base leading-relaxed">
                    <li>
                      <Link 
                        to="/how-it-works" 
                        className="text-biz-grey hover:text-biz-teal transition-colors duration-300 hover:scale-105 inline-block"
                      >
                        How It Works
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/pricing" 
                        className="text-biz-grey hover:text-biz-teal transition-colors duration-300 hover:scale-105 inline-block"
                      >
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/faq" 
                        className="text-biz-grey hover:text-biz-teal transition-colors duration-300 hover:scale-105 inline-block"
                        aria-label="Frequently Asked Questions"
                      >
                        <HelpCircle className="w-4 h-4 inline mr-2" />
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/contact" 
                        className="text-biz-grey hover:text-biz-teal transition-colors duration-300 hover:scale-105 inline-block"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/privacy" 
                        className="text-biz-grey hover:text-biz-teal transition-colors duration-300 hover:scale-105 inline-block"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/terms" 
                        className="text-biz-grey hover:text-biz-teal transition-colors duration-300 hover:scale-105 inline-block"
                      >
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/disclaimer" 
                        className="text-biz-grey hover:text-biz-teal transition-colors duration-300 hover:scale-105 inline-block"
                      >
                        Disclaimer & Warranty
                      </Link>
                    </li>
                  </ul>
                </nav>
              </CardContent>
            </Card>

            {/* Social & Newsletter Card */}
            <Card className="bg-biz-white border border-biz-grey/30 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 md:p-8">
                <h3 className="font-montserrat font-bold text-lg text-biz-navy mb-4">
                  Stay Connected
                </h3>
                
                {/* Social Media Icons */}
                <div className="flex space-x-4 mb-6">
                  <a 
                    href="https://www.linkedin.com/company/bizhealth-ai/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-biz-grey hover:text-biz-teal transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn Social Icon - Connect with BizHealth.ai"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61582021647636&sk=about" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-biz-grey hover:text-biz-teal transition-all duration-300 hover:scale-110"
                    aria-label="Facebook Social Icon - Follow BizHealth.ai on Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://twitter.com/bizhealthai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-biz-grey hover:text-biz-teal transition-all duration-300 hover:scale-110"
                    aria-label="Twitter Social Icon - Follow BizHealth.ai updates"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>

                {/* Newsletter Signup */}
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address for newsletter subscription
                  </label>
                  <div className="space-y-3">
                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm md:text-base"
                      required
                      aria-describedby="newsletter-description"
                    />
                    <div className="flex justify-center">
                      <Button 
                        type="submit"
                        className="bg-biz-teal hover:bg-biz-teal/90 text-white font-open-sans px-6 md:px-8 transition-all duration-300 hover:shadow-lg"
                        aria-label="Subscribe to newsletter"
                      >
                        Subscribe
                      </Button>
                    </div>
                  </div>
                  <p 
                    id="newsletter-description"
                    className="text-xs md:text-sm text-biz-grey font-open-sans leading-relaxed text-center"
                  >
                    Receive business health insights and product updates via email; unsubscribe anytime.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="bg-biz-white border border-biz-grey/30 rounded-lg shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 md:p-8">
                <h3 className="font-montserrat font-bold text-lg text-biz-navy mb-4">
                  Get in Touch
                </h3>
                
                <div className="space-y-4 font-open-sans text-sm md:text-base leading-relaxed">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-biz-teal" />
                      <a 
                        href="mailto:support@bizhealth.ai"
                        className="text-biz-grey hover:text-biz-teal transition-colors"
                      >
                        support@bizhealth.ai
                      </a>
                    </div>
                    <div className="text-biz-grey">
                      1-855-476-8322
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-montserrat font-bold text-base text-biz-navy">
                      Business Hours
                    </h4>
                    <div className="text-biz-grey space-y-1">
                      <div>Monday - Friday: 9:30 AM - 5:30 PM EDT*</div>
                      <div>Weekend: Email support only</div>
                      <div className="text-xs mt-2 italic">*Assessments & reports are generated 24/7</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Copyright Card */}
          <Card className="bg-biz-white border border-biz-grey/30 rounded-lg shadow-sm">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <p className="text-sm text-biz-grey font-open-sans leading-relaxed">
                    © {currentYear} Business Health Analyzer. All rights reserved.
                  </p>
                  <p className="text-xs text-biz-grey font-open-sans mt-1">
                    Your Trusted Business Health Advisor - Stop Guessing, Start Growing
                  </p>
                </div>
                
                {/* Trust Signals */}
                <div className="flex items-center space-x-4 text-xs font-open-sans text-biz-grey">
                  <span className="flex items-center space-x-1">
                    <span role="img" aria-label="Security">🔒</span>
                    <span>SSL Secured</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span role="img" aria-label="Compliance">🛡️</span>
                    <span>GDPR Ready</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span role="img" aria-label="Certification">🏆</span>
                    <span>SOC 2 Type II</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </footer>
    </>
  );
};

export default GlobalFooter;