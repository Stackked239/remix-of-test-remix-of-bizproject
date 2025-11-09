import { useState } from 'react';
import { CashFlowProvider } from '@/contexts/CashFlowContext';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import SEO from '@/components/SEO';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, TrendingUp, TrendingDown, FileText, Settings, BarChart3 } from 'lucide-react';
import CashFlowDashboard from '@/components/cashflow/CashFlowDashboard';
import IncomeManager from '@/components/cashflow/IncomeManager';
import ExpenseManager from '@/components/cashflow/ExpenseManager';
import InvoiceManager from '@/components/cashflow/InvoiceManager';
import ReportsView from '@/components/cashflow/ReportsView';
import SettingsView from '@/components/cashflow/SettingsView';

const CashFlowTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <CashFlowProvider>
      <div className="min-h-screen bg-background">
        <SEO 
          title="Cash Flow Tracker - Free Financial Management Tool | BizHealth.ai"
          description="Track income, expenses, and cash flow for your small business. Free professional-grade financial management tool with Excel export, invoicing, and forecasting."
          canonical="https://bizhealth.ai/biztools/toolbox/cash-flow-tracker"
          keywords="cash flow tracker, small business finance, expense tracking, income management, financial forecasting, invoice management"
        />
        
        <GlobalNavigation />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-biz-navy via-biz-navy/95 to-biz-navy pt-40 pb-12 px-6" style={{ paddingTop: '140px' }}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-4">
              <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-white leading-tight">
                Cash Flow Tracker
              </h1>
              <p className="font-open-sans text-lg text-white/90 max-w-3xl mx-auto">
                Professional-grade financial management for small businesses. Track income, expenses, create invoices, and forecast your cash flow—all in one place.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 px-6">
          <div className="container mx-auto max-w-7xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-card border border-border mb-8 h-auto p-2 gap-2">
                <TabsTrigger 
                  value="dashboard" 
                  className="data-[state=active]:bg-biz-navy data-[state=active]:text-white font-semibold py-3 px-4"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="income"
                  className="data-[state=active]:bg-biz-green data-[state=active]:text-white font-semibold py-3 px-4"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Income</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="expenses"
                  className="data-[state=active]:bg-biz-copper data-[state=active]:text-white font-semibold py-3 px-4"
                >
                  <TrendingDown className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Expenses</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="invoices"
                  className="data-[state=active]:bg-biz-lime data-[state=active]:text-white font-semibold py-3 px-4"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Invoices</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reports"
                  className="data-[state=active]:bg-biz-navy data-[state=active]:text-white font-semibold py-3 px-4"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Reports</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings"
                  className="data-[state=active]:bg-biz-navy data-[state=active]:text-white font-semibold py-3 px-4"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <CashFlowDashboard />
              </TabsContent>

              <TabsContent value="income">
                <IncomeManager />
              </TabsContent>

              <TabsContent value="expenses">
                <ExpenseManager />
              </TabsContent>

              <TabsContent value="invoices">
                <InvoiceManager />
              </TabsContent>

              <TabsContent value="reports">
                <ReportsView />
              </TabsContent>

              <TabsContent value="settings">
                <SettingsView />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <GlobalFooter />
      </div>
    </CashFlowProvider>
  );
};

export default CashFlowTracker;
