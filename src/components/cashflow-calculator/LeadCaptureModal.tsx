import React, { useState } from 'react';
import { Download, User, Mail, Building2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; businessName: string }) => void;
  businessName: string;
  isLoading?: boolean;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  businessName: initialBusinessName,
  isLoading = false 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState(initialBusinessName);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ name: name.trim(), email: email.trim(), businessName: businessName.trim() });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-biz-navy/10 rounded-full flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-biz-navy" />
          </div>
          <DialogTitle className="text-xl font-bold text-center font-montserrat">
            Download Your Cash Flow Projection Report
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Get your complete 12-month forecast with insights and recommendations as a professional PDF.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="modal-name" className="text-sm font-medium">
              Your Name <span className="text-destructive">*</span>
            </Label>
            <div className="relative mt-1.5">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="modal-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                className={`pl-9 ${errors.name ? 'border-destructive' : ''}`}
              />
            </div>
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="modal-email" className="text-sm font-medium">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="modal-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@mybusiness.com"
                className={`pl-9 ${errors.email ? 'border-destructive' : ''}`}
              />
            </div>
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="modal-business" className="text-sm font-medium">
              Business Name
            </Label>
            <div className="relative mt-1.5">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="modal-business"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="My Awesome Business"
                className="pl-9"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-biz-citrine text-biz-navy hover:bg-biz-citrine/90 font-semibold py-5"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-biz-navy/30 border-t-biz-navy rounded-full animate-spin" />
                Generating PDF...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Free PDF Report
              </span>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By downloading, you agree to receive occasional business tips from BizHealth.ai. Unsubscribe anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
