import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, TrendingUp, Settings, Briefcase, Shield, BarChart3, DollarSign, Cpu } from "lucide-react";
import SocialShareButtons from "@/components/SocialShareButtons";

interface CategoryBadge {
  label: string;
  href: string;
}

interface BlogHeroSectionEnhancedProps {
  title: string;
  author: string;
  publishDate: string;
  readTime: string;
  heroImage: string;
  heroImageAlt: string;
  categories: CategoryBadge[];
  /** Short description for social sharing */
  shareDescription?: string;
}

// Subtle category icon mapping - icons only, unified color scheme
const categoryIcons: Record<string, React.ElementType> = {
  "Growth & Scaling": TrendingUp,
  "Operations": Settings,
  "Business Strategy": Briefcase,
  "Risk Management": Shield,
  "Business Intelligence": BarChart3,
  "Financial Management": DollarSign,
  "Technology": Cpu,
};

/**
 * BlogHeroSectionEnhanced - Refined hero section for blog posts
 * 
 * Design Philosophy:
 * - Subtle glassmorphism that doesn't compete with content
 * - Unified muted color palette (BizNavy-based)
 * - Gentle micro-interactions
 * - Category icons for quick visual scanning
 * - Title and content remain the focal point
 */
const BlogHeroSectionEnhanced = ({
  title,
  author,
  publishDate,
  readTime,
  heroImage,
  heroImageAlt,
  categories,
  shareDescription,
}: BlogHeroSectionEnhancedProps) => {
  return (
    <section className="pt-40 pb-16 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-3 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
          
          {/* Refined Category Badges - Minimal & Subtle */}
          <div className="mb-6 flex flex-wrap gap-1.5">
            {categories.map((category) => {
              const IconComponent = categoryIcons[category.label] || Briefcase;
              
              return (
                <Link 
                  key={category.href}
                  to={category.href} 
                  className="
                    group/badge inline-flex items-center gap-1.5
                    bg-[hsl(var(--biz-navy))]/6 
                    text-[hsl(var(--biz-navy))]/70
                    text-xs font-medium px-2.5 py-1 rounded-full
                    border border-[hsl(var(--biz-navy))]/10
                    transition-all duration-200 ease-out
                    hover:bg-[hsl(var(--biz-green))]/10
                    hover:border-[hsl(var(--biz-green))]/30
                    hover:text-[hsl(var(--biz-green))]
                  "
                >
                  <IconComponent className="w-3.5 h-3.5 opacity-60 group-hover/badge:opacity-80 transition-opacity" />
                  <span>{category.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground leading-tight">
            {title}
          </h1>
          
          {/* Meta Info */}
          <div className="flex items-center gap-5 mb-2 text-muted-foreground flex-wrap text-sm">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{publishDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{readTime}</span>
            </div>
          </div>
          
          {/* Social Share Buttons */}
          <div className="mb-5">
            <SocialShareButtons 
              title={title}
              description={shareDescription || title}
            />
          </div>
          
          {/* Hero Image */}
          <img 
            src={heroImage} 
            alt={heroImageAlt}
            className="w-full h-auto rounded-lg shadow-md max-h-96 object-cover"
            width={1200}
            height={675}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default BlogHeroSectionEnhanced;
