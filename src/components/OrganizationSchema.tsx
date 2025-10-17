import { Helmet } from "react-helmet-async";

const OrganizationSchema = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BizHealth.ai",
    "url": "https://www.bizhealth.ai",
    "logo": "https://www.bizhealth.ai/logo-512.jpg",
    "sameAs": [
      "https://www.linkedin.com/company/bizhealth-ai",
      "https://x.com/bizhealthai"
    ],
    "description": "BizHealth.ai helps business owners and leaders diagnose, strengthen, and grow their companies through AI-powered business health assessments and tools.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-BIZHEALTH",
      "contactType": "customer service",
      "email": "support@bizhealth.ai",
      "availableLanguage": "en"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default OrganizationSchema;
