export interface GlossaryTerm {
  id: number;
  term: string;
  category: string;
  definition: string;
  formula?: string;
  whyImportant: string;
  smbApplication: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  // Financial Metrics (11 terms)
  {
    id: 1,
    term: "Revenue",
    category: "Financial Metrics",
    definition: "Total income generated from business activities, including sales of goods or services before any expenses are deducted.",
    formula: "Total Sales × Price per Unit (or sum of all income streams)",
    whyImportant: "Revenue is the top-line metric that indicates market demand and business growth potential. It serves as the foundation for all profitability calculations.",
    smbApplication: "A retail store with $500K annual revenue tracks monthly trends to identify seasonal patterns and plan inventory purchases accordingly."
  },
  {
    id: 2,
    term: "Gross Profit Margin",
    category: "Financial Metrics",
    definition: "Profitability after subtracting cost of goods sold (COGS) from revenue, expressed as a percentage.",
    formula: "((Revenue - COGS) / Revenue) × 100",
    whyImportant: "Shows production efficiency and pricing power. Higher margins indicate better cost control and competitive advantages.",
    smbApplication: "A manufacturing SMB with 40% margin has healthy efficiency; dropping to 20% signals need to review supplier costs or pricing strategy."
  },
  {
    id: 3,
    term: "Net Profit Margin",
    category: "Financial Metrics",
    definition: "Overall profitability after deducting all expenses, taxes, and interest from revenue.",
    formula: "(Net Income / Revenue) × 100",
    whyImportant: "Reveals actual profitability after all costs. Essential for understanding true financial health.",
    smbApplication: "A service business with 15% net margin ($75K profit on $500K revenue) has healthy operations allowing for reinvestment and growth."
  },
  {
    id: 4,
    term: "EBITDA",
    category: "Financial Metrics",
    definition: "Earnings Before Interest, Taxes, Depreciation, and Amortization - measures operating performance.",
    formula: "Net Income + Interest + Taxes + Depreciation + Amortization",
    whyImportant: "Provides clear picture of operational profitability without capital structure or accounting decisions impact.",
    smbApplication: "Tech startup with $200K EBITDA on $1M revenue shows 20% operating efficiency, attractive to investors."
  },
  {
    id: 5,
    term: "Burn Rate",
    category: "Financial Metrics",
    definition: "Rate at which company spends cash reserves, typically measured monthly.",
    formula: "Monthly Operating Expenses - Monthly Revenue",
    whyImportant: "Critical for startups and growing companies to understand how long they can operate before needing additional funding.",
    smbApplication: "Startup burning $50K monthly with $300K in bank has 6-month runway to reach profitability or secure funding."
  },
  {
    id: 6,
    term: "Runway (Cash Runway)",
    category: "Financial Metrics",
    definition: "Number of months company can operate before running out of cash.",
    formula: "Cash on Hand / Monthly Burn Rate",
    whyImportant: "Determines urgency for fundraising or profitability. Less than 6 months requires immediate action.",
    smbApplication: "Company with $180K cash and $30K monthly burn has 6-month runway to pivot strategy or secure investment."
  },
  {
    id: 7,
    term: "Break-Even Point",
    category: "Financial Metrics",
    definition: "Sales level where total revenue equals total costs, resulting in zero profit or loss.",
    formula: "Fixed Costs / (Price per Unit - Variable Cost per Unit)",
    whyImportant: "Critical milestone showing when business becomes self-sustaining and starts generating profit.",
    smbApplication: "Restaurant with $15K monthly fixed costs and $8 profit per meal needs to sell 1,875 meals monthly to break even."
  },
  {
    id: 8,
    term: "Operating Margin",
    category: "Financial Metrics",
    definition: "Profitability from core business operations before interest and taxes.",
    formula: "(Operating Income / Revenue) × 100",
    whyImportant: "Shows efficiency of core business operations independent of financial and tax considerations.",
    smbApplication: "Software company with 25% operating margin demonstrates strong pricing power and operational efficiency."
  },
  {
    id: 9,
    term: "Return on Assets (ROA)",
    category: "Financial Metrics",
    definition: "Measure of how efficiently company uses assets to generate profit.",
    formula: "(Net Income / Total Assets) × 100",
    whyImportant: "Indicates management effectiveness at deploying assets. Higher ROA means better asset utilization.",
    smbApplication: "Manufacturing firm with 12% ROA efficiently converts $1M in equipment into $120K annual profit."
  },
  {
    id: 10,
    term: "Return on Equity (ROE)",
    category: "Financial Metrics",
    definition: "Profitability relative to shareholder equity.",
    formula: "(Net Income / Shareholder Equity) × 100",
    whyImportant: "Shows return to investors on their investment. Key metric for evaluating management performance.",
    smbApplication: "Business with $100K equity generating $20K profit has 20% ROE, indicating strong returns to owners."
  },
  {
    id: 11,
    term: "Return on Investment (ROI)",
    category: "Financial Metrics",
    definition: "Gain or loss from investment relative to cost.",
    formula: "((Gain from Investment - Cost of Investment) / Cost of Investment) × 100",
    whyImportant: "Universal metric for evaluating investment decisions across all business areas.",
    smbApplication: "$10K marketing campaign generating $40K revenue delivers 300% ROI, justifying budget expansion."
  },

