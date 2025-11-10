import { useState } from 'react';
import { Plus, Search, FileText, Edit, Download, Trash2, Copy, BookOpen, Sparkles, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProcessMapStore } from '@/stores/processMapStore';
import { formatDistanceToNow } from 'date-fns';

interface ProcessDashboardProps {
  onCreateNew: () => void;
}

const ProcessDashboard = ({ onCreateNew }: ProcessDashboardProps) => {
  const { processes, setCurrentProcess, deleteProcess, duplicateProcess } = useProcessMapStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProcesses = processes.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const handleEdit = (processId: string) => {
    setCurrentProcess(processId);
  };

  const handleDelete = (processId: string) => {
    if (confirm('Are you sure you want to delete this process?')) {
      deleteProcess(processId);
    }
  };

  const handleDuplicate = (processId: string) => {
    duplicateProcess(processId);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Header */}
      <div className="mb-12 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-biz-green/5 to-biz-copper/5 rounded-3xl blur-3xl -z-10"></div>
        <div className="relative bg-gradient-to-br from-background via-primary/5 to-biz-green/5 rounded-2xl p-8 border border-primary/10 shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-biz-green to-biz-navy bg-clip-text text-transparent">
              Process Mapping & SOP Builder
            </h1>
            <Sparkles className="w-6 h-6 text-biz-green animate-pulse" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create, document, and optimize your business processes with professional SOPs
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border/50 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={onCreateNew} 
            size="lg" 
            className="gap-2 bg-gradient-to-r from-primary to-biz-green hover:from-primary/90 hover:to-biz-green/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Create New Process Map
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2 border-2 hover:bg-primary/5 hover:border-primary transition-all duration-300"
          >
            <BookOpen className="w-5 h-5" />
            Getting Started Guide
          </Button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search processes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 border-2 focus:border-primary shadow-sm"
          />
        </div>
      </div>

      {filteredProcesses.length === 0 ? (
        <Card className="text-center py-16 border-2 border-dashed border-primary/20 bg-gradient-to-br from-background to-primary/5 shadow-lg animate-fade-in">
          <CardContent>
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
              <FileText className="w-20 h-20 mx-auto text-primary relative" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">
              {searchQuery ? 'No processes found' : 'No processes yet'}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {searchQuery
                ? 'Try adjusting your search criteria'
                : 'Create your first process map to streamline your operations and build standardized procedures'}
            </p>
            {!searchQuery && (
              <Button onClick={onCreateNew} size="lg" className="gap-2 bg-gradient-to-r from-primary to-biz-green hover:from-primary/90 hover:to-biz-green/90">
                <Plus className="w-5 h-5" />
                Create Your First Process
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProcesses.map((process) => (
            <Card 
              key={process.id} 
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30 bg-gradient-to-br from-background to-primary/5 group animate-fade-in"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {process.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Zap className="w-3 h-3" />
                      {process.department}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(process.status)} border`}>
                    {process.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Owner:</span>
                    <span className="font-medium text-foreground">{process.owner}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Steps:</span>
                    <span className="font-bold text-primary">{process.nodes.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Frequency:</span>
                    <span className="font-medium text-foreground capitalize">
                      {process.frequency.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs pt-2 border-t text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    Updated {formatDistanceToNow(new Date(process.updatedAt), { addSuffix: true })}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-primary to-biz-green hover:from-primary/90 hover:to-biz-green/90"
                  onClick={() => handleEdit(process.id)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary/5 hover:border-primary"
                  onClick={() => handleDuplicate(process.id)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-destructive/5 hover:border-destructive hover:text-destructive"
                  onClick={() => handleDelete(process.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-12 p-8 bg-gradient-to-br from-primary/5 via-biz-green/5 to-biz-copper/5 rounded-2xl border-2 border-primary/10 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30 bg-background cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-biz-green/10 rounded-xl group-hover:bg-biz-green/20 transition-colors">
                  <Download className="w-6 h-6 text-biz-green" />
                </div>
                <div className="font-bold text-lg">Import Process</div>
              </div>
              <p className="text-sm text-muted-foreground">Upload JSON or CSV file to import existing workflows</p>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30 bg-background cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-biz-copper/10 rounded-xl group-hover:bg-biz-copper/20 transition-colors">
                  <FileText className="w-6 h-6 text-biz-copper" />
                </div>
                <div className="font-bold text-lg">Browse Templates</div>
              </div>
              <p className="text-sm text-muted-foreground">Start from pre-built processes and customize to your needs</p>
            </CardContent>
          </Card>
          
          <Card 
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30 bg-background cursor-pointer"
            onClick={() => {
              if (filteredProcesses.length === 0) {
                alert('No process maps to download. Create one first!');
                return;
              }
              import('@/utils/processExport').then(({ exportToWord }) => {
                filteredProcesses.forEach(process => {
                  exportToWord(process);
                });
              });
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <div className="font-bold text-lg">Download Maps</div>
              </div>
              <p className="text-sm text-muted-foreground">Export all process maps as .docx files for offline use</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProcessDashboard;
