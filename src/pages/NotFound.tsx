import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, ArrowLeft, BookOpen, Wrench, AlertCircle } from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";

const NotFound = () => {
  const helpfulLinks = [
    {
      icon: Home,
      title: "Home",
      description: "Return to our homepage",
      url: "/",
      color: "text-biz-navy",
      bgColor: "bg-biz-navy/10"
    },
    {
      icon: Search,
      title: "Search",
      description: "Find what you're looking for",
      url: "/search",
      color: "text-biz-green",
      bgColor: "bg-biz-green/10"
    },
    {
      icon: Wrench,
      title: "BizTools",
      description: "Explore our business tools",
      url: "/biztools",
      color: "text-biz-copper",
      bgColor: "bg-biz-copper/10"
    },
    {
      icon: BookOpen,
      title: "Blog",
      description: "Read our latest insights",
      url: "/blog",
      color: "text-biz-lime",
      bgColor: "bg-biz-lime/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="404 - Page Not Found | BizHealth.ai"
        description="The page you're looking for doesn't exist. Return to homepage or browse our resources to find what you need."
        canonical="https://bizhealth.ai/404"
      />
      
      <PromotionalBanner />
      <GlobalNavigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-biz-navy via-biz-navy/95 to-biz-navy pt-40 pb-20 px-6" style={{ paddingTop: '180px' }}>
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <AlertCircle className="w-24 h-24 text-biz-copper mx-auto mb-6" />
            <h1 className="font-montserrat font-bold text-6xl md:text-7xl text-white mb-4">
              404
            </h1>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
              Page Not Found
            </h2>
            <p className="font-open-sans text-lg text-white/90 max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist. It may have been moved, deleted, or the URL might be incorrect.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-biz-green hover:bg-biz-green/90">
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-biz-navy">
              <Link to="/search">
                <Search className="w-5 h-5 mr-2" />
                Search Site
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Helpful Links Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground font-montserrat">
              Where would you like to go?
            </h3>
            <p className="text-lg text-muted-foreground font-open-sans">
              Here are some popular pages to help you find what you need
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpfulLinks.map((link, index) => (
              <Link key={index} to={link.url}>
                <Card className="h-full border-border/50 hover:border-biz-green/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group">
                  <CardHeader>
                    <div className={`${link.bgColor} rounded-xl p-4 w-fit mx-auto mb-4 transition-transform duration-300 group-hover:scale-110`}>
                      <link.icon className={`w-8 h-8 ${link.color}`} />
                    </div>
                    <CardTitle className="text-xl font-montserrat text-center">{link.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-open-sans text-center">
                      {link.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="py-16 bg-biz-navy/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground font-montserrat">
            Still can't find what you're looking for?
          </h3>
          <p className="text-muted-foreground mb-6 font-open-sans">
            Get in touch with our team and we'll help you find the right resources for your business needs.
          </p>
          <Button asChild size="lg" className="bg-biz-copper hover:bg-biz-copper/90">
            <Link to="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default NotFound;