  // Customer Metrics (13 terms)
  {
    id: 12,
    term: "Customer Lifetime Value (CLV/LTV)",
    category: "Customer Metrics",
    definition: "Total revenue expected from a customer throughout entire relationship with company.",
    formula: "Average Purchase Value × Purchase Frequency × Average Customer Lifespan",
    whyImportant: "Determines how much to spend on acquisition and retention. Higher LTV justifies higher marketing spend.",
    smbApplication: "Subscription box with $50 monthly value and 24-month retention has $1,200 LTV, informing acquisition budget (<$400)."
  },
  {
    id: 13,
    term: "Customer Acquisition Cost (CAC)",
    category: "Customer Metrics",
    definition: "Total cost of acquiring new customer, including all marketing and sales expenses.",
    formula: "Total Marketing & Sales Costs / Number of New Customers",
    whyImportant: "Essential for determining marketing efficiency. Must be significantly lower than LTV for sustainable growth.",
    smbApplication: "Gym spending $3K monthly on ads and acquiring 15 members has $200 CAC; with $1,500 member LTV, shows healthy 7.5:1 ratio."
  },
  {
    id: 14,
    term: "LTV:CAC Ratio",
    category: "Customer Metrics",
    definition: "Relationship between customer lifetime value and acquisition cost.",
    formula: "Customer Lifetime Value / Customer Acquisition Cost",
    whyImportant: "3:1 ratio is healthy; below 1:1 unsustainable. Indicates unit economics health.",
    smbApplication: "SaaS with $3,600 LTV and $1,200 CAC has 3:1 ratio, showing sustainable growth model."
  },
  {
    id: 15,
    term: "Churn Rate",
    category: "Customer Metrics",
    definition: "Percentage of customers who stop doing business during a specific period.",
    formula: "(Customers Lost / Customers at Start) × 100",
    whyImportant: "Indicates customer satisfaction and business stability. High churn erodes revenue growth.",
    smbApplication: "Software service losing 5 of 100 monthly customers (5% churn) must acquire 5+ new ones just to maintain revenue."
  },
  {
    id: 16,
    term: "Retention Rate",
    category: "Customer Metrics",
    definition: "Percentage of customers who continue doing business over time period.",
    formula: "((Customers at End - New Customers) / Customers at Start) × 100",
    whyImportant: "Higher retention is cheaper than acquisition. 5% retention increase can boost profits 25-95%.",
    smbApplication: "Membership business retaining 90% annually has strong foundation for predictable revenue growth."
  },
  {
    id: 17,
    term: "Net Promoter Score (NPS)",
    category: "Customer Metrics",
    definition: "Customer loyalty metric based on likelihood to recommend.",
    formula: "% Promoters (9-10) - % Detractors (0-6)",
    whyImportant: "Predicts growth potential. Scores above 50 are excellent; below 0 indicates serious problems.",
    smbApplication: "Restaurant with NPS of 65 has strong word-of-mouth growth potential vs competitor at 20."
  },
  {
    id: 18,
    term: "Customer Satisfaction Score (CSAT)",
    category: "Customer Metrics",
    definition: "Measure of customer satisfaction with product, service, or experience.",
    formula: "(Number of Satisfied Customers / Total Responses) × 100",
    whyImportant: "Direct feedback on meeting customer expectations. Correlates with retention and referrals.",
    smbApplication: "E-commerce site with 85% CSAT identifies 15% dissatisfied customers for improvement focus."
  },
  {
    id: 19,
    term: "Customer Effort Score (CES)",
    category: "Customer Metrics",
    definition: "Measures ease of customer interaction or problem resolution.",
    formula: "Average of customer effort ratings (typically 1-7 scale)",
    whyImportant: "Lower effort drives higher loyalty. Easier experiences increase repeat business.",
    smbApplication: "Software with one-click support averaging 2/7 effort vs competitor at 5/7 sees higher retention."
  },
  {
    id: 20,
    term: "Conversion Rate",
    category: "Customer Metrics",
    definition: "Percentage of potential customers completing desired action.",
    formula: "(Number of Conversions / Total Visitors) × 100",
    whyImportant: "Measures marketing and sales effectiveness. Higher conversion means better marketing ROI.",
    smbApplication: "Online store with 2% rate (20 purchases per 1,000 visitors) can double revenue by improving to 4% without more traffic."
  },
  {
    id: 21,
    term: "Lead-to-Customer Rate",
    category: "Customer Metrics",
    definition: "Percentage of leads that become paying customers.",
    formula: "(New Customers / Total Leads) × 100",
    whyImportant: "Indicates sales process efficiency and lead quality. Highlights conversion bottlenecks.",
    smbApplication: "B2B firm converting 10% of 200 monthly leads gains 20 customers; improving to 15% adds 10 more without new leads."
  },
  {
    id: 22,
    term: "Awareness Conversion Rate",
    category: "Customer Metrics",
    definition: "Percentage of aware prospects that take next step in buyer journey.",
    formula: "(Actions Taken / Total Aware Prospects) × 100",
    whyImportant: "Measures top-of-funnel effectiveness. Identifies if awareness campaigns drive action.",
    smbApplication: "Brand campaign reaching 10,000 people with 5% taking action (500) validates messaging effectiveness."
  },
  {
    id: 23,
    term: "First Contact Resolution (FCR)",
    category: "Customer Metrics",
    definition: "Percentage of customer issues resolved on first interaction.",
    formula: "(Issues Resolved First Contact / Total Issues) × 100",
    whyImportant: "High FCR reduces costs, increases satisfaction, and improves efficiency.",
    smbApplication: "Support team with 80% FCR vs 50% handles more volume with same staff while improving satisfaction."
  },
  {
    id: 24,
    term: "Average Ticket Size",
    category: "Customer Metrics",
    definition: "Average amount spent per transaction or purchase.",
    formula: "Total Revenue / Number of Transactions",
    whyImportant: "Indicates pricing strategy effectiveness and upselling success. Small increases dramatically impact revenue.",
    smbApplication: "Retail store increasing average ticket from $45 to $55 adds $50K annual revenue with same traffic."
  },

