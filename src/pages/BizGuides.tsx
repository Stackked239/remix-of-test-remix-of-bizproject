import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Compass, Users, TrendingUp, Shield, CheckCircle, BookOpen } from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";

const BizGuides = () => {
  const features = [
    {
      icon: Compass,
      title: "Strategic Navigation",
      description: "Expert guidance through complex business challenges with AI-powered insights from your health report."
    },
    {
      icon: Users,
      title: "1-on-1 Coaching",
      description: "Personalized coaching sessions tailored to your specific business gaps and growth opportunities."
    },
    {
      icon: TrendingUp,
      title: "Growth Acceleration",
      description: "Proven strategies that deliver 15-20x ROI through targeted improvements in critical business areas."
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Identify and address potential pitfalls before they impact your business performance."
    }
  ];

  const benefits = [
    "Personalized coaching based on your BizHealth assessment",
    "Expert guidance from seasoned business professionals", 
    "Actionable strategies with measurable outcomes",
    "Ongoing support throughout your growth journey",
    "Access to exclusive business frameworks and tools",
    "Priority booking for consultation sessions"
  ];

  return (
    <div className="min-h-screen bg-background">
      <GlobalNavigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-teal text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-biz-navy/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <Compass className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="font-montserrat font-bold text-5xl lg:text-6xl mb-6">
              BizGuides
            </h1>
            <p className="font-montserrat font-semibold text-2xl mb-4 opacity-90">
              From Gaps to Guided Wins
            </p>
            <p className="font-open-sans text-xl max-w-3xl mx-auto mb-8 opacity-80">
              Your dedicated business health coach providing personalized guidance powered by AI insights. Navigate challenges with confidence and accelerate your growth journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-biz-teal hover:bg-white/90 font-montserrat font-semibold text-lg px-8 py-4"
              >
                Book Your Guide Session
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-biz-teal font-open-sans font-semibold text-lg px-8 py-4"
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Expert Guidance, Proven Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your business health insights into actionable strategies with dedicated coaching support
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-border/50 shadow-hub-teal hover:shadow-hub-teal/80 transition-all duration-300">
                <CardHeader>
                  <div className="bg-biz-teal/10 rounded-xl p-4 w-fit mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-biz-teal" />
                  </div>
                  <CardTitle className="text-xl font-montserrat">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-open-sans leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-foreground font-montserrat">
                Why Choose BizGuides?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 font-open-sans">
                Our coaching approach is built on the foundation of your comprehensive business health assessment, ensuring every strategy is tailored to your unique challenges and opportunities.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-biz-teal flex-shrink-0 mt-0.5" />
                    <span className="font-open-sans text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-teal rounded-2xl p-8 text-white">
              <BookOpen className="w-12 h-12 mb-6" />
              <h4 className="text-2xl font-bold mb-4 font-montserrat">
                Ready to Transform Your Business?
              </h4>
              <p className="font-open-sans mb-6 opacity-90">
                Schedule your personalized coaching session and start implementing strategies that deliver measurable results.
              </p>
              <Button 
                className="bg-white text-biz-teal hover:bg-white/90 font-montserrat font-semibold w-full"
                size="lg"
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-biz-teal text-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4 font-montserrat">
            Stop Guessing, Start Growing
          </h3>
          <p className="text-xl mb-8 font-open-sans opacity-90">
            Join thousands of SMBs who have transformed their business with expert guidance
          </p>
          <Button 
            size="lg"
            className="bg-white text-biz-teal hover:bg-white/90 font-montserrat font-semibold text-lg px-8 py-4"
          >
            Schedule Your Consultation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default BizGuides;