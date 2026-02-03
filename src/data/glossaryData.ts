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
  },
  {
    id: 97,
    term: "Customer Persona",
    category: "Customer Metrics",
    definition: "A semi-fictional representation of your ideal customer based on market research and real data about existing customers. Personas include demographics, behavior patterns, motivations, goals, pain points, and decision-making factors.",
    whyImportant: "Personas help businesses create targeted marketing, develop relevant products, and craft messaging that resonates. They align teams around customer needs and prevent costly assumptions about who you're serving.",
    smbApplication: "A fitness studio creates three personas—Busy Professional, New Mom, and Retiree—then tailors class schedules, marketing messages, and membership packages to each, increasing membership by 45% across all segments."
  },
  {
    id: 98,
    term: "Omnichannel Experience",
    category: "Customer Metrics",
    definition: "A seamless, integrated approach to customer engagement that provides consistent experience across all channels—online, mobile, in-store, phone, and social media. Customers can switch between channels without losing context or starting over.",
    whyImportant: "Modern customers expect fluid experiences across channels. Omnichannel strategies increase customer satisfaction, reduce friction, and boost sales by meeting customers wherever they prefer to engage.",
    smbApplication: "A home décor store integrates their website, Instagram shop, and physical store inventory. Customers browse online, check in-store availability, and pick up same day—increasing conversion rates by 60%."
  },
  {
    id: 99,
    term: "Customer Advocacy",
    category: "Customer Metrics",
    definition: "When satisfied customers actively promote and recommend your business to others through word-of-mouth, reviews, testimonials, referrals, and social media. Customer advocates become unpaid brand ambassadors who drive organic growth.",
    whyImportant: "Advocates provide the most trusted form of marketing—peer recommendations. They reduce customer acquisition costs, increase credibility, and create sustainable growth through authentic endorsements.",
    smbApplication: "A pet grooming salon creates a referral program giving advocates $15 credit per referral. Their top 20 advocates generate 35% of new customers at 80% lower acquisition cost than paid advertising."
  },
  {
    id: 100,
    term: "Business Valuation",
    category: "Financial Management",
    definition: "The process of determining the economic value of a business or company, using various methods including asset-based, earnings-based (multiples of EBITDA or revenue), and market comparison approaches. Valuation considers tangible assets, intellectual property, brand value, and future earning potential.",
    whyImportant: "Accurate valuation is essential for selling a business, attracting investors, establishing ownership stakes, estate planning, and understanding true business worth beyond daily operations.",
    smbApplication: "A 15-year-old HVAC company seeking to sell engages a valuator who determines it's worth 4x EBITDA ($2.4M) based on recurring service contracts, trained staff, and established reputation—$800K more than the owner estimated."
  },
  {
    id: 101,
    term: "Unit Economics",
    category: "Financial Metrics",
    definition: "The direct revenues and costs associated with a particular business model expressed on a per-unit basis. For subscription businesses, it's revenue and cost per subscriber; for e-commerce, per order; for services, per client.",
    whyImportant: "Positive unit economics prove a business model is fundamentally viable. If you lose money on each unit sold, you can't make it up with volume. It reveals true profitability before scaling.",
    smbApplication: "A meal prep delivery service calculates unit economics: $45 average order, $18 food cost, $12 delivery, $5 packaging = $10 contribution margin. With $50 CAC and 80% monthly retention, they confirm profitability by month 6."
  },
  {
    id: 102,
    term: "Working Capital Management",
    category: "Financial Management",
    definition: "The process of managing short-term assets (cash, inventory, receivables) and short-term liabilities (payables, short-term debt) to ensure sufficient liquidity for day-to-day operations while maximizing operational efficiency.",
    whyImportant: "Poor working capital management causes cash flow crises even in profitable businesses. Effective management ensures you can meet obligations, take advantage of opportunities, and avoid expensive emergency financing.",
    smbApplication: "A wholesale distributor improves working capital by negotiating net-60 terms with suppliers while maintaining net-30 for customers, reducing required credit line from $200K to $75K and saving $12K annually in interest."
  },
  {
    id: 103,
    term: "Succession Planning",
    category: "Strategic & Governance",
    definition: "The process of identifying and developing future leaders who can replace current key personnel when they leave, retire, or are otherwise unavailable. It ensures business continuity and preserves institutional knowledge.",
    whyImportant: "Without succession planning, businesses face leadership vacuums that disrupt operations, lose critical knowledge, and may struggle to survive founder transitions. Planning ahead protects business value.",
    smbApplication: "A 62-year-old manufacturing company owner identifies two internal candidates, begins cross-training them in leadership, and creates a 5-year transition plan—ensuring the business survives his retirement without losing key customer relationships."
  },
  {
    id: 104,
    term: "Exit Strategy",
    category: "Strategic & Governance",
    definition: "A planned approach for a business owner to transition out of their company, whether through sale to a third party, management buyout, merger, IPO, or passing to family members. Exit strategies define how owners will realize the value they've built.",
    whyImportant: "Every business owner will eventually exit. Planning ahead maximizes value, ensures smooth transitions, protects employees and customers, and achieves personal financial goals.",
    smbApplication: "A couple running a successful daycare plans for retirement by documenting all processes, building a management team, and positioning for sale—ultimately selling for 3x revenue to a regional childcare chain."
  },
  {
    id: 105,
    term: "Artificial Intelligence in Business",
    category: "Modern Business Practices",
    definition: "The application of AI technologies—including machine learning, natural language processing, and computer vision—to automate tasks, generate insights, enhance decision-making, and create new business capabilities. AI transforms how businesses operate, compete, and serve customers.",
    whyImportant: "AI is reshaping competitive landscapes across industries. Early adopters gain efficiency advantages, better customer insights, and new capabilities. Those who delay risk falling behind as AI becomes standard practice.",
    smbApplication: "A regional accounting firm implements AI for document processing and initial tax preparation, reducing preparation time by 60% and allowing staff to focus on advisory services—increasing revenue per client by 40%."
  },
  {
    id: 106,
    term: "Business Automation",
    category: "Modern Business Practices",
    definition: "Using technology to perform repetitive tasks with minimal human intervention. Automation ranges from simple workflows (auto-email responses) to complex process automation (inventory management, invoicing, customer service bots).",
    whyImportant: "Automation reduces errors, speeds up processes, cuts labor costs, and frees employees for higher-value work. It enables small businesses to operate at scale without proportionally increasing headcount.",
    smbApplication: "A property management company automates rent collection, maintenance requests, and lease renewals. Managing 200 units now requires 2 staff instead of 5, while tenant satisfaction improves due to faster response times."
  },
  {
    id: 107,
    term: "Cloud Computing",
    category: "Modern Business Practices",
    definition: "The delivery of computing services—servers, storage, databases, networking, software, analytics—over the internet ('the cloud'). Instead of owning hardware, businesses access resources on-demand and pay for what they use.",
    whyImportant: "Cloud computing eliminates capital expenditure on IT infrastructure, provides scalability, enables remote work, improves disaster recovery, and gives small businesses access to enterprise-grade technology.",
    smbApplication: "A growing law firm moves from local servers to cloud-based practice management. They eliminate $40K in server costs, enable attorneys to work from anywhere, and automatic backups prevent data loss risk."
  },
  {
    id: 108,
    term: "Data Analytics",
    category: "Modern Business Practices",
    definition: "The process of examining data sets to draw conclusions about the information they contain. It includes descriptive analytics (what happened), diagnostic analytics (why it happened), predictive analytics (what will happen), and prescriptive analytics (what should we do).",
    whyImportant: "Data-driven decisions outperform gut instinct. Analytics reveal patterns invisible to intuition, identify opportunities, predict problems, and measure what actually works versus assumptions.",
    smbApplication: "A restaurant analyzes POS data and discovers Tuesday dinner sales are 40% below average. They introduce 'Taco Tuesday' specials, track results, and turn their slowest night into their third-busiest within two months."
  },
  {
    id: 109,
    term: "Cybersecurity",
    category: "Modern Business Practices",
    definition: "The practice of protecting systems, networks, programs, and data from digital attacks. It encompasses technology safeguards, policies, employee training, and incident response plans to prevent unauthorized access, data breaches, and business disruption.",
    whyImportant: "Cyber attacks target businesses of all sizes—43% of attacks target small businesses. Breaches cause financial loss, reputation damage, legal liability, and can destroy businesses entirely.",
    smbApplication: "An insurance agency implements multi-factor authentication, employee phishing training, and encrypted backups after a competitor suffers ransomware. The $5K annual investment prevents a potential $200K+ breach impact."
  },
  {
    id: 110,
    term: "Digital Transformation",
    category: "Modern Business Practices",
    definition: "The integration of digital technology into all areas of a business, fundamentally changing how you operate and deliver value to customers. It's not just about technology adoption but rethinking business models and processes for a digital age.",
    whyImportant: "Digital transformation improves efficiency, enhances customer experiences, creates new revenue streams, and builds competitive advantage. Businesses that don't transform risk obsolescence.",
    smbApplication: "A traditional print shop transforms by adding online ordering, automated job tracking, and digital proofing. Print sales stabilize while new digital services grow to represent 35% of revenue."
  },
  {
    id: 111,
    term: "E-commerce",
    category: "Sales & Marketing",
    definition: "Commercial transactions conducted electronically on the internet. It includes B2C (business-to-consumer), B2B (business-to-business), and D2C (direct-to-consumer) models, encompassing online storefronts, marketplaces, and digital payment systems.",
    whyImportant: "E-commerce expands market reach beyond geographic limitations, operates 24/7, reduces overhead costs, provides rich customer data, and meets modern consumer expectations for convenience.",
    smbApplication: "A specialty spice shop adds an online store, reaching customers nationwide. Online sales grow to 60% of revenue within 18 months, with 3x the profit margin of in-store sales due to lower overhead."
  },
  {
    id: 112,
    term: "Search Engine Optimization (SEO)",
    category: "Sales & Marketing",
    definition: "The practice of optimizing website content and structure to rank higher in search engine results for relevant queries. SEO includes on-page factors (content, keywords, meta tags), technical factors (site speed, mobile-friendliness), and off-page factors (backlinks, authority).",
    whyImportant: "Organic search drives significant website traffic. High rankings for relevant keywords bring qualified leads at near-zero marginal cost compared to paid advertising.",
    smbApplication: "A local plumber optimizes their website for 'emergency plumber [city name]' searches, creates helpful content about common plumbing issues, and builds local citations—increasing organic leads by 150% over 12 months."
  },
  {
    id: 113,
    term: "Social Media Marketing",
    category: "Sales & Marketing",
    definition: "Using social media platforms to connect with audiences, build brand awareness, drive website traffic, and increase sales. It encompasses organic content, paid advertising, influencer partnerships, and community management.",
    whyImportant: "Social media is where customers spend time and make purchasing decisions. It provides direct customer engagement, viral potential, and cost-effective advertising with precise targeting.",
    smbApplication: "A boutique clothing store builds Instagram following through outfit inspiration posts, stories showing new arrivals, and user-generated content from customers. Social drives 45% of online sales and strong brand loyalty."
  },
  {
    id: 114,
    term: "Content Marketing",
    category: "Sales & Marketing",
    definition: "A strategic marketing approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience—and ultimately drive profitable customer action.",
    whyImportant: "Content marketing builds trust and authority, educates potential customers, improves SEO, and generates leads at lower cost than traditional advertising while creating lasting digital assets.",
    smbApplication: "A financial advisor creates weekly blog posts answering common retirement questions, publishes a free estate planning guide, and shares insights on LinkedIn—generating 40% of new client inquiries from content."
  },
  {
    id: 115,
    term: "Brand Equity",
    category: "Sales & Marketing",
    definition: "The commercial value derived from consumer perception of a brand name rather than the product or service itself. Positive brand equity allows premium pricing, customer loyalty, and easier product launches.",
    whyImportant: "Strong brand equity creates sustainable competitive advantage. It reduces price sensitivity, lowers customer acquisition costs, attracts better employees, and increases business valuation.",
    smbApplication: "A local craft brewery's strong brand equity allows them to charge 25% more than competitors, maintain loyal customers despite new competition, and successfully launch new products with immediate adoption."
  },
  {
    id: 116,
    term: "Operational Efficiency",
    category: "Operational Metrics",
    definition: "The ratio between output gained from business operations and the input required to run them. It measures how well a company uses resources (time, labor, materials, capital) to produce goods or services.",
    whyImportant: "Higher operational efficiency means better margins, competitive pricing ability, faster delivery, and capacity to scale. Inefficiency erodes profits and limits growth potential.",
    smbApplication: "A catering company maps their kitchen workflow, reorganizes prep stations, and implements batch cooking. They reduce labor hours per event by 30% while improving food quality consistency."
  },
  {
    id: 117,
    term: "Supply Chain Management",
    category: "Operational Metrics",
    definition: "The oversight of materials, information, and finances as they move from supplier to manufacturer to wholesaler to retailer to consumer. It coordinates planning, sourcing, production, and delivery to optimize cost, quality, and speed.",
    whyImportant: "Effective supply chain management reduces costs, improves reliability, minimizes inventory investment, and creates competitive advantage. Poor management causes stockouts, delays, and excess costs.",
    smbApplication: "A hardware store implements inventory management software connecting sales data to automatic reorders. They reduce stockouts by 75%, cut inventory carrying costs by 20%, and free up $50K in working capital."
  },
  {
    id: 118,
    term: "Quality Control",
    category: "Operational Metrics",
    definition: "The process of ensuring products or services meet specified requirements and customer expectations. It includes inspection, testing, and correction of defects to maintain consistent output quality.",
    whyImportant: "Quality control prevents defective products from reaching customers, reduces waste and rework costs, protects reputation, and builds customer trust and loyalty.",
    smbApplication: "A custom furniture maker implements quality checkpoints at each production stage. Defect rates drop from 8% to 1%, returns decrease by 85%, and online reviews improve from 4.2 to 4.8 stars."
  },
  {
    id: 119,
    term: "Employee Engagement",
    category: "Human Resources",
    definition: "The emotional commitment an employee has to their organization and its goals. Engaged employees care about their work and company, going beyond basic job requirements to contribute to organizational success.",
    whyImportant: "Engaged employees are more productive, provide better customer service, stay longer, and contribute to positive workplace culture. Disengagement costs businesses billions in lost productivity.",
    smbApplication: "A marketing agency implements monthly feedback sessions, professional development budgets, and team recognition programs. Employee turnover drops from 35% to 12%, saving $80K annually in hiring and training costs."
  },
  {
    id: 120,
    term: "Talent Acquisition",
    category: "Human Resources",
    definition: "The strategic approach to identifying, attracting, and onboarding skilled individuals to meet organizational needs. Unlike basic recruiting, talent acquisition is ongoing, proactive, and aligned with long-term business goals.",
    whyImportant: "The right talent drives business success. Strategic acquisition builds a pipeline of qualified candidates, reduces time-to-hire, improves quality of hires, and creates competitive advantage through people.",
    smbApplication: "A growing tech consultancy builds relationships with local universities, maintains an active LinkedIn presence showcasing culture, and creates an internship pipeline—reducing average hiring time from 60 to 25 days."
  },
  {
    id: 121,
    term: "Performance Management",
    category: "Human Resources",
    definition: "An ongoing process of communication between supervisors and employees that supports accomplishing organizational objectives. It includes goal setting, continuous feedback, regular check-ins, and performance evaluation.",
    whyImportant: "Effective performance management aligns individual efforts with business goals, identifies development needs, improves accountability, and helps retain top performers through recognition and growth opportunities.",
    smbApplication: "A dental practice replaces annual reviews with quarterly goal-setting and monthly one-on-ones. Staff productivity increases 25%, patient satisfaction scores improve, and the practice identifies future leaders for expansion."
  },
  {
    id: 122,
    term: "Competitive Analysis",
    category: "Strategic & Governance",
    definition: "The process of identifying competitors and evaluating their strategies, strengths, and weaknesses relative to your own. It examines products, pricing, marketing, market position, and operational approaches to inform strategic decisions.",
    whyImportant: "Understanding competitors reveals market opportunities, potential threats, and areas for differentiation. It prevents blind spots and helps businesses position themselves effectively.",
    smbApplication: "A new coffee shop analyzes five local competitors on price, hours, atmosphere, and offerings. They identify an underserved market for quiet workspace and position as the 'work-friendly café'—filling a gap competitors missed."
  },
  {
    id: 123,
    term: "Strategic Planning",
    category: "Strategic & Governance",
    definition: "The process of defining an organization's direction and making decisions on allocating resources to pursue this strategy. It involves setting long-term goals, analyzing competitive environment, and developing action plans.",
    whyImportant: "Strategic planning provides direction, focuses resources, aligns team efforts, and improves decision-making. Without it, businesses react to circumstances rather than shaping their future.",
    smbApplication: "A family plumbing business conducts annual strategic planning, identifying commercial contracts as a growth opportunity. They invest in larger equipment and commercial licenses, growing commercial revenue from 10% to 40% of sales over three years."
  },
  {
    id: 124,
    term: "R2A2 Framework",
    category: "Human Resources",
    definition: "A job description methodology that defines four critical elements for every role: Role (the position's purpose and place in the organization), Responsibilities (specific tasks and duties), Accountability (what outcomes the person is answerable for), and Authority (decision-making power and spending limits).",
    whyImportant: "Traditional job descriptions list tasks but leave accountability and authority unclear, causing confusion, bottlenecks, and conflict. R2A2 creates clarity that improves hiring, speeds onboarding, reduces micromanagement, and empowers employees to act decisively.",
    smbApplication: "A growing HVAC company implements R2A2 for their service technicians, defining that they have authority to approve repairs up to $500 without manager approval. Service calls resolve 40% faster, customer satisfaction improves, and the owner stops fielding 20+ daily approval calls."
  },
  {
    id: 125,
    term: "Emotional Intelligence (EI/EQ)",
    category: "Human Resources",
    definition: "The ability to recognize, understand, manage, and effectively use emotions in yourself and others. EI comprises four pillars: self-awareness (recognizing your emotions), self-management (controlling impulses), social awareness (reading others), and relationship management (influencing and developing others).",
    whyImportant: "Technical skills get work done, but emotional intelligence determines whether people want to work with you. Leaders with high EI build trust, navigate conflict, retain talent, and create cultures where people thrive. Low EI drives turnover and dysfunction.",
    smbApplication: "A manufacturing supervisor notices a normally reliable employee becoming withdrawn and missing deadlines. Instead of reprimanding, they have a private conversation and learn of a family crisis. Offering flexible scheduling retains a valuable employee who becomes one of the team's strongest advocates."
  },
  {
    id: 126,
    term: "Psychological Safety",
    category: "Human Resources",
    definition: "A shared belief that the team is safe for interpersonal risk-taking—that members can speak up with ideas, questions, concerns, or mistakes without fear of punishment or humiliation. It's not about being nice; it's about candor and learning.",
    whyImportant: "Google's Project Aristotle found psychological safety was the #1 factor in high-performing teams. Without it, employees hide problems until they're crises, innovation dies, and the best talent leaves for environments where they can be heard.",
    smbApplication: "A restaurant owner creates psychological safety by thanking a line cook who reports a near-miss food safety issue rather than punishing the mistake. Staff start proactively reporting problems, preventing three potential health code violations in six months."
  },
  {
    id: 127,
    term: "Employee Empowerment",
    category: "Human Resources",
    definition: "Giving employees the authority, resources, information, and accountability to make decisions and take action within defined boundaries without requiring constant approval. It goes beyond delegation—empowered employees own outcomes, not just tasks.",
    whyImportant: "Empowerment multiplies leadership capacity exponentially. While a micromanaging owner is a bottleneck, empowered teams scale independently. Empowerment also increases engagement, speeds customer response, and develops future leaders.",
    smbApplication: "A salon owner empowers stylists to resolve client complaints up to $100 value without approval. Response time drops from days to minutes, negative reviews decrease 60%, and the owner reclaims 10+ hours weekly previously spent on complaint escalations."
  },
  {
    id: 128,
    term: "Delegation",
    category: "Human Resources",
    definition: "The transfer of responsibility for specific tasks or decisions from a manager to a subordinate, while the manager retains ultimate accountability. Effective delegation includes clear expectations, adequate authority, necessary resources, and appropriate follow-up.",
    whyImportant: "Delegation is essential for owner sanity and business growth. Leaders who can't delegate become bottlenecks, burn out, and cap their company's potential at what they personally can handle. Delegation also develops employees and builds bench strength.",
    smbApplication: "A marketing agency owner delegates client reporting to a junior account manager, providing templates and review checkpoints. The owner saves 15 hours monthly, the junior develops client skills, and report quality actually improves due to fresh perspective and dedicated focus."
  },
  {
    id: 129,
    term: "Financial Stewardship",
    category: "Financial Management",
    definition: "The responsible management and oversight of financial resources on behalf of stakeholders. For employees, it means treating company money as if it were their own—making thoughtful spending decisions, avoiding waste, and protecting profitability.",
    whyImportant: "When only owners care about costs, waste accumulates everywhere. A culture of financial stewardship engages every employee in profitability, reduces unnecessary spending, and creates ownership mentality that protects margins.",
    smbApplication: "A construction company trains all employees on how material waste affects bonuses. Crews start consolidating lumber cuts, returning unused supplies, and suggesting cost-saving alternatives. Material waste drops 25%, adding $40K annually to profit sharing."
  },
  {
    id: 130,
    term: "Onboarding",
    category: "Human Resources",
    definition: "The process of integrating a new employee into an organization, encompassing orientation, training, cultural assimilation, and support during the transition period. Effective onboarding extends well beyond the first day to ensure long-term success and retention.",
    whyImportant: "The first 90 days determine whether a new hire becomes a productive long-term contributor or an expensive turnover statistic. Strong onboarding accelerates productivity, builds engagement, and reduces early turnover by up to 50%.",
    smbApplication: "An accounting firm replaces their 'sink or swim' approach with a 90-day onboarding program including assigned mentors, weekly check-ins, and milestone goals. New hire productivity reaches full capacity in 60 days instead of 120, and first-year turnover drops from 40% to 15%."
  },
  {
    id: 131,
    term: "Business Vision",
    category: "Strategic & Governance",
    definition: "A clear, compelling picture of what a business aspires to become in the future—its ultimate destination and purpose. A vision statement answers 'Where are we going?' and 'Why does it matter?' It inspires and aligns stakeholders around a shared future.",
    whyImportant: "Without a shared vision, employees just have jobs—they show up, do tasks, and go home. With a compelling vision, work has meaning, decisions have direction, and teams pull together toward something greater than daily operations.",
    smbApplication: "A local gym transforms from 'another fitness center' to 'the community hub where neighbors become healthier together.' Staff start organizing community events, members recruit friends, and retention improves 35% as people join a movement, not just a membership."
  },
  {
    id: 132,
    term: "Lean Principles",
    category: "Operational Metrics",
    definition: "A management philosophy derived from Toyota's production system focused on maximizing customer value while minimizing waste. The five core principles are: define value, map the value stream, create flow, establish pull, and pursue perfection through continuous improvement.",
    whyImportant: "Lean thinking reveals that 90%+ of activities in most processes don't add customer value. Eliminating this waste reduces costs, speeds delivery, improves quality, and frees resources for growth—without working harder.",
    smbApplication: "A print shop maps their order-to-delivery process and discovers jobs wait in queues 80% of the time. By reorganizing workflow and reducing batch sizes, they cut turnaround from 5 days to 2 days while reducing overtime 30%."
  },
  {
    id: 133,
    term: "Planogram",
    category: "Sales & Marketing",
    definition: "A visual diagram or model indicating the placement of products on retail shelves or displays. Planograms specify exact locations, facings, and quantities to optimize sales, manage inventory, and create consistent customer experiences across locations.",
    whyImportant: "Strategic product placement significantly impacts sales—eye-level items sell better, complementary products together increase basket size, and optimized layouts improve inventory turns. Planograms turn shelf space into a revenue optimization tool.",
    smbApplication: "A convenience store owner implements planograms placing high-margin snacks at checkout and grouping lunch items together. Average transaction value increases 18%, and the owner can train new staff on stocking in half the time using visual guides."
  },
  {
    id: 134,
    term: "Voice of Customer (VoC)",
    category: "Customer Metrics",
    definition: "The systematic process of capturing customers' expectations, preferences, experiences, and feedback about products or services. VoC includes direct feedback (surveys, interviews), indirect feedback (reviews, social media), and inferred feedback (behavioral data).",
    whyImportant: "Companies that assume they know what customers want often miss the mark. VoC replaces assumptions with actual customer input, revealing unmet needs, experience gaps, and opportunities competitors miss.",
    smbApplication: "A B2B software company implements quarterly VoC interviews with their top 20 clients. They discover that clients value responsive support more than new features—leading to a support investment that reduces churn by 25% and increases referrals."
  },
  {
    id: 135,
    term: "CRM (Customer Relationship Management)",
    category: "Sales & Marketing",
    definition: "A technology system and strategy for managing all interactions and relationships with current and potential customers. CRM centralizes customer data, tracks communication history, manages sales pipelines, and enables personalized marketing and service.",
    whyImportant: "Without CRM, customer knowledge lives in individual heads and scattered notes. CRM creates institutional memory, ensures follow-up happens, reveals sales patterns, and enables the personalized experience customers expect.",
    smbApplication: "A commercial cleaning company implements CRM to track all prospect touchpoints and client preferences. Sales follow-up consistency improves from 40% to 95%, close rates increase 30%, and they never forget a client's building access codes or special requests again."
  },
  {
    id: 136,
    term: "Profit Leakage",
    category: "Financial Metrics",
    definition: "The unintentional loss of profit through inefficiencies, errors, waste, underpricing, scope creep, or untracked costs that erode margins without obvious visibility. Profit leakage often hides in processes that seem 'good enough' but quietly drain profitability.",
    whyImportant: "Many businesses chase more sales when the real opportunity is plugging profit leaks. A 5% reduction in leakage often yields more bottom-line impact than a 10% revenue increase, with far less effort and risk.",
    smbApplication: "A landscaping company tracks actual hours versus estimated hours and discovers crews consistently exceed estimates by 20% on weekly maintenance accounts. Adjusting pricing and improving estimating accuracy recovers $60K annually in previously invisible losses."
  },
  {
    id: 137,
    term: "Cash Conversion Cycle (CCC)",
    category: "Financial Management",
    definition: "The number of days it takes for a company to convert inventory investments into cash from sales. It measures how efficiently a business manages working capital by tracking: days inventory outstanding + days sales outstanding - days payables outstanding.",
    formula: "Days Inventory Outstanding + Days Sales Outstanding - Days Payables Outstanding",
    whyImportant: "A shorter CCC means less cash tied up in operations and more available for growth or emergencies. Companies with negative CCC (like Amazon) get paid before paying suppliers—essentially using vendor money to fund operations.",
    smbApplication: "A wholesale distributor calculates their 75-day CCC (45 days inventory + 60 days receivables - 30 days payables). By negotiating net-60 supplier terms and offering 2% early payment discounts to customers, they reduce CCC to 45 days, freeing $200K in working capital."
  },
  {
    id: 138,
    term: "Pricing Strategy",
    category: "Sales & Marketing",
    definition: "The method and approach used to set prices for products or services, balancing customer value perception, competitive positioning, cost coverage, and profit objectives. Common strategies include cost-plus, value-based, competitive, penetration, and premium pricing.",
    whyImportant: "Pricing is the most powerful profit lever—a 1% price increase typically generates 8-11% profit improvement. Yet most small businesses set prices reactively or based on cost-plus formulas that ignore value delivered and market positioning.",
    smbApplication: "A web design agency shifts from hourly billing ($100/hour) to value-based project pricing tied to client revenue impact. Their effective rate increases to $175/hour equivalent, profit margins improve 40%, and clients prefer predictable project costs over hourly uncertainty."
  },
  
  // Operations & Efficiency Terms (3 terms)
  {
    id: 139,
    term: "Standard Operating Procedure (SOP)",
    category: "Operational Metrics",
    definition: "A documented set of step-by-step instructions that describe how to perform routine business activities. SOPs ensure consistency, quality, and efficiency by providing a standardized approach to recurring tasks.",
    whyImportant: "SOPs reduce errors, training time, and dependency on key individuals. They enable scalability by allowing new team members to quickly perform tasks correctly without constant supervision.",
    smbApplication: "A bakery creates SOPs for opening procedures, dough preparation, and closing tasks. New employees become productive in 3 days instead of 2 weeks, and product consistency improves by 40% across all shifts."
  },
  {
    id: 140,
    term: "Bottleneck Analysis",
    category: "Operational Metrics",
    definition: "The process of identifying constraints or limitations in a workflow that slow down overall output. A bottleneck is the step in a process that has the lowest capacity and limits the entire system's throughput.",
    whyImportant: "Improving non-bottleneck steps provides zero benefit to overall output. Identifying and addressing the true constraint is the fastest path to increased capacity and efficiency.",
    smbApplication: "A print shop discovers their cutting station (not printing) is the bottleneck limiting daily output to 200 jobs. Adding a second cutting station doubles throughput without touching the expensive printers."
  },
  {
    id: 141,
    term: "Capacity Utilization",
    category: "Operational Metrics",
    definition: "The percentage of total productive capacity being used at any given time. It measures how efficiently a business uses its available resources—equipment, labor, or facilities—relative to maximum potential output.",
    formula: "(Actual Output / Maximum Possible Output) × 100",
    whyImportant: "Low utilization means wasted fixed costs; high utilization may indicate inability to handle growth or emergencies. The sweet spot balances efficiency with flexibility, typically 70-85%.",
    smbApplication: "A machine shop with 75% capacity utilization has room for growth without new equipment. When utilization hits 90%, they know it's time to invest in additional machinery or risk turning away work."
  },

  // Financial Health Terms (3 terms)
  {
    id: 142,
    term: "Working Capital Ratio",
    category: "Financial Management",
    definition: "A liquidity ratio measuring a company's ability to pay off current liabilities with current assets. Also known as the current ratio, it indicates short-term financial health and operational efficiency.",
    formula: "Current Assets / Current Liabilities",
    whyImportant: "A ratio below 1.0 signals potential cash flow problems; above 2.0 may indicate inefficient asset use. The ideal range of 1.2-2.0 ensures bills are covered while capital isn't sitting idle.",
    smbApplication: "A retail store with $200K current assets and $150K current liabilities has a 1.33 ratio—healthy enough to handle seasonal fluctuations while not over-investing in inventory."
  },
  {
    id: 143,
    term: "Days Payable Outstanding (DPO)",
    category: "Financial Management",
    definition: "The average number of days a company takes to pay its suppliers and vendors. DPO measures how long a business holds onto cash before settling accounts payable.",
    formula: "(Accounts Payable / Cost of Goods Sold) × 365",
    whyImportant: "Higher DPO improves cash flow by keeping money longer, but paying too slowly damages supplier relationships and may forfeit early payment discounts. Balance is key.",
    smbApplication: "A manufacturer with 25-day DPO negotiates net-45 terms with key suppliers, extending DPO to 40 days and freeing $75K in working capital for a new equipment purchase."
  },
  {
    id: 144,
    term: "Break-Even Analysis",
    category: "Financial Metrics",
    definition: "A financial calculation determining the point where total revenue equals total costs, resulting in zero profit or loss. It identifies the minimum sales volume needed to cover all fixed and variable costs.",
    formula: "Break-Even Units = Fixed Costs / (Price per Unit - Variable Cost per Unit)",
    whyImportant: "Break-even analysis informs pricing, cost management, and sales targets. It answers the fundamental question: 'How much do we need to sell to stop losing money?'",
    smbApplication: "A food truck with $3,000 monthly fixed costs and $4 profit per item needs to sell 750 items monthly to break even. Knowing this, the owner targets 1,000 sales for a sustainable $1,000 monthly profit."
  },

  // Marketing & Sales Terms (3 terms)
  {
    id: 145,
    term: "Sales Funnel",
    category: "Sales & Marketing",
    definition: "A visual representation of the customer journey from initial awareness to final purchase. The funnel metaphor reflects how prospects decrease at each stage: awareness → interest → consideration → intent → purchase.",
    whyImportant: "Understanding funnel stages reveals where prospects drop off, enabling targeted improvements. A 10% improvement at any stage compounds through the entire funnel.",
    smbApplication: "An e-commerce store maps their funnel: 10,000 visitors → 1,000 add to cart → 300 begin checkout → 150 purchase. Fixing checkout friction increases purchases to 225—a 50% revenue boost."
  },
  {
    id: 146,
    term: "Market Penetration",
    category: "Sales & Marketing",
    definition: "The percentage of a target market that purchases a company's product or service. It measures how much of the total addressable market (TAM) a business has captured.",
    formula: "(Number of Customers / Total Target Market Size) × 100",
    whyImportant: "Low penetration indicates growth opportunity in existing markets before expanding to new ones. High penetration may signal market saturation requiring diversification.",
    smbApplication: "A local accounting firm serving 150 of 3,000 small businesses in their city has 5% market penetration. Focusing on their core market could triple revenue before needing to expand geographically."
  },
  {
    id: 147,
    term: "Lead Nurturing",
    category: "Sales & Marketing",
    definition: "The process of developing relationships with potential customers throughout the buying journey using targeted content, communications, and touchpoints. It moves prospects from initial interest toward purchase readiness.",
    whyImportant: "80% of new leads never convert without nurturing. Systematic follow-up dramatically increases conversion rates while building trust and positioning your business as the obvious choice.",
    smbApplication: "A B2B software company implements automated email sequences with educational content. Nurtured leads convert at 15% versus 2% for cold leads, tripling qualified opportunities from the same lead volume."
  },

  // Technology & Digital Terms (3 terms)
  {
    id: 148,
    term: "Digital Transformation",
    category: "Modern Business Practices",
    definition: "The integration of digital technology into all areas of business, fundamentally changing how operations are conducted and value is delivered to customers. It involves cultural change as much as technology adoption.",
    whyImportant: "Businesses that don't digitally transform risk becoming obsolete. Digital leaders grow revenue 1.5x faster than laggards while achieving higher customer satisfaction and operational efficiency.",
    smbApplication: "A local insurance agency digitizes client files, implements online quoting, and adds a customer portal. Staff efficiency doubles, client satisfaction increases 40%, and they gain competitive advantage over paper-based competitors."
  },
  {
    id: 149,
    term: "Data-Driven Decision Making",
    category: "Modern Business Practices",
    definition: "An approach to business management that emphasizes using data analysis, metrics, and evidence—rather than intuition or experience alone—to guide strategic and operational decisions.",
    whyImportant: "Data-driven companies are 23x more likely to acquire customers and 6x more likely to retain them. Replacing gut feelings with evidence reduces costly mistakes and reveals hidden opportunities.",
    smbApplication: "A restaurant owner stops guessing at popular dishes and analyzes POS data. They discover 3 low-margin items account for 40% of orders and create combo specials that increase average check size by 25%."
  },
  {
    id: 150,
    term: "API (Application Programming Interface)",
    category: "Modern Business Practices",
    definition: "A set of protocols and tools that allow different software applications to communicate and share data with each other. APIs enable systems to integrate without requiring direct code changes.",
    whyImportant: "APIs eliminate manual data entry between systems, reduce errors, and enable automation. They allow small businesses to create enterprise-level integrations without custom development costs.",
    smbApplication: "A retail store connects their POS, inventory, and accounting systems via APIs. Sales automatically update inventory and create accounting entries—saving 15 hours weekly of manual reconciliation."
  },

  // Risk & Compliance Terms (3 terms)
  {
    id: 151,
    term: "Business Continuity Plan (BCP)",
    category: "Strategic & Governance",
    definition: "A documented strategy outlining how a business will continue operating during and after a disruption such as natural disasters, cyberattacks, supply chain failures, or key personnel loss.",
    whyImportant: "40% of businesses never reopen after a major disaster. A BCP turns potential catastrophe into manageable inconvenience by ensuring critical functions continue regardless of circumstances.",
    smbApplication: "A consulting firm's BCP includes cloud backups, remote work procedures, and cross-trained staff. When their office floods, they're operational within 4 hours while competitors without plans close for weeks."
  },
  {
    id: 152,
    term: "Regulatory Compliance",
    category: "Strategic & Governance",
    definition: "The process of adhering to laws, regulations, guidelines, and specifications relevant to business operations. Compliance requirements vary by industry, location, and business activities.",
    whyImportant: "Non-compliance leads to fines, lawsuits, reputation damage, and business closure. Proactive compliance is far cheaper than reactive damage control and builds customer trust.",
    smbApplication: "A healthcare provider implements HIPAA compliance procedures, staff training, and documentation systems. Annual investment of $15K prevents potential $50K+ fines per violation and protects their operating license."
  },
  {
    id: 153,
    term: "Vendor Risk Management",
    category: "Strategic & Governance",
    definition: "The process of identifying, assessing, and mitigating risks associated with third-party vendors and suppliers. It evaluates financial stability, security practices, and operational reliability of business partners.",
    whyImportant: "Your business is only as secure as your weakest vendor. Supply chain disruptions, data breaches, or vendor failures can cripple operations even with excellent internal practices.",
    smbApplication: "A manufacturer qualifies backup suppliers for critical components after a primary vendor bankruptcy causes 3-week delays. When their main supplier later has production issues, they switch seamlessly with zero downtime."
  },

  // Customer Success Terms (2 terms)
  {
    id: 154,
    term: "Customer Onboarding",
    category: "Customer Metrics",
    definition: "The process of welcoming and guiding new customers to successfully use a product or service. Effective onboarding ensures customers realize value quickly, reducing churn and accelerating satisfaction.",
    whyImportant: "Customers who complete onboarding are 2-3x more likely to remain long-term. Poor onboarding is the leading cause of early churn and creates support burden from preventable confusion.",
    smbApplication: "A SaaS company implements a 7-day onboarding email sequence with video tutorials. First-month churn drops from 15% to 5%, and support tickets from new users decrease by 60%."
  },
  {
    id: 155,
    term: "Service Level Agreement (SLA)",
    category: "Operational Metrics",
    definition: "A formal contract defining the expected level of service between a provider and customer. SLAs specify metrics like response time, uptime guarantees, and resolution timeframes with consequences for non-compliance.",
    whyImportant: "SLAs set clear expectations, prevent disputes, and demonstrate commitment to quality. They also provide internal benchmarks for measuring and improving service delivery.",
    smbApplication: "An IT support company offers tiered SLAs: 4-hour response for premium clients at $500/month, 24-hour for basic at $200/month. Clear expectations improve satisfaction and justify premium pricing."
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
  "Financial Metrics": "bg-blue-500/20",
  "Customer Metrics": "bg-green-500/20",
  "Sales & Marketing": "bg-purple-500/20",
  "Operational Metrics": "bg-orange-500/20",
  "Financial Management": "bg-teal-500/20",
  "Strategic & Governance": "bg-indigo-500/20",
  "Growth & Scaling": "bg-pink-500/20",
  "Modern Business Practices": "bg-cyan-500/20",
  "Human Resources": "bg-amber-500/20"
};