  // Sales & Marketing (16 terms)
  {
    id: 25,
    term: "Sales Pipeline",
    category: "Sales & Marketing",
    definition: "Visual representation of prospects at various stages of sales process.",
    formula: "Not applicable (process management tool)",
    whyImportant: "Provides visibility into future revenue and identifies process bottlenecks.",
    smbApplication: "B2B company tracks 50 prospects: 20 discovery, 15 proposal, 10 negotiation, 5 closing this month."
  },
  {
    id: 26,
    term: "Pipeline Velocity",
    category: "Sales & Marketing",
    definition: "Speed at which leads move through sales pipeline to become customers.",
    formula: "(Number of Opportunities × Average Deal Size × Win Rate) / Sales Cycle Length",
    whyImportant: "Measures sales efficiency and forecasts revenue generation speed.",
    smbApplication: "Reducing 60-day sales cycle to 45 days increases quarterly revenue by 33% with same pipeline."
  },
  {
    id: 27,
    term: "Close Rate",
    category: "Sales & Marketing",
    definition: "Percentage of opportunities that convert to closed deals.",
    formula: "(Closed Won Deals / Total Opportunities) × 100",
    whyImportant: "Indicates sales effectiveness and deal quality. Higher rates mean better qualification or selling.",
    smbApplication: "Sales team improving close rate from 20% to 30% closes 15 vs 10 deals monthly from 50 opportunities."
  },
  {
    id: 28,
    term: "Sales Cycle",
    category: "Sales & Marketing",
    definition: "Average time from first contact to closed deal.",
    formula: "Total Days for All Deals / Number of Deals",
    whyImportant: "Shorter cycles mean faster revenue and lower costs. Identifies process inefficiencies.",
    smbApplication: "Reducing 90-day B2B cycle to 60 days through process improvements generates revenue 33% faster."
  },
  {
    id: 29,
    term: "Sales Velocity",
    category: "Sales & Marketing",
    definition: "Rate at which deals move through pipeline and generate revenue.",
    formula: "(Number of Opportunities × Deal Value × Win Rate) / Sales Cycle Length (days)",
    whyImportant: "Comprehensive metric showing revenue generation speed and efficiency.",
    smbApplication: "100 opps × $5K × 25% win rate / 30 days = $4,167 daily velocity or $125K monthly."
  },
  {
    id: 30,
    term: "Marketing Qualified Leads (MQLs)",
    category: "Sales & Marketing",
    definition: "Leads deemed more likely to become customers based on engagement.",
    formula: "Not applicable (qualification criteria)",
    whyImportant: "Focuses sales efforts on higher-quality prospects, improving efficiency.",
    smbApplication: "Marketing generates 200 leads monthly; 50 MQLs based on criteria convert at 20% vs 5% for unqualified."
  },
  {
    id: 31,
    term: "Sales Qualified Leads (SQLs)",
    category: "Sales & Marketing",
    definition: "MQLs that sales team has vetted and accepted for active pursuit.",
    formula: "Not applicable (qualification criteria)",
    whyImportant: "Ensures sales focuses on ready-to-buy prospects, maximizing conversion rates.",
    smbApplication: "Of 50 MQLs, 25 SQLs have budget and timeline, converting at 40% vs 20% for all MQLs."
  },
  {
    id: 32,
    term: "Cost per Lead (CPL)",
    category: "Sales & Marketing",
    definition: "Average cost to generate one lead from marketing activities.",
    formula: "Total Marketing Spend / Number of Leads Generated",
    whyImportant: "Determines marketing efficiency and helps optimize channel allocation.",
    smbApplication: "$5K monthly spend generating 100 leads = $50 CPL; reducing to $40 saves $1K monthly."
  },
  {
    id: 33,
    term: "Return on Marketing Investment (ROMI)",
    category: "Sales & Marketing",
    definition: "Revenue generated from marketing activities relative to marketing spend.",
    formula: "((Marketing Revenue - Marketing Cost) / Marketing Cost) × 100",
    whyImportant: "Demonstrates marketing contribution to bottom line and justifies budget allocation.",
    smbApplication: "$10K marketing spend generating $40K in revenue shows 300% ROMI, strong justification for increased budget."
  },
  {
    id: 34,
    term: "Return on Ad Spend (ROAS)",
    category: "Sales & Marketing",
    definition: "Revenue generated per dollar spent on advertising.",
    formula: "Revenue from Ads / Cost of Ads",
    whyImportant: "Measures advertising effectiveness. 4:1 is generally healthy; below 2:1 needs optimization.",
    smbApplication: "$1K ad spend generating $5K revenue = 5:1 ROAS, indicating highly effective campaign."
  },
  {
    id: 35,
    term: "Click-Through Rate (CTR)",
    category: "Sales & Marketing",
    definition: "Percentage of people who click on link, ad, or email.",
    formula: "(Number of Clicks / Number of Impressions) × 100",
    whyImportant: "Measures ad relevance and appeal. Higher CTR lowers costs in paid advertising.",
    smbApplication: "Email with 3% CTR (300 clicks from 10,000 sends) vs 1% generates 3x website traffic."
  },
  {
    id: 36,
    term: "Engagement Rate",
    category: "Sales & Marketing",
    definition: "Level of interaction with content across platforms.",
    formula: "(Total Engagements / Total Followers or Reach) × 100",
    whyImportant: "Shows content resonance and audience connection. Higher engagement indicates relevant messaging.",
    smbApplication: "Social post with 5% engagement (500 interactions from 10,000 followers) outperforms 1% industry average."
  },
  {
    id: 37,
    term: "CAC Payback Period",
    category: "Sales & Marketing",
    definition: "Time required to recover customer acquisition cost.",
    formula: "Customer Acquisition Cost / (Monthly Revenue per Customer × Gross Margin %)",
    whyImportant: "Shows investment recovery speed. Under 12 months is healthy for most businesses.",
    smbApplication: "$600 CAC with $100 monthly revenue at 50% margin = 12-month payback, acceptable for SaaS."
  },
  {
    id: 38,
    term: "Lead Scoring",
    category: "Sales & Marketing",
    definition: "Ranking system assigning values to leads based on behavior and demographics.",
    formula: "Not applicable (scoring methodology)",
    whyImportant: "Prioritizes sales efforts on highest-probability prospects, improving efficiency.",
    smbApplication: "Leads scoring 80+ convert at 40% vs 10% for those under 50, guiding resource allocation."
  },
  {
    id: 39,
    term: "A/B Testing",
    category: "Sales & Marketing",
    definition: "Comparing two versions to determine which performs better.",
    formula: "Not applicable (testing methodology)",
    whyImportant: "Data-driven optimization improves conversion rates and ROI systematically.",
    smbApplication: "Landing page version B with different headline converts 4% vs version A's 2%, doubling results."
  },
  {
    id: 40,
    term: "Upselling",
    category: "Sales & Marketing",
    definition: "Encouraging customers to purchase premium or upgraded version.",
    formula: "Not applicable (sales technique)",
    whyImportant: "Increases revenue per customer without acquisition costs. 20% more profitable than new customer sales.",
    smbApplication: "Software offering premium tier at $99 vs basic $49 to 30% of customers adds $15K monthly recurring revenue."
  },
  {
    id: 41,
    term: "Cross-Selling",
    category: "Sales & Marketing",
    definition: "Offering complementary products or services to existing customers.",
    formula: "Not applicable (sales technique)",
    whyImportant: "Increases customer value and strengthens relationships. Easier than acquiring new customers.",
    smbApplication: "Gym selling nutrition plans to 25% of 200 members at $50/month adds $2,500 monthly revenue."
  },

