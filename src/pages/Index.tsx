import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Coming Soon Banner */}
      <div className="bg-coming-soon text-coming-soon-foreground py-3 text-center font-bold text-lg tracking-wider relative z-50">
        COMING SOON
      </div>
      <Navigation />
      <Hero />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
