import bannerLogo from "@/assets/bizhealth-logo-banner.jpg";

const PromotionalBanner = () => {
  return (
    <div 
      className="fixed top-0 left-0 w-full h-20 bg-white shadow-md flex items-center justify-center z-50"
    >
      <img 
        src={bannerLogo} 
        alt="BizHealth.ai" 
        className="object-contain"
        style={{ width: '1605px', height: '277px', maxWidth: '90%', maxHeight: '60px' }}
      />
    </div>
  );
};

export default PromotionalBanner;