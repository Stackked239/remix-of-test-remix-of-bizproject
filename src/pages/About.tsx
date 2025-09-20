import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Target, Award, Brain, Shield, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "We leverage cutting-edge artificial intelligence to provide insights that would traditionally require expensive consulting engagements."
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Your business data is sacred. We maintain the highest standards of security and provide complete transparency in our analysis process."
    },
    {
      icon: Target,
      title: "Actionable Results",
      description: "We don't just identify problems—we provide specific, prioritized recommendations that you can implement immediately."
    }
  ];

  const team = [
    {
      name: "Dennis Hough",
      role: "CEO & Co-Founder",
      bio: "With 30+ years in business strategy and scaling companies.",
      speciality: "Strategic Planning & Business Growth"
    },
    {
      name: "Austin Warren",
      role: "CTO & Co-Founder", 
      bio: "Decades of experience in business operations & technology integration; Solution minded and an expert in business analytics and technology development & implementation.",
      speciality: "Technology & Business Operations"
    },
    {
      name: "Scott Homan",
      role: "Director of Client Experience",
      bio: "Former business owner & seasoned business leader with an eye & knack for creating exceptional client engagement.",
      speciality: "Client Relations & Business Leadership"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Businesses Analyzed" },
    { number: "85%", label: "Report Implementation Rate" },
    { number: "94%", label: "Customer Satisfaction" },
    { number: "2.3x", label: "Average ROI Improvement" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              About BizHealth.ai
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're democratizing business intelligence by making enterprise-level analysis accessible to every business owner. 
              Our mission is to help small and mid-size businesses thrive through data-driven insights.
            </p>
            <div className="mt-8">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80" 
                alt="Professional team collaborating on business strategy with laptops"
                className="rounded-xl shadow-card mx-auto max-w-3xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    BizHealth.ai was born from a simple observation: traditional business consulting was pricing out the very businesses that needed it most. Small and mid-size companies were struggling with critical decisions while expensive consulting services remained out of reach.
                  </p>
                  <p>
                    Our founders, having worked in top-tier consulting firms and successful startups, saw an opportunity to leverage artificial intelligence to democratize business intelligence. We spent three years developing our proprietary assessment methodology, drawing from thousands of real business cases and industry best practices.
                  </p>
                  <p>
                    Today, we're proud to serve over 10,000 businesses worldwide, helping them identify opportunities, mitigate risks, and scale sustainably. Our AI-powered platform delivers insights that would traditionally cost tens of thousands of dollars—for a fraction of the price.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md h-96 rounded-2xl bg-gradient-subtle border border-border flex items-center justify-center">
                  <Users className="w-32 h-32 text-primary/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make and every product we build
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-4 rounded-xl bg-background shadow-card mb-6 border border-border/50">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals who've dedicated their careers to helping businesses succeed
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-background rounded-lg p-8 border border-border">
                <div className="w-24 h-24 rounded-full bg-gradient-hero mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{member.bio}</p>
                <p className="text-xs text-growth font-medium">{member.speciality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-8">
              <Award className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              To empower every business owner with the insights they need to make confident, data-driven decisions. 
              We believe that access to quality business intelligence shouldn't be limited by budget—it should be a fundamental right for any entrepreneur working to build something meaningful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/pricing" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-hero text-white font-semibold rounded-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
              >
                Experience Our Platform
              </a>
              <a 
                href="mailto:support@bizhealth.ai" 
                className="inline-flex items-center justify-center px-8 py-4 border border-border bg-background text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;