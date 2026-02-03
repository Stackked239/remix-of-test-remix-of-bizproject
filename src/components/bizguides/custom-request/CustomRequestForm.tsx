import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Form Schema
const formSchema = z.object({
  // Step 1: Contact Information
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(100),
  phone: z.string().optional().refine((val) => !val || (val.length >= 10 && val.length <= 15), {
    message: "Phone number must be 10-15 digits",
  }),
  
  // Step 2: Business Information
  companyName: z.string().trim().min(2, "Company name required").max(100),
  title: z.string().trim().min(2, "Title/role required").max(50),
  revenueRange: z.string().min(1, "Please select a revenue range"),
  industry: z.string().min(1, "Please select an industry"),
  teamSize: z.string().min(1, "Please select team size"),
  
  // Step 3: Your Challenge
  solutionType: z.enum(["TYPE_A", "TYPE_B", "TYPE_C"], { errorMap: () => ({ message: "Please select an engagement type" }) }),
  areasOfFocus: z.array(z.string()).min(1, "Please select at least one area"),
  challengeDescription: z.string().trim().min(50, "Please describe your challenge in at least 50 characters").max(500, "Please keep under 500 characters"),
  
  // Step 4: Timeline & Preferences
  idealTimeline: z.string().optional(),
  successMetrics: z.string().max(300).optional(),
  constraints: z.string().max(300).optional(),
  contactPreference: z.enum(["email", "phone", "calendar"]).default("email"),
});

type FormData = z.infer<typeof formSchema>;

const revenueRanges = [
  "$250K–$500K",
  "$500K–$1M",
  "$1M–$2.5M",
  "$2.5M–$5M",
  "$5M–$10M",
  "$10M–$25M",
  "$25M+",
];

const industries = [
  "Professional Services (consulting, legal, accounting)",
  "Manufacturing & Distribution",
  "Technology / Software",
  "E-Commerce / Retail",
  "Finance / Insurance",
  "Healthcare / Medical",
  "Real Estate / Construction",
  "Education",
  "Non-Profit / Association",
  "Other",
];

const teamSizes = [
  "Just me (solopreneur)",
  "2–5 people",
  "6–10 people",
  "11–25 people",
  "26–50 people",
  "51–100 people",
  "100+ people",
];

const areasOfFocusOptions = [
  "Strategy & Business Model",
  "Financial Management & Cash Flow",
  "Sales & Revenue Growth",
  "Marketing & Brand",
  "Operations & Efficiency",
  "Technology & Digital Transformation",
  "Human Resources & Team Development",
  "Leadership & Management",
  "Customer Experience",
  "Risk Management & Compliance",
  "Organizational Culture",
  "Exit Preparation / Succession",
];

const timelineOptions = [
  "ASAP (within 2–4 weeks)",
  "Within 1–2 months",
  "Within 2–3 months",
  "3+ months out",
  "Flexible / TBD",
];

const solutionTypes = [
  {
    id: "TYPE_A" as const,
    title: "TYPE A: Onsite Support & Team Coaching",
    description: "Hands-on facilitation, team coaching, capability building",
  },
  {
    id: "TYPE_B" as const,
    title: "TYPE B: Strategic Consulting & Planning",
    description: "Exit prep, restructuring, strategic clarity, specialized expertise",
  },
  {
    id: "TYPE_C" as const,
    title: "TYPE C: Full Project Management & Execution",
    description: "End-to-end execution, transformation projects, dedicated PM",
  },
];

const CustomRequestForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formStartTime] = useState(Date.now());

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      title: "",
      revenueRange: "",
      industry: "",
      teamSize: "",
      solutionType: undefined,
      areasOfFocus: [],
      challengeDescription: "",
      idealTimeline: "",
      successMetrics: "",
      constraints: "",
      contactPreference: "email",
    },
  });

  const watchedValues = watch();
  const challengeLength = watchedValues.challengeDescription?.length || 0;
  const successMetricsLength = watchedValues.successMetrics?.length || 0;
  const constraintsLength = watchedValues.constraints?.length || 0;

  // Session storage persistence
  useEffect(() => {
    const savedData = sessionStorage.getItem("customRequestFormData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        Object.entries(parsed).forEach(([key, value]) => {
          setValue(key as keyof FormData, value as any);
        });
      } catch (e) {
        console.error("Failed to restore form data:", e);
      }
    }
  }, [setValue]);

  useEffect(() => {
    if (!isSuccess) {
      sessionStorage.setItem("customRequestFormData", JSON.stringify(watchedValues));
    }
  }, [watchedValues, isSuccess]);

  const validateStep = async (step: number): Promise<boolean> => {
    const fieldsToValidate: (keyof FormData)[] = [];
    
    switch (step) {
      case 1:
        fieldsToValidate.push("fullName", "email");
        break;
      case 2:
        fieldsToValidate.push("companyName", "title", "revenueRange", "industry", "teamSize");
        break;
      case 3:
        fieldsToValidate.push("solutionType", "areasOfFocus", "challengeDescription");
        break;
      case 4:
        // All optional, always valid
        return true;
    }
    
    const result = await trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const completionTime = Math.round((Date.now() - formStartTime) / 1000);
      
      const { error } = await supabase.functions.invoke("send-notification", {
        body: {
          type: "custom_request",
          email: data.email,
          fullName: data.fullName,
          phone: data.phone || undefined,
          companyName: data.companyName,
          title: data.title,
          revenueRange: data.revenueRange,
          industry: data.industry,
          teamSize: data.teamSize,
          solutionType: data.solutionType,
          areasOfFocus: data.areasOfFocus,
          challengeDescription: data.challengeDescription,
          idealTimeline: data.idealTimeline || undefined,
          successMetrics: data.successMetrics || undefined,
          constraints: data.constraints || undefined,
          contactPreference: data.contactPreference,
          formCompletionTime: completionTime,
        },
      });

      if (error) throw new Error(error.message);

      sessionStorage.removeItem("customRequestFormData");
      setIsSuccess(true);
      toast.success("Your custom solution request has been submitted!");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAreaToggle = (area: string) => {
    const current = watchedValues.areasOfFocus || [];
    if (current.includes(area)) {
      setValue("areasOfFocus", current.filter((a) => a !== area));
    } else {
      setValue("areasOfFocus", [...current, area]);
    }
  };

  const progressWidth = (currentStep / 4) * 100;

  if (isSuccess) {
    const firstName = watchedValues.fullName?.split(" ")[0] || "there";
    return (
      <section id="request-form" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-5 md:px-8">
          <div className="max-w-xl mx-auto bg-card rounded-xl p-8 md:p-12 shadow-lg border border-[hsl(var(--biz-teal))]/10 text-center">
            <div className="w-16 h-16 bg-[hsl(var(--biz-teal))]/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle className="w-8 h-8 text-[hsl(var(--biz-teal))]" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-[hsl(var(--biz-navy))] mb-4">
              Request Received!
            </h2>
            
            <p className="text-base text-[hsl(var(--biz-navy))] leading-relaxed mb-6">
              Hi {firstName}, thank you for submitting your custom BizGuides request! 
              We've received your information and our Client Success team will review it 
              and reach out within <strong>24 hours</strong> to schedule your discovery call.
            </p>

            <div className="bg-muted rounded-lg p-5 text-left mb-8">
              <h3 className="text-sm font-bold text-[hsl(var(--biz-navy))] uppercase tracking-wide mb-4">
                Next Steps
              </h3>
              <ul className="space-y-3 text-sm text-[hsl(var(--biz-navy))]">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-teal))] flex-shrink-0 mt-0.5" />
                  <span>Check your email for a confirmation message</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-teal))] flex-shrink-0 mt-0.5" />
                  <span>Look for a calendar link to schedule your 30-minute discovery call</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-teal))] flex-shrink-0 mt-0.5" />
                  <span>If you don't hear from us within 24 hours, email: <a href="mailto:support@bizhealth.ai" className="text-[hsl(var(--biz-teal))] underline">support@bizhealth.ai</a></span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = "/bizguides"}
                variant="outline"
                className="border-[hsl(var(--biz-teal))] text-[hsl(var(--biz-teal))] hover:bg-[hsl(var(--biz-teal))]/10"
              >
                Explore BizGuides Resources
              </Button>
              <Button
                onClick={() => window.location.href = "/"}
                className="bg-[hsl(var(--biz-teal))] hover:bg-[hsl(180,100%,30%)]"
              >
                Return Home
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="request-form" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[hsl(var(--biz-navy))] mb-4">
            Tell Us About Your Challenge
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete this form and we'll match you with the right engagement. 
            Takes less than 5 minutes.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-card rounded-xl p-6 md:p-10 shadow-lg border border-[hsl(var(--biz-teal))]/10">
          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[hsl(var(--biz-teal))] to-[hsl(180,100%,35%)] transition-all duration-500 ease-out"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap min-w-[85px] text-right">
              Step {currentStep} of 4
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="text-lg font-montserrat font-semibold text-[hsl(var(--biz-navy))] mb-5">
                  Your Contact Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="font-semibold text-sm">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="John Smith"
                    {...register("fullName")}
                    className={`text-base ${errors.fullName ? "border-destructive" : ""}`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold text-sm">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    {...register("email")}
                    className={`text-base ${errors.email ? "border-destructive" : ""}`}
                  />
                  <p className="text-xs text-muted-foreground italic">We'll use this to send your discovery call link</p>
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-semibold text-sm">
                    Phone Number <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    {...register("phone")}
                    className={`text-base ${errors.phone ? "border-destructive" : ""}`}
                  />
                  <p className="text-xs text-muted-foreground italic">For faster follow-up</p>
                  {errors.phone && (
                    <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Business Information */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="text-lg font-montserrat font-semibold text-[hsl(var(--biz-navy))] mb-5">
                  Business Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="companyName" className="font-semibold text-sm">
                    Company Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Acme Manufacturing Corp"
                    {...register("companyName")}
                    className={`text-base ${errors.companyName ? "border-destructive" : ""}`}
                  />
                  {errors.companyName && (
                    <p className="text-xs text-destructive mt-1">{errors.companyName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="font-semibold text-sm">
                    Your Title / Role <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="CEO, Founder, COO, CFO"
                    {...register("title")}
                    className={`text-base ${errors.title ? "border-destructive" : ""}`}
                  />
                  {errors.title && (
                    <p className="text-xs text-destructive mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold text-sm">
                    Annual Revenue Range <span className="text-destructive">*</span>
                  </Label>
                  <Select onValueChange={(val) => setValue("revenueRange", val)} value={watchedValues.revenueRange}>
                    <SelectTrigger className={errors.revenueRange ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {revenueRanges.map((range) => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.revenueRange && (
                    <p className="text-xs text-destructive mt-1">{errors.revenueRange.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold text-sm">
                    Industry <span className="text-destructive">*</span>
                  </Label>
                  <Select onValueChange={(val) => setValue("industry", val)} value={watchedValues.industry}>
                    <SelectTrigger className={errors.industry ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-xs text-destructive mt-1">{errors.industry.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold text-sm">
                    Team Size <span className="text-destructive">*</span>
                  </Label>
                  <Select onValueChange={(val) => setValue("teamSize", val)} value={watchedValues.teamSize}>
                    <SelectTrigger className={errors.teamSize ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamSizes.map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.teamSize && (
                    <p className="text-xs text-destructive mt-1">{errors.teamSize.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Your Challenge */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="text-lg font-montserrat font-semibold text-[hsl(var(--biz-navy))] mb-5">
                  Your Challenge
                </h3>

                {/* Solution Type */}
                <div className="space-y-3">
                  <Label className="font-semibold text-sm">
                    Which type of engagement best fits your needs? <span className="text-destructive">*</span>
                  </Label>
                  <div className="space-y-3">
                    {solutionTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => setValue("solutionType", type.id)}
                        className={`
                          p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                          ${watchedValues.solutionType === type.id 
                            ? "border-[hsl(var(--biz-teal))] bg-[hsl(var(--biz-teal))]/[0.04] shadow-sm" 
                            : "border-border hover:border-[hsl(var(--biz-teal))]/50 hover:bg-muted/30"
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                            ${watchedValues.solutionType === type.id 
                              ? "border-[hsl(var(--biz-teal))] bg-[hsl(var(--biz-teal))]" 
                              : "border-muted-foreground"
                            }
                          `}>
                            {watchedValues.solutionType === type.id && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-[hsl(var(--biz-navy))]">{type.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">{type.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.solutionType && (
                    <p className="text-xs text-destructive">{errors.solutionType.message}</p>
                  )}
                </div>

                {/* Areas of Focus */}
                <div className="space-y-3">
                  <Label className="font-semibold text-sm">
                    What areas are you focusing on? <span className="text-destructive">*</span>
                    <span className="font-normal text-muted-foreground ml-1">(Select all that apply)</span>
                  </Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {areasOfFocusOptions.map((area) => (
                      <div
                        key={area}
                        onClick={() => handleAreaToggle(area)}
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          checked={watchedValues.areasOfFocus?.includes(area)}
                          onCheckedChange={() => handleAreaToggle(area)}
                          className="data-[state=checked]:bg-[hsl(var(--biz-teal))] data-[state=checked]:border-[hsl(var(--biz-teal))]"
                        />
                        <span className="text-sm text-[hsl(var(--biz-navy))] cursor-pointer">{area}</span>
                      </div>
                    ))}
                  </div>
                  {errors.areasOfFocus && (
                    <p className="text-xs text-destructive">{errors.areasOfFocus.message}</p>
                  )}
                </div>

                {/* Challenge Description */}
                <div className="space-y-2">
                  <Label htmlFor="challengeDescription" className="font-semibold text-sm">
                    Tell us about your challenge. What are you trying to accomplish? <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="challengeDescription"
                    placeholder="We're growing rapidly but our operations are breaking down. We need help redesigning our processes, improving cash flow visibility, and building a scalable team structure..."
                    rows={5}
                    {...register("challengeDescription")}
                    className={`text-base resize-y ${errors.challengeDescription ? "border-destructive" : ""}`}
                  />
                  <div className="flex justify-between items-center">
                    {errors.challengeDescription && (
                      <p className="text-xs text-destructive">{errors.challengeDescription.message}</p>
                    )}
                    <span className={`text-xs ml-auto ${challengeLength > 450 ? (challengeLength > 500 ? "text-destructive font-semibold" : "text-amber-600 font-medium") : "text-muted-foreground"}`}>
                      {challengeLength} / 500
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Timeline & Preferences */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="text-lg font-montserrat font-semibold text-[hsl(var(--biz-navy))] mb-5">
                  Timeline & Preferences
                </h3>

                <div className="space-y-2">
                  <Label className="font-semibold text-sm">
                    When are you hoping to start? <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Select onValueChange={(val) => setValue("idealTimeline", val)} value={watchedValues.idealTimeline}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {timelineOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="successMetrics" className="font-semibold text-sm">
                    What would success look like for you? <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea
                    id="successMetrics"
                    placeholder="Examples: 15% efficiency gains, complete exit readiness, team satisfaction scores up, clear 12-month roadmap, etc."
                    rows={3}
                    {...register("successMetrics")}
                    className="text-base resize-y"
                  />
                  <div className="text-right">
                    <span className={`text-xs ${successMetricsLength > 270 ? "text-amber-600 font-medium" : "text-muted-foreground"}`}>
                      {successMetricsLength} / 300
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="constraints" className="font-semibold text-sm">
                    Any constraints or concerns we should know? <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea
                    id="constraints"
                    placeholder="Examples: Limited budget, tight timeline, specific technologies we need to maintain, board requirements, regulatory constraints, etc."
                    rows={3}
                    {...register("constraints")}
                    className="text-base resize-y"
                  />
                  <div className="text-right">
                    <span className={`text-xs ${constraintsLength > 270 ? "text-amber-600 font-medium" : "text-muted-foreground"}`}>
                      {constraintsLength} / 300
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold text-sm">
                    How would you prefer we reach you? <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <RadioGroup 
                    value={watchedValues.contactPreference} 
                    onValueChange={(val: "email" | "phone" | "calendar") => setValue("contactPreference", val)}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="email" id="pref-email" />
                      <Label htmlFor="pref-email" className="font-normal cursor-pointer flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Email
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="phone" id="pref-phone" />
                      <Label htmlFor="pref-phone" className="font-normal cursor-pointer flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Phone
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="calendar" id="pref-calendar" />
                      <Label htmlFor="pref-calendar" className="font-normal cursor-pointer flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Schedule a Call
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  className="text-muted-foreground hover:text-[hsl(var(--biz-navy))]"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-[hsl(var(--biz-teal))] hover:bg-[hsl(180,100%,30%)] font-semibold px-8"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[hsl(var(--biz-teal))] hover:bg-[hsl(180,100%,30%)] font-semibold px-8"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Trust Note */}
        <p className="text-center text-sm text-muted-foreground mt-8 max-w-xl mx-auto">
          🔒 Your information is secure and will only be used to match you with the right advisor. 
          We never share your data with third parties.
        </p>
      </div>
    </section>
  );
};

export default CustomRequestForm;
