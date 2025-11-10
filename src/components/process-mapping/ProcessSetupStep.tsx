import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProcessMapStore } from '@/stores/processMapStore';
import { Sparkles, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ProcessSetupStepProps {
  onNext: () => void;
  onExit: () => void;
}

const departments = [
  'HR / People Operations',
  'Sales & Marketing',
  'Customer Success',
  'Finance & Accounting',
  'Operations',
  'IT / Technology',
  'Custom',
];

const ProcessSetupStep = ({ onNext, onExit }: ProcessSetupStepProps) => {
  const { currentProcess, createProcess, updateProcess } = useProcessMapStore();
  
  const [formData, setFormData] = useState({
    name: currentProcess?.name || '',
    department: currentProcess?.department || '',
    owner: currentProcess?.owner || '',
    purpose: currentProcess?.purpose || '',
    frequency: currentProcess?.frequency || 'on-demand' as const,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.length < 3) {
      newErrors.name = 'Process name must be at least 3 characters';
    }
    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }
    if (!formData.owner.trim() || formData.owner.length < 2) {
      newErrors.owner = 'Process owner must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (currentProcess) {
      updateProcess(currentProcess.id, formData);
    } else {
      createProcess({
        ...formData,
        status: 'draft',
      });
    }
    onNext();
  };

  const handleAIGenerate = () => {
    // Placeholder for AI generation
    const generated = `This process standardizes the ${formData.name.toLowerCase()} workflow to ensure consistency, compliance, and efficiency across the ${formData.department} department.`;
    setFormData({ ...formData, purpose: generated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-foreground">Step 1: Define Your Process</h2>
        <p className="text-muted-foreground">
          Provide basic information about your process before mapping it out
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">
            Process Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            placeholder="e.g., Employee Onboarding Process"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="department">
            Department <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.department}
            onValueChange={(value) => setFormData({ ...formData, department: value })}
          >
            <SelectTrigger className={errors.department ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.department && <p className="text-sm text-destructive mt-1">{errors.department}</p>}
        </div>

        <div>
          <Label htmlFor="owner">
            Process Owner <span className="text-destructive">*</span>
          </Label>
          <Input
            id="owner"
            placeholder="e.g., Jane Smith - HR Manager"
            value={formData.owner}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
            className={errors.owner ? 'border-destructive' : ''}
          />
          {errors.owner && <p className="text-sm text-destructive mt-1">{errors.owner}</p>}
        </div>

        <div>
          <Label htmlFor="purpose">Purpose / Objective</Label>
          <Textarea
            id="purpose"
            placeholder="Describe what this process accomplishes..."
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            rows={4}
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-muted-foreground">{formData.purpose.length}/500 characters</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAIGenerate}
              disabled={!formData.name || !formData.department}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Generate
            </Button>
          </div>
        </div>

        <div>
          <Label>Process Frequency</Label>
          <RadioGroup
            value={formData.frequency}
            onValueChange={(value: any) => setFormData({ ...formData, frequency: value })}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2"
          >
            {[
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
              { value: 'quarterly', label: 'Quarterly' },
              { value: 'annually', label: 'Annually' },
              { value: 'on-demand', label: 'On-Demand' },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              <X className="w-4 h-4 mr-2" />
              Exit
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Exit Process Mapping?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to exit? The current process map will be deleted (unsaved) and not recoverable. All your progress will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onExit}>
                Agree - Please Exit
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button onClick={handleSubmit} size="lg">
          Next: Map Process →
        </Button>
      </div>
    </div>
  );
};

export default ProcessSetupStep;