  // Operational Metrics (8 terms)
  {
    id: 42,
    term: "Employee Productivity",
    category: "Operational Metrics",
    definition: "Output generated per employee, measuring workforce efficiency.",
    formula: "Revenue per Employee or Units Produced per Employee",
    whyImportant: "Indicates operational efficiency and helps benchmark against industry standards.",
    smbApplication: "Manufacturing SMB generating $200K revenue per employee vs $150K industry average shows strong productivity."
  },
  {
    id: 43,
    term: "Capacity Utilization",
    category: "Operational Metrics",
    definition: "Percentage of total capacity actually being used in operations.",
    formula: "(Actual Output / Maximum Possible Output) × 100",
    whyImportant: "Reveals operational efficiency and expansion needs. Low utilization signals waste; high signals capacity constraints.",
    smbApplication: "Factory running at 60% capacity has room for growth; at 95% needs expansion to fulfill new orders."
  },
  {
    id: 44,
    term: "Cycle Time",
    category: "Operational Metrics",
    definition: "Total time from start to completion of a process or product.",
    formula: "Total Production Time / Number of Units Produced",
    whyImportant: "Identifies bottlenecks and improvement opportunities. Shorter cycles mean faster delivery and lower costs.",
    smbApplication: "Reducing manufacturing cycle from 10 to 7 days enables 50% more monthly production with same resources."
  },
  {
    id: 45,
    term: "On-Time Delivery Rate",
    category: "Operational Metrics",
    definition: "Percentage of orders delivered by promised date.",
    formula: "(On-Time Deliveries / Total Deliveries) × 100",
    whyImportant: "Critical for customer satisfaction and retention. Below 95% damages reputation and relationships.",
    smbApplication: "Improving from 85% to 95% on-time delivery reduces complaints by 60% and increases repeat orders."
  },
  {
    id: 46,
    term: "Defect/Error Rate",
    category: "Operational Metrics",
    definition: "Percentage of products or services with quality issues.",
    formula: "(Number of Defects / Total Units Produced) × 100",
    whyImportant: "Indicates quality control effectiveness. Lower rates reduce costs and improve customer satisfaction.",
    smbApplication: "Reducing defect rate from 5% to 2% on 1,000 monthly units saves $15K in rework and returns."
  },
  {
    id: 47,
    term: "Inventory Turnover",
    category: "Operational Metrics",
    definition: "How many times inventory is sold and replaced over period.",
    formula: "Cost of Goods Sold / Average Inventory Value",
    whyImportant: "Higher turnover means efficient inventory management and less capital tied up.",
    smbApplication: "Retailer improving turnover from 4x to 6x annually frees $50K in cash for growth investments."
  },
  {
    id: 48,
    term: "Quality Control",
    category: "Operational Metrics",
    definition: "Process ensuring products/services meet specified requirements.",
    formula: "Not applicable (process framework)",
    whyImportant: "Prevents defects, reduces costs, maintains reputation, and ensures customer satisfaction.",
    smbApplication: "Manufacturing implementing QC checkpoints reduces customer returns from 8% to 2%, saving $40K annually."
  },
  {
    id: 49,
    term: "Standard Operating Procedures (SOPs)",
    category: "Operational Metrics",
    definition: "Documented step-by-step instructions for routine operations.",
    formula: "Not applicable (documentation framework)",
    whyImportant: "Ensures consistency, facilitates training, reduces errors, and enables scaling.",
    smbApplication: "Restaurant with SOPs reduces new employee training from 6 weeks to 3, cutting costs 50%."
  },

