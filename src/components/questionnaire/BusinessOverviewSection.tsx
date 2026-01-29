import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  industryOptions,
  corporateStructureOptions,
  countryOptions,
  challengeOptions,
} from '@/data/questionnaire-index';
import { Building2, MapPin, Users, DollarSign, Target } from 'lucide-react';

interface BusinessOverviewSectionProps {
  data: Record<string, any>;
  onChange: (field: string, value: any) => void;
}

const BusinessOverviewSection: React.FC<BusinessOverviewSectionProps> = ({ data, onChange }) => {
  const handleChallengeToggle = (challenge: string, checked: boolean) => {
    const currentChallenges = data.current_challenges || [];
    if (checked) {
      onChange('current_challenges', [...currentChallenges, challenge]);
    } else {
      onChange('current_challenges', currentChallenges.filter((c: string) => c !== challenge));
    }
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-gradient-to-r from-biz-navy/5 to-biz-green/5 rounded-lg p-6">
        <h2 className="text-xl font-montserrat font-semibold text-biz-navy mb-2">
          Welcome to Your Business Health Assessment
        </h2>
        <p className="text-biz-grey font-open-sans">
          Let's start by gathering some basic information about your business. This helps us 
          provide more accurate benchmarks and tailored recommendations.
        </p>
      </div>

      {/* Company Information */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-biz-navy">
          <Building2 className="h-5 w-5" />
          <h3 className="text-lg font-montserrat font-semibold">Company Information</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name *</Label>
            <Input
              id="company_name"
              value={data.company_name || ''}
              onChange={(e) => onChange('company_name', e.target.value)}
              placeholder="Your Company Name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_website">Company Website</Label>
            <Input
              id="company_website"
              value={data.company_website || ''}
              onChange={(e) => onChange('company_website', e.target.value)}
              placeholder="www.example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry / Business Sector *</Label>
            <Select
              value={data.industry || ''}
              onValueChange={(value) => onChange('industry', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry_other_details">Industry Details</Label>
            <Input
              id="industry_other_details"
              value={data.industry_other_details || ''}
              onChange={(e) => onChange('industry_other_details', e.target.value)}
              placeholder="Describe your specific business"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="corporate_structure">Corporate Structure *</Label>
            <Select
              value={data.corporate_structure || ''}
              onValueChange={(value) => onChange('corporate_structure', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select structure" />
              </SelectTrigger>
              <SelectContent>
                {corporateStructureOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="year_started">Year Started</Label>
            <Input
              id="year_started"
              type="number"
              value={data.year_started || ''}
              onChange={(e) => onChange('year_started', parseInt(e.target.value) || null)}
              placeholder="e.g., 2015"
              min={1800}
              max={2026}
            />
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-biz-navy">
          <MapPin className="h-5 w-5" />
          <h3 className="text-lg font-montserrat font-semibold">Location</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="location">City, State/Province *</Label>
            <Input
              id="location"
              value={data.location || ''}
              onChange={(e) => onChange('location', e.target.value)}
              placeholder="e.g., Austin, TX"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Select
              value={data.country || 'United States'}
              onValueChange={(value) => onChange('country', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <Label htmlFor="multiple_locations" className="text-base">Multiple Locations?</Label>
              <p className="text-sm text-biz-grey">Does your business operate from more than one location?</p>
            </div>
            <Switch
              id="multiple_locations"
              checked={data.multiple_locations || false}
              onCheckedChange={(checked) => onChange('multiple_locations', checked)}
            />
          </div>

          {data.multiple_locations && (
            <div className="space-y-2">
              <Label htmlFor="number_of_locations">Number of Locations</Label>
              <Input
                id="number_of_locations"
                type="number"
                value={data.number_of_locations || ''}
                onChange={(e) => onChange('number_of_locations', parseInt(e.target.value) || 1)}
                placeholder="e.g., 5"
                min={1}
              />
            </div>
          )}
        </div>
      </section>

      {/* Team Size */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-biz-navy">
          <Users className="h-5 w-5" />
          <h3 className="text-lg font-montserrat font-semibold">Team Size</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="executive_leadership_roles">Executive & Leadership Roles</Label>
            <Input
              id="executive_leadership_roles"
              type="number"
              value={data.executive_leadership_roles || ''}
              onChange={(e) => onChange('executive_leadership_roles', parseInt(e.target.value) || 0)}
              placeholder="0"
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="support_admin_staff">Support & Admin Staff</Label>
            <Input
              id="support_admin_staff"
              type="number"
              value={data.support_admin_staff || ''}
              onChange={(e) => onChange('support_admin_staff', parseInt(e.target.value) || 0)}
              placeholder="0"
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_time_employees">Full-Time Employees</Label>
            <Input
              id="full_time_employees"
              type="number"
              value={data.full_time_employees || ''}
              onChange={(e) => onChange('full_time_employees', parseInt(e.target.value) || 0)}
              placeholder="0"
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="part_time_employees">Part-Time Employees</Label>
            <Input
              id="part_time_employees"
              type="number"
              value={data.part_time_employees || ''}
              onChange={(e) => onChange('part_time_employees', parseInt(e.target.value) || 0)}
              placeholder="0"
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contract_temp_personnel">Contract/Temp Personnel</Label>
            <Input
              id="contract_temp_personnel"
              type="number"
              value={data.contract_temp_personnel || ''}
              onChange={(e) => onChange('contract_temp_personnel', parseInt(e.target.value) || 0)}
              placeholder="0"
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seasonal_employees">Seasonal Employees</Label>
            <Input
              id="seasonal_employees"
              type="number"
              value={data.seasonal_employees || ''}
              onChange={(e) => onChange('seasonal_employees', parseInt(e.target.value) || 0)}
              placeholder="0"
              min={0}
            />
          </div>
        </div>
      </section>

      {/* Financials */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-biz-navy">
          <DollarSign className="h-5 w-5" />
          <h3 className="text-lg font-montserrat font-semibold">Revenue Information</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="last_year_revenue">Last Year Total Revenue ($)</Label>
            <Input
              id="last_year_revenue"
              type="number"
              value={data.last_year_revenue || ''}
              onChange={(e) => onChange('last_year_revenue', parseInt(e.target.value) || 0)}
              placeholder="e.g., 1000000"
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projected_revenue">Projected This Year Revenue ($)</Label>
            <Input
              id="projected_revenue"
              type="number"
              value={data.projected_revenue || ''}
              onChange={(e) => onChange('projected_revenue', parseInt(e.target.value) || 0)}
              placeholder="e.g., 1200000"
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="highest_sales_year">Year of Highest Sales</Label>
            <Input
              id="highest_sales_year"
              type="number"
              value={data.highest_sales_year || ''}
              onChange={(e) => onChange('highest_sales_year', parseInt(e.target.value) || null)}
              placeholder="e.g., 2024"
              min={1800}
              max={2026}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="highest_annual_sales">Highest Annual Sales ($)</Label>
            <Input
              id="highest_annual_sales"
              type="number"
              value={data.highest_annual_sales || ''}
              onChange={(e) => onChange('highest_annual_sales', parseInt(e.target.value) || 0)}
              placeholder="e.g., 1500000"
              min={0}
            />
          </div>
        </div>
      </section>

      {/* Current Challenges */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-biz-navy">
          <Target className="h-5 w-5" />
          <h3 className="text-lg font-montserrat font-semibold">Current Challenges</h3>
        </div>

        <p className="text-biz-grey text-sm">
          Select all areas where you're currently facing challenges or would like to improve:
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {challengeOptions.map((challenge) => (
            <div key={challenge.value} className="flex items-center space-x-3">
              <Checkbox
                id={`challenge_${challenge.value}`}
                checked={(data.current_challenges || []).includes(challenge.value)}
                onCheckedChange={(checked) => handleChallengeToggle(challenge.value, checked as boolean)}
              />
              <Label 
                htmlFor={`challenge_${challenge.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {challenge.label}
              </Label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BusinessOverviewSection;
