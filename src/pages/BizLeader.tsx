import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Crown, Users, TrendingUp, Award, CheckCircle, Play, BookOpen } from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import EmailCapturePopup from "@/components/EmailCapturePopup";
import PromotionalBanner from "@/components/PromotionalBanner";
import LeadershipQuiz from "@/components/LeadershipQuiz";

const BizLeader = () => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const launchDate = new Date('2026-01-07T13:00:00-05:00').getTime(); // Jan 7, 2026, 1:00 PM EST
      const now = new Date().getTime();
      const distance = launchDate - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown(`Time Remaining: ${days}d ${hours}h ${minutes}m`);
      } else {
        setCountdown("Launched!");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Crown,
      title: "Executive Leadership",
      description: "Develop C-suite level decision-making skills and strategic thinking capabilities."
    },
    {
      icon: Users,
      title: "Team Development",
      description: "Build high-performing teams with proven leadership frameworks and management techniques."
    },
    {
      icon: TrendingUp,
      title: "Growth Leadership",
      description: "Master the art of scaling organizations while maintaining culture and performance."
    },
    {
      icon: Award,
      title: "Leadership Certification",
      description: "Earn recognized certifications that validate your leadership expertise and credibility."
    }
  ];

  const programs = [
    {
      title: "Foundation Leadership Track",
      duration: "8 weeks",
      level: "Beginner",
      modules: ["Leadership Fundamentals", "Communication Excellence", "Team Building", "Conflict Resolution"]
    },
    {
      title: "Advanced Strategic Leadership",
      duration: "12 weeks", 
      level: "Advanced",
      modules: ["Strategic Planning", "Change Management", "Performance Optimization", "Innovation Leadership"]
    },
    {
      title: "Executive Mastery Program",
      duration: "16 weeks",
      level: "Executive",
      modules: ["Organizational Transformation", "Board Relations", "Crisis Leadership", "Legacy Building"]
    }
  ];

  const benefits = [
    "Personalized leadership assessment and development plan",
    "Live coaching sessions with industry experts",
    "Peer learning networks and mastermind groups", 
    "Real-world case studies and practical applications",
    "Ongoing mentorship and support community",
    "Leadership certification upon completion"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Banner */}
      <div className="sticky top-0 bg-biz-navy text-white py-2.5 text-center font-montserrat font-bold z-50">
        <div className="text-biz-lime">
          BizLeaDeR: Launching 2026 - Explore the vision as we put on the finishing touches
        </div>
        <div className="text-white text-sm">
          {countdown}
        </div>
      </div>
      
      <PromotionalBanner />
      <GlobalNavigation />
      
      {/* Hero Section */}
      <section className="relative bg-biz-lime text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-biz-navy/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <Crown className="w-12 h-12 text-biz-navy" />
              </div>
            </div>
            
            <h1 className="font-montserrat font-bold text-5xl lg:text-6xl mb-6 text-biz-navy">
              BizLeaDeR
            </h1>
            <p className="font-montserrat font-semibold text-2xl mb-4 text-white/95">
              Drive Scale with Confidence
            </p>
            <p className="font-open-sans text-xl max-w-3xl mx-auto mb-8 text-white/85">
              Transform your leadership capabilities with comprehensive development programs. Build the skills needed to lead high-performing teams and drive sustainable business growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-biz-navy hover:bg-white/90 font-montserrat font-semibold text-lg px-8 py-4"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="bg-biz-navy border-biz-lime text-biz-white hover:bg-biz-lime hover:text-white font-open-sans font-semibold text-lg px-8 py-4"
              >
                Watch Preview
                <Play className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Leadership Excellence Awaits
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive leadership development designed for modern business challenges
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-border/50 shadow-hub-lime hover:shadow-hub-lime/80 transition-all duration-300">
                <CardHeader>
                  <div className="bg-biz-lime/10 rounded-xl p-4 w-fit mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-biz-lime" />
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

      {/* Leadership Quiz Section */}
      <LeadershipQuiz />

      {/* Programs Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-6 text-foreground font-montserrat">
              Choose Your Leadership Path
            </h3>
            <p className="text-lg text-muted-foreground font-open-sans">
              Structured programs designed to meet you where you are and take you where you want to go
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="border-border/50 shadow-card hover:shadow-hub-lime/20 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-biz-lime/10 px-3 py-1 rounded-full">
                      <span className="text-biz-lime font-montserrat font-semibold text-sm">{program.level}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-biz-lime font-montserrat font-semibold">{program.duration}</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-montserrat text-foreground">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {program.modules.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-biz-lime flex-shrink-0" />
                        <span className="font-open-sans text-foreground">{module}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6 bg-biz-lime hover:bg-biz-lime/90 text-white font-montserrat">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-foreground font-montserrat">
                Why Choose BizLeaDeR?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 font-open-sans">
                Our leadership development programs are built on proven methodologies and real-world experience from successful business leaders.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-biz-lime flex-shrink-0 mt-0.5" />
                    <span className="font-open-sans text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-biz-lime rounded-2xl p-8 text-white">
              <BookOpen className="w-12 h-12 mb-6" />
              <h4 className="text-2xl font-bold mb-4 font-montserrat">
                Transform Your Leadership Today
              </h4>
              <p className="font-open-sans mb-6 opacity-90">
                Join thousands of leaders who have accelerated their growth and impact through our proven development programs.
              </p>
              <div className="bg-white/20 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 font-montserrat">35%</div>
                  <div className="text-sm opacity-90">Average team performance improvement</div>
                </div>
              </div>
              <Button 
                className="bg-white text-biz-lime hover:bg-white/90 font-montserrat font-semibold w-full"
                size="lg"
              >
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-biz-lime text-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4 font-montserrat">
            Ready to Lead with Confidence?
          </h3>
          <p className="text-xl mb-8 font-open-sans opacity-90">
            Take the first step towards transformational leadership development
          </p>
          <Button 
            size="lg"
            className="bg-white text-biz-lime hover:bg-white/90 font-montserrat font-semibold text-lg px-8 py-4"
          >
            Start Your Leadership Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <GlobalFooter />
      <EmailCapturePopup hubColor="biz-leader" />
    </div>
  );
};

export default BizLeader;