  // Financial Management (12 terms)
  {
    id: 50,
    term: "Current Ratio",
    category: "Financial Management",
    definition: "Company's ability to pay short-term obligations with current assets.",
    formula: "Current Assets / Current Liabilities",
    whyImportant: "Measures short-term liquidity and financial health. Ratio above 1.5 generally indicates good liquidity.",
    smbApplication: "SMB with $150K current assets and $75K current liabilities (2:1 ratio) can comfortably meet short-term obligations."
  },
  {
    id: 51,
    term: "Quick Ratio (Acid Test)",
    category: "Financial Management",
    definition: "Ability to meet short-term obligations with most liquid assets.",
    formula: "(Current Assets - Inventory) / Current Liabilities",
    whyImportant: "More conservative than current ratio. Above 1.0 indicates strong immediate liquidity.",
    smbApplication: "Business with 1.5 quick ratio can cover obligations even if inventory doesn't sell quickly."
  },
  {
    id: 52,
    term: "Working Capital",
    category: "Financial Management",
    definition: "Funds available for day-to-day operations.",
    formula: "Current Assets - Current Liabilities",
    whyImportant: "Indicates operational liquidity and ability to handle unexpected expenses or opportunities.",
    smbApplication: "SMB with $100K working capital can manage payroll, supplies, and operational needs during slow revenue periods."
  },
  {
    id: 53,
    term: "Operating Cash Flow",
    category: "Financial Management",
    definition: "Cash generated from normal business operations.",
    formula: "Net Income + Depreciation + Changes in Working Capital",
    whyImportant: "Shows ability to generate cash to fund operations, pay debts, and invest in growth.",
    smbApplication: "Business with positive $75K operating cash flow can invest in growth without external financing."
  },
  {
    id: 54,
    term: "Accounts Receivable Days (DSO)",
    category: "Financial Management",
    definition: "Average days to collect payment after sale.",
    formula: "(Accounts Receivable / Total Credit Sales) × Number of Days",
    whyImportant: "Lower DSO improves cash flow. Industry standard is 30-45 days; above 60 signals collection issues.",
    smbApplication: "Reducing DSO from 60 to 40 days frees $100K in cash for 30-day billing cycle on $1.8M annual revenue."
  },
  {
    id: 55,
    term: "Accounts Payable Days (DPO)",
    category: "Financial Management",
    definition: "Average days taken to pay suppliers.",
    formula: "(Accounts Payable / Cost of Goods Sold) × Number of Days",
    whyImportant: "Longer DPO improves cash flow without damaging supplier relationships. Balance with payment terms.",
    smbApplication: "Extending DPO from 30 to 45 days on $500K annual COGS keeps $20K additional cash on hand."
  },
  {
    id: 56,
    term: "Debt-to-Equity Ratio",
    category: "Financial Management",
    definition: "Proportion of debt financing relative to equity financing.",
    formula: "Total Liabilities / Shareholder Equity",
    whyImportant: "Indicates financial leverage and risk. Below 2:1 is generally healthy for SMBs.",
    smbApplication: "Business with $200K debt and $100K equity (2:1 ratio) has moderate leverage; above 3:1 signals high risk."
  },
  {
    id: 57,
    term: "Cost of Goods Sold (COGS)",
    category: "Financial Management",
    definition: "Direct costs of producing goods or services sold.",
    formula: "Beginning Inventory + Purchases - Ending Inventory",
    whyImportant: "Essential for calculating gross profit and determining pricing strategies.",
    smbApplication: "Manufacturer with $300K revenue and $180K COGS has 40% gross margin, informing pricing and cost control."
  },
  {
    id: 58,
    term: "Fixed Costs",
    category: "Financial Management",
    definition: "Expenses that don't change with production or sales volume.",
    formula: "Not applicable (expense category)",
    whyImportant: "Understanding fixed costs is critical for break-even analysis and pricing strategies.",
    smbApplication: "Business with $20K monthly fixed costs (rent, salaries) must cover these before generating profit."
  },
  {
    id: 59,
    term: "Variable Costs",
    category: "Financial Management",
    definition: "Expenses that change proportionally with production or sales volume.",
    formula: "Not applicable (expense category)",
    whyImportant: "Lower variable costs per unit improve profit margins and competitive positioning.",
    smbApplication: "Product with $10 variable cost sold at $25 generates $15 contribution margin per unit."
  },
  {
    id: 60,
    term: "Overhead",
    category: "Financial Management",
    definition: "Indirect costs of running business not directly tied to production.",
    formula: "Total Indirect Costs (rent, utilities, admin, etc.)",
    whyImportant: "Managing overhead is crucial for profitability. Reducing overhead increases bottom line directly.",
    smbApplication: "Reducing monthly overhead from $30K to $25K adds $60K annual profit without changing sales."
  },
  {
    id: 61,
    term: "Cash Flow Forecast",
    category: "Financial Management",
    definition: "Projection of future cash inflows and outflows.",
    formula: "Beginning Cash + Expected Inflows - Expected Outflows",
    whyImportant: "Prevents cash shortages, enables strategic planning, and identifies financing needs.",
    smbApplication: "Forecasting shows $50K shortfall in 3 months, allowing time to secure line of credit proactively."
  },

