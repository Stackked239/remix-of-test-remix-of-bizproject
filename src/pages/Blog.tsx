import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, ArrowRight, TrendingUp } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    title: "The Complete Guide to Business Health Assessment in 2025",
    excerpt: "As a business leader, you're no stranger to the whirlwind of running a company—juggling finances, operations, and team dynamics while keeping your eyes on the horizon for growth. But what if the cracks forming beneath the surface are quietly stalling your progress? That's where a Business Health Assessment comes in—a clear-eyed look at your company's vital signs to spot issues before they spiral into costly problems.",
    author: "Dennis Hough",
    date: "July 27, 2025",
    readTime: "15 min read",
    category: "Business Strategy",
    featured: true
  };

  const blogPosts = [
    {
      title: "5 Warning Signs Your Business Needs Immediate Attention",
      excerpt: "Discover the early indicators that suggest your business may be heading for trouble and what you can do about them.",
      author: "Michael Rodriguez",
      date: "March 10, 2024",
      readTime: "8 min read",
      category: "Risk Management"
    },
    {
      title: "How AI is Revolutionizing Small Business Analytics",
      excerpt: "Explore how artificial intelligence is making enterprise-level business intelligence accessible to small and medium businesses.",
      author: "Jennifer Walsh",
      date: "March 5, 2024", 
      readTime: "10 min read",
      category: "Technology"
    },
    {
      title: "Financial Health Metrics Every Business Owner Should Track",
      excerpt: "A comprehensive guide to the key financial indicators that provide insight into your business's current and future performance.",
      author: "Dr. Sarah Chen",
      date: "February 28, 2024",
      readTime: "15 min read",
      category: "Financial Management"
    },
    {
      title: "Building Operational Resilience in Uncertain Times",
      excerpt: "Strategies for creating business systems that can withstand market volatility and unexpected challenges.",
      author: "Michael Rodriguez",
      date: "February 22, 2024",
      readTime: "11 min read",
      category: "Operations"
    },
    {
      title: "The ROI of Business Intelligence for SMBs",
      excerpt: "Real-world case studies showing how small and medium businesses achieve measurable returns from business intelligence investments.",
      author: "Jennifer Walsh",
      date: "February 15, 2024",
      readTime: "9 min read",
      category: "Business Intelligence"
    },
    {
      title: "Strategic Planning for the Post-Pandemic Business Landscape",
      excerpt: "How to adapt your business strategy for the new realities of remote work, supply chain disruptions, and changing consumer behavior.",
      author: "Dr. Sarah Chen",
      date: "February 8, 2024",
      readTime: "13 min read",
      category: "Strategic Planning"
    }
  ];

  const categories = [
    "All Posts",
    "Business Strategy", 
    "Financial Management",
    "Operations",
    "Technology",
    "Risk Management",
    "Business Intelligence",
    "Strategic Planning"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Business Insights & Analysis
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Expert insights, practical strategies, and data-driven analysis to help you navigate the complexities 
              of modern business. Learn from our team's decades of consulting experience.
            </p>
            <div className="mt-8">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80" 
                alt="Professional woman working on laptop analyzing business data"
                className="rounded-xl shadow-elegant mx-auto max-w-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Featured</span>
                  <span className="text-white/80 text-sm">{featuredPost.category}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                
                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center gap-6 mb-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{featuredPost.readTime}</span>
                  </div>
                </div>
                
                <a 
                  href="/blog/business-health-assessment-2025" 
                  className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <button 
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === 0 
                      ? 'bg-primary text-white' 
                      : 'bg-background border border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article key={index} className="border border-border rounded-lg overflow-hidden bg-background hover:shadow-card transition-shadow">
                  <div className="h-48 bg-gradient-subtle border-b border-border flex items-center justify-center">
                    <TrendingUp className="w-16 h-16 text-primary/20" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-foreground leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-sm"
                    >
                      Read Article
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get our latest insights, tools, and strategies delivered straight to your inbox. 
              Join over 25,000 business owners who trust our expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="px-6 py-3 bg-gradient-hero text-white font-semibold rounded-lg hover:shadow-glow transition-all duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              No spam, unsubscribe at any time. Read our privacy policy.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;