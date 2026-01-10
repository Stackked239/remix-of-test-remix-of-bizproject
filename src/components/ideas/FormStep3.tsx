import { useState } from "react";
import { ArrowLeft, Check, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { FormData } from "./IdeaForm";

interface FormStep3Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

interface Errors {
  privacyConsent?: string;
}

const urgencyOptions = [
  { value: "nice-to-have", label: "Nice to have" },
  { value: "would-help-soon", label: "Would help soon" },
  { value: "important-for-growth", label: "Important for growth" },
  { value: "critical-urgent", label: "Critical and urgent" }
];

const betaTestingOptions = [
  { value: "yes", label: "Yes, I'd love to test early versions" },
  { value: "maybe", label: "Maybe, depending on timing" },
  { value: "no", label: "No thanks, just notify me when it launches" }
];

const FormStep3 = ({ formData, updateFormData, onBack, onSubmit }: FormStep3Props) => {
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Errors = {};
    
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = "Please accept the privacy policy to submit";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSubmit();
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="font-montserrat font-bold text-xl text-biz-navy mb-2">
          A bit more context
        </h3>
        <p className="font-source-sans text-[#5C5C5C]">
          These optional details help us prioritize and plan better.
        </p>
      </div>

      {/* Urgency */}
      <div className="space-y-3">
        <Label className="font-montserrat font-semibold text-sm text-biz-navy block">
          How urgent is this for you?{" "}
          <span className="text-[#5C5C5C] font-normal">(Optional)</span>
        </Label>
        <div className="space-y-2">
          {urgencyOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.urgency === option.value
                  ? "border-biz-green bg-biz-green/5"
                  : "border-slate-200 hover:border-biz-green/50 hover:bg-slate-50"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  formData.urgency === option.value
                    ? "border-biz-green bg-biz-green"
                    : "border-slate-300"
                }`}
              >
                {formData.urgency === option.value && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className={`font-source-sans ${
                formData.urgency === option.value ? "text-biz-green font-medium" : "text-[#5C5C5C]"
              }`}>
                {option.label}
              </span>
              <input
                type="radio"
                name="urgency"
                value={option.value}
                checked={formData.urgency === option.value}
                onChange={(e) => updateFormData({ urgency: e.target.value })}
                className="sr-only"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Beta Testing Interest */}
      <div className="space-y-3">
        <Label className="font-montserrat font-semibold text-sm text-biz-navy block">
          Interested in beta testing?{" "}
          <span className="text-[#5C5C5C] font-normal">(Optional)</span>
        </Label>
        <div className="space-y-2">
          {betaTestingOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.betaTesting === option.value
                  ? "border-biz-green bg-biz-green/5"
                  : "border-slate-200 hover:border-biz-green/50 hover:bg-slate-50"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  formData.betaTesting === option.value
                    ? "border-biz-green bg-biz-green"
                    : "border-slate-300"
                }`}
              >
                {formData.betaTesting === option.value && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className={`font-source-sans ${
                formData.betaTesting === option.value ? "text-biz-green font-medium" : "text-[#5C5C5C]"
              }`}>
                {option.label}
              </span>
              <input
                type="radio"
                name="betaTesting"
                value={option.value}
                checked={formData.betaTesting === option.value}
                onChange={(e) => updateFormData({ betaTesting: e.target.value })}
                className="sr-only"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Privacy Consent */}
      <div className="space-y-2 pt-4 border-t border-slate-100">
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            id="privacyConsent"
            checked={formData.privacyConsent}
            onCheckedChange={(checked) => updateFormData({ privacyConsent: checked === true })}
            className="mt-0.5 data-[state=checked]:bg-biz-green data-[state=checked]:border-biz-green"
          />
          <span className="font-source-sans text-sm text-[#5C5C5C] leading-relaxed">
            I agree to the{" "}
            <Link to="/privacy" className="text-biz-green hover:underline font-medium">
              privacy policy
            </Link>{" "}
            and understand that my idea may be used to develop future BizHealth.ai resources.{" "}
            <span className="text-biz-green">*</span>
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="flex items-center gap-1 text-red-600 text-sm font-source-sans ml-7">
            <AlertCircle className="w-4 h-4" />
            {errors.privacyConsent}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 h-12 border-2 border-slate-200 text-[#5C5C5C] font-montserrat font-semibold rounded-xl hover:bg-slate-50 transition-all disabled:opacity-50"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 h-12 bg-gradient-to-r from-biz-green to-biz-green/90 hover:from-biz-green/90 hover:to-biz-green/80 text-white font-montserrat font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit My Idea
              <Check className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormStep3;