  // Strategic & Governance (10 terms)
  {
    id: 62,
    term: "KPI (Key Performance Indicator)",
    category: "Strategic & Governance",
    definition: "Measurable values showing progress toward business objectives.",
    formula: "Varies by specific KPI",
    whyImportant: "Aligns team efforts and enables data-driven decision-making.",
    smbApplication: "Retail store tracking foot traffic, conversion rate, and average sale as KPIs identifies improvement opportunities."
  },
  {
    id: 63,
    term: "SWOT Analysis",
    category: "Strategic & Governance",
    definition: "Framework analyzing Strengths, Weaknesses, Opportunities, and Threats.",
    formula: "Not applicable (strategic framework)",
    whyImportant: "Provides comprehensive view for strategic planning and decision-making.",
    smbApplication: "Restaurant SWOT reveals opportunity in delivery market and weakness in online presence, guiding investment priorities."
  },
  {
    id: 64,
    term: "Value Proposition",
    category: "Strategic & Governance",
    definition: "Clear statement of benefits a product or service provides to customers.",
    formula: "Not applicable (strategic statement)",
    whyImportant: "Differentiates from competitors and guides marketing messaging. Essential for customer acquisition.",
    smbApplication: "SaaS offering '50% faster project completion' gives prospects clear benefit vs generic 'project management software'."
  },
  {
    id: 65,
    term: "Competitive Advantage",
    category: "Strategic & Governance",
    definition: "Unique attributes that give company edge over competitors.",
    formula: "Not applicable (strategic concept)",
    whyImportant: "Sustainable competitive advantages protect market position and enable premium pricing.",
    smbApplication: "Local bakery's proprietary recipes create competitive advantage attracting customers willing to pay 20% premium."
  },
  {
    id: 66,
    term: "Market Segmentation",
    category: "Strategic & Governance",
    definition: "Dividing target market into distinct groups with similar needs.",
    formula: "Not applicable (strategic approach)",
    whyImportant: "Enables targeted marketing, better product fit, and higher conversion rates.",
    smbApplication: "Fitness center segments by age (youth, adults, seniors) to tailor programs and marketing, increasing memberships 30%."
  },
  {
    id: 67,
    term: "Benchmarking",
    category: "Strategic & Governance",
    definition: "Comparing performance metrics against industry standards or competitors.",
    formula: "Not applicable (comparison methodology)",
    whyImportant: "Identifies performance gaps and improvement opportunities. Sets realistic goals.",
    smbApplication: "Retailer benchmarking 1.5% profit margin against 3% industry average identifies need for cost optimization."
  },
  {
    id: 68,
    term: "Break-Even Analysis",
    category: "Strategic & Governance",
    definition: "Determining point where total revenue equals total costs.",
    formula: "Fixed Costs / (Price - Variable Cost per Unit)",
    whyImportant: "Essential for pricing decisions and understanding minimum sales requirements.",
    smbApplication: "New product launch requires 500 unit sales to break even, informing go-to-market strategy."
  },
  {
    id: 69,
    term: "Balance Sheet",
    category: "Strategic & Governance",
    definition: "Financial statement showing assets, liabilities, and equity at specific point.",
    formula: "Assets = Liabilities + Equity",
    whyImportant: "Snapshot of financial position. Essential for loan applications and investor relations.",
    smbApplication: "Strong balance sheet with $500K assets vs $200K liabilities enables favorable financing terms."
  },
  {
    id: 70,
    term: "Income Statement (P&L)",
    category: "Strategic & Governance",
    definition: "Financial statement showing revenues, expenses, and profit over period.",
    formula: "Revenue - Expenses = Net Income",
    whyImportant: "Shows profitability and operational efficiency. Key document for stakeholders.",
    smbApplication: "Monthly P&L showing declining margins triggers investigation into cost increases or pricing pressure."
  },
  {
    id: 71,
    term: "Due Diligence",
    category: "Strategic & Governance",
    definition: "Comprehensive investigation of business before transaction or investment.",
    formula: "Not applicable (investigation process)",
    whyImportant: "Identifies risks, validates assumptions, and informs negotiation. Protects against costly mistakes.",
    smbApplication: "Buyer's due diligence reveals undisclosed liabilities, enabling price renegotiation saving $50K."
  },

