import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';

const InvoiceManager = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Invoice Management</CardTitle>
              <CardDescription>Create and manage invoices for your clients</CardDescription>
            </div>
            <Button className="bg-biz-lime hover:bg-biz-lime/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Invoice
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No invoices yet</p>
            <p className="text-sm text-muted-foreground mb-4">
              Invoice management feature coming soon. Create professional invoices and track payments.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceManager;
