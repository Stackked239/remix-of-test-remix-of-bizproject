import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CheckCircle, Calendar } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  companyName: z.string().trim().max(100, "Company name must be less than 100 characters").optional().or(z.literal("")),
  industry: z.string().min(1, "Please select an industry"),
  revenueStage: z.string().min(1, "Please select a revenue stage"),
  primaryChallenge: z.string().trim().min(20, "Please describe your challenge in at least 20 characters").max(500, "Please keep your description under 500 characters"),
  sessionLength: z.string().min(1, "Please select a session length"),
  referralSource: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const industries = [
  "Retail / E-commerce",
  "Professional Services",
  "SaaS / Technology",
  "Healthcare",
  "Manufacturing",
  "Construction",
  "Financial Services",
  "Real Estate",
  "Food & Beverage",
  "Education",
  "Hospitality",
  "Transportation / Logistics",
  "Media / Entertainment",
  "Non-Profit",
  "Other"
];

const revenueStages = [
  "Less than $250K",
  "$250K - $1M",
  "$1M - $5M",
  "$5M - $10M",
  "$10M+"
];

const referralSources = [
  "BizHealth Assessment",
  "Referral from colleague",
  "Google Search",
  "Social Media",
  "Blog / Article",
  "Other"
];

interface ScheduleSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ScheduleSessionModal = ({ open, onOpenChange }: ScheduleSessionModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      industry: "",
      revenueStage: "",
      primaryChallenge: "",
      sessionLength: "60 min",
      referralSource: "",
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { data: response, error } = await supabase.functions.invoke("send-notification", {
        body: {
          type: "bizguides_inquiry",
          email: data.email,
          fullName: data.fullName,
          companyName: data.companyName || undefined,
          industry: data.industry,
          revenueStage: data.revenueStage,
          primaryChallenge: data.primaryChallenge,
          sessionLength: data.sessionLength,
          referralSource: data.referralSource || undefined,
        }
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to submit request");
      }

      if (!response?.success) {
        throw new Error(response?.error || "Failed to submit request");
      }

      setIsSuccess(true);
      toast.success("Your session request has been submitted!");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSuccess) {
      setIsSuccess(false);
      reset();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-[hsl(var(--biz-teal))]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[hsl(var(--biz-teal))]" />
            </div>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-montserrat text-center">
                Request Received!
              </DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground mb-2">
              We'll match you with an expert within <strong>48 hours</strong> and confirm your session time within <strong>5 business days</strong>.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Check your email for next steps.
            </p>
            <Button onClick={handleClose} className="bg-[hsl(var(--biz-teal))] hover:bg-[hsl(180,100%,30%)]">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[hsl(var(--biz-teal))]/10">
                  <Calendar className="w-5 h-5 text-[hsl(var(--biz-teal))]" />
                </div>
                <DialogTitle className="text-xl font-montserrat">
                  Schedule Your Coaching Session
                </DialogTitle>
              </div>
              <DialogDescription>
                Tell us about your business and challenges. We'll match you with the right expert.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="John Smith"
                    {...register("fullName")}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive">{errors.fullName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name (Optional)</Label>
                <Input
                  id="companyName"
                  placeholder="Your Company"
                  {...register("companyName")}
                />
              </div>

              {/* Industry & Revenue Stage Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Industry *</Label>
                  <Select onValueChange={(value) => setValue("industry", value)} value={watch("industry")}>
                    <SelectTrigger className={errors.industry ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-xs text-destructive">{errors.industry.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Revenue Stage *</Label>
                  <Select onValueChange={(value) => setValue("revenueStage", value)} value={watch("revenueStage")}>
                    <SelectTrigger className={errors.revenueStage ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select revenue range" />
                    </SelectTrigger>
                    <SelectContent>
                      {revenueStages.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.revenueStage && (
                    <p className="text-xs text-destructive">{errors.revenueStage.message}</p>
                  )}
                </div>
              </div>

              {/* Primary Challenge */}
              <div className="space-y-2">
                <Label htmlFor="primaryChallenge">Primary Challenge *</Label>
                <Textarea
                  id="primaryChallenge"
                  placeholder="Describe the main challenge you'd like help with (20-500 characters)"
                  rows={4}
                  {...register("primaryChallenge")}
                  className={errors.primaryChallenge ? "border-destructive" : ""}
                />
                {errors.primaryChallenge && (
                  <p className="text-xs text-destructive">{errors.primaryChallenge.message}</p>
                )}
              </div>

              {/* Session Length */}
              <div className="space-y-3">
                <Label>Preferred Session Length *</Label>
                <RadioGroup
                  defaultValue="60 min"
                  onValueChange={(value) => setValue("sessionLength", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="60 min" id="session-60" />
                    <Label htmlFor="session-60" className="font-normal cursor-pointer">60 minutes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="90 min" id="session-90" />
                    <Label htmlFor="session-90" className="font-normal cursor-pointer">90 minutes</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Referral Source */}
              <div className="space-y-2">
                <Label>How did you hear about us? (Optional)</Label>
                <Select onValueChange={(value) => setValue("referralSource", value)} value={watch("referralSource")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {referralSources.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[hsl(var(--biz-teal))] hover:bg-[hsl(180,100%,30%)] font-montserrat font-semibold py-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Expert Match"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                💰 100% money-back guarantee on your first session if it doesn't provide clear value.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleSessionModal;
