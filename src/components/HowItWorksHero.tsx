import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const HowItWorksHero = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const flowchartRef = useRef<HTMLDivElement>(null);

  const steps = [
    { id: 1, title: "Self-Assessment", color: "#007BFF" },
    { id: 2, title: "AI Analysis", color: "#007BFF" },
    { id: 3, title: "Report Generation", color: "#007BFF" },
    { id: 4, title: "Actionable Insights", color: "#28A745" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((step, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, step.id]);
              }, index * 500);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (flowchartRef.current) {
      observer.observe(flowchartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      className="relative pt-40 pb-20 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 100%)"
      }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Tagline */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: "#007BFF", fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Unlock 20–25x ROI in Under 90 Minutes
          </h1>
          <p className="text-lg md:text-xl" style={{ color: "#313131" }}>
            Transform your business with AI-powered insights
          </p>
        </div>

        {/* 3D Animated Flowchart */}
        <div 
          ref={flowchartRef}
          className="relative mb-12 py-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                {/* Step Card */}
                <div
                  className={`relative transition-all duration-700 transform ${
                    visibleSteps.includes(step.id)
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-95"
                  }`}
                  style={{
                    transitionDelay: `${index * 500}ms`
                  }}
                >
                  <div
                    className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] p-6 md:p-8 min-w-[200px] md:min-w-[180px] lg:min-w-[220px] text-center transform hover:scale-105 hover:shadow-[0_20px_50px_-10px_rgba(0,123,255,0.3)] transition-all duration-300"
                    style={{
                      border: `2px solid ${step.color}20`,
                      transformStyle: "preserve-3d",
                      perspective: "1000px"
                    }}
                  >
                    {/* Step Number */}
                    <div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full font-bold text-lg md:text-xl mx-auto mb-4 flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.id}
                    </div>
                    
                    {/* Step Title */}
                    <h3
                      className="font-bold text-base md:text-lg leading-tight"
                      style={{ 
                        color: "#313131",
                        fontFamily: "system-ui, -apple-system, sans-serif"
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div
                    className={`hidden md:flex items-center mx-2 lg:mx-4 transition-all duration-700 ${
                      visibleSteps.includes(step.id) ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${index * 500 + 250}ms`
                    }}
                  >
                    <ArrowRight 
                      className="w-6 h-6 lg:w-8 lg:h-8" 
                      style={{ color: "#28A745" }}
                      strokeWidth={3}
                    />
                  </div>
                )}

                {/* Mobile Connector */}
                {index < steps.length - 1 && (
                  <div
                    className={`md:hidden flex justify-center my-4 transition-all duration-700 ${
                      visibleSteps.includes(step.id) ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${index * 500 + 250}ms`
                    }}
                  >
                    <div
                      className="w-1 h-8 rounded-full"
                      style={{ backgroundColor: "#28A745" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Video Embed */}
        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] bg-gray-900">
            <div className="aspect-video">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=675&q=80"
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-data-analysis-47325-large.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Video Overlay with Play Icon Hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none flex items-center justify-center">
              <div className="text-white text-center">
                <p className="text-sm md:text-base font-semibold opacity-90">
                  See How BizHealth.ai Works
                </p>
              </div>
            </div>
          </div>
          
          {/* Video Caption */}
          <p className="text-center mt-4 text-sm md:text-base" style={{ color: "#313131" }}>
            Watch how our AI-powered platform analyzes your business in real-time
          </p>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center animate-fade-in">
          <p className="text-sm md:text-base font-semibold" style={{ color: "#313131" }}>
            Trusted by 10,000+ SMB founders and CEOs
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksHero;
