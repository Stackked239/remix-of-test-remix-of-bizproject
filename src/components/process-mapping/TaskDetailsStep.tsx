import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useProcessMapStore } from '@/stores/processMapStore';
import { CheckCircle2, Circle, Plus, X } from 'lucide-react';

interface TaskDetailsStepProps {
  onBack: () => void;
  onNext: () => void;
}

const TaskDetailsStep = ({ onBack, onNext }: TaskDetailsStepProps) => {
  const { currentProcess, updateNode } = useProcessMapStore();
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);
  
  const nodes = currentProcess?.nodes.filter((n) => n.type !== 'start' && n.type !== 'end') || [];
  const selectedNode = nodes[selectedNodeIndex];

  const [taskData, setTaskData] = useState({
    assignedRole: selectedNode?.assignedRole || '',
    duration: selectedNode?.data?.duration || { value: 1, unit: 'days' as const },
    inputs: selectedNode?.data?.inputs || [],
    outputs: selectedNode?.data?.outputs || [],
    riskLevel: selectedNode?.data?.riskLevel || 'medium' as const,
    instructions: selectedNode?.data?.instructions || '',
  });

  const [newInput, setNewInput] = useState('');
  const [newOutput, setNewOutput] = useState('');

  const handleSaveTask = () => {
    if (selectedNode) {
      updateNode(selectedNode.id, {
        assignedRole: taskData.assignedRole,
        data: {
          duration: taskData.duration,
          inputs: taskData.inputs,
          outputs: taskData.outputs,
          riskLevel: taskData.riskLevel,
          instructions: taskData.instructions,
        },
      });
    }
  };

  const handleNextTask = () => {
    handleSaveTask();
    if (selectedNodeIndex < nodes.length - 1) {
      setSelectedNodeIndex(selectedNodeIndex + 1);
      const nextNode = nodes[selectedNodeIndex + 1];
      setTaskData({
        assignedRole: nextNode?.assignedRole || '',
        duration: nextNode?.data?.duration || { value: 1, unit: 'days' },
        inputs: nextNode?.data?.inputs || [],
        outputs: nextNode?.data?.outputs || [],
        riskLevel: nextNode?.data?.riskLevel || 'medium',
        instructions: nextNode?.data?.instructions || '',
      });
    }
  };

  const handleAddInput = () => {
    if (newInput.trim()) {
      setTaskData({ ...taskData, inputs: [...taskData.inputs, newInput.trim()] });
      setNewInput('');
    }
  };

  const handleAddOutput = () => {
    if (newOutput.trim()) {
      setTaskData({ ...taskData, outputs: [...taskData.outputs, newOutput.trim()] });
      setNewOutput('');
    }
  };

  const handleComplete = () => {
    handleSaveTask();
    onNext();
  };

  const completedCount = nodes.filter(
    (n) => n.assignedRole && n.data?.instructions
  ).length;

  if (nodes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No tasks to configure. Please add tasks in Step 2.</p>
        <Button onClick={onBack}>← Back to Mapping</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-foreground">Step 3: Add Task Details</h2>
        <p className="text-muted-foreground">
          Enrich each process step with detailed information for your SOP
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Task List Sidebar */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-sm text-foreground">Process Steps ({nodes.length})</h3>
                <span className="text-xs text-muted-foreground">
                  {completedCount}/{nodes.length}
                </span>
              </div>
              
              <div className="space-y-2">
                {nodes.map((node, index) => (
                  <button
                    key={node.id}
                    onClick={() => {
                      handleSaveTask();
                      setSelectedNodeIndex(index);
                      setTaskData({
                        assignedRole: node.assignedRole || '',
                        duration: node.data?.duration || { value: 1, unit: 'days' },
                        inputs: node.data?.inputs || [],
                        outputs: node.data?.outputs || [],
                        riskLevel: node.data?.riskLevel || 'medium',
                        instructions: node.data?.instructions || '',
                      });
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      index === selectedNodeIndex
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-muted border-border'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {node.assignedRole && node.data?.instructions ? (
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <span className="text-sm font-medium">{node.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t">
                <div className="text-xs text-muted-foreground mb-2">Progress</div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(completedCount / nodes.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Details Form */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">{selectedNode?.label}</h3>
              </div>

              <div>
                <Label htmlFor="assignedRole">
                  Assigned Role/Person <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="assignedRole"
                  placeholder="e.g., HR Coordinator"
                  value={taskData.assignedRole}
                  onChange={(e) => setTaskData({ ...taskData, assignedRole: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Estimated Duration</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={taskData.duration.value}
                    onChange={(e) =>
                      setTaskData({
                        ...taskData,
                        duration: { ...taskData.duration, value: parseInt(e.target.value) || 1 },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select
                    value={taskData.duration.unit}
                    onValueChange={(value: any) =>
                      setTaskData({ ...taskData, duration: { ...taskData.duration, unit: value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Inputs (documents/info needed)</Label>
                <div className="space-y-2">
                  {taskData.inputs.map((input, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={input} disabled className="flex-1" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setTaskData({
                            ...taskData,
                            inputs: taskData.inputs.filter((_, i) => i !== index),
                          })
                        }
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add input..."
                      value={newInput}
                      onChange={(e) => setNewInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddInput()}
                    />
                    <Button onClick={handleAddInput} variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Label>Outputs (what's produced)</Label>
                <div className="space-y-2">
                  {taskData.outputs.map((output, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={output} disabled className="flex-1" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setTaskData({
                            ...taskData,
                            outputs: taskData.outputs.filter((_, i) => i !== index),
                          })
                        }
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add output..."
                      value={newOutput}
                      onChange={(e) => setNewOutput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddOutput()}
                    />
                    <Button onClick={handleAddOutput} variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Label>Risk Level</Label>
                <RadioGroup
                  value={taskData.riskLevel}
                  onValueChange={(value: any) => setTaskData({ ...taskData, riskLevel: value })}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">High</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="instructions">Instructions / Notes</Label>
                <Textarea
                  id="instructions"
                  placeholder="Step-by-step instructions for this task..."
                  value={taskData.instructions}
                  onChange={(e) => setTaskData({ ...taskData, instructions: e.target.value })}
                  rows={6}
                  maxLength={2000}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {taskData.instructions.length}/2000 characters
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handleSaveTask}>
                  Save Changes
                </Button>
                {selectedNodeIndex < nodes.length - 1 ? (
                  <Button onClick={handleNextTask}>Next Task →</Button>
                ) : (
                  <Button onClick={handleComplete}>Complete →</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={handleComplete} size="lg">
          Next: Review & Export →
        </Button>
      </div>
    </div>
  );
};

export default TaskDetailsStep;
