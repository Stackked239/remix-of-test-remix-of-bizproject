import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  category: string;
  description: string;
  isRecurring: boolean;
  recurringFrequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'annually';
  vendor?: string;
  paymentMethod?: string;
  tags?: string[];
  status?: 'received' | 'pending' | 'overdue' | 'paid' | 'scheduled';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  issueDate: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
  taxRate: number;
  discount: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  notes?: string;
}

export interface BusinessProfile {
  businessName: string;
  industry: string;
  fiscalYearStart: number;
  currency: string;
  operatingExpenseThreshold: number;
}

interface CashFlowContextType {
  transactions: Transaction[];
  invoices: Invoice[];
  businessProfile: BusinessProfile;
  startingBalance: number;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  updateBusinessProfile: (profile: Partial<BusinessProfile>) => void;
  updateStartingBalance: (balance: number) => void;
  clearAllData: () => void;
  loadSampleData: () => void;
}

const CashFlowContext = createContext<CashFlowContextType | undefined>(undefined);

const STORAGE_KEY = 'bizhealth_cashflow_data';

const defaultBusinessProfile: BusinessProfile = {
  businessName: 'My Business',
  industry: 'General',
  fiscalYearStart: 1,
  currency: 'USD',
  operatingExpenseThreshold: 10000,
};

export const CashFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(defaultBusinessProfile);
  const [startingBalance, setStartingBalance] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setTransactions(data.transactions || []);
        setInvoices(data.invoices || []);
        setBusinessProfile(data.businessProfile || defaultBusinessProfile);
        setStartingBalance(data.startingBalance || 0);
      } catch (error) {
        console.error('Error loading cash flow data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const data = {
      transactions,
      invoices,
      businessProfile,
      startingBalance,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [transactions, invoices, businessProfile, startingBalance]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    setTransactions([...transactions, newTransaction]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
    const newInvoice = {
      ...invoice,
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    setInvoices([...invoices, newInvoice]);
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, ...updates } : inv));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
  };

  const updateBusinessProfile = (updates: Partial<BusinessProfile>) => {
    setBusinessProfile({ ...businessProfile, ...updates });
  };

  const updateStartingBalance = (balance: number) => {
    setStartingBalance(balance);
  };

  const clearAllData = () => {
    setTransactions([]);
    setInvoices([]);
    setBusinessProfile(defaultBusinessProfile);
    setStartingBalance(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  const loadSampleData = () => {
    const today = new Date();
    const sampleTransactions: Transaction[] = [
      {
        id: 'sample_1',
        type: 'income',
        amount: 5000,
        date: new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0],
        category: 'Sales Revenue',
        description: 'Product sales - January',
        isRecurring: true,
        recurringFrequency: 'monthly',
        status: 'received',
        tags: ['sales', 'products'],
      },
      {
        id: 'sample_2',
        type: 'expense',
        amount: 2000,
        date: new Date(today.getFullYear(), today.getMonth(), 5).toISOString().split('T')[0],
        category: 'Payroll',
        description: 'Employee salaries',
        isRecurring: true,
        recurringFrequency: 'monthly',
        vendor: 'Payroll Service',
        paymentMethod: 'Bank Transfer',
        status: 'paid',
        tags: ['payroll', 'fixed'],
      },
      {
        id: 'sample_3',
        type: 'expense',
        amount: 500,
        date: new Date(today.getFullYear(), today.getMonth(), 10).toISOString().split('T')[0],
        category: 'Marketing',
        description: 'Social media ads',
        isRecurring: false,
        vendor: 'Ad Platform',
        paymentMethod: 'Credit Card',
        status: 'paid',
        tags: ['marketing', 'variable'],
      },
    ];

    setTransactions(sampleTransactions);
    setStartingBalance(10000);
  };

  return (
    <CashFlowContext.Provider
      value={{
        transactions,
        invoices,
        businessProfile,
        startingBalance,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        updateBusinessProfile,
        updateStartingBalance,
        clearAllData,
        loadSampleData,
      }}
    >
      {children}
    </CashFlowContext.Provider>
  );
};

export const useCashFlow = () => {
  const context = useContext(CashFlowContext);
  if (!context) {
    throw new Error('useCashFlow must be used within CashFlowProvider');
  }
  return context;
};
