import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent, 
  Calendar,
  Building2,
  HelpCircle,
  Plus,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CashFlowInputs, OneTimeItem, getMonthOptions } from '@/lib/cashFlowCalculations';

interface CashFlowInputFormProps {
  inputs: CashFlowInputs;
  onInputChange: (field: keyof CashFlowInputs, value: string | number | OneTimeItem[]) => void;
  errors: Record<string, string>;
}

const CashFlowInputForm: React.FC<CashFlowInputFormProps> = ({ inputs, onInputChange, errors }) => {
  const monthOptions = getMonthOptions(true);
  const [oneTimeOpen, setOneTimeOpen] = React.useState(false);

  const handleNumericChange = (field: keyof CashFlowInputs, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    if (!isNaN(numValue)) {
      onInputChange(field, numValue);
    }
  };

  const handleMonthChange = (value: string) => {
    const [month, year] = value.split('-').map(Number);
    onInputChange('startMonth', month);
    onInputChange('startYear', year);
  };

  const addOneTimeItem = () => {
    const newItem: OneTimeItem = {
      id: Date.now().toString(),
      type: 'income',
      month: 0,
      amount: 0,
      description: ''
    };
    onInputChange('oneTimeItems', [...inputs.oneTimeItems, newItem]);
  };

  const updateOneTimeItem = (id: string, field: keyof OneTimeItem, value: string | number) => {
    const updated = inputs.oneTimeItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onInputChange('oneTimeItems', updated);
  };

  const removeOneTimeItem = (id: string) => {
    onInputChange('oneTimeItems', inputs.oneTimeItems.filter(item => item.id !== id));
  };

  const TooltipIcon = ({ content }: { content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help ml-1" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-biz-navy text-white p-3">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border/50 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-biz-navy/10">
          <Wallet className="w-6 h-6 text-biz-navy" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground font-montserrat">Enter Your Cash Flow Details</h2>
          <p className="text-sm text-muted-foreground">We'll project your cash position for the next 12 months</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: Starting Position */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Building2 className="w-5 h-5 text-biz-green" />
            <h3 className="font-semibold text-foreground">Your Starting Position</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="businessName" className="flex items-center text-sm font-medium">
                Business Name
                <span className="text-muted-foreground ml-1">(optional)</span>
              </Label>
              <Input
                id="businessName"
                type="text"
                value={inputs.businessName}
                onChange={(e) => onInputChange('businessName', e.target.value)}
                placeholder="My Awesome Business"
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1">For your personalized report</p>
            </div>

            <div>
              <Label htmlFor="startingCash" className="flex items-center text-sm font-medium">
                Starting Cash Balance <span className="text-destructive">*</span>
                <TooltipIcon content="Your current bank balance for the business. Check your business checking account for today's balance." />
              </Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="startingCash"
                  type="number"
                  min="0"
                  value={inputs.startingCash || ''}
                  onChange={(e) => handleNumericChange('startingCash', e.target.value)}
                  placeholder="25,000"
                  className={`pl-9 ${errors.startingCash ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.startingCash && <p className="text-xs text-destructive mt-1">{errors.startingCash}</p>}
            </div>

            <div>
              <Label htmlFor="startMonth" className="flex items-center text-sm font-medium">
                Projection Start Month <span className="text-destructive">*</span>
              </Label>
              <Select
                value={`${inputs.startMonth}-${inputs.startYear}`}
                onValueChange={handleMonthChange}
              >
                <SelectTrigger className="mt-1.5">
                  <Calendar className="w-4 h-4 text-muted-foreground mr-2" />
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {monthOptions.map(opt => (
                    <SelectItem key={`${opt.value}-${opt.year}`} value={`${opt.value}-${opt.year}`}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">Month 1 of projection</p>
            </div>
          </div>
        </div>

        {/* Section 2: Money Coming In */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-foreground">Money Coming In (Cash Inflows)</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="monthlyRevenue" className="flex items-center text-sm font-medium">
                Average Monthly Revenue <span className="text-destructive">*</span>
                <TooltipIcon content="Your expected monthly sales or service revenue. Use your average from the past 3-6 months if unsure." />
              </Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="monthlyRevenue"
                  type="number"
                  min="0"
                  value={inputs.monthlyRevenue || ''}
                  onChange={(e) => handleNumericChange('monthlyRevenue', e.target.value)}
                  placeholder="15,000"
                  className={`pl-9 ${errors.monthlyRevenue ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.monthlyRevenue && <p className="text-xs text-destructive mt-1">{errors.monthlyRevenue}</p>}
            </div>

            <div>
              <Label htmlFor="growthRate" className="flex items-center text-sm font-medium">
                Expected Growth Rate
                <span className="text-muted-foreground ml-1">(optional)</span>
                <TooltipIcon content="Monthly growth percentage. Enter 0 for flat revenue, 2 for 2% growth, or -1 for 1% decline each month." />
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="growthRate"
                  type="number"
                  min="-50"
                  max="100"
                  step="0.5"
                  value={inputs.growthRate || ''}
                  onChange={(e) => handleNumericChange('growthRate', e.target.value)}
                  placeholder="0"
                  className={`pr-8 ${errors.growthRate ? 'border-destructive' : ''}`}
                />
                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              {errors.growthRate && <p className="text-xs text-destructive mt-1">{errors.growthRate}</p>}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="otherIncome" className="flex items-center text-sm font-medium">
                Other Monthly Income
                <span className="text-muted-foreground ml-1">(optional)</span>
                <TooltipIcon content="Rental income, interest, recurring consulting, or other regular income besides your main revenue." />
              </Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="otherIncome"
                  type="number"
                  min="0"
                  value={inputs.otherIncome || ''}
                  onChange={(e) => handleNumericChange('otherIncome', e.target.value)}
                  placeholder="0"
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Rental income, interest, recurring consulting, etc.</p>
            </div>
          </div>
        </div>

        {/* Section 3: Money Going Out */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-foreground">Money Going Out (Cash Outflows)</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fixedExpenses" className="flex items-center text-sm font-medium">
                Monthly Fixed Expenses <span className="text-destructive">*</span>
                <TooltipIcon content="Rent, salaries, insurance, utilities, subscriptions—costs that stay the same regardless of sales." />
              </Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="fixedExpenses"
                  type="number"
                  min="0"
                  value={inputs.fixedExpenses || ''}
                  onChange={(e) => handleNumericChange('fixedExpenses', e.target.value)}
                  placeholder="8,000"
                  className={`pl-9 ${errors.fixedExpenses ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.fixedExpenses && <p className="text-xs text-destructive mt-1">{errors.fixedExpenses}</p>}
            </div>

            <div>
              <Label htmlFor="variableExpensePercent" className="flex items-center text-sm font-medium">
                Variable Expenses <span className="text-destructive">*</span>
                <TooltipIcon content="Materials, shipping, payment processing—costs that increase with sales. Enter as a percentage of revenue." />
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="variableExpensePercent"
                  type="number"
                  min="0"
                  max="100"
                  value={inputs.variableExpensePercent || ''}
                  onChange={(e) => handleNumericChange('variableExpensePercent', e.target.value)}
                  placeholder="30"
                  className={`pr-16 ${errors.variableExpensePercent ? 'border-destructive' : ''}`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">% of revenue</span>
              </div>
              {errors.variableExpensePercent && <p className="text-xs text-destructive mt-1">{errors.variableExpensePercent}</p>}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="ownersDraw" className="flex items-center text-sm font-medium">
                Owner's Draw / Distributions
                <span className="text-muted-foreground ml-1">(optional)</span>
                <TooltipIcon content="How much you pay yourself each month. This is separate from any salary included in fixed expenses." />
              </Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="ownersDraw"
                  type="number"
                  min="0"
                  value={inputs.ownersDraw || ''}
                  onChange={(e) => handleNumericChange('ownersDraw', e.target.value)}
                  placeholder="3,000"
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">How much you pay yourself each month</p>
            </div>
          </div>
        </div>

        {/* Section 4: One-Time Items */}
        <Collapsible open={oneTimeOpen} onOpenChange={setOneTimeOpen}>
          <CollapsibleTrigger asChild>
            <button className="flex items-center justify-between w-full pb-2 border-b border-border hover:bg-muted/30 px-2 py-2 -mx-2 rounded-lg transition-colors">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-biz-copper" />
                <h3 className="font-semibold text-foreground">One-Time Items</h3>
                <span className="text-sm text-muted-foreground">(Optional)</span>
              </div>
              {oneTimeOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Add expected one-time income or expenses for specific months (e.g., tax refund, equipment purchase, seasonal bonus).</p>
            
            {inputs.oneTimeItems.map((item, index) => (
              <div key={item.id} className="flex flex-wrap gap-3 items-end p-4 bg-muted/30 rounded-lg">
                <div className="w-28">
                  <Label className="text-xs">Type</Label>
                  <Select
                    value={item.type}
                    onValueChange={(value) => updateOneTimeItem(item.id, 'type', value as 'income' | 'expense')}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-36">
                  <Label className="text-xs">Month</Label>
                  <Select
                    value={String(item.month)}
                    onValueChange={(value) => updateOneTimeItem(item.id, 'month', parseInt(value))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i} value={String(i)}>Month {i + 1}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-28">
                  <Label className="text-xs">Amount</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                    <Input
                      type="number"
                      min="0"
                      value={item.amount || ''}
                      onChange={(e) => updateOneTimeItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                      className="pl-6 text-sm"
                      placeholder="5,000"
                    />
                  </div>
                </div>
                
                <div className="flex-1 min-w-32">
                  <Label className="text-xs">Description</Label>
                  <Input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateOneTimeItem(item.id, 'description', e.target.value)}
                    className="mt-1 text-sm"
                    placeholder="Tax refund, equipment..."
                  />
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOneTimeItem(item.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addOneTimeItem}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add One-Time Item
            </Button>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Quick add:</span>
              {['Tax Refund', 'Equipment', 'Loan', 'Seasonal Bonus'].map(label => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    const newItem: OneTimeItem = {
                      id: Date.now().toString(),
                      type: label === 'Tax Refund' || label === 'Loan' ? 'income' : 'expense',
                      month: 0,
                      amount: 0,
                      description: label
                    };
                    onInputChange('oneTimeItems', [...inputs.oneTimeItems, newItem]);
                  }}
                  className="text-xs px-2 py-1 bg-biz-navy/10 text-biz-navy rounded-full hover:bg-biz-navy/20 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default CashFlowInputForm;
