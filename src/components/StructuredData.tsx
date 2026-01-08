import { Helmet } from 'react-helmet-async';

interface OrganizationSchemaProps {
  type: 'organization';
}

interface ArticleSchemaProps {
  type: 'article';
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}

interface FAQSchemaProps {
  type: 'faq';
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

interface ServiceSchemaProps {
  type: 'service';
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  url: string;
}

type StructuredDataProps = OrganizationSchemaProps | ArticleSchemaProps | FAQSchemaProps | ServiceSchemaProps;

const StructuredData = (props: StructuredDataProps) => {
  let schema: any = {
    '@context': 'https://schema.org',
  };

  if (props.type === 'organization') {
    schema = {
      ...schema,
      '@type': 'Organization',
      name: 'BizHealth.ai',
      description: 'AI-powered business health assessment platform for small and mid-sized businesses',
      url: 'https://bizhealth.ai',
      logo: 'https://bizhealth.ai/logo.png',
      sameAs: [
        'https://www.linkedin.com/company/bizhealth-ai',
        'https://twitter.com/bizhealthai',
        'https://www.facebook.com/bizhealthai'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'support@bizhealth.ai',
        availableLanguage: 'English'
      },
      foundingDate: '2025',
      areaServed: {
        '@type': 'Country',
        name: 'United States'
      },
      service: {
        '@type': 'Service',
        name: 'Business Health Assessment',
        description: 'Comprehensive AI-powered analysis of business operations, finances, and strategy',
        serviceType: 'Business Analytics'
      }
    };
  } else if (props.type === 'article') {
    schema = {
      ...schema,
      '@type': 'Article',
      headline: props.headline,
      description: props.description,
      image: props.image,
      datePublished: props.datePublished,
      dateModified: props.dateModified || props.datePublished,
      author: {
        '@type': 'Organization',
        name: props.author,
        url: 'https://bizhealth.ai'
      },
      publisher: {
        '@type': 'Organization',
        name: 'BizHealth.ai',
        logo: {
          '@type': 'ImageObject',
          url: 'https://bizhealth.ai/logo.png'
        }
      },
      url: props.url,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': props.url
      }
    };
  } else if (props.type === 'faq') {
    schema = {
      ...schema,
      '@type': 'FAQPage',
      mainEntity: props.questions.map(q => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer
        }
      }))
    };
  } else if (props.type === 'service') {
    schema = {
      ...schema,
      '@type': 'Service',
      name: props.name,
      description: props.description,
      provider: {
        '@type': 'Organization',
        name: props.provider,
        url: 'https://bizhealth.ai'
      },
      areaServed: props.areaServed,
      url: props.url,
      serviceType: 'Business Analytics',
      category: 'Business Intelligence'
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
