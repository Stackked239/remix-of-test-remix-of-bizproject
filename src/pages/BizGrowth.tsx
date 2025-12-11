import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, BookOpen, Users, Target, CheckCircle, Play, GraduationCap } from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import EmailCapturePopup from "@/components/EmailCapturePopup";
import PromotionalBanner from "@/components/PromotionalBanner";

const BizGrowth = () => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const launchDate = new Date('2026-06-10T12:07:00-04:00').getTime(); // Jun 10, 2026, 12:07 PM EDT
      const now = new Date().getTime();
      const distance = launchDate - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown(`Official Launch in: ${days} days, ${hours} hours, ${minutes} minutes`);
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
      icon: BookOpen,
      title: "Strategic Courses",
      description: "Comprehensive business education covering all aspects of sustainable growth and scaling."
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry veterans and successful entrepreneurs who've built thriving businesses."
    },
    {
      icon: Target,
      title: "Practical Application",
      description: "Apply learning immediately with real-world projects and actionable business strategies."
    },
    {
      icon: GraduationCap,
      title: "Growth Certification",
      description: "Earn credentials that demonstrate your expertise in strategic business advancement."
    }
  ];

  const courses = [
    {
      title: "Financial Mastery for Growth",
      category: "Finance",
      lessons: 12,
      duration: "6 weeks",
      level: "Intermediate",
      description: "Master cash flow management, funding strategies, and financial planning for sustainable growth."
    },
    {
      title: "Marketing & Customer Acquisition",
      category: "Marketing",
      lessons: 15,
      duration: "8 weeks", 
      level: "All Levels",
      description: "Build effective marketing systems that consistently attract and convert your ideal customers."
    },
    {
      title: "Operations Excellence",
      category: "Operations",
      lessons: 10,
      duration: "5 weeks",
      level: "Advanced",
      description: "Streamline processes, improve efficiency, and build scalable operational frameworks."
    },
    {
      title: "Strategic Leadership",
      category: "Leadership",
      lessons: 18,
      duration: "10 weeks",
      level: "Advanced",
      description: "Develop the leadership skills needed to guide teams through growth and transformation."
    }
  ];

  const stats = [
    { number: "500+", label: "Business Leaders Trained" },
    { number: "25%", label: "Average Revenue Increase" },
    { number: "90%", label: "Course Completion Rate" },
    { number: "4.8/5", label: "Student Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PromotionalBanner />
      
      {/* Sticky Banner - positioned below header and nav bar */}
      <div className="sticky top-36 w-full bg-biz-navy px-4 py-3 text-center font-montserrat font-bold z-30">
        <div className="text-biz-lime text-sm md:text-base">
          BizGrowth: Launching June 10, 2026 - Explore the vision as we put on the finishing touches
        </div>
        <div className="text-white text-xs md:text-sm">
          {countdown}
        </div>
      </div>
      
      <GlobalNavigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-biz-navy via-biz-navy to-biz-navy/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-biz-citrine/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-biz-green/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-biz-citrine/20 rounded-full p-4">
                <TrendingUp className="w-12 h-12 text-biz-citrine" />
              </div>
            </div>
            
            <h1 className="font-montserrat font-bold text-5xl lg:text-6xl mb-6 text-white">
              BizGrowth Academy
            </h1>
            <p className="font-montserrat font-semibold text-2xl mb-4 text-biz-citrine">
              Strategic Advancement Awaits
            </p>
            <p className="font-open-sans text-xl max-w-3xl mx-auto mb-8 text-white/85">
              Your institute for strategic business advancement. Master the skills and strategies needed to scale your business sustainably through comprehensive educational programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-biz-citrine text-biz-navy hover:bg-biz-citrine/90 font-montserrat font-semibold text-lg px-8 py-4"
              >
                Explore Courses
                <BookOpen className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-white/10 font-open-sans font-semibold text-lg px-8 py-4"
              >
                Watch Demo
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
              Education That Transforms
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive business education designed for ambitious entrepreneurs and business leaders
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-border/50 shadow-hub-citrine hover:shadow-hub-citrine/80 transition-all duration-300">
                <CardHeader>
                  <div className="bg-biz-citrine/10 rounded-xl p-4 w-fit mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-biz-citrine" />
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

      {/* Stats Section */}
      <section className="py-16 bg-biz-navy text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2 font-montserrat text-biz-citrine">{stat.number}</div>
                <div className="font-open-sans opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-6 text-foreground font-montserrat">
              Featured Courses
            </h3>
            <p className="text-lg text-muted-foreground font-open-sans">
              Comprehensive programs designed to accelerate your business growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="border-border/50 shadow-card hover:shadow-hub-citrine/20 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-biz-citrine/10 px-3 py-1 rounded-full">
                      <span className="text-biz-citrine font-montserrat font-semibold text-sm">{course.category}</span>
                    </div>
                    <div className="text-right text-sm text-muted-foreground font-open-sans">
                      <div>{course.lessons} lessons</div>
                      <div>{course.duration}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-montserrat text-foreground mb-2">
                    {course.title}
                  </CardTitle>
                  <div className="bg-biz-citrine/10 px-2 py-1 rounded text-xs text-biz-citrine font-montserrat font-semibold w-fit">
                    {course.level}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-open-sans leading-relaxed mb-4">
                    {course.description}
                  </CardDescription>
                  <Button className="w-full bg-biz-citrine hover:bg-biz-citrine/90 text-white font-montserrat">
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-biz-citrine text-biz-citrine hover:bg-biz-citrine hover:text-white font-montserrat font-semibold"
            >
              View All Courses
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-foreground font-montserrat">
                Academy Membership
              </h3>
              <p className="text-lg text-muted-foreground mb-8 font-open-sans">
                Get unlimited access to all courses, exclusive workshops, and a thriving community of growth-minded business leaders.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-biz-citrine flex-shrink-0" />
                  <span className="font-open-sans text-foreground">Access to all current and future courses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-biz-citrine flex-shrink-0" />
                  <span className="font-open-sans text-foreground">Monthly live Q&A sessions with experts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-biz-citrine flex-shrink-0" />
                  <span className="font-open-sans text-foreground">Private community forum and networking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-biz-citrine flex-shrink-0" />
                  <span className="font-open-sans text-foreground">Downloadable resources and templates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-biz-citrine flex-shrink-0" />
                  <span className="font-open-sans text-foreground">Certificate of completion for all courses</span>
                </div>
              </div>
              
              <Button 
                size="lg"
                className="bg-biz-citrine hover:bg-biz-citrine/90 text-white font-montserrat font-semibold"
              >
                Join Academy
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-biz-navy to-biz-navy/90 rounded-2xl p-8 text-white text-center border border-biz-citrine/30">
              <GraduationCap className="w-16 h-16 mx-auto mb-6 text-biz-citrine" />
              <h4 className="text-2xl font-bold mb-4 font-montserrat">
                Special Launch Offer
              </h4>
              <div className="text-5xl font-bold mb-2 font-montserrat text-biz-citrine">
                $49
              </div>
              <div className="text-lg opacity-90 mb-6">
                /month • First 3 months
              </div>
              <div className="bg-biz-citrine/15 rounded-lg p-4 mb-6 border border-biz-citrine/20">
                <div className="text-sm opacity-90 mb-2">Then only $99/month</div>
                <div className="text-sm opacity-75">Cancel anytime</div>
              </div>
              <Button 
                className="bg-biz-citrine text-biz-navy hover:bg-biz-citrine/90 font-montserrat font-semibold w-full"
                size="lg"
              >
                Start Learning Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white" style={{ backgroundColor: 'rgba(150, 148, 35, 0.35)' }}>
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4 font-montserrat">
            Your Growth Journey Starts Here
          </h3>
          <p className="text-xl mb-8 font-open-sans opacity-90">
            Join thousands of entrepreneurs who are transforming their businesses through education
          </p>
          <Button 
            size="lg"
            className="bg-biz-citrine text-biz-navy hover:bg-biz-citrine/90 font-montserrat font-semibold text-lg px-8 py-4"
          >
            Explore All Courses
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <GlobalFooter />
      <EmailCapturePopup hubColor="biz-growth" />
    </div>
  );
};

export default BizGrowth;