  // Growth & Scaling (8 terms)
  {
    id: 72,
    term: "Scalability",
    category: "Growth & Scaling",
    definition: "Ability to grow revenue without proportional cost increases.",
    formula: "Not applicable (business characteristic)",
    whyImportant: "Scalable models achieve higher margins as they grow. Essential for investor attraction.",
    smbApplication: "Software business serves 1,000 vs 100 customers with only 20% more costs, demonstrating scalability."
  },
  {
    id: 73,
    term: "Economies of Scale",
    category: "Growth & Scaling",
    definition: "Cost advantages gained from increased production volume.",
    formula: "Not applicable (economic principle)",
    whyImportant: "Larger volumes reduce per-unit costs, improving margins and competitive positioning.",
    smbApplication: "Manufacturing order of 10,000 units costs $8 each vs $12 for 1,000 units, enabling competitive pricing."
  },
  {
    id: 74,
    term: "Monthly Recurring Revenue (MRR)",
    category: "Growth & Scaling",
    definition: "Predictable revenue generated each month from subscriptions.",
    formula: "Number of Customers × Average Revenue per Customer",
    whyImportant: "Provides revenue predictability and is key metric for subscription businesses.",
    smbApplication: "SaaS with 200 customers at $99/month has $19,800 MRR, enabling accurate forecasting and planning."
  },
  {
    id: 75,
    term: "Annual Recurring Revenue (ARR)",
    category: "Growth & Scaling",
    definition: "Total subscription revenue expected over year.",
    formula: "Monthly Recurring Revenue × 12",
    whyImportant: "Key metric for valuing subscription businesses and planning annual goals.",
    smbApplication: "$50K MRR = $600K ARR, valuing SaaS at 5-10x ARR ($3-6M) for acquisition discussions."
  },
  {
    id: 76,
    term: "Exit Strategy",
    category: "Growth & Scaling",
    definition: "Plan for how owner will eventually leave or sell business.",
    formula: "Not applicable (strategic plan)",
    whyImportant: "Building with exit in mind maximizes value and prepares business for transition.",
    smbApplication: "Owner planning 5-year exit to strategic buyer focuses on professionalizing operations and documenting processes."
  },
  {
    id: 77,
    term: "Franchise",
    category: "Growth & Scaling",
    definition: "Business model allowing others to operate under established brand and systems.",
    formula: "Not applicable (business model)",
    whyImportant: "Enables rapid expansion with lower capital requirements. Franchisees fund growth.",
    smbApplication: "Successful restaurant franchises 10 locations, growing to $5M annual revenue with minimal capital investment."
  },
  {
    id: 78,
    term: "B2B (Business-to-Business)",
    category: "Growth & Scaling",
    definition: "Transactions where businesses sell to other businesses.",
    formula: "Not applicable (business model)",
    whyImportant: "B2B typically involves higher value deals, longer sales cycles, and relationship-based selling.",
    smbApplication: "Software company selling $10K annual licenses to businesses vs $99 to consumers has higher LTV and requires different strategy."
  },
  {
    id: 79,
    term: "B2C (Business-to-Consumer)",
    category: "Growth & Scaling",
    definition: "Transactions where businesses sell directly to end consumers.",
    formula: "Not applicable (business model)",
    whyImportant: "B2C involves volume sales, shorter cycles, and brand-driven marketing.",
    smbApplication: "E-commerce retailer selling $50 products to thousands of consumers focuses on traffic and conversion optimization."
  },

  // Modern Business Practices (10 terms)
  {
    id: 80,
    term: "Digital Transformation",
    category: "Modern Business Practices",
    definition: "Integration of digital technology into all business areas.",
    formula: "Not applicable (strategic initiative)",
    whyImportant: "Essential for competitiveness. Improves efficiency, customer experience, and enables data-driven decisions.",
    smbApplication: "Manufacturer implementing IoT sensors reduces downtime 40% and maintenance costs 25% through predictive analytics."
  },
  {
    id: 81,
    term: "Customer Journey",
    category: "Modern Business Practices",
    definition: "Complete path customer takes from awareness to purchase and beyond.",
    formula: "Not applicable (framework)",
    whyImportant: "Understanding journey reveals optimization opportunities at each touchpoint.",
    smbApplication: "Mapping journey reveals 60% abandon at checkout, leading to simplified process and 25% conversion improvement."
  },
  {
    id: 82,
    term: "Search Engine Optimization (SEO)",
    category: "Modern Business Practices",
    definition: "Optimizing website to rank higher in search engine results.",
    formula: "Not applicable (marketing strategy)",
    whyImportant: "High rankings drive organic traffic and leads without ongoing advertising costs.",
    smbApplication: "Local contractor ranking #1 for 'home remodeling [city]' generates 50 monthly leads without ad spend."
  },
  {
    id: 83,
    term: "Social Media Marketing",
    category: "Modern Business Practices",
    definition: "Using social platforms to promote products and engage customers.",
    formula: "Not applicable (marketing channel)",
    whyImportant: "Enables direct customer engagement, brand building, and cost-effective reach.",
    smbApplication: "Restaurant's Instagram strategy generates 40% of new customers through visual content and engagement."
  },
  {
    id: 84,
    term: "Content Marketing",
    category: "Modern Business Practices",
    definition: "Creating valuable content to attract and retain customers.",
    formula: "Not applicable (marketing strategy)",
    whyImportant: "Builds authority, trust, and organic traffic. 3x more leads than traditional marketing at lower cost.",
    smbApplication: "B2B firm's blog generates 100 monthly leads at $20 each vs $150 per paid advertising lead."
  },
  {
    id: 85,
    term: "Supply Chain",
    category: "Modern Business Practices",
    definition: "Network of organizations involved in producing and delivering products.",
    formula: "Not applicable (operational system)",
    whyImportant: "Efficient supply chain reduces costs, improves delivery times, and enhances customer satisfaction.",
    smbApplication: "Retailer diversifying suppliers reduces risk and negotiates 15% cost savings through competitive bidding."
  },
  {
    id: 86,
    term: "Risk Management",
    category: "Modern Business Practices",
    definition: "Identifying, assessing, and mitigating potential business threats.",
    formula: "Not applicable (management process)",
    whyImportant: "Protects business from disruptions, financial losses, and reputation damage.",
    smbApplication: "Manufacturer's disaster recovery plan enables 48-hour operations resumption after fire vs 2-week competitor downtime."
  },
  {
    id: 87,
    term: "Business Continuity",
    category: "Modern Business Practices",
    definition: "Planning to maintain operations during and after disruptions.",
    formula: "Not applicable (strategic planning)",
    whyImportant: "Minimizes downtime and financial impact of unexpected events.",
    smbApplication: "Cloud backup system enables business to resume operations in 4 hours vs 3 days, saving $50K in lost revenue."
  },
  {
    id: 88,
    term: "Intellectual Property (IP)",
    category: "Modern Business Practices",
    definition: "Legal rights protecting creative works, inventions, and brand assets.",
    formula: "Not applicable (legal protection)",
    whyImportant: "Protects competitive advantages and creates valuable business assets.",
    smbApplication: "Trademarked brand name protects market position and adds $200K to business valuation."
  },
  {
    id: 89,
    term: "Outsourcing",
    category: "Modern Business Practices",
    definition: "Contracting external providers for non-core business functions.",
    formula: "Not applicable (business strategy)",
    whyImportant: "Reduces costs, accesses expertise, and allows focus on core competencies.",
    smbApplication: "Tech startup outsourcing accounting saves $40K annually vs full-time hire while accessing expert guidance."
  },
  {
    id: 90,
    term: "Pivot",
    category: "Modern Business Practices",
    definition: "Fundamental change in business strategy or model based on market feedback.",
    formula: "Not applicable (strategic decision)",
    whyImportant: "Enables adaptation to market realities. Many successful companies pivoted from original plans.",
    smbApplication: "Restaurant pivoting to delivery-focused model during pandemic maintains revenue while competitors close."
  },
  {
    id: 91,
    term: "Corporate Social Responsibility (CSR)",
    category: "Modern Business Practices",
    definition: "Company's commitment to operating ethically and contributing to society.",
    formula: "Not applicable (business philosophy)",
    whyImportant: "Enhances brand reputation, attracts customers and talent, and builds long-term sustainability.",
    smbApplication: "Company's environmental initiatives attract younger customers and reduce energy costs 20%, creating dual benefits."
  },

