import { useState } from "react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, ArrowDownRight, ArrowRight, Lightbulb, DollarSign, BookOpen, CircleHelp } from "lucide-react";
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
      title: "Virtual Assistant",
      description: "Instant help when you need it",
      contact: "Available on website",
      note: "Available 24/7"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <GlobalNavigation />
      
      {/* Hero Section */}
      <section className="relative w-full h-[250px] md:h-[300px] overflow-hidden mt-36">
        <img 
          src={heroImage} 
          alt="Business health dashboard showing analytics of comprehensive business assessment"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="relative container mx-auto px-6 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Get in Touch
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white/95 leading-relaxed max-w-3xl mx-auto">
              Have questions about our business health assessments? Need help accessing your reports?<br className="hidden sm:block" />
              Our expert team is here to support your business growth journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
            <div className="text-center border border-border rounded-lg p-8 bg-background hover:shadow-card transition-shadow">
              <div className="inline-flex p-4 rounded-xl mb-6" style={{ backgroundColor: 'hsl(var(--biz-teal) / 0.15)' }}>
                <Mail className="w-8 h-8" style={{ color: 'hsl(var(--biz-teal))' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{contactMethods[0].title}</h3>
              <p className="text-muted-foreground mb-4">{contactMethods[0].description}</p>
              <a href={`mailto:${contactMethods[0].contact}`} className="font-semibold mb-2 hover:underline block" style={{ color: 'hsl(var(--biz-teal))' }}>
                {contactMethods[0].contact}
              </a>
              <p className="text-sm text-muted-foreground">{contactMethods[0].note}</p>
            </div>
            
            <div className="text-center border border-border rounded-lg p-8 bg-background hover:shadow-card transition-shadow">
              <div className="inline-flex p-4 rounded-xl mb-6" style={{ backgroundColor: 'hsl(var(--biz-copper) / 0.15)' }}>
                <Phone className="w-8 h-8" style={{ color: 'hsl(var(--biz-copper))' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{contactMethods[1].title}</h3>
              <p className="text-muted-foreground mb-4">{contactMethods[1].description}</p>
              <p className="font-semibold mb-2" style={{ color: 'hsl(var(--biz-copper))' }}>{contactMethods[1].contact}</p>
              <p className="text-sm text-muted-foreground">{contactMethods[1].note}</p>
            </div>
            
            <div className="text-center border border-border rounded-lg p-8 bg-background hover:shadow-card transition-shadow">
              <div className="inline-flex p-4 rounded-xl mb-6" style={{ backgroundColor: 'hsl(var(--biz-lime) / 0.15)' }}>
                <MessageSquare className="w-8 h-8" style={{ color: 'hsl(var(--biz-lime))' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{contactMethods[2].title}</h3>
              <p className="text-muted-foreground mb-4">{contactMethods[2].description}</p>
              <p className="font-semibold mb-2" style={{ color: 'hsl(var(--biz-lime))' }}>{contactMethods[2].contact}</p>
              <p className="text-sm text-muted-foreground">{contactMethods[2].note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-background rounded-lg p-8 border border-border">
                <h2 className="text-2xl font-bold mb-6" style={{ color: 'hsl(var(--biz-navy))' }}>Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: 'hsl(var(--biz-green))' }}>First Name</label>
                      <input 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                          borderColor: 'hsl(var(--border))',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'hsl(var(--biz-green))';
                          e.currentTarget.style.boxShadow = '0 0 0 2px hsl(var(--biz-green) / 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'hsl(var(--border))';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: 'hsl(var(--biz-green))' }}>Last Name</label>
                      <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                          borderColor: 'hsl(var(--border))',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'hsl(var(--biz-green))';
                          e.currentTarget.style.boxShadow = '0 0 0 2px hsl(var(--biz-green) / 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'hsl(var(--border))';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: 'hsl(var(--biz-green))' }}>Email Address</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        borderColor: 'hsl(var(--border))',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--biz-green))';
                        e.currentTarget.style.boxShadow = '0 0 0 2px hsl(var(--biz-green) / 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--border))';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: 'hsl(var(--biz-green))' }}>Company Name</label>
                    <input 
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        borderColor: 'hsl(var(--border))',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--biz-green))';
                        e.currentTarget.style.boxShadow = '0 0 0 2px hsl(var(--biz-green) / 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--border))';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: 'hsl(var(--biz-green))' }}>Subject</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        borderColor: 'hsl(var(--border))',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--biz-green))';
                        e.currentTarget.style.boxShadow = '0 0 0 2px hsl(var(--biz-green) / 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--border))';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Question</option>
                      <option>Partnership Opportunity</option>
                      <option>Media Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: 'hsl(var(--biz-green))' }}>Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        borderColor: 'hsl(var(--border))',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--biz-green))';
                        e.currentTarget.style.boxShadow = '0 0 0 2px hsl(var(--biz-green) / 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--border))';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: 'hsl(var(--biz-green))',
                      color: 'hsl(var(--biz-white))'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = 'hsl(var(--growth-hover))';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'hsl(var(--biz-green))';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </button>
                  
                  {/* Response Info & Encouragement - Anchored to bottom */}
                  <div className="mt-auto pt-4 border-t text-center space-y-6" style={{ borderColor: 'hsl(var(--biz-green) / 0.2)' }}>
                    <p className="text-sm font-semibold" style={{ color: 'hsl(var(--biz-green))' }}>
                      ⏱️ We typically respond within one business hour
                    </p>
                    <div className="text-sm leading-relaxed" style={{ color: 'hsl(var(--biz-grey))' }}>
                      <p className="font-bold text-base mb-2" style={{ color: 'hsl(var(--biz-blue))' }}>
                        Stop Guessing. Start Growing.
                      </p>
                      <p className="italic" style={{ color: 'hsl(var(--biz-blue))' }}>
                        Your business deserves clarity — we're here to deliver it.
                      </p>
                      <p className="text-xs font-semibold not-italic mt-3" style={{ color: 'hsl(var(--biz-green))' }}>
                        — BizHealth.ai Team
                      </p>
                    </div>
                  </div>
                </form>
              </div>

              {/* Company Info */}
              <div className="space-y-6">
                <div className="bg-biz-navy rounded-xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold mb-8 text-white">Company Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-5 rounded-lg bg-white/25 hover:bg-white/30 transition-colors">
                      <div className="p-3 rounded-xl bg-biz-green flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">Headquarters</h3>
                        <p className="text-white/90 leading-relaxed">
                          N. Orange Avenue<br />
                          Orlando, Florida 32801<br />
                          United States
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-5 rounded-lg bg-white/25 hover:bg-white/30 transition-colors">
                      <div className="p-3 rounded-xl bg-biz-green flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">Business Hours</h3>
                        <p className="text-white/90 leading-relaxed">
                          Monday - Friday: 9:30 AM - 5:30 PM EDT<br />
                          Saturday & Sunday: Closed
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-5 rounded-lg bg-white/25 hover:bg-white/30 transition-colors">
                      <div className="p-3 rounded-xl bg-biz-green flex-shrink-0">
                        <HelpCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">Support</h3>
                        <ul className="text-white/90 leading-relaxed space-y-2">
                          <li className="flex items-center gap-1">
                            <span className="text-white/90">•</span>
                            <span className="inline-flex items-center gap-1.5">
                              24/7 'Sherpa' chat bot
                              <span 
                                className="flex items-center justify-center rounded-full w-5 h-5"
                                style={{ 
                                  backgroundColor: 'hsl(var(--biz-lime))',
                                  padding: '2px'
                                }}
                              >
                                <HelpCircle 
                                  className="w-4 h-4" 
                                  style={{ color: 'hsl(var(--biz-navy))' }}
                                />
                              </span>
                              <ArrowDownRight className="w-4 h-4" />
                            </span>
                          </li>
                          <li className="flex items-center gap-1">
                            <span className="text-white/90">•</span>
                            <span>Email during business hours</span>
                          </li>
                          <li className="flex items-center gap-1">
                            <span className="text-white/90">•</span>
                            <span>Dedicated support for Enterprise-level clients</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="rounded-xl p-8 border shadow-sm bg-background" style={{ 
                  borderColor: 'hsl(var(--border))'
                }}>
                  <h3 className="text-xl font-semibold mb-6 text-foreground">Explore More</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <a 
                      href="/how-it-works" 
                      className="group relative p-5 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                      style={{ 
                        borderColor: 'hsl(var(--biz-teal) / 0.3)',
                        backgroundColor: 'hsl(var(--biz-teal) / 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--biz-teal))';
                        e.currentTarget.style.backgroundColor = 'hsl(var(--biz-teal) / 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--biz-teal) / 0.3)';
                        e.currentTarget.style.backgroundColor = 'hsl(var(--biz-teal) / 0.05)';
                      }}
                    >
                      <div className="p-2.5 rounded-lg w-fit mb-3" style={{ backgroundColor: 'hsl(var(--biz-teal) / 0.15)' }}>
                        <Lightbulb className="w-5 h-5" style={{ color: 'hsl(var(--biz-teal))' }} />
                      </div>
                      <h4 className="font-semibold text-foreground mb-1 text-sm">How It Works</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Our assessment process</p>
                      <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" style={{ color: 'hsl(var(--biz-teal))' }} />
                    </a>
                    
                    <a 
                      href="/pricing" 
                      className="group relative p-5 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                      style={{ 
                        borderColor: 'hsl(var(--biz-copper) / 0.3)',
                        backgroundColor: 'hsl(var(--biz-copper) / 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--biz-copper))';
                        e.currentTarget.style.backgroundColor = 'hsl(var(--biz-copper) / 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--biz-copper) / 0.3)';
                        e.currentTarget.style.backgroundColor = 'hsl(var(--biz-copper) / 0.05)';
                      }}
                    >
                      <div className="p-2.5 rounded-lg w-fit mb-3" style={{ backgroundColor: 'hsl(var(--biz-copper) / 0.15)' }}>
                        <DollarSign className="w-5 h-5" style={{ color: 'hsl(var(--biz-copper))' }} />
                      </div>
                      <h4 className="font-semibold text-foreground mb-1 text-sm">Pricing Plans</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Find your perfect tier</p>
                      <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" style={{ color: 'hsl(var(--biz-copper))' }} />
                    </a>
                    
                    <a 
                      href="/blog" 
                      className="group relative p-5 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                      style={{ 
                        borderColor: 'hsl(var(--biz-green) / 0.3)',
                        backgroundColor: 'hsl(var(--biz-green) / 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--biz-green))';
                        e.currentTarget.style.backgroundColor = 'hsl(var(--biz-green) / 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--biz-green) / 0.3)';
                        e.currentTarget.style.backgroundColor = 'hsl(var(--biz-green) / 0.05)';
                      }}
                    >
                      <div className="p-2.5 rounded-lg w-fit mb-3" style={{ backgroundColor: 'hsl(var(--biz-green) / 0.15)' }}>
                        <BookOpen className="w-5 h-5" style={{ color: 'hsl(var(--biz-green))' }} />
                      </div>
                      <h4 className="font-semibold text-foreground mb-1 text-sm">Blog & Insights</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Expert business strategies</p>
                      <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" style={{ color: 'hsl(var(--biz-green))' }} />
                    </a>
                    
                    <a 
                      href="/faqs" 
                      className="group relative p-5 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                      style={{ 
                        borderColor: 'hsl(var(--biz-blue) / 0.3)',
                        backgroundColor: 'hsl(var(--biz-blue) / 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--biz-blue))';
                        e.currentTarget.style.backgroundColor = 'hsl(var(--biz-blue) / 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'hsl(var(--biz-blue) / 0.3)';
                        e.currentTarget.style.backgroundColor = 'hsl(var(--biz-blue) / 0.05)';
                      }}
                    >
                      <div className="p-2.5 rounded-lg w-fit mb-3" style={{ backgroundColor: 'hsl(var(--biz-blue) / 0.15)' }}>
                        <CircleHelp className="w-5 h-5" style={{ color: 'hsl(var(--biz-blue))' }} />
                      </div>
                      <h4 className="font-semibold text-foreground mb-1 text-sm">FAQs</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Common questions answered</p>
                      <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" style={{ color: 'hsl(var(--biz-blue))' }} />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'hsl(var(--biz-navy))' }}>
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
      <PromotionalBanner />
    </div>
  );
};

export default Contact;