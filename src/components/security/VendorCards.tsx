import { ExternalLink } from 'lucide-react';

const vendors = [
  {
    name: 'Google Cloud',
    description: 'Enterprise-grade infrastructure with SOC 2/3 compliance, ISO 27001, and 99.95% uptime SLA',
    url: 'https://cloud.google.com/security',
    logo: '🔷'
  },
  {
    name: 'Stripe',
    description: 'PCI DSS Level 1 certified—the highest level of payment security. Trusted by millions of businesses worldwide',
    url: 'https://stripe.com/docs/security',
    logo: '💳'
  },
  {
    name: 'Anthropic Claude',
    description: 'Enterprise AI with SOC 2 Type II compliance and industry-leading privacy protections',
    url: 'https://www.anthropic.com/security',
    logo: '🤖'
  }
];

const VendorCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-8">
      {vendors.map((vendor) => (
        <a
          key={vendor.name}
          href={vendor.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 bg-background rounded-lg border-2 border-border hover:border-biz-green transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="text-4xl mb-4">{vendor.logo}</div>
          <h3 className="text-xl font-semibold text-biz-navy mb-3 flex items-center gap-2">
            {vendor.name}
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-biz-green transition-colors" />
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {vendor.description}
          </p>
        </a>
      ))}
    </div>
  );
};

export default VendorCards;
