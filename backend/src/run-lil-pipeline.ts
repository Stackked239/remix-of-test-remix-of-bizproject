/**
 * LIL Pipeline Test Runner
 * 
 * Runs the complete LIL (Essentials) pipeline end-to-end with sample data.
 * Generates all 9 reports and saves them to the output directory.
 * 
 * Usage: npx tsx src/run-lil-pipeline.ts [--output-dir=./lil-output]
 */

import { config } from 'dotenv';
config();

import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import { runLILPipeline } from './orchestration/lil/lil-pipeline-orchestrator.js';
import { LILQuestionnaireInput } from './types/lil-pipeline.types.js';

// Parse args
const args = process.argv.slice(2);
let outputDir = './lil-output';
for (const arg of args) {
  if (arg.startsWith('--output-dir=')) {
    outputDir = arg.replace('--output-dir=', '');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SAMPLE TEST DATA: "Sunrise Bakery & Café" - a realistic micro-business
// ═══════════════════════════════════════════════════════════════════════════

const sampleInput: LILQuestionnaireInput = {
  submissionId: randomUUID(),
  timestamp: new Date().toISOString(),
  pipelineType: 'LIL',
  businessOverview: {
    companyName: 'Sunrise Bakery & Café',
    location: { city: 'Austin', state: 'Texas', country: 'United States' },
    multipleLocations: false,
    industry: 'Food & Beverage - Bakery/Café',
    industryDetails: 'Artisan bakery and café specializing in sourdough breads, pastries, and specialty coffee. Also offers catering for local events.',
    corporateStructure: 'LLC',
    website: 'www.sunrisebakerycafe.com',
    yearStarted: 2019,
    workforce: {
      executiveLeadership: 2,
      supportAdmin: 1,
      fullTimeEmployees: 5,
      partTimeEmployees: 4,
      contractors: 1,
      seasonal: 2
    },
    salesRevenue: {
      lastYear: 620000,
      projectedThisYear: 710000,
      highestYear: 2024,
      highestAmount: 620000
    },
    productsServices: [
      { name: 'Artisan Breads & Pastries', percentOfSales: 45, type: 'product' },
      { name: 'Coffee & Beverages', percentOfSales: 30, type: 'product' },
      { name: 'Catering Services', percentOfSales: 15, type: 'service' },
      { name: 'Wholesale to Local Restaurants', percentOfSales: 10, type: 'product' }
    ],
    currentChallenges: [
      'Rising ingredient costs squeezing margins',
      'Difficulty hiring and retaining skilled bakers',
      'Limited marketing budget and social media presence',
      'No formal financial forecasting or budgeting process',
      'Aging point-of-sale system needs replacement'
    ],
    competitors: [
      { name: 'Great Harvest Bread Company', website: 'www.greatharvest.com', isDirect: true },
      { name: 'Quacks 43rd Street Bakery', isDirect: true },
      { name: 'Starbucks', website: 'www.starbucks.com', isDirect: false }
    ]
  },
  responses: [
    // STRATEGY (STR) - LQ001-LQ004
    { questionId: 'LQ001', value: 3 },           // Competitive differentiators understanding
    { questionId: 'LQ002', value: 14.5 },         // Sales growth % past year
    { questionId: 'LQ003', value: 2 },             // Documented business goals
    { questionId: 'LQ004', value: 15 },            // Target sales growth %

    // SALES (SAL) - LQ005-LQ010
    { questionId: 'LQ005', value: 25 },            // B2B % (75% B2C)
    { questionId: 'LQ006', value: 1 },             // Days to close a sale
    { questionId: 'LQ007', value: 18.50 },         // Average order size $
    { questionId: 'LQ008', value: 65 },            // % returning customers
    { questionId: 'LQ009', value: 70 },            // Lead-to-sale conversion %
    { questionId: 'LQ010', value: 2, followUpResponse: 'We don\'t have a formal upselling strategy. Staff sometimes suggest add-ons but it\'s not consistent.' },

    // MARKETING (MKT) - LQ011-LQ015
    { questionId: 'LQ011', value: 2, followUpResponse: 'Instagram and word-of-mouth referrals' },
    { questionId: 'LQ012', value: 2 },             // Know best customers
    { questionId: 'LQ013', value: 45 },            // Customer acquisition cost $
    { questionId: 'LQ014', value: 120 },           // Marketing ROI %
    { questionId: 'LQ015', value: 850 },           // Customer lifetime value $

    // CUSTOMER EXPERIENCE (CXP) - LQ016-LQ018
    { questionId: 'LQ016', value: 4 },             // Customer satisfaction
    { questionId: 'LQ017', value: 4 },             // Net Promoter Score
    { questionId: 'LQ018', value: 3, followUpResponse: 'Usually within a few hours on social media, same day in person' },

    // OPERATIONS (OPS) - LQ019-LQ022
    { questionId: 'LQ019', value: 2 },             // Workflow documentation
    { questionId: 'LQ020', value: 3, followUpResponse: 'Seasonal demand spikes cause delays. Need better production scheduling.' },
    { questionId: 'LQ021', value: 3 },             // Operational efficiency
    { questionId: 'LQ022', value: 72 },            // Resource utilization %

    // FINANCIALS (FIN) - LQ023-LQ029
    { questionId: 'LQ023', value: 35000 },         // Cash available vs 30-day expenses
    { questionId: 'LQ024', value: 2.5 },           // Cash runway months
    { questionId: 'LQ025', value: 62 },            // Gross profit margin %
    { questionId: 'LQ026', value: 3 },             // Burn rate health
    { questionId: 'LQ027', value: 3200 },          // Monthly debt payment $
    { questionId: 'LQ028', value: 2 },             // Financial tracking/planning
    { questionId: 'LQ029', value: 2, followUpResponse: 'We track revenue weekly but don\'t formally forecast. Worried about ingredient cost increases.' },

    // HUMAN RESOURCES (HRS) - LQ030-LQ032
    { questionId: 'LQ030', value: 3 },             // Company values/culture
    { questionId: 'LQ031', value: 2 },             // Employee training
    { questionId: 'LQ032', value: 2, followUpResponse: 'Lost 2 bakers last year. Hard to compete with larger chains on pay.' },

    // LEADERSHIP & GOVERNANCE (LDG) - LQ033-LQ034
    { questionId: 'LQ033', value: 3 },             // Strategic communication
    { questionId: 'LQ034', value: 4 },             // Trust and values

    // TECHNOLOGY & INNOVATION (TIN) - LQ035-LQ038
    { questionId: 'LQ035', value: 8500 },          // Annual tech spend $
    { questionId: 'LQ036', value: 3 },             // Innovation pursuit
    { questionId: 'LQ037', value: 2 },             // Tech adoption
    { questionId: 'LQ038', value: 1 },             // Automation usage

    // IT & DATA SECURITY (ITD) - LQ039-LQ040
    { questionId: 'LQ039', value: 2 },             // Cybersecurity preparedness
    { questionId: 'LQ040', value: 2 },             // Data backup/recovery

    // RISK MANAGEMENT (RMS) - LQ041-LQ043
    { questionId: 'LQ041', value: 2 },             // Backup plans for risks
    { questionId: 'LQ042', value: 2 },             // Financial setback preparedness
    { questionId: 'LQ043', value: 2, followUpResponse: 'No formal business continuity plan. Biggest worry is losing key staff or a kitchen fire.' },

    // COMPLIANCE (CMP) - LQ044-LQ045
    { questionId: 'LQ044', value: 4 },             // Compliance adherence
    { questionId: 'LQ045', value: 4 }              // Licenses/permits current
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// RUN PIPELINE
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  BizHealth.ai LIL Pipeline Test Run');
  console.log('  Company: Sunrise Bakery & Café');
  console.log(`  Output: ${outputDir}`);
  console.log('═══════════════════════════════════════════════════════════════\n');

  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  // Save input data for reference
  fs.writeFileSync(
    path.join(outputDir, 'input-data.json'),
    JSON.stringify(sampleInput, null, 2)
  );

  const startTime = Date.now();

  try {
    const result = await runLILPipeline({
      inputData: sampleInput,
      outputDir,
      onProgress: (state) => {
        console.log(`[${state.currentPhase}] Status: ${state.status} | Tokens: ${state.metrics.totalTokensUsed} | Time: ${(state.metrics.executionTimeMs / 1000).toFixed(1)}s`);
      }
    });

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    if (result.success) {
      console.log('\n═══════════════════════════════════════════════════════════════');
      console.log('  PIPELINE COMPLETED SUCCESSFULLY');
      console.log(`  Time: ${elapsed}s`);
      console.log(`  Total Tokens: ${result.state.metrics.totalTokensUsed}`);
      console.log(`  Est. Cost: $${result.state.metrics.estimatedCost.toFixed(2)}`);
      console.log(`  Reports Generated: ${result.reports?.reports.length || 0}`);
      console.log(`  Total Pages: ${result.reports?.metadata.totalPages || 0}`);
      console.log('═══════════════════════════════════════════════════════════════\n');

      // List generated reports
      if (result.reports) {
        console.log('Generated Reports:');
        for (const report of result.reports.reports) {
          console.log(`  - ${report.reportType}: ${report.title} (${report.pageCount} pages, ${report.sections.length} sections)`);
        }
      }

      // Save pipeline state
      fs.writeFileSync(
        path.join(outputDir, 'pipeline-state.json'),
        JSON.stringify(result.state, null, 2)
      );

    } else {
      console.error('\n❌ PIPELINE FAILED');
      console.error(`   Error: ${result.error}`);
      console.error(`   Phase: ${result.state.currentPhase}`);
      console.error(`   Time: ${elapsed}s`);

      // Save error state
      fs.writeFileSync(
        path.join(outputDir, 'pipeline-error.json'),
        JSON.stringify(result, null, 2)
      );
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ UNHANDLED ERROR:', error);
    process.exit(1);
  }
}

main();
