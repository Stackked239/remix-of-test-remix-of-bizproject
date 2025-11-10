import { useState } from 'react';
import { Plus, Search, FileText, Edit, Download, Trash2, Copy } from 'lucide-react';
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
        return 'bg-muted text-muted-foreground';
      case 'in-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-muted text-muted-foreground';
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
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-foreground">
          Process Mapping & SOP Builder
        </h1>
        <p className="text-lg text-muted-foreground">
          Create, document, and optimize your business processes with professional SOPs
        </p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Button onClick={onCreateNew} size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          Create New Process Map
        </Button>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search processes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredProcesses.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              {searchQuery ? 'No processes found' : 'No processes yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? 'Try adjusting your search'
                : 'Create your first process map to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={onCreateNew}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Process
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProcesses.map((process) => (
            <Card key={process.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{process.name}</CardTitle>
                    <CardDescription>{process.department}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(process.status)}>
                    {process.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Owner:</span>
                    <span className="font-medium text-foreground">{process.owner}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Steps:</span>
                    <span className="font-medium text-foreground">{process.nodes.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Frequency:</span>
                    <span className="font-medium text-foreground capitalize">
                      {process.frequency.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="text-xs pt-2 border-t">
                    Updated {formatDistanceToNow(new Date(process.updatedAt), { addSuffix: true })}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(process.id)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDuplicate(process.id)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
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
      <div className="mt-12 p-6 bg-muted/50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-start h-auto py-4">
            <div className="text-left">
              <div className="font-semibold">Import Existing Process</div>
              <div className="text-sm text-muted-foreground">Upload JSON or CSV file</div>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-4">
            <div className="text-left">
              <div className="font-semibold">Browse Templates</div>
              <div className="text-sm text-muted-foreground">Start from pre-built processes</div>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-4">
            <div className="text-left">
              <div className="font-semibold">Getting Started Guide</div>
              <div className="text-sm text-muted-foreground">Learn how to use the tool</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProcessDashboard;
