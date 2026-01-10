import { useState } from "react";
import { ArrowRight, ArrowLeft, AlertCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormData } from "./IdeaForm";

interface FormStep2Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface Errors {
  category?: string;
  ideaTitle?: string;
  description?: string;
  problemsSolved?: string;
}

const categories = [
  { value: "content-insights", label: "Content & Insights (BizGuides)" },
  { value: "tools-templates", label: "Tools & Templates (BizTools)" },
  { value: "education-leadership", label: "Education & Leadership (BizGrowth Academy)" },
  { value: "platform-feature", label: "Platform Feature" },
  { value: "other", label: "Other" }
];

const problemChips = [
  "Cash Flow",
  "Scaling Operations",
  "HR & Talent",
  "Sales & Marketing",
  "Risk Management",
  "Technology",
  "Leadership",
  "Strategy",
  "Other"
];

const FormStep2 = ({ formData, updateFormData, onNext, onBack }: FormStep2Props) => {
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};
    
    if (!formData.category) {
      newErrors.category = "Let us know what category fits your idea best";
    }
    
    if (!formData.ideaTitle.trim()) {
      newErrors.ideaTitle = "Give your idea a short title—even a few words help";
    } else if (formData.ideaTitle.length > 100) {
      newErrors.ideaTitle = `Great title! Please trim to under 100 characters (you're at ${formData.ideaTitle.length})`;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Tell us more about your idea—what would it do?";
    } else if (formData.description.length > 2000) {
      newErrors.description = `Great detail! Please trim to under 2,000 characters (you're at ${formData.description.length.toLocaleString()})`;
    }
    
    if (formData.problemsSolved.length === 0) {
      newErrors.problemsSolved = "Select at least one problem your idea would solve";
    } else if (formData.problemsSolved.length > 3) {
      newErrors.problemsSolved = "Please select up to 3 problems";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setTouched({ category: true, ideaTitle: true, description: true, problemsSolved: true });
    if (validate()) {
      onNext();
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  };

  const toggleProblem = (problem: string) => {
    const current = formData.problemsSolved;
    if (current.includes(problem)) {
      updateFormData({ problemsSolved: current.filter(p => p !== problem) });
    } else if (current.length < 3) {
      updateFormData({ problemsSolved: [...current, problem] });
    }
    setTouched(prev => ({ ...prev, problemsSolved: true }));
  };

  const titleCharCount = formData.ideaTitle.length;
  const descCharCount = formData.description.length;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="font-montserrat font-bold text-xl text-biz-navy mb-2">
          Describe your idea
        </h3>
        <p className="font-source-sans text-[#5C5C5C]">
          Help us understand what you're envisioning and how it could help others.
        </p>
      </div>

      {/* Category Select */}
      <div className="space-y-2">
        <Label className="font-montserrat font-semibold text-sm text-biz-navy">
          Category <span className="text-biz-green">*</span>
        </Label>
        <Select
          value={formData.category}
          onValueChange={(value) => {
            updateFormData({ category: value });
            setTouched(prev => ({ ...prev, category: true }));
          }}
        >
          <SelectTrigger 
            className={`h-12 rounded-xl border-2 text-biz-navy focus:ring-4 focus:ring-biz-green/20 transition-all ${
              touched.category && errors.category 
                ? "border-red-500" 
                : "border-slate-200 focus:border-biz-green"
            }`}
          >
            <SelectValue placeholder="Select a category..." />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {touched.category && errors.category && (
          <p className="flex items-center gap-1 text-red-600 text-sm font-source-sans">
            <AlertCircle className="w-4 h-4" />
            {errors.category}
          </p>
        )}
      </div>

      {/* Idea Title */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="ideaTitle" className="font-montserrat font-semibold text-sm text-biz-navy">
            Idea Title <span className="text-biz-green">*</span>
          </Label>
          <span className={`text-xs font-source-sans ${
            titleCharCount > 90 ? "text-biz-green font-medium" : "text-[#5C5C5C]"
          }`}>
            ({titleCharCount}/100)
          </span>
        </div>
        <Input
          id="ideaTitle"
          type="text"
          placeholder="e.g., Cash Flow Forecasting Template for Retail"
          value={formData.ideaTitle}
          onChange={(e) => updateFormData({ ideaTitle: e.target.value })}
          onBlur={() => handleBlur("ideaTitle")}
          maxLength={100}
          className={`h-12 px-4 rounded-xl border-2 text-biz-navy placeholder:text-gray-400 focus:ring-4 focus:ring-biz-green/20 transition-all ${
            touched.ideaTitle && errors.ideaTitle 
              ? "border-red-500 focus:border-red-500" 
              : "border-slate-200 focus:border-biz-green"
          }`}
        />
        {touched.ideaTitle && errors.ideaTitle && (
          <p className="flex items-center gap-1 text-red-600 text-sm font-source-sans">
            <AlertCircle className="w-4 h-4" />
            {errors.ideaTitle}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="description" className="font-montserrat font-semibold text-sm text-biz-navy">
            Description <span className="text-biz-green">*</span>
          </Label>
          <span className={`text-xs font-source-sans ${
            descCharCount > 1800 ? "text-biz-green font-medium" : "text-[#5C5C5C]"
          }`}>
            ({descCharCount.toLocaleString()}/2,000)
          </span>
        </div>
        <Textarea
          id="description"
          placeholder="Describe your idea in detail. What would it do? Who would benefit? How would it solve a problem?"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          onBlur={() => handleBlur("description")}
          maxLength={2000}
          rows={6}
          className={`px-4 py-3 rounded-xl border-2 text-biz-navy placeholder:text-gray-400 focus:ring-4 focus:ring-biz-green/20 transition-all resize-none ${
            touched.description && errors.description 
              ? "border-red-500 focus:border-red-500" 
              : "border-slate-200 focus:border-biz-green"
          }`}
        />
        {touched.description && errors.description && (
          <p className="flex items-center gap-1 text-red-600 text-sm font-source-sans">
            <AlertCircle className="w-4 h-4" />
            {errors.description}
          </p>
        )}
      </div>

      {/* Problems Solved - Chips */}
      <div className="space-y-3">
        <Label className="font-montserrat font-semibold text-sm text-biz-navy block">
          Problems This Would Solve <span className="text-biz-green">*</span>
          <span className="text-[#5C5C5C] font-normal ml-2">(Select 1-3)</span>
        </Label>
        <div className="flex flex-wrap gap-2">
          {problemChips.map((problem) => {
            const isSelected = formData.problemsSolved.includes(problem);
            const isDisabled = !isSelected && formData.problemsSolved.length >= 3;
            
            return (
              <button
                key={problem}
                type="button"
                onClick={() => !isDisabled && toggleProblem(problem)}
                disabled={isDisabled}
                className={`px-4 py-2 rounded-full text-sm font-source-sans font-medium transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-biz-green to-biz-green/90 text-white shadow-md"
                    : isDisabled
                    ? "bg-white border-2 border-slate-200 text-slate-400 cursor-not-allowed opacity-50"
                    : "bg-white border-2 border-slate-200 text-[#5C5C5C] hover:border-biz-green/50 hover:bg-biz-green/5"
                }`}
              >
                {problem}
              </button>
            );
          })}
        </div>
        {touched.problemsSolved && errors.problemsSolved && (
          <p className="flex items-center gap-1 text-red-600 text-sm font-source-sans">
            <AlertCircle className="w-4 h-4" />
            {errors.problemsSolved}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 h-12 border-2 border-slate-200 text-[#5C5C5C] font-montserrat font-semibold rounded-xl hover:bg-slate-50 transition-all"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1 h-12 bg-gradient-to-r from-biz-green to-biz-green/90 hover:from-biz-green/90 hover:to-biz-green/80 text-white font-montserrat font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          Continue to Context
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default FormStep2;
