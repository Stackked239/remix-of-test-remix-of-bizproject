import { Helmet } from 'react-helmet-async';

// Base schema context
const SCHEMA_CONTEXT = 'https://schema.org';

// Organization schema props
interface OrganizationSchemaProps {
  type: 'organization';
}

// Article/BlogPosting schema props
interface ArticleSchemaProps {
  type: 'article';
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  authorUrl?: string;
  url: string;
  keywords?: string[];
  articleBody?: string;
}

// BlogPosting schema props (enhanced for SEO)
interface BlogPostingSchemaProps {
  type: 'blogPosting';
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  authorUrl?: string;
  url: string;
  keywords?: string[];
  articleBody?: string;
}

// FAQ schema props
interface FAQSchemaProps {
  type: 'faq';
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

// Service schema props
interface ServiceSchemaProps {
  type: 'service';
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  url: string;
  price?: string;
  priceCurrency?: string;
  ratingValue?: string;
  ratingCount?: string;
  serviceType?: string;
  availableLanguage?: string;
}

// Course schema props
interface CourseSchemaProps {
  type: 'course';
  name: string;
  description: string;
  url: string;
  provider?: string;
  providerUrl?: string;
  courseMode?: string;
  price?: string;
  priceCurrency?: string;
  isAccessibleForFree?: boolean;
  educationalLevel?: string;
  learningResourceType?: string;
  ratingValue?: string;
  ratingCount?: string;
  inLanguage?: string;
}

// SoftwareApplication schema props
interface SoftwareApplicationSchemaProps {
  type: 'softwareApplication';
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  price?: string;
  priceCurrency?: string;
  ratingValue?: string;
  ratingCount?: string;
}

// CreativeWork schema props (for templates, bundles, tools)
interface CreativeWorkSchemaProps {
  type: 'creativeWork';
  name: string;
  description: string;
  url: string;
  creator?: string;
  datePublished?: string;
  keywords?: string[];
  license?: string;
  price?: string;
  priceCurrency?: string;
}

// Event schema props (for cohorts, programs)
interface EventSchemaProps {
  type: 'event';
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate?: string;
  location?: string;
  eventStatus?: 'EventScheduled' | 'EventCancelled' | 'EventPostponed' | 'EventRescheduled';
  eventAttendanceMode?: 'OnlineEventAttendanceMode' | 'OfflineEventAttendanceMode' | 'MixedEventAttendanceMode';
  organizer?: string;
  price?: string;
  priceCurrency?: string;
  availability?: string;
}

type StructuredDataProps = 
  | OrganizationSchemaProps 
  | ArticleSchemaProps 
  | BlogPostingSchemaProps
  | FAQSchemaProps 
  | ServiceSchemaProps
  | CourseSchemaProps
  | SoftwareApplicationSchemaProps
  | CreativeWorkSchemaProps
  | EventSchemaProps;

const StructuredData = (props: StructuredDataProps) => {
  let schema: Record<string, unknown> = {
    '@context': SCHEMA_CONTEXT,
  };

  const organizationRef = {
    '@type': 'Organization',
    name: 'BizHealth.ai',
    url: 'https://bizhealth.ai'
  };

  if (props.type === 'organization') {
    schema = {
      ...schema,
      '@type': 'Organization',
      name: 'BizHealth.ai',
      description: 'AI-powered business health assessment platform for small and mid-sized businesses',
      url: 'https://bizhealth.ai',
      logo: 'https://bizhealth.ai/logo-512.jpg',
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
      author: props.authorUrl ? {
        '@type': 'Person',
        name: props.author,
        url: props.authorUrl
      } : {
        '@type': 'Organization',
        name: props.author,
        url: 'https://bizhealth.ai'
      },
      publisher: {
        '@type': 'Organization',
        name: 'BizHealth.ai',
        logo: {
          '@type': 'ImageObject',
          url: 'https://bizhealth.ai/logo-512.jpg'
        }
      },
      url: props.url,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': props.url
      },
      ...(props.keywords && { keywords: props.keywords }),
      ...(props.articleBody && { articleBody: props.articleBody })
    };
  } else if (props.type === 'blogPosting') {
    schema = {
      ...schema,
      '@type': 'BlogPosting',
      headline: props.headline,
      description: props.description,
      image: props.image,
      datePublished: props.datePublished,
      dateModified: props.dateModified || props.datePublished,
      author: props.authorUrl ? {
        '@type': 'Person',
        name: props.author,
        url: props.authorUrl
      } : {
        '@type': 'Organization',
        name: props.author,
        url: 'https://bizhealth.ai'
      },
      publisher: {
        '@type': 'Organization',
        name: 'BizHealth.ai',
        url: 'https://bizhealth.ai',
        logo: {
          '@type': 'ImageObject',
          url: 'https://bizhealth.ai/logo-512.jpg'
        }
      },
      url: props.url,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': props.url
      },
      ...(props.keywords && { keywords: props.keywords }),
      ...(props.articleBody && { articleBody: props.articleBody })
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
        ...organizationRef,
        name: props.provider
      },
      areaServed: props.areaServed,
      url: props.url,
      serviceType: props.serviceType || 'Business Consulting',
      category: 'Business Intelligence',
      ...(props.availableLanguage && { availableLanguage: props.availableLanguage }),
      ...(props.price && {
        offers: {
          '@type': 'Offer',
          price: props.price,
          priceCurrency: props.priceCurrency || 'USD',
          availability: 'https://schema.org/InStock',
          url: props.url
        }
      }),
      ...(props.ratingValue && props.ratingCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: props.ratingValue,
          ratingCount: props.ratingCount
        }
      })
    };
  } else if (props.type === 'course') {
    schema = {
      ...schema,
      '@type': 'Course',
      name: props.name,
      description: props.description,
      url: props.url,
      provider: {
        '@type': 'Organization',
        name: props.provider || 'BizGrowth',
        url: props.providerUrl || 'https://bizhealth.ai/bizgrowth'
      },
      ...(props.educationalLevel && { educationalLevel: props.educationalLevel }),
      ...(props.learningResourceType && { learningResourceType: props.learningResourceType }),
      hasCourseInstance: {
        '@type': 'CourseInstance',
        name: `${props.name} - ${props.courseMode || 'Self-Paced'}`,
        description: props.description,
        courseMode: props.courseMode || 'Online',
        inLanguage: props.inLanguage || 'en-US',
        isAccessibleForFree: props.isAccessibleForFree ?? false,
        ...(props.price && {
          offers: {
            '@type': 'Offer',
            price: props.price,
            priceCurrency: props.priceCurrency || 'USD',
            availability: 'https://schema.org/InStock'
          }
        })
      },
      ...(props.ratingValue && props.ratingCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: props.ratingValue,
          ratingCount: props.ratingCount
        }
      })
    };
  } else if (props.type === 'softwareApplication') {
    schema = {
      ...schema,
      '@type': 'SoftwareApplication',
      name: props.name,
      description: props.description,
      url: props.url,
      applicationCategory: props.applicationCategory || 'BusinessApplication',
      operatingSystem: props.operatingSystem || 'Web',
      offers: {
        '@type': 'Offer',
        price: props.price || '0',
        priceCurrency: props.priceCurrency || 'USD'
      },
      ...(props.ratingValue && props.ratingCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: props.ratingValue,
          ratingCount: props.ratingCount
        }
      }),
      provider: organizationRef
    };
  } else if (props.type === 'creativeWork') {
    schema = {
      ...schema,
      '@type': 'CreativeWork',
      name: props.name,
      description: props.description,
      url: props.url,
      creator: {
        '@type': 'Organization',
        name: props.creator || 'BizTools',
        url: 'https://bizhealth.ai/biztools'
      },
      ...(props.datePublished && { datePublished: props.datePublished }),
      ...(props.keywords && { keywords: props.keywords }),
      ...(props.license && { license: props.license }),
      ...(props.price && {
        offers: {
          '@type': 'Offer',
          price: props.price,
          priceCurrency: props.priceCurrency || 'USD',
          availability: 'https://schema.org/InStock'
        }
      })
    };
  } else if (props.type === 'event') {
    schema = {
      ...schema,
      '@type': 'Event',
      name: props.name,
      description: props.description,
      url: props.url,
      startDate: props.startDate,
      ...(props.endDate && { endDate: props.endDate }),
      eventStatus: `https://schema.org/${props.eventStatus || 'EventScheduled'}`,
      eventAttendanceMode: `https://schema.org/${props.eventAttendanceMode || 'OnlineEventAttendanceMode'}`,
      ...(props.location && {
        location: {
          '@type': 'VirtualLocation',
          url: props.location
        }
      }),
      organizer: {
        '@type': 'Organization',
        name: props.organizer || 'BizLeaDeR',
        url: 'https://bizhealth.ai/bizleader'
      },
      ...(props.price && {
        offers: {
          '@type': 'Offer',
          price: props.price,
          priceCurrency: props.priceCurrency || 'USD',
          availability: props.availability || 'https://schema.org/InStock',
          url: props.url
        }
      })
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
