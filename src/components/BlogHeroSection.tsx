import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import SocialShareButtons from "@/components/SocialShareButtons";

interface CategoryBadge {
  label: string;
  href: string;
}

interface BlogHeroSectionProps {
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

/**
 * BlogHeroSection - Standardized hero section for blog posts
 * 
 * Features:
 * - Consistent spacing: pt-40 pb-16
 * - Back to blog navigation
 * - Category badges with biz-green styling
 * - Meta info with icons (author, date, read time)
 * - Constrained hero image (max-h-96)
 * - Social share buttons
 */
const BlogHeroSection = ({
  title,
  author,
  publishDate,
  readTime,
  heroImage,
  heroImageAlt,
  categories,
  shareDescription,
}: BlogHeroSectionProps) => {
  return (
    <section className="pt-40 pb-16 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          {/* Category Badges */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link 
                key={category.href}
                to={category.href} 
                className="bg-[hsl(var(--biz-green))]/15 text-[hsl(var(--biz-green))] text-sm font-medium px-3 py-1 rounded-full hover:bg-[hsl(var(--biz-green))]/25 transition-colors border border-[hsl(var(--biz-green))]/30"
              >
                {category.label}
              </Link>
            ))}
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

export default BlogHeroSection;
