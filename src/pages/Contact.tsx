import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, ArrowRight } from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses to your questions",
      contact: "support@bizhealth.ai",
      note: "Response within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "1-855-476-8322",
      note: "Mon-Fri, 9 AM - 6 PM EST"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant help when you need it",
      contact: "Available on our website",
      note: "Mon-Fri, 9 AM - 9 PM EST"
    }
  ];

  const faqs = [
    {
      question: "How quickly will I receive my business health report?",
      answer: "Most reports are generated instantly upon completion of your assessment. In rare cases where manual review is needed, you'll receive your report within 2-4 hours."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with your report, contact us for a full refund."
    },
    {
      question: "Is my business data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and follow strict data privacy protocols. Your information is never shared with third parties and is automatically deleted after 90 days."
    },
    {
      question: "Can I discuss my report with an expert?",
      answer: "Enterprise tier customers get direct access to our business consultants. Essentials and Growth tier customers can schedule a consultation for an additional fee."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Have questions about our business health assessments? Need help with your report? 
              Our expert team is here to support your business growth journey.
            </p>
            <div className="mt-8">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80" 
                alt="Business health dashboard showing analytics and performance metrics for comprehensive business assessment"
                className="rounded-xl shadow-card mx-auto max-w-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Get in Touch</h2>
            <p className="text-xl text-muted-foreground">Choose the best way to reach our expert team</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center border-2 border-transparent rounded-xl p-8 bg-gradient-to-br from-biz-green/5 to-biz-lime/10 hover:border-biz-green/30 hover:shadow-elegant transition-all duration-300 transform hover:scale-105">
                <div className="inline-flex p-4 rounded-2xl bg-biz-green/20 mb-6 shadow-sm">
                  <method.icon className="w-8 h-8 text-biz-green" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{method.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{method.description}</p>
                <p className="font-bold text-biz-green text-lg mb-2">{method.contact}</p>
                <p className="text-sm text-muted-foreground bg-biz-grey/10 rounded-lg py-2 px-3">{method.note}</p>
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
              <div className="bg-gradient-to-br from-background to-biz-grey/5 rounded-2xl p-8 border-2 border-biz-green/20 shadow-elegant">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-biz-green/20">
                    <Send className="w-6 h-6 text-biz-green" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Send Us a Message</h2>
                </div>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-biz-green">First Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-biz-green focus:ring-2 focus:ring-biz-green/20 transition-all duration-300"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-biz-green">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-biz-green focus:ring-2 focus:ring-biz-green/20 transition-all duration-300"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-biz-green">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-biz-green focus:ring-2 focus:ring-biz-green/20 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-biz-green">Company Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-biz-green focus:ring-2 focus:ring-biz-green/20 transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-biz-green">Subject</label>
                    <select className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-biz-green focus:ring-2 focus:ring-biz-green/20 transition-all duration-300">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Question</option>
                      <option>Partnership Opportunity</option>
                      <option>Media Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-biz-green">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-biz-green focus:ring-2 focus:ring-biz-green/20 transition-all duration-300"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  
                  <a 
                    href="mailto:support@bizhealth.ai"
                    className="w-full py-4 bg-gradient-to-r from-biz-green to-biz-lime text-white font-bold rounded-lg hover:from-biz-green/90 hover:to-biz-lime/90 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                  >
                    Send Message
                    <Send className="w-5 h-5" />
                  </a>
                </form>
              </div>

              {/* Company Info */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-biz-lime/10 to-biz-green/5 rounded-2xl p-8 border border-biz-lime/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-biz-lime/20">
                      <MapPin className="w-6 h-6 text-biz-green" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Company Information</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-biz-green/20">
                      <div className="p-3 rounded-xl bg-biz-green/20 shadow-sm">
                        <MapPin className="w-6 h-6 text-biz-green" />
                      </div>
                      <div>
                        <h3 className="font-bold text-biz-green text-lg mb-1">Headquarters</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          1635 E Hwy. 50, Suite 204<br />
                          Clermont, Florida 34711<br />
                          United States
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-biz-lime/20">
                      <div className="p-3 rounded-xl bg-biz-lime/20 shadow-sm">
                        <Clock className="w-6 h-6 text-biz-green" />
                      </div>
                      <div>
                        <h3 className="font-bold text-biz-green text-lg mb-1">Business Hours</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                          Saturday: 10:00 AM - 4:00 PM EST<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-biz-green/20">
                      <div className="p-3 rounded-xl bg-biz-green/20 shadow-sm">
                        <HelpCircle className="w-6 h-6 text-biz-green" />
                      </div>
                      <div>
                        <h3 className="font-bold text-biz-green text-lg mb-1">Support</h3>
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
                <div className="bg-gradient-to-br from-biz-green/10 to-biz-lime/5 rounded-2xl p-6 border-2 border-biz-green/20 shadow-card">
                  <h3 className="text-xl font-bold mb-4 text-biz-green flex items-center gap-2">
                    <div className="p-1 rounded bg-biz-green/20">
                      <ArrowRight className="w-5 h-5 text-biz-green" />
                    </div>
                    Quick Links
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <a href="/pricing" className="block p-3 rounded-lg bg-background/70 text-biz-green hover:bg-biz-green hover:text-white transition-all duration-300 font-semibold border border-biz-green/20 hover:border-biz-green">
                      View Pricing & Plans
                    </a>
                    <a href="/how-it-works" className="block p-3 rounded-lg bg-background/70 text-biz-green hover:bg-biz-green hover:text-white transition-all duration-300 font-semibold border border-biz-green/20 hover:border-biz-green">
                      How It Works
                    </a>
                    <a href="/resources" className="block p-3 rounded-lg bg-background/70 text-biz-green hover:bg-biz-green hover:text-white transition-all duration-300 font-semibold border border-biz-green/20 hover:border-biz-green">
                      Free Resources
                    </a>
                    <a href="/blog" className="block p-3 rounded-lg bg-background/70 text-biz-green hover:bg-biz-green hover:text-white transition-all duration-300 font-semibold border border-biz-green/20 hover:border-biz-green">
                      Insights Blog
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">Get quick answers to common questions</p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className={`border border-border rounded-xl p-6 ${index % 2 === 0 ? 'bg-gradient-to-r from-biz-green/5 to-biz-lime/10' : 'bg-gradient-to-r from-biz-lime/5 to-background'} hover:border-biz-green/30 transition-all duration-300 shadow-sm hover:shadow-card`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-biz-green/20 flex-shrink-0 mt-1">
                      <HelpCircle className="w-5 h-5 text-biz-green" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-3 text-biz-green">{faq.question}</h3>
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-biz-green to-biz-lime">
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
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-biz-green font-bold rounded-lg hover:bg-biz-grey/10 hover:scale-105 transition-all duration-300 shadow-elegant"
            >
              Choose Your Assessment
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;