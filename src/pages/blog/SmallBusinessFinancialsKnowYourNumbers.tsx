import { Link } from 'react-router-dom';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import RelatedArticles from '@/components/RelatedArticles';
import { ArrowLeft, Calendar, Clock, User, BarChart3, TrendingUp, DollarSign, FileText, AlertTriangle, CheckCircle2, Target, Lightbulb } from 'lucide-react';
import heroImage from '@/assets/small-business-financials-know-your-numbers.jpg';

const SmallBusinessFinancialsKnowYourNumbers = () => {
  const publishDate = "2025-12-24";
  const modifiedDate = "2025-12-24";
  const readTime = "14 min read";
  const author = "BizHealth.ai Strategic Insights";

  const relatedArticles = [
    {
      title: "Financial Stewardship: Everyone's Responsibility in Your Small Business",
      slug: "financial-stewardship-everyones-responsibility",
      category: "Financial Management",
      excerpt: "Discover how to build a culture of financial stewardship where every employee contributes to cash flow health."
    },
    {
      title: "Cash Flow Crisis Management: Why 60% of Small Businesses Are Down in 2025",
      slug: "cash-flow-crisis-management",
      category: "Financial Management",
      excerpt: "Master cash flow management for small business in 2025. Learn crisis prevention strategies and cash flow planning tips."
    },
    {
      title: "Financial Health Metrics Every Business Owner Should Track",
      slug: "financial-health-metrics",
      category: "Financial Management",
      excerpt: "A comprehensive guide to the key financial indicators that provide insight into your business's current and future performance."
    }
  ];

  return (
    <>
      <SEO
        title="Small Business Financials: Know Your Numbers, Know Your Business | BizHealth.ai"
        description="Master small business financial management with this comprehensive guide. Learn to read income statements, balance sheets, cash flow, and key metrics that drive strategic decisions."
        keywords="small business financials, know your numbers, business financial management, income statement, balance sheet, cash flow statement, unit economics, LTV CAC ratio, gross margin, financial metrics small business, cash conversion cycle, financial literacy business owners, SMB finance"
        canonical="https://bizhealth.ai/blog/small-business-financials-know-your-numbers"
        ogType="article"
        ogImage="https://bizhealth.ai/assets/small-business-financials-know-your-numbers.jpg"
        articlePublishedTime={publishDate}
        articleModifiedTime={modifiedDate}
        articleAuthor={author}
      />

      <StructuredData
        type="article"
        headline="Small Business Financials: Know Your Numbers, Know Your Business"
        description="Master small business financial management with this comprehensive guide. Learn to read income statements, balance sheets, cash flow, and key metrics that drive strategic decisions."
        author={author}
        datePublished={publishDate}
        dateModified={modifiedDate}
        image="https://bizhealth.ai/assets/small-business-financials-know-your-numbers.jpg"
        url="https://bizhealth.ai/blog/small-business-financials-know-your-numbers"
      />

      <GlobalNavigation />

      <article className="min-h-screen" style={{ backgroundColor: 'hsl(var(--background))' }}>
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-40 pb-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-200"
            style={{ color: 'hsl(var(--biz-navy))' }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Blog</span>
          </Link>
        </div>

        {/* Hero Section */}
        <header className="container mx-auto px-4 pt-4 pb-8">
          <div className="max-w-4xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Link
                to="/blog?category=financials"
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                style={{
                  backgroundColor: 'hsl(var(--biz-navy) / 0.1)',
                  color: 'hsl(var(--biz-navy))',
                }}
              >
                Financials
              </Link>
              <Link
                to="/blog?category=business-strategy"
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                style={{
                  backgroundColor: 'hsl(var(--biz-navy) / 0.1)',
                  color: 'hsl(var(--biz-navy))',
                }}
              >
                Business Strategy
              </Link>
              <Link
                to="/blog?category=business-leadership"
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                style={{
                  backgroundColor: 'hsl(var(--biz-navy) / 0.1)',
                  color: 'hsl(var(--biz-navy))',
                }}
              >
                Business Leadership
              </Link>
            </div>

            {/* Title */}
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ 
                color: 'hsl(var(--biz-navy))',
                fontFamily: 'Merriweather, Georgia, serif'
              }}
            >
              Small Business Financials: Know Your Numbers, Know Your Business
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8" style={{ color: 'hsl(var(--biz-navy) / 0.7)' }}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">December 24, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-[90%] mx-auto h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
              <img 
                src={heroImage} 
                alt="Business owner analyzing financial data on multiple monitors showing charts, graphs, and key performance indicators for small business financial management"
                className="w-full h-full object-cover"
                loading="eager"
                width={1200}
                height={500}
              />
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <div style={{ 
              color: 'hsl(var(--foreground))',
              lineHeight: '1.8',
              fontFamily: 'Open Sans, sans-serif'
            }}>
              <p className="text-xl mb-8 font-medium" style={{ color: 'hsl(var(--biz-navy) / 0.9)' }}>
                There is a particular moment in a founder's journey when the reality hits. It usually happens at 2 AM, alone in the office, staring at a spreadsheet that does not make sense. The revenue looks good on the surface, but the business is running out of cash. Or margins that seemed stable have quietly eroded. Or a customer that represented 30% of revenue just left, and no one had planned for that vulnerability.
              </p>

              <p className="mb-6">
                In that moment, one thought crystallizes: <em>I do not actually know my business.</em>
              </p>

              <p className="mb-6">
                This is more common than you might think. Many small business owners operate their companies the way a ship's captain might navigate by landmarks visible from the deck—reacting to what they see in front of them rather than reading the instruments that tell them their true position. The fog of operations obscures the deeper currents of financial reality.
              </p>

              <p className="mb-8">
                The tragedy is that this blind spot is entirely preventable. The difference between a business that thrives and one that merely survives often comes down to one thing: whether the owner truly understands their financial picture with precision and candor.
              </p>

              <div className="p-6 rounded-lg mb-8" style={{ 
                backgroundColor: 'hsl(var(--biz-green) / 0.15)', 
                borderLeft: '4px solid hsl(var(--biz-green))',
              }}>
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'hsl(var(--biz-green))' }} />
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>The Goal of Financial Literacy</h4>
                    <p className="text-sm" style={{ color: 'hsl(var(--biz-navy) / 0.8)' }}>
                      This article is about building that understanding. It is not about becoming an accountant. It is about becoming a strategic decision-maker who can read their business like a ship's captain reads a compass.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6" style={{ 
                color: 'hsl(var(--biz-navy))',
                fontFamily: 'Merriweather, Georgia, serif'
              }}>
                Why Most Small Business Owners Avoid Their Numbers
              </h2>

              <p className="mb-6">
                Before we dive into which numbers matter, let us address the elephant in the room: Why do so many founders avoid looking at their financials with honest intensity?
              </p>

              {/* Reason 1 */}
              <h3 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <span className="flex items-center justify-center w-10 h-10 rounded-lg font-bold" style={{ backgroundColor: '#242553', color: '#ffffff' }}>1</span>
                Fear of What They Will Find
              </h3>

              <p className="mb-6">
                The first reason is fear. If a business is struggling, the numbers will confirm it. As long as you do not look too closely, there is hope. The moment you stare at a spreadsheet and see the truth, you become responsible for acting on it. That is uncomfortable.
              </p>

              {/* Reason 2 */}
              <h3 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <span className="flex items-center justify-center w-10 h-10 rounded-lg font-bold" style={{ backgroundColor: '#242553', color: '#ffffff' }}>2</span>
                Numbness from Complexity
              </h3>

              <p className="mb-6">
                The second reason is that financial statements are often presented in ways that obscure meaning rather than illuminate it. A traditional balance sheet, income statement, and cash flow statement are useful for accountants and lenders, but they are not always designed for operational decision-makers. A founder can glance at their P&L, see that revenue is up 15%, and feel like they understand their business—when in reality, they are seeing only one slice of a much more complex picture.
              </p>

              {/* Reason 3 */}
              <h3 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <span className="flex items-center justify-center w-10 h-10 rounded-lg font-bold" style={{ backgroundColor: '#242553', color: '#ffffff' }}>3</span>
                Misplaced Trust
              </h3>

              <p className="mb-6">
                The third reason is misplaced delegation. A founder hires a bookkeeper or accountant and assumes that person is watching the numbers. The bookkeeper is accurate—they record transactions faithfully. But they are not interpreting the data or flagging anomalies. They are not asking, "Why did COGS suddenly jump?" or "Why is our inventory turnover slowing?" The bookkeeper keeps accurate records; they do not drive strategy.
              </p>

              {/* Reason 4 */}
              <h3 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <span className="flex items-center justify-center w-10 h-10 rounded-lg font-bold" style={{ backgroundColor: '#242553', color: '#ffffff' }}>4</span>
                The Distraction of Operations
              </h3>

              <p className="mb-6">
                Finally, in the chaos of daily operations, financial analysis feels like a luxury. There is a customer problem to solve, a team member to manage, a product feature to prioritize. Financial review gets pushed to "when things slow down." But things never slow down.
              </p>

              <div className="p-6 rounded-lg mb-8" style={{ 
                backgroundColor: 'hsl(var(--destructive) / 0.1)', 
                borderLeft: '4px solid hsl(var(--destructive))',
              }}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'hsl(var(--destructive))' }} />
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>The Dangerous Result</h4>
                    <p className="text-sm" style={{ color: 'hsl(var(--biz-navy) / 0.8)' }}>
                      Many small business owners are flying blind, guided by intuition and hope rather than data and strategy.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6" style={{ 
                color: 'hsl(var(--biz-navy))',
                fontFamily: 'Merriweather, Georgia, serif'
              }}>
                The Three Financial Statements You Must Understand
              </h2>

              <p className="mb-8">
                Let us start with the foundation: the three core financial statements. This is not accounting trivia. These three documents tell the complete story of your business.
              </p>

              {/* Income Statement */}
              <h3 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <FileText className="w-6 h-6" style={{ color: 'hsl(var(--biz-green))' }} />
                1. The Income Statement (P&L): Revenue Minus Everything
              </h3>

              <p className="mb-4">
                The income statement answers one question: <strong>Did we make money this period?</strong>
              </p>

              <p className="mb-6">
                It is a flow statement—it shows money coming in and money going out over a specific time period (usually a month or year).
              </p>

              <div className="p-6 rounded-lg mb-6" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                <h4 className="font-bold mb-4" style={{ color: 'hsl(var(--biz-navy))' }}>The Basic Structure:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'hsl(var(--biz-green))' }} />
                    <span><strong>Revenue:</strong> All the money that came in from customers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'hsl(var(--biz-green))' }} />
                    <span><strong>Cost of Goods Sold (COGS):</strong> The direct cost to deliver your product or service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'hsl(var(--biz-green))' }} />
                    <span><strong>Gross Profit:</strong> Revenue minus COGS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'hsl(var(--biz-green))' }} />
                    <span><strong>Operating Expenses:</strong> Payroll, rent, software subscriptions, marketing, utilities, etc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'hsl(var(--biz-green))' }} />
                    <span><strong>EBITDA:</strong> Earnings Before Interest, Taxes, Depreciation, and Amortization (a measure of operational profitability)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'hsl(var(--biz-green))' }} />
                    <span><strong>Net Income:</strong> The bottom line—what actually remains after everything</span>
                  </li>
                </ul>
              </div>

              <p className="mb-6">
                <strong>Why it matters:</strong> The P&L tells you whether your business model works in principle. If your gross margin is negative (COGS exceeds revenue), you have a fundamental problem that no amount of scale will fix. If your operating expenses are spiraling, you have a cost control problem. If net income is negative but EBITDA is positive, you have a tax or financing structure issue, not an operational one.
              </p>

              <div className="p-6 rounded-lg mb-8" style={{ 
                backgroundColor: 'hsl(var(--biz-green) / 0.15)', 
                borderLeft: '4px solid hsl(var(--biz-green))',
              }}>
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'hsl(var(--biz-green))' }} />
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>The Insight Most Owners Miss</h4>
                    <p className="text-sm" style={{ color: 'hsl(var(--biz-navy) / 0.8)' }}>
                      Revenue growth does not equal profit growth. A business can grow revenue 50% and shrink profit by 20% if the costs of serving those new customers are not managed. This is why your P&L must be reviewed not just monthly, but with trend analysis—comparing this month to last month, this quarter to last year's same quarter. Trends reveal the story that a single snapshot cannot tell.
                    </p>
                  </div>
                </div>
              </div>

              {/* Balance Sheet */}
              <h3 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <BarChart3 className="w-6 h-6" style={{ color: 'hsl(var(--biz-green))' }} />
                2. The Balance Sheet: A Snapshot of Health
              </h3>

              <p className="mb-4">
                The balance sheet answers: <strong>What does the business own, and what does it owe?</strong>
              </p>

              <p className="mb-6">
                Unlike the P&L, which is a flow, the balance sheet is a snapshot at a specific point in time. It divides the business into three parts:
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                  <h5 className="font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>Assets (what you own)</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Cash</li>
                    <li>• Accounts receivable</li>
                    <li>• Inventory</li>
                    <li>• Equipment</li>
                    <li>• Intellectual property</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                  <h5 className="font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>Liabilities (what you owe)</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Accounts payable</li>
                    <li>• Short-term debt</li>
                    <li>• Long-term debt</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                  <h5 className="font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>Equity (what is left)</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Owner's equity</li>
                    <li>• Retained earnings</li>
                  </ul>
                </div>
              </div>

              <p className="mb-4 font-semibold" style={{ color: 'hsl(var(--biz-navy))' }}>
                The fundamental equation is: Assets = Liabilities + Equity
              </p>

              <p className="mb-6">
                <strong>Why it matters:</strong> The balance sheet reveals structural health. If your current liabilities (debts due within a year) exceed your current assets (cash and things convertible to cash quickly), you have a solvency problem. If your accounts receivable are growing faster than your revenue, customers are taking longer to pay. If inventory is piling up, you have a demand forecasting problem.
              </p>

              <div className="p-6 rounded-lg mb-8" style={{ 
                backgroundColor: 'hsl(var(--biz-green) / 0.15)', 
                borderLeft: '4px solid hsl(var(--biz-green))',
              }}>
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'hsl(var(--biz-green))' }} />
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>The Insight Most Owners Miss</h4>
                    <p className="text-sm" style={{ color: 'hsl(var(--biz-navy) / 0.8)' }}>
                      The balance sheet is where you discover hidden problems. A business can look profitable on the P&L but be technically insolvent on the balance sheet if it has taken on too much debt or has assets that cannot be converted to cash. Many small businesses fail not because they are unprofitable, but because they run out of cash. The balance sheet is where you see that danger coming.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cash Flow Statement */}
              <h3 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <DollarSign className="w-6 h-6" style={{ color: 'hsl(var(--biz-green))' }} />
                3. The Cash Flow Statement: The True Measure of Survival
              </h3>

              <p className="mb-4">
                The cash flow statement answers: <strong>How much actual cash moved in and out of the business, and where did it go?</strong>
              </p>

              <p className="mb-6">
                This is the most important statement for small business owners, yet it is often the most neglected.
              </p>

              <div className="p-6 rounded-lg mb-6" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                <h4 className="font-bold mb-4" style={{ color: 'hsl(var(--biz-navy))' }}>Cash Flow Has Three Sections:</h4>
                <ul className="space-y-4">
                  <li>
                    <strong>Operating Cash Flow:</strong> Cash generated (or consumed) by running the business. This can differ dramatically from net income because it accounts for timing. You might have sold $100K worth of products but only received $60K in cash because customers have not paid yet.
                  </li>
                  <li>
                    <strong>Investing Cash Flow:</strong> Cash spent on or received from investments in assets—new equipment, office build-out, acquisitions of other businesses.
                  </li>
                  <li>
                    <strong>Financing Cash Flow:</strong> Cash from or returned to investors and lenders.
                  </li>
                </ul>
              </div>

              <p className="mb-6">
                <strong>Why it matters:</strong> The cash flow statement is where you see whether your business can actually pay its bills. Net income is an accounting construct; cash is reality. A business can be profitable on paper and still fail because it cannot meet payroll or pay suppliers.
              </p>

              <div className="p-6 rounded-lg mb-8" style={{ 
                backgroundColor: 'hsl(var(--biz-green) / 0.15)', 
                borderLeft: '4px solid hsl(var(--biz-green))',
              }}>
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'hsl(var(--biz-green))' }} />
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>The Insight Most Owners Miss</h4>
                    <p className="text-sm" style={{ color: 'hsl(var(--biz-navy) / 0.8)' }}>
                      Cash flow and profitability are not the same. A rapidly growing business might have negative cash flow despite being profitable, because growth consumes cash. You have to buy inventory before you sell it. You have to pay suppliers before customers pay you. If you do not understand this dynamic, you will be caught off guard when growth strains your cash runway.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6" style={{ 
                color: 'hsl(var(--biz-navy))',
                fontFamily: 'Merriweather, Georgia, serif'
              }}>
                Beyond the Big Three: The Metrics That Drive Decisions
              </h2>

              <p className="mb-8">
                The three financial statements are the foundation. But if you only read them at year-end when your accountant delivers them, you are operating with a six-month lag. By the time you see a problem, it is too late to prevent it.
              </p>

              {/* Unit Economics */}
              <h3 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'hsl(var(--biz-navy))' }}>
                Unit Economics: The Foundation of Profitability
              </h3>

              <p className="mb-6">
                Unit economics asks: <strong>For each unit of product or service sold, how much profit do we make?</strong>
              </p>

              <p className="mb-6">
                For a SaaS company, the unit is a subscription customer. For an e-commerce business, it is a product sold. For a service business, it is an hour of labor or a project completed.
              </p>

              <div className="p-6 rounded-lg mb-6" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                <h4 className="font-bold mb-4" style={{ color: 'hsl(var(--biz-navy))' }}>Key Metrics:</h4>
                <ul className="space-y-4">
                  <li>
                    <strong>Contribution Margin:</strong> Revenue per unit minus the direct cost to produce that unit. If you sell a product for $100 and the COGS is $30, your contribution margin is $70. This tells you how much of each dollar goes toward covering fixed costs and generating profit.
                  </li>
                  <li>
                    <strong>Customer Acquisition Cost (CAC):</strong> The average cost to acquire a new customer. If you spend $10,000 on marketing and land 50 customers, your CAC is $200. This matters because it determines your payback period.
                  </li>
                  <li>
                    <strong>Customer Lifetime Value (LTV):</strong> The total profit a customer generates over the lifetime of their relationship with you. If a customer pays $500/month and stays for 24 months, and your contribution margin is 70%, your LTV is approximately $8,400.
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-lg mb-8" style={{ 
                backgroundColor: 'hsl(var(--biz-navy) / 0.1)',
                border: '2px solid hsl(var(--biz-navy) / 0.2)'
              }}>
                <h4 className="font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>The Ratio That Matters: LTV to CAC</h4>
                <p className="mb-2" style={{ color: 'hsl(var(--biz-navy) / 0.8)' }}>
                  <strong>LTV to CAC should be at least 3:1.</strong> If your CAC is $200 and your LTV is $400, you are barely covering acquisition costs. If your LTV is $600, you have a sustainable business.
                </p>
                <p className="text-sm" style={{ color: 'hsl(var(--biz-navy) / 0.7)' }}>
                  If your LTV is lower than your CAC, you are losing money on every customer you acquire. No amount of scale will fix that problem.
                </p>
              </div>

              {/* Cash Conversion Cycle */}
              <h3 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'hsl(var(--biz-navy))' }}>
                Cash Conversion Cycle: The Hidden Constraint
              </h3>

              <p className="mb-6">
                The cash conversion cycle measures the number of days between when you spend cash and when you collect it.
              </p>

              <div className="p-4 rounded-lg mb-6 text-center" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                <p className="font-mono font-bold" style={{ color: 'hsl(var(--biz-navy))' }}>
                  Days Inventory Outstanding + Days Sales Outstanding - Days Payable Outstanding
                </p>
                <p className="text-sm mt-2" style={{ color: 'hsl(var(--biz-navy) / 0.7)' }}>
                  In plain English: How long cash is tied up in the business.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                  <h5 className="font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>Retailer Example</h5>
                  <p className="text-sm">
                    You buy inventory (spend cash), hold it for 30 days before it sells, then wait another 15 days for customers to pay. You pay suppliers in 45 days. Your cycle is 30 + 15 - 45 = 0 days. You are even.
                  </p>
                  <p className="text-sm mt-2 font-medium" style={{ color: 'hsl(var(--biz-green))' }}>
                    Extend payment terms to 60 days? Your cycle becomes -15 days. Suppliers finance your working capital!
                  </p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                  <h5 className="font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>Services Example</h5>
                  <p className="text-sm">
                    Customers pay 60 days after invoice, but you pay employees weekly. Your cycle might be 60 - 7 = 53 days.
                  </p>
                  <p className="text-sm mt-2 font-medium" style={{ color: 'hsl(var(--destructive))' }}>
                    Grow from $10K/month to $50K/month in payroll? You suddenly need an additional $70K in cash to cover the gap.
                  </p>
                </div>
              </div>

              <p className="mb-8">
                <strong>Why it matters:</strong> Many small businesses fail not because they are unprofitable but because they do not manage working capital. A business that improves its cash conversion cycle can fund growth from operations rather than needing external financing.
              </p>

              {/* Burn Rate */}
              <h3 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'hsl(var(--biz-navy))' }}>
                Burn Rate and Runway: For Early-Stage and Unprofitable Businesses
              </h3>

              <p className="mb-6">
                If your business is not yet profitable, you need to know your <strong>burn rate</strong>—how much cash you are consuming each month.
              </p>

              <p className="mb-6">
                If you have $100K in the bank and you are burning $10K per month, you have 10 months of runway. This is the number that should keep you awake at night. It tells you how long you have to reach profitability or secure additional financing.
              </p>

              <p className="mb-8">
                <strong>Why it matters:</strong> Runway forces discipline. If you know you have 10 months to reach break-even, you can prioritize ruthlessly. What can you cut? What must you protect? What is the minimum viable business?
              </p>

              {/* Margins */}
              <h3 className="text-2xl font-bold mt-10 mb-4" style={{ color: 'hsl(var(--biz-navy))' }}>
                Gross Margin and Operating Margin: The Efficiency Measures
              </h3>

              <p className="mb-6">
                <strong>Gross margin</strong> tells you how much of each revenue dollar is left after covering the direct cost of the product or service.
              </p>

              <p className="mb-6">
                <strong>Operating margin</strong> tells you how much of each revenue dollar becomes profit after covering all operating expenses.
              </p>

              <p className="mb-6">
                If your gross margin is 60% but your operating margin is 10%, you have healthy unit economics but bloated overhead. This tells you where to focus your cost-cutting efforts—it is not your product delivery; it is your operations.
              </p>

              <p className="mb-8">
                <strong>Why it matters:</strong> These ratios allow you to benchmark your business against competitors and against your own history. If your gross margin has declined from 65% to 58%, something has changed—pricing pressures, input cost inflation, product mix shift, or operational inefficiency. You need to know which one.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6" style={{ 
                color: 'hsl(var(--biz-navy))',
                fontFamily: 'Merriweather, Georgia, serif'
              }}>
                The Business Health Dashboard: Your Real-Time Control Panel
              </h2>

              <p className="mb-6">
                Understanding individual metrics is important, but what matters most is seeing how they interconnect. This is where a dashboard comes in.
              </p>

              <p className="mb-8">
                A financial dashboard is not complicated. It is simply the 5-10 metrics that matter most for your specific business, reviewed regularly (weekly or monthly), with targets and alerts.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-lg" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                  <h4 className="font-bold mb-4" style={{ color: 'hsl(var(--biz-navy))' }}>Example for a SaaS Company:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Monthly Recurring Revenue (MRR) and MRR Growth Rate</li>
                    <li>• Churn Rate</li>
                    <li>• CAC and LTV</li>
                    <li>• Burn Rate and Runway</li>
                    <li>• Net Revenue Retention</li>
                  </ul>
                </div>
                <div className="p-6 rounded-lg" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                  <h4 className="font-bold mb-4" style={{ color: 'hsl(var(--biz-navy))' }}>Example for a Service Business:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Billable Utilization Rate</li>
                    <li>• Average Project Margin</li>
                    <li>• Days Sales Outstanding</li>
                    <li>• Employee Turnover</li>
                  </ul>
                </div>
              </div>

              <p className="mb-6">
                The key is consistency. Review the same metrics month after month. <strong>Trends matter more than individual data points.</strong>
              </p>

              <div className="p-6 rounded-lg mb-8" style={{ 
                backgroundColor: 'hsl(var(--biz-green) / 0.15)', 
                borderLeft: '4px solid hsl(var(--biz-green))',
              }}>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'hsl(var(--biz-green))' }} />
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>How BizHealth.ai Helps</h4>
                    <p className="text-sm" style={{ color: 'hsl(var(--biz-navy) / 0.8)' }}>
                      Tools like <Link to="/" className="underline font-semibold">BizHealth.ai</Link> can be instrumental in this process, aggregating data from your accounting systems and presenting it in ways that make anomalies and trends visible. Rather than waiting for your accountant to deliver a report three weeks after month-end, you can see your numbers in real-time and catch problems before they become crises.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6" style={{ 
                color: 'hsl(var(--biz-navy))',
                fontFamily: 'Merriweather, Georgia, serif'
              }}>
                The Uncomfortable Questions: Financial Honesty
              </h2>

              <p className="mb-8">
                Understanding your numbers is only the beginning. The real work is asking yourself hard questions about what those numbers reveal.
              </p>

              {/* Question 1 */}
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>
                  Question 1: Are We Actually Profitable?
                </h4>
                <p>
                  Many business owners confuse revenue with profitability. Be honest: On a per-unit basis, are we making money? Or are we subsidizing every sale with equity, hoping that scale will eventually make us profitable?
                </p>
              </div>

              {/* Question 2 */}
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>
                  Question 2: What Is Our Real Customer Acquisition Cost?
                </h4>
                <p>
                  Do not just measure marketing spend. Include all the time the founder and team spend courting customers. Include product discounts offered to early customers. Include the cost of the sales person who landed the deal. What is the true cost?
                </p>
              </div>

              {/* Question 3 */}
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>
                  Question 3: Are We Growing or Just Getting Busier?
                </h4>
                <p>
                  Revenue growth is not the same as profit growth. Are our margins expanding or contracting as we grow? Are we acquiring profitable customers or unprofitable ones?
                </p>
              </div>

              {/* Question 4 */}
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>
                  Question 4: What Is Our Cash Position Really Telling Us?
                </h4>
                <p>
                  Do we have enough cash to weather a 20% revenue decline? Do we have enough to invest in growth initiatives without external financing? Be honest about runway.
                </p>
              </div>

              {/* Question 5 */}
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>
                  Question 5: Which Customers Are Actually Valuable?
                </h4>
                <p>
                  Segment your customer base. Analyze profitability by customer, by geography, by product line. You might find that 80% of your profit comes from 20% of your customers. This tells you where to focus energy and where to potentially raise prices or exit.
                </p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6" style={{ 
                color: 'hsl(var(--biz-navy))',
                fontFamily: 'Merriweather, Georgia, serif'
              }}>
                From Numbers to Strategy
              </h2>

              <p className="mb-6">
                Here is the critical insight: <strong>Financial analysis is not an accounting exercise. It is a strategic tool.</strong>
              </p>

              <p className="mb-6">
                When you understand your unit economics, you know whether you can afford to acquire new customers at a lower cost. When you understand your cash conversion cycle, you know whether you can fund growth organically or need to raise capital. When you understand your margins by customer segment, you know which markets to enter and which to abandon.
              </p>

              <p className="mb-8">
                Numbers do not make decisions for you. But they transform decision-making from intuition and hope into strategy and evidence.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6" style={{ 
                color: 'hsl(var(--biz-navy))',
                fontFamily: 'Merriweather, Georgia, serif'
              }}>
                The Path Forward: From Blindness to Insight
              </h2>

              <p className="mb-8">
                The journey from financial ignorance to financial literacy does not require becoming an accountant. It requires three things:
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full font-bold flex-shrink-0" style={{ backgroundColor: '#242553', color: '#ffffff' }}>1</span>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: 'hsl(var(--biz-navy))' }}>Discipline</h4>
                    <p>Set aside time monthly to review your numbers. Not quarterly. Not annually. Monthly. Build the habit of knowing.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full font-bold flex-shrink-0" style={{ backgroundColor: '#242553', color: '#ffffff' }}>2</span>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: 'hsl(var(--biz-navy))' }}>Specificity</h4>
                    <p>Do not just look at the headlines. Dig into the details. Why did that line item change? What is driving that trend? Ask the "why" until you reach root causes.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full font-bold flex-shrink-0" style={{ backgroundColor: '#242553', color: '#ffffff' }}>3</span>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: 'hsl(var(--biz-navy))' }}>Honesty</h4>
                    <p>Do not rationalize away bad numbers. If your retention rate is declining, do not ignore it. If your margins are compressing, do not blame the market. Use the numbers as a mirror to see your business as it actually is, not as you wish it to be.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg mb-8" style={{ 
                backgroundColor: 'hsl(var(--biz-navy))',
                color: 'white'
              }}>
                <p className="text-lg font-medium text-center">
                  The most successful business owners are not mathematical geniuses. They are people who know their numbers with precision and have the discipline to act on what those numbers reveal.
                </p>
                <p className="text-center mt-4 text-lg font-bold">
                  When you know your numbers, you know your business. And when you know your business, you can actually lead it.
                </p>
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-6 rounded-lg" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'hsl(var(--biz-navy))' }}>
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: 'hsl(var(--biz-navy))' }}>About the Author</h4>
                    <p className="font-semibold" style={{ color: 'hsl(var(--biz-navy) / 0.9)' }}>{author}</p>
                    <p className="text-sm mt-2" style={{ color: 'hsl(var(--foreground) / 0.7)' }}>
                      The BizHealth.ai Strategic Insights team combines expertise in small business finance, strategic planning, and data-driven decision making. Our mission is to help business owners understand and optimize their financial health through actionable, accessible guidance.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-12 p-8 rounded-xl text-center" style={{ 
                background: 'linear-gradient(135deg, hsl(var(--biz-navy)) 0%, hsl(var(--biz-navy) / 0.9) 100%)'
              }}>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Ready to Know Your Numbers?
                </h3>
                <p className="text-white/80 mb-6 max-w-lg mx-auto">
                  Get a comprehensive view of your business health with BizHealth.ai's AI-powered diagnostic tools. Understand your financials, identify blind spots, and make data-driven decisions.
                </p>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:gap-3"
                  style={{ backgroundColor: 'hsl(var(--biz-green))', color: 'white' }}
                >
                  Get Your Business Health Assessment
                  <TrendingUp className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} />

        <PromotionalBanner />
        <GlobalFooter />
      </article>
    </>
  );
};

export default SmallBusinessFinancialsKnowYourNumbers;
