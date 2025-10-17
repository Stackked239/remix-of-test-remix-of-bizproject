import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";
import OrganizationSchema from "@/components/OrganizationSchema";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/contact-hero-dashboard.webp";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    subject: "General Inquiry",
    message: "",
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://lnthvnzounlxjedsbkgc.supabase.co/functions/v1/send-notification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "contact_form",
            ...formData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses to your questions",
      contact: "support@bizhealth.ai",
      note: "Response within hours, not days"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "1-855-476-8322",
      note: "Mon-Fri, 9:30 AM - 5:30 PM EDT"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant help when you need it",
      contact: "Available on our website",
      note: "during normal business hours"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | BizHealth.ai – Stop Guessing. Start Growing.</title>
        <meta 
          name="description" 
          content="Need help with your business health assessment? Contact BizHealth.ai's experts for AI-driven SMB growth solutions." 
        />
        <link rel="canonical" href="https://www.bizhealth.ai/contact" />
        <meta property="og:title" content="Contact BizHealth.ai | SMB Growth Support" />
        <meta 
          property="og:description" 
          content="Need help with your business health assessment? Contact BizHealth.ai's experts for AI-driven SMB growth solutions." 
        />
        <meta property="og:url" content="https://www.bizhealth.ai/contact" />
        <meta property="og:image" content="https://www.bizhealth.ai/logo-512.jpg" />
        <meta name="twitter:title" content="Contact BizHealth.ai | SMB Growth Support" />
        <meta 
          name="twitter:description" 
          content="Need help with your business health assessment? Contact BizHealth.ai's experts for AI-driven SMB growth solutions." 
        />
        <meta name="twitter:image" content="https://www.bizhealth.ai/logo-512.jpg" />
      </Helmet>
      <OrganizationSchema />

      <div className="min-h-screen bg-background">

      <Navigation />
      
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Compass for business growth - SMB business support and AI business assessment dashboard"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="relative container mx-auto px-4 sm:px-6 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Connect with Our Experts
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed max-w-3xl mx-auto">
              <em>Have questions about our business health assessments? Need help accessing your reports?</em> Our team of experts are here to support your business growth journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center border border-border rounded-lg p-8 bg-background hover:shadow-card transition-shadow">
                <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-6">
                  <method.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{method.title}</h3>
                <p className="text-muted-foreground mb-4">{method.description}</p>
                <p className="font-semibold text-primary mb-2">{method.contact}</p>
                <p className="text-sm text-muted-foreground">{method.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-background rounded-lg p-8 pb-12 border border-border">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Send Us A Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">First Name</label>
                      <input 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Last Name</label>
                      <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Email Address</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Company Name</label>
                    <input 
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Subject</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Question</option>
                      <option>Partnership Opportunity</option>
                      <option>Media Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Company Info */}
              <div className="space-y-6">
                <div className="bg-background rounded-xl p-8 border border-border shadow-sm">
                  <h2 className="text-2xl font-bold mb-8 text-foreground">Company Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">Headquarters</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          N. Orange Avenue<br />
                          Orlando, Florida 32801<br />
                          United States
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Monday - Friday: 9:30 AM - 5:30 PM EDT<br />
                          Saturday & Sunday: Closed
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                        <HelpCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">Support</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          24/7 email support<br />
                          Live chat during business hours<br />
                          Emergency support for Enterprise customers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-background rounded-xl p-8 border border-border shadow-sm">
                  <h3 className="text-xl font-semibold mb-6 text-foreground">Quick Links</h3>
                  <div className="space-y-3">
                    <a href="/how-it-works" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors py-2 px-3 rounded-lg hover:bg-primary/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      How BizHealth.ai Works
                    </a>
                    <a href="/pricing" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors py-2 px-3 rounded-lg hover:bg-primary/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Pricing & Tier Plans
                    </a>
                    <a href="/blog" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors py-2 px-3 rounded-lg hover:bg-primary/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Business Insights blog
                    </a>
                    <a href="/faqs" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors py-2 px-3 rounded-lg hover:bg-primary/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      FAQs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#969423' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Assess Your Business Health?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Don't wait for problems to become crises. Get your comprehensive business assessment today.
            </p>
            <a 
              href="/pricing" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Choose Your Assessment
            </a>
          </div>
        </div>
      </section>

      <GlobalFooter />
      </div>
    </>
  );
};

export default Contact;