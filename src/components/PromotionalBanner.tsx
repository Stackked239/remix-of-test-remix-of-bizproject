import { Link } from "react-router-dom";
import bannerLogo from "@/assets/bizhealth-logo-banner.jpg";

const PromotionalBanner = () => {
  return (
    <Link 
      to="/"
      className="fixed top-0 left-0 w-full h-20 bg-white shadow-md flex items-center justify-center z-50 cursor-pointer"
      aria-label="Go to BizHealth.ai Homepage"
    >
      <img 
        src={bannerLogo} 
        alt="BizHealth.ai - Business Health Analysis Platform"
        width={1605}
        height={277}
        loading="eager"
        className="object-contain"
        style={{ maxWidth: '90%', maxHeight: '60px', width: 'auto', height: 'auto' }}
      />
    </Link>
  );
};

export default PromotionalBanner;