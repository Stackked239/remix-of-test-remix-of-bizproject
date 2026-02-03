import { useState } from "react";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "./IdeaForm";

interface FormStep1Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

interface Errors {
  fullName?: string;
  email?: string;
}

const FormStep1 = ({ formData, updateFormData, onNext }: FormStep1Props) => {
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your name so we know who to credit";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Please enter a valid email (e.g., you@company.com)";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email (e.g., you@company.com)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setTouched({ fullName: true, email: true });
    if (validate()) {
      onNext();
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="font-montserrat font-bold text-xl text-biz-navy mb-2">
          Tell us about yourself
        </h3>
        <p className="font-source-sans text-[#5C5C5C]">
          We'll use this information to keep you updated on your idea's progress.
        </p>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="font-montserrat font-semibold text-sm text-biz-navy">
          Full Name <span className="text-biz-green">*</span>
        </Label>
        <Input
          id="fullName"
          type="text"
          placeholder="John Smith"
          value={formData.fullName}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
          onBlur={() => handleBlur("fullName")}
          className={`h-12 px-4 rounded-xl border-2 text-biz-navy placeholder:text-gray-400 focus:ring-4 focus:ring-biz-green/20 transition-all ${
            touched.fullName && errors.fullName 
              ? "border-red-500 focus:border-red-500" 
              : "border-slate-200 focus:border-biz-green"
          }`}
        />
        {touched.fullName && errors.fullName && (
          <p className="flex items-center gap-1 text-red-600 text-sm font-source-sans">
            <AlertCircle className="w-4 h-4" />
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <Label htmlFor="email" className="font-montserrat font-semibold text-sm text-biz-navy">
          Email Address <span className="text-biz-green">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@company.com"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          onBlur={() => handleBlur("email")}
          className={`h-12 px-4 rounded-xl border-2 text-biz-navy placeholder:text-gray-400 focus:ring-4 focus:ring-biz-green/20 transition-all ${
            touched.email && errors.email 
              ? "border-red-500 focus:border-red-500" 
              : "border-slate-200 focus:border-biz-green"
          }`}
        />
        {touched.email && errors.email && (
          <p className="flex items-center gap-1 text-red-600 text-sm font-source-sans">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Company Name (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="company" className="font-montserrat font-semibold text-sm text-biz-navy">
          Company Name <span className="text-[#5C5C5C] font-normal">(Optional)</span>
        </Label>
        <Input
          id="company"
          type="text"
          placeholder="Your Company Inc."
          value={formData.company}
          onChange={(e) => updateFormData({ company: e.target.value })}
          className="h-12 px-4 rounded-xl border-2 border-slate-200 text-biz-navy placeholder:text-gray-400 focus:border-biz-green focus:ring-4 focus:ring-biz-green/20 transition-all"
        />
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleSubmit}
        className="w-full h-12 bg-gradient-to-r from-biz-green to-biz-green/90 hover:from-biz-green/90 hover:to-biz-green/80 text-white font-montserrat font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
      >
        Continue to Your Idea
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
};

export default FormStep1;
