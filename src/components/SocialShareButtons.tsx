import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Share2, 
  Link2, 
  Check,
  Linkedin,
  Twitter,
  Facebook,
  Mail
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from 'sonner';

interface SocialShareButtonsProps {
  title: string;
  description?: string;
  url?: string;
  variant?: 'inline' | 'floating' | 'compact';
  className?: string;
}

const SocialShareButtons = ({
  title,
  description = '',
  url,
  variant = 'inline',
  className = ''
}: SocialShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  
  // Get current URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };
  
  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };
  
  // Compact variant - just a share button with popover
  if (variant === 'compact') {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className={`gap-2 ${className}`}
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2" align="end">
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10"
              onClick={() => handleShare('linkedin')}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-[#1DA1F2] hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10"
              onClick={() => handleShare('twitter')}
            >
              <Twitter className="w-4 h-4" />
              X / Twitter
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/10"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() => handleShare('email')}
            >
              <Mail className="w-4 h-4" />
              Email
            </Button>
            <hr className="my-1 border-border" />
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={handleCopyLink}
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  
  // Floating variant - vertical stack on the side
  if (variant === 'floating') {
    return (
      <div className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 ${className}`}>
        <Button
          size="icon"
          variant="outline"
          className="w-10 h-10 rounded-full bg-background shadow-md hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors"
          onClick={() => handleShare('linkedin')}
          title="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="w-10 h-10 rounded-full bg-background shadow-md hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors"
          onClick={() => handleShare('twitter')}
          title="Share on X/Twitter"
        >
          <Twitter className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="w-10 h-10 rounded-full bg-background shadow-md hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"
          onClick={() => handleShare('facebook')}
          title="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="w-10 h-10 rounded-full bg-background shadow-md hover:bg-muted transition-colors"
          onClick={handleCopyLink}
          title="Copy Link"
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Link2 className="w-5 h-5" />}
        </Button>
      </div>
    );
  }
  
  // Default inline variant
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-muted-foreground font-medium">Share:</span>
      <div className="flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          className="w-9 h-9 rounded-full hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] transition-colors"
          onClick={() => handleShare('linkedin')}
          title="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="w-9 h-9 rounded-full hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] transition-colors"
          onClick={() => handleShare('twitter')}
          title="Share on X/Twitter"
        >
          <Twitter className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="w-9 h-9 rounded-full hover:bg-[#1877F2]/10 hover:text-[#1877F2] transition-colors"
          onClick={() => handleShare('facebook')}
          title="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="w-9 h-9 rounded-full hover:bg-muted transition-colors"
          onClick={() => handleShare('email')}
          title="Share via Email"
        >
          <Mail className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="w-9 h-9 rounded-full hover:bg-muted transition-colors"
          onClick={handleCopyLink}
          title="Copy Link"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};

export default SocialShareButtons;
