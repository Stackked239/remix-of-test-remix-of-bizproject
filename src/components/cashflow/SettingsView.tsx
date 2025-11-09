import { useState } from 'react';
import { useCashFlow } from '@/contexts/CashFlowContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Download, Upload, Trash2, Database } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const SettingsView = () => {
  const { 
    businessProfile, 
    startingBalance, 
    updateBusinessProfile, 
    updateStartingBalance,
    clearAllData,
    loadSampleData,
    transactions,
    invoices
  } = useCashFlow();
  
  const { toast } = useToast();
  const [balance, setBalance] = useState(startingBalance.toString());

  const handleSaveProfile = () => {
    toast({
      title: "Settings Saved",
      description: "Your business profile has been updated"
    });
  };

  const handleSaveBalance = () => {
    updateStartingBalance(parseFloat(balance));
    toast({
      title: "Starting Balance Updated",
      description: "Your starting balance has been saved"
    });
  };

  const handleExportData = () => {
    const data = {
      businessProfile,
      startingBalance,
      transactions,
      invoices,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cashflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Data Exported",
      description: "Your data has been downloaded as a JSON file"
    });
  };

  const handleLoadSample = () => {
    if (confirm('This will load sample data. Continue?')) {
      loadSampleData();
      toast({
        title: "Sample Data Loaded",
        description: "Demo transactions have been added to help you explore features"
      });
    }
  };

  const handleClearAll = () => {
    if (confirm('This will delete all your data permanently. Are you sure?')) {
      if (confirm('This action cannot be undone. Continue?')) {
        clearAllData();
        setBalance('0');
        toast({
          title: "Data Cleared",
          description: "All data has been permanently deleted",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Business Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
          <CardDescription>Configure your business information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={businessProfile.businessName}
              onChange={(e) => updateBusinessProfile({ businessName: e.target.value })}
              placeholder="Enter your business name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select 
              value={businessProfile.industry} 
              onValueChange={(value) => updateBusinessProfile({ industry: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Retail">Retail</SelectItem>
                <SelectItem value="Services">Services</SelectItem>
                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select 
              value={businessProfile.currency} 
              onValueChange={(value) => updateBusinessProfile({ currency: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="CAD">CAD ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSaveProfile} className="bg-biz-navy hover:bg-biz-navy/90">
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Starting Balance */}
      <Card>
        <CardHeader>
          <CardTitle>Starting Balance</CardTitle>
          <CardDescription>Set your initial cash position</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="balance">Starting Cash Balance ($)</Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="0.00"
            />
            <p className="text-sm text-muted-foreground">
              This is your cash balance before any tracked transactions
            </p>
          </div>

          <Button onClick={handleSaveBalance} className="bg-biz-navy hover:bg-biz-navy/90">
            Update Balance
          </Button>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export, import, or reset your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={handleExportData} variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Download className="w-6 h-6" />
              <div className="text-center">
                <div className="font-semibold">Export All Data</div>
                <div className="text-xs text-muted-foreground">Download as JSON</div>
              </div>
            </Button>

            <Button onClick={handleLoadSample} variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Database className="w-6 h-6" />
              <div className="text-center">
                <div className="font-semibold">Load Sample Data</div>
                <div className="text-xs text-muted-foreground">For testing</div>
              </div>
            </Button>
          </div>

          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="ml-2">
              Danger Zone
            </AlertDescription>
          </Alert>

          <Button 
            onClick={handleClearAll} 
            variant="destructive"
            className="w-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All Data
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            This action cannot be undone. All transactions and settings will be permanently deleted.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsView;
