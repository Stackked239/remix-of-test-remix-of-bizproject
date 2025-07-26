import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import BusinessQuestionnaire from "@/components/BusinessQuestionnaire";
import BusinessReport from "@/components/BusinessReport";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'questionnaire' | 'report'>('landing');
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#questionnaire') {
        setCurrentView('questionnaire');
      } else if (window.location.hash === '#report') {
        setCurrentView('report');
      } else {
        setCurrentView('landing');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleQuestionnaireComplete = (data: any) => {
    setReportData(data);
    setCurrentView('report');
    window.location.hash = '#report';
  };

  const handleBackToAssessment = () => {
    setCurrentView('questionnaire');
    window.location.hash = '#questionnaire';
  };

  if (currentView === 'questionnaire') {
    return <BusinessQuestionnaire onComplete={handleQuestionnaireComplete} />;
  }

  if (currentView === 'report' && reportData) {
    return <BusinessReport data={reportData} onBack={handleBackToAssessment} />;
  }

  return (
    <div className="min-h-screen">
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
