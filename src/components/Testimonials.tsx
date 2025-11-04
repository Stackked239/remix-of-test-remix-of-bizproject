import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah C.",
      role: "CEO", 
      company: "SaaS Startup",
      quote: "This tool transformed how I view my operations – highly recommend! The insights helped me identify critical bottlenecks I never knew existed.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus R.",
      role: "Founder",
      company: "Restaurant Chain",
      quote: "Saved me $15K in consulting fees and gave me actionable strategies to improve our customer retention by 40%. ROI was immediate.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily W.",
      role: "Managing Partner",
      company: "Creative Agency",
      quote: "The competitive benchmarking section was eye-opening. We implemented their HR recommendations and reduced turnover by 60%.",
      rating: 5,
      avatar: "EW"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            What Business Leaders Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of business owners who've transformed their businesses with our insights
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-2xl shadow-card hover:shadow-feature transition-all duration-300 border border-border/50 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 bg-primary p-3 rounded-full shadow-elegant">
                <Quote className="w-6 h-6 text-white" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-primary font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">2,700+</div>
            <div className="text-sm text-muted-foreground">Reports Generated</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-growth mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-trust mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Quick Delivery</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-biz-green mb-2">$15K</div>
            <div className="text-sm text-muted-foreground">Avg. Savings vs. Consulting</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;