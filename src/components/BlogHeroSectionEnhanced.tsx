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

// Category color and icon mapping for world-class visual hierarchy
const categoryConfig: Record<string, { 
  bgColor: string; 
  textColor: string; 
  borderColor: string;
  hoverBg: string;
  glowColor: string;
  icon: React.ElementType;
}> = {
  "Growth & Scaling": {
    bgColor: "bg-[hsl(var(--biz-gold))]/15",
    textColor: "text-[hsl(var(--biz-gold))]",
    borderColor: "border-[hsl(var(--biz-gold))]/40",
    hoverBg: "hover:bg-[hsl(var(--biz-gold))]/25",
    glowColor: "hover:shadow-[0_0_20px_hsl(var(--biz-gold)/0.3)]",
    icon: TrendingUp,
  },
  "Operations": {
    bgColor: "bg-[hsl(var(--biz-green))]/15",
    textColor: "text-[hsl(var(--biz-green))]",
    borderColor: "border-[hsl(var(--biz-green))]/40",
    hoverBg: "hover:bg-[hsl(var(--biz-green))]/25",
    glowColor: "hover:shadow-[0_0_20px_hsl(var(--biz-green)/0.3)]",
    icon: Settings,
  },
  "Business Strategy": {
    bgColor: "bg-[hsl(var(--biz-blue))]/15",
    textColor: "text-[hsl(var(--biz-blue))]",
    borderColor: "border-[hsl(var(--biz-blue))]/40",
    hoverBg: "hover:bg-[hsl(var(--biz-blue))]/25",
    glowColor: "hover:shadow-[0_0_20px_hsl(var(--biz-blue)/0.3)]",
    icon: Briefcase,
  },
  "Risk Management": {
    bgColor: "bg-destructive/15",
    textColor: "text-destructive",
    borderColor: "border-destructive/40",
    hoverBg: "hover:bg-destructive/25",
    glowColor: "hover:shadow-[0_0_20px_hsl(var(--destructive)/0.3)]",
    icon: Shield,
  },
  "Business Intelligence": {
    bgColor: "bg-[hsl(var(--biz-orange))]/15",
    textColor: "text-[hsl(var(--biz-orange))]",
    borderColor: "border-[hsl(var(--biz-orange))]/40",
    hoverBg: "hover:bg-[hsl(var(--biz-orange))]/25",
    glowColor: "hover:shadow-[0_0_20px_hsl(var(--biz-orange)/0.3)]",
    icon: BarChart3,
  },
  "Financial Management": {
    bgColor: "bg-emerald-500/15",
    textColor: "text-emerald-600",
    borderColor: "border-emerald-500/40",
    hoverBg: "hover:bg-emerald-500/25",
    glowColor: "hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    icon: DollarSign,
  },
  "Technology": {
    bgColor: "bg-violet-500/15",
    textColor: "text-violet-600",
    borderColor: "border-violet-500/40",
    hoverBg: "hover:bg-violet-500/25",
    glowColor: "hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]",
    icon: Cpu,
  },
};

// Default config for unknown categories
const defaultCategoryConfig = {
  bgColor: "bg-[hsl(var(--biz-green))]/15",
  textColor: "text-[hsl(var(--biz-green))]",
  borderColor: "border-[hsl(var(--biz-green))]/40",
  hoverBg: "hover:bg-[hsl(var(--biz-green))]/25",
  glowColor: "hover:shadow-[0_0_20px_hsl(var(--biz-green)/0.3)]",
  icon: Briefcase,
};

/**
 * BlogHeroSectionEnhanced - World-class hero section for blog posts
 * 
 * Enhanced Features:
 * - Category-specific color coding with semantic meaning
 * - Glassmorphism effect with backdrop blur
 * - Micro-interactions (scale, glow on hover)
 * - Category icons for visual scanning
 * - Smooth transitions throughout
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
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
          
          {/* Enhanced Category Badges with Glassmorphism */}
          <div className="mb-6 flex flex-wrap gap-3">
            {categories.map((category) => {
              const config = categoryConfig[category.label] || defaultCategoryConfig;
              const IconComponent = config.icon;
              
              return (
                <Link 
                  key={category.href}
                  to={category.href} 
                  className={`
                    group/badge relative inline-flex items-center gap-2
                    ${config.bgColor} ${config.textColor} 
                    text-sm font-semibold px-4 py-2 rounded-full
                    ${config.hoverBg} transition-all duration-300 ease-out
                    border ${config.borderColor}
                    backdrop-blur-sm
                    hover:scale-105 ${config.glowColor}
                    hover:-translate-y-0.5
                  `}
                >
                  <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover/badge:rotate-12" />
                  <span>{category.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
            {title}
          </h1>
          
          {/* Meta Info */}
          <div className="flex items-center gap-6 mb-4 text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{publishDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>
          
          {/* Social Share Buttons */}
          <div className="mb-8">
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
