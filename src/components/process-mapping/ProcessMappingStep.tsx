import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import { useProcessMapStore } from '@/stores/processMapStore';
import { Square, Diamond, FileText, Clock, Circle } from 'lucide-react';

interface ProcessMappingStepProps {
  onBack: () => void;
  onNext: () => void;
}

const nodeTypes = [
  { type: 'task', label: 'Task', icon: Square, color: '#E3F2FD' },
  { type: 'decision', label: 'Decision', icon: Diamond, color: '#FFF9C4' },
  { type: 'document', label: 'Document', icon: FileText, color: '#E8F5E9' },
  { type: 'delay', label: 'Delay', icon: Clock, color: '#FFE0B2' },
  { type: 'end', label: 'End', icon: Circle, color: '#F44336' },
];

const ProcessMappingStep = ({ onBack, onNext }: ProcessMappingStepProps) => {
  const { currentProcess, updateProcess } = useProcessMapStore();
  
  // Convert stored nodes to ReactFlow format
  const initialNodes: Node[] = currentProcess?.nodes.map((n) => ({
    id: n.id,
    type: 'default',
    data: { label: n.label },
    position: n.position,
    style: { 
      background: n.color,
      borderRadius: n.type === 'decision' ? '0' : '8px',
      padding: 10,
      border: '2px solid #333',
    },
  })) || [];

  const initialEdges: Edge[] = currentProcess?.connections.map((c) => ({
    id: c.id,
    source: c.source,
    target: c.target,
    label: c.label,
    type: c.type === 'conditional' ? 'step' : 'default',
  })) || [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeType, setSelectedNodeType] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (type: string) => {
    const nodeColor = nodeTypes.find((nt) => nt.type === type)?.color || '#E3F2FD';
    const nodeCount = nodes.length + 1;
    
    const newNode: Node = {
      id: `node_${Date.now()}`,
      type: 'default',
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nodeCount}` },
      position: { x: 250, y: 100 + nodeCount * 100 },
      style: {
        background: nodeColor,
        borderRadius: type === 'decision' ? '0' : '8px',
        padding: 10,
        border: '2px solid #333',
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setSelectedNodeType(null);
  };

  const handleSaveAndContinue = () => {
    if (!currentProcess) return;

    // Convert ReactFlow nodes back to our format
    const updatedNodes = nodes.map((n) => ({
      id: n.id,
      type: 'task' as const,
      label: String(n.data.label),
      position: n.position,
      color: String(n.style?.background || '#E3F2FD'),
    }));

    const updatedConnections = edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      label: e.label as string,
      type: e.type === 'step' ? 'conditional' as const : 'default' as const,
    }));

    updateProcess(currentProcess.id, {
      nodes: updatedNodes,
      connections: updatedConnections,
    });

    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-foreground">Step 2: Map Your Process</h2>
        <p className="text-muted-foreground">
          Create a visual flowchart of your process using drag-and-drop
        </p>
      </div>

      <div className="flex gap-4">
        {/* Tool Palette */}
        <div className="w-48 space-y-2">
          <h3 className="font-semibold text-sm text-foreground mb-3">Node Types</h3>
          {nodeTypes.map((nodeType) => (
            <Button
              key={nodeType.type}
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => addNode(nodeType.type)}
              style={{ borderLeft: `4px solid ${nodeType.color}` }}
            >
              <nodeType.icon className="w-4 h-4" />
              {nodeType.label}
            </Button>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 border rounded-lg overflow-hidden" style={{ height: '600px' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-semibold text-sm mb-2 text-foreground">Quick Tips:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Click a node type on the left to add it to the canvas</li>
          <li>• Drag nodes to reposition them</li>
          <li>• Connect nodes by dragging from one node's edge to another</li>
          <li>• Double-click a node to edit its label</li>
        </ul>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={handleSaveAndContinue} size="lg">
          Next: Add Details →
        </Button>
      </div>
    </div>
  );
};

export default ProcessMappingStep;
