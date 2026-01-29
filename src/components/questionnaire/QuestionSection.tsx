import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  allChapters,
  getQuestionsForSection,
  getChapterByDimensionCode,
  getDimensionByCode,
} from '@/data/questionnaire-index';
import type { Question } from '@/data/questionnaire-data';
import { HelpCircle, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface QuestionSectionProps {
  chapterCode: string;
  dimensionCode: string;
  responses: Record<string, any>;
  onChange: (questionId: string, value: any) => void;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  chapterCode,
  dimensionCode,
  responses,
  onChange,
}) => {
  const chapter = allChapters.find(c => c.code === chapterCode);
  const dimension = getDimensionByCode(dimensionCode);
  
  if (!chapter || !dimension) {
    return <div>Section not found</div>;
  }

  const questions = dimension.questions;

  // Group questions by question number (some questions have multiple parts)
  const groupedQuestions: Map<number, Question[]> = new Map();
  questions.forEach(q => {
    const existing = groupedQuestions.get(q.questionNumber) || [];
    existing.push(q);
    groupedQuestions.set(q.questionNumber, existing);
  });

  const renderQuestion = (question: Question) => {
    const value = responses[question.id];
    const isNa = responses[`${question.id}_na`];
    const isEstimate = responses[`${question.id}_estimate`];

    switch (question.type) {
      case 'scale':
        return (
          <div className="space-y-4">
            <RadioGroup
              value={value?.toString() || ''}
              onValueChange={(val) => onChange(question.id, parseInt(val))}
              className="space-y-3"
            >
              {question.options?.map((option) => (
                <div 
                  key={option.value}
                  className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors ${
                    value === option.value 
                      ? 'border-biz-green bg-biz-green/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <RadioGroupItem 
                    value={option.value.toString()} 
                    id={`${question.id}_${option.value}`}
                    className="mt-0.5"
                  />
                  <Label 
                    htmlFor={`${question.id}_${option.value}`}
                    className="flex-1 cursor-pointer"
                  >
                    <span className="font-medium">{option.label}</span>
                    {option.description && (
                      <span className="block text-sm text-biz-grey mt-0.5">
                        {option.description}
                      </span>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'percentage':
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={isNa ? '' : (value ?? '')}
                onChange={(e) => onChange(question.id, e.target.value ? parseFloat(e.target.value) : null)}
                placeholder={question.placeholder || 'Enter percentage'}
                min={question.min}
                max={question.max}
                step={question.step || 1}
                disabled={isNa}
                className="max-w-[200px]"
              />
              <span className="text-biz-grey">%</span>
            </div>
            {question.hasEstimateFlag && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}_estimate`}
                  checked={isEstimate || false}
                  onCheckedChange={(checked) => onChange(`${question.id}_estimate`, checked)}
                />
                <Label htmlFor={`${question.id}_estimate`} className="text-sm text-biz-grey cursor-pointer">
                  This is an estimate
                </Label>
              </div>
            )}
            {question.hasNaOption && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}_na`}
                  checked={isNa || false}
                  onCheckedChange={(checked) => {
                    onChange(`${question.id}_na`, checked);
                    if (checked) onChange(question.id, null);
                  }}
                />
                <Label htmlFor={`${question.id}_na`} className="text-sm text-biz-grey cursor-pointer">
                  Not applicable / Don't know
                </Label>
              </div>
            )}
          </div>
        );

      case 'currency':
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-biz-grey">$</span>
              <Input
                type="number"
                value={isNa ? '' : (value ?? '')}
                onChange={(e) => onChange(question.id, e.target.value ? parseFloat(e.target.value) : null)}
                placeholder={question.placeholder || 'Enter amount'}
                min={question.min}
                disabled={isNa}
                className="max-w-[250px]"
              />
            </div>
            {question.hasEstimateFlag && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}_estimate`}
                  checked={isEstimate || false}
                  onCheckedChange={(checked) => onChange(`${question.id}_estimate`, checked)}
                />
                <Label htmlFor={`${question.id}_estimate`} className="text-sm text-biz-grey cursor-pointer">
                  This is an estimate
                </Label>
              </div>
            )}
            {question.hasNaOption && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}_na`}
                  checked={isNa || false}
                  onCheckedChange={(checked) => {
                    onChange(`${question.id}_na`, checked);
                    if (checked) onChange(question.id, null);
                  }}
                />
                <Label htmlFor={`${question.id}_na`} className="text-sm text-biz-grey cursor-pointer">
                  Not applicable / Don't know
                </Label>
              </div>
            )}
          </div>
        );

      case 'numeric':
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={isNa ? '' : (value ?? '')}
                onChange={(e) => onChange(question.id, e.target.value ? parseFloat(e.target.value) : null)}
                placeholder={question.placeholder || 'Enter number'}
                min={question.min}
                max={question.max}
                disabled={isNa}
                className="max-w-[200px]"
              />
              {question.unit && <span className="text-biz-grey">{question.unit}</span>}
            </div>
            {question.hasNaOption && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}_na`}
                  checked={isNa || false}
                  onCheckedChange={(checked) => {
                    onChange(`${question.id}_na`, checked);
                    if (checked) onChange(question.id, null);
                  }}
                />
                <Label htmlFor={`${question.id}_na`} className="text-sm text-biz-grey cursor-pointer">
                  Not applicable / Don't know
                </Label>
              </div>
            )}
          </div>
        );

      case 'text':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => onChange(question.id, e.target.value)}
            placeholder={question.placeholder || 'Enter your response'}
            rows={3}
            className="max-w-lg"
          />
        );

      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => onChange(question.id, e.target.value)}
            placeholder={question.placeholder || 'Enter your response'}
          />
        );
    }
  };

  const renderFollowUp = (question: Question) => {
    if (!question.hasFollowUp || !question.followUpField) return null;
    
    const mainValue = responses[question.id];
    const shouldShow = question.followUpCondition 
      ? mainValue !== undefined && mainValue < question.followUpCondition
      : mainValue !== undefined;

    if (!shouldShow) return null;

    return (
      <div className="mt-4 pl-4 border-l-2 border-biz-green/30">
        <Label className="text-sm text-biz-grey mb-2 block">
          Please provide more details:
        </Label>
        <Textarea
          value={responses[`${question.id}_followup`] || ''}
          onChange={(e) => onChange(`${question.id}_followup`, e.target.value)}
          placeholder="What challenges or barriers are you facing?"
          rows={2}
          className="max-w-lg"
        />
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-biz-navy/5 to-biz-green/5 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-sm text-biz-green font-medium mb-1">
              {chapter.name}
            </p>
            <h2 className="text-xl font-montserrat font-semibold text-biz-navy mb-2">
              {dimension.name}
            </h2>
            <p className="text-biz-grey font-open-sans">
              {dimension.description}
            </p>
          </div>
        </div>
      </div>

      {/* Chapter Transition Message (show only for first dimension of chapter) */}
      {chapter.dimensions[0].code === dimensionCode && (
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            {chapter.transitionMessage}
          </p>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-8">
        {Array.from(groupedQuestions.entries()).map(([questionNumber, questionGroup]) => (
          <div key={questionNumber} className="space-y-4">
            {/* Question Number Badge */}
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-biz-navy text-white flex items-center justify-center text-sm font-medium">
                {questionNumber}
              </span>
              <div className="flex-1 space-y-4">
                {questionGroup.map((question, idx) => (
                  <div key={question.id} className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Label className="text-base font-medium text-biz-navy leading-relaxed">
                        {question.text}
                        {question.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="text-gray-400 hover:text-gray-600">
                              <HelpCircle className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-xs">
                            <p className="text-sm">
                              Answer based on your current situation. If unsure, provide your best estimate.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {renderQuestion(question)}
                    {renderFollowUp(question)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionSection;
