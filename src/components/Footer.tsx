import { Mail, Phone, Shield, FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Business Health Analyzer</h3>
            <p className="text-background/80 leading-relaxed mb-6 max-w-md">
              Empowering entrepreneurs with AI-driven insights to build stronger, 
              more profitable businesses. Get the clarity you need to scale successfully.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4" />
                <span>SOC 2 Type II (In Progress)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4" />
                <span>GDPR Ready</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav aria-label="Quick links">
              <ul className="space-y-2 text-background/80">
                <li><a href="/how-it-works" className="hover:text-background transition-colors">How It Works</a></li>
                <li><a href="/reports" className="hover:text-background transition-colors">Sample Report</a></li>
                <li><a href="/pricing" className="hover:text-background transition-colors">Pricing</a></li>
                <li><a href="/faqs" className="hover:text-background transition-colors">FAQ</a></li>
              </ul>
            </nav>
          </div>
          
          {/* Legal & Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <nav aria-label="Support links">
              <ul className="space-y-2 text-background/80">
                <li><a href="/privacy" className="hover:text-background transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-background transition-colors">Terms of Service</a></li>
                <li><a href="/disclaimer" className="hover:text-background transition-colors">Disclaimer & Warranty</a></li>
                <li><a href="/legal" className="hover:text-background transition-colors">Refund Policy</a></li>
                <li><a href="/contact" className="hover:text-background transition-colors">Contact Us</a></li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <address className="not-italic">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                    <a href="mailto:support@bizhealth.ai" className="text-background/80 hover:text-background transition-colors">support@bizhealth.ai</a>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    <a href="tel:+18554768322" className="text-background/80 hover:text-background transition-colors">1-855-476-8322</a>
                  </div>
                </address>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Business Hours</h4>
              <div className="text-background/80 space-y-1">
                <div>Monday - Friday: 9:30 AM - 5:30 PM EDT*</div>
                <div>Weekend: Email support only</div>
                <div className="text-sm mt-2">*Assessments & reports are generated 24/7</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-background/60 text-sm">
            © 2025 Business Health Analyzer. All rights reserved.
          </div>
          <div className="text-background/60 text-sm">
            Your Trusted Business Health Analyst - Stop Guessing, Start Growing
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;