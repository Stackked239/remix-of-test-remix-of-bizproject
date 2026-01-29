// BizHealth Questionnaire - Main Index
// Combines all chapters and provides utility functions

import { 
  Chapter, 
  Dimension, 
  Question,
  businessOverviewFields,
  industryOptions,
  corporateStructureOptions,
  countryOptions,
  challengeOptions,
  chapter1,
  chapter2,
} from './questionnaire-data';

import { chapter3, chapter4 } from './questionnaire-data-part2';

// Export all chapters in order
export const allChapters: Chapter[] = [chapter1, chapter2, chapter3, chapter4];

// Export business overview
export { 
  businessOverviewFields,
  industryOptions,
  corporateStructureOptions,
  countryOptions,
  challengeOptions,
};

// Re-export types
export type { Chapter, Dimension, Question };

// Utility functions

/**
 * Get total question count
 */
export function getTotalQuestionCount(): number {
  let count = 0;
  allChapters.forEach(chapter => {
    chapter.dimensions.forEach(dimension => {
      count += dimension.questions.length;
    });
  });
  return count;
}

/**
 * Get all dimensions flat
 */
export function getAllDimensions(): Dimension[] {
  const dimensions: Dimension[] = [];
  allChapters.forEach(chapter => {
    dimensions.push(...chapter.dimensions);
  });
  return dimensions;
}

/**
 * Get dimension by code
 */
export function getDimensionByCode(code: string): Dimension | undefined {
  for (const chapter of allChapters) {
    const dimension = chapter.dimensions.find(d => d.code === code);
    if (dimension) return dimension;
  }
  return undefined;
}

/**
 * Get chapter by dimension code
 */
export function getChapterByDimensionCode(dimensionCode: string): Chapter | undefined {
  for (const chapter of allChapters) {
    if (chapter.dimensions.some(d => d.code === dimensionCode)) {
      return chapter;
    }
  }
  return undefined;
}

/**
 * Calculate progress percentage based on answered questions
 */
export function calculateProgress(answeredQuestions: Set<string>): number {
  const total = getTotalQuestionCount();
  return Math.round((answeredQuestions.size / total) * 100);
}

/**
 * Get questions for a specific section (chapter + dimension)
 */
export function getQuestionsForSection(chapterCode: string, dimensionCode: string): Question[] {
  const chapter = allChapters.find(c => c.code === chapterCode);
  if (!chapter) return [];
  
  const dimension = chapter.dimensions.find(d => d.code === dimensionCode);
  if (!dimension) return [];
  
  return dimension.questions;
}

/**
 * Transform form data to pipeline JSON format
 */
export function transformToPipelineFormat(
  companyProfile: Record<string, any>,
  questionnaireResponses: Record<string, any>
): {
  raw_company_profile: Record<string, any>;
  raw_questionnaire: Record<string, any>;
} {
  // Build raw_company_profile
  const raw_company_profile: Record<string, any> = {
    company_name: companyProfile.company_name || '',
    location: companyProfile.location || '',
    country: companyProfile.country || 'United States',
    company_website: companyProfile.company_website || '',
    industry: companyProfile.industry || '',
    industry_other_details: companyProfile.industry_other_details || '',
    corporate_structure: companyProfile.corporate_structure || '',
    year_started: companyProfile.year_started || null,
    multiple_locations: companyProfile.multiple_locations || false,
    number_of_locations: companyProfile.number_of_locations || 1,
    executive_leadership_roles: companyProfile.executive_leadership_roles || 0,
    support_admin_staff: companyProfile.support_admin_staff || 0,
    full_time_employees: companyProfile.full_time_employees || 0,
    part_time_employees: companyProfile.part_time_employees || 0,
    contract_temp_personnel: companyProfile.contract_temp_personnel || 0,
    seasonal_employees: companyProfile.seasonal_employees || 0,
    last_year_revenue: companyProfile.last_year_revenue || 0,
    projected_revenue: companyProfile.projected_revenue || 0,
    highest_sales_year: companyProfile.highest_sales_year || null,
    highest_annual_sales: companyProfile.highest_annual_sales || 0,
    products_services: companyProfile.products_services || [],
    current_challenges: companyProfile.current_challenges || [],
    competitors: companyProfile.competitors || [],
  };

  // Build raw_questionnaire organized by dimension
  const raw_questionnaire: Record<string, any> = {
    event: 'new_questionnaire_response',
    timestamp: new Date().toISOString(),
    submission_id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };

  // Map responses to their respective dimension sections
  allChapters.forEach(chapter => {
    chapter.dimensions.forEach(dimension => {
      const sectionData: Record<string, any> = {};
      
      dimension.questions.forEach(question => {
        const value = questionnaireResponses[question.id];
        sectionData[question.fieldName] = value ?? null;
        
        // Handle estimate flags
        if (question.hasEstimateFlag && question.estimateFlagField) {
          sectionData[question.estimateFlagField] = questionnaireResponses[`${question.id}_estimate`] || false;
        }
        
        // Handle N/A flags
        if (question.hasNaOption && question.naFlagField) {
          sectionData[question.naFlagField] = questionnaireResponses[`${question.id}_na`] || false;
        }
        
        // Handle follow-up fields
        if (question.hasFollowUp && question.followUpField) {
          sectionData[question.followUpField] = questionnaireResponses[`${question.id}_followup`] || null;
        }
      });
      
      raw_questionnaire[dimension.jsonKey] = sectionData;
    });
  });

  return {
    raw_company_profile,
    raw_questionnaire,
  };
}

/**
 * Validate questionnaire completeness
 */
export function validateQuestionnaire(responses: Record<string, any>): {
  isValid: boolean;
  missingRequired: string[];
  completionPercentage: number;
} {
  const missingRequired: string[] = [];
  let answeredCount = 0;
  let totalRequired = 0;

  allChapters.forEach(chapter => {
    chapter.dimensions.forEach(dimension => {
      dimension.questions.forEach(question => {
        if (question.required) {
          totalRequired++;
          const value = responses[question.id];
          if (value === undefined || value === null || value === '') {
            missingRequired.push(question.id);
          } else {
            answeredCount++;
          }
        }
      });
    });
  });

  return {
    isValid: missingRequired.length === 0,
    missingRequired,
    completionPercentage: Math.round((answeredCount / totalRequired) * 100),
  };
}

// Section navigation helpers
export interface SectionInfo {
  chapterCode: string;
  chapterName: string;
  dimensionCode: string;
  dimensionName: string;
  questionCount: number;
  index: number;
}

export function getAllSections(): SectionInfo[] {
  const sections: SectionInfo[] = [];
  let index = 0;
  
  allChapters.forEach(chapter => {
    chapter.dimensions.forEach(dimension => {
      sections.push({
        chapterCode: chapter.code,
        chapterName: chapter.name,
        dimensionCode: dimension.code,
        dimensionName: dimension.name,
        questionCount: dimension.questions.length,
        index: index++,
      });
    });
  });
  
  return sections;
}

export function getSectionByIndex(index: number): SectionInfo | undefined {
  const sections = getAllSections();
  return sections[index];
}

export function getTotalSections(): number {
  return getAllSections().length;
}