  // Human Resources (3 terms)
  {
    id: 92,
    term: "Employee Engagement Score",
    category: "Human Resources",
    definition: "Measure of employee commitment and satisfaction.",
    formula: "Survey-based composite score (typically 1-100)",
    whyImportant: "Higher engagement correlates with productivity, retention, and customer satisfaction.",
    smbApplication: "Company improving engagement from 60 to 75 sees 20% productivity increase and turnover reduction."
  },
  {
    id: 93,
    term: "Turnover Rate",
    category: "Human Resources",
    definition: "Percentage of employees leaving organization over period.",
    formula: "(Number of Departures / Average Employees) × 100",
    whyImportant: "High turnover is costly (1.5-2x salary to replace). Indicates culture and management issues.",
    smbApplication: "Reducing 30% annual turnover to 15% saves $150K in 50-person company earning average $50K salaries."
  },
  {
    id: 94,
    term: "Customer Experience (CX)",
    category: "Customer Metrics",
    definition: "The holistic perception a customer forms from all interactions with a company, encompassing every touchpoint from discovery, marketing, sales, service, to post-purchase. CX influences customer feelings, loyalty, and future behavior—it's not just customer service but the entire journey.",
    whyImportant: "Great CX drives customer satisfaction, retention, and revenue. Companies that prioritize CX see higher customer lifetime value, stronger word-of-mouth, and competitive differentiation. Poor CX leads to churn and negative reviews.",
    smbApplication: "A local bakery maps the customer journey from Instagram discovery to in-store visit to follow-up email, ensuring each touchpoint creates positive emotions—resulting in 40% repeat customers and strong referral growth."
  },
  {
    id: 95,
    term: "Customer Journey",
    category: "Customer Metrics",
    definition: "The complete sequence of experiences and interactions a customer goes through when engaging with a company, from initial awareness and consideration through purchase, use, and advocacy. It maps all touchpoints across channels to understand the customer's perspective and pain points.",
    whyImportant: "Understanding the customer journey reveals friction points, drop-off moments, and opportunities for improvement. It enables businesses to optimize each stage, reduce acquisition costs, increase conversions, and build lasting relationships.",
    smbApplication: "An online boutique maps their customer journey and discovers 60% of cart abandonments occur at shipping cost reveal. By showing shipping earlier and offering free shipping at $50+, they recover 25% of lost sales and increase average order value."
  },
  {
    id: 96,
    term: "Customer Touchpoint",
    category: "Customer Metrics",
    definition: "Any point of interaction between a customer and a business, whether direct (website visit, phone call, in-store experience) or indirect (reviews, social media mentions, word-of-mouth). Each touchpoint shapes customer perception and influences their journey.",
    whyImportant: "Every touchpoint is an opportunity to build trust or lose a customer. Identifying and optimizing touchpoints ensures consistent brand experience, reduces friction, and increases satisfaction across all channels.",
    smbApplication: "A dental practice audits their touchpoints—website booking, reminder texts, waiting room, checkout—and discovers the payment process creates frustration. Adding contactless payment and emailed receipts improves patient satisfaction scores by 35%."
  }
];

export const categories = [
  "All Terms",
  "Financial Metrics",
  "Customer Metrics",
  "Sales & Marketing",
  "Operational Metrics",
  "Financial Management",
  "Strategic & Governance",
  "Growth & Scaling",
  "Modern Business Practices",
  "Human Resources"
];

export const categoryColors: Record<string, string> = {
  "Financial Metrics": "bg-blue-500",
  "Customer Metrics": "bg-green-500",
  "Sales & Marketing": "bg-purple-500",
  "Operational Metrics": "bg-orange-500",
  "Financial Management": "bg-teal-500",
  "Strategic & Governance": "bg-indigo-500",
  "Growth & Scaling": "bg-pink-500",
  "Modern Business Practices": "bg-cyan-500",
  "Human Resources": "bg-amber-500"
};
