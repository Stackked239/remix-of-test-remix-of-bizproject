import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJourneyMapStore, ChannelType } from "@/stores/journeyMapStore";
import { Plus, Trash2, User } from "lucide-react";
import { toast } from "sonner";

const personaColors = ['#212653', '#969423', '#7C7C7C', '#4A90E2', '#E27B4A'];

const availableChannels: { value: ChannelType; label: string }[] = [
  { value: 'website', label: 'Website' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'in-store', label: 'In-Store' },
  { value: 'chat', label: 'Live Chat' },
  { value: 'mobile-app', label: 'Mobile App' },
];

export const PersonaBuilder = () => {
  const { currentMap, addPersona, updatePersona, deletePersona, setActivePersona } = useJourneyMapStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newPersona, setNewPersona] = useState({
    name: '',
    age: '',
    occupation: '',
    income: '',
    goals: [''],
    frustrations: [''],
    channels: [] as ChannelType[],
  });

  const handleAddPersona = () => {
    if (!newPersona.name.trim()) {
      toast.error("Please enter a persona name");
      return;
    }

    const colorIndex = currentMap?.personas.length || 0;
    addPersona({
      ...newPersona,
      goals: newPersona.goals.filter(g => g.trim()),
      frustrations: newPersona.frustrations.filter(f => f.trim()),
      color: personaColors[colorIndex % personaColors.length],
    });

    setNewPersona({
      name: '',
      age: '',
      occupation: '',
      income: '',
      goals: [''],
      frustrations: [''],
      channels: [],
    });
    setIsAdding(false);
    toast.success("Persona added successfully");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this persona?")) {
      deletePersona(id);
      toast.success("Persona deleted");
    }
  };

  const handleArrayChange = (field: 'goals' | 'frustrations', index: number, value: string) => {
    setNewPersona(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item),
    }));
  };

  const addArrayItem = (field: 'goals' | 'frustrations') => {
    setNewPersona(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const toggleChannel = (channel: ChannelType) => {
    setNewPersona(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  if (!currentMap) return null;

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-montserrat text-biz-navy">Customer Personas</CardTitle>
          {currentMap.personas.length < 3 && !isAdding && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsAdding(true)}
              className="h-8 text-biz-green hover:text-biz-green"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {currentMap.personas.length > 0 && (
              <Tabs
                value={currentMap.activePersonaId || currentMap.personas[0]?.id}
                onValueChange={setActivePersona}
              >
                <TabsList className="w-full">
                  {currentMap.personas.map((persona) => (
                    <TabsTrigger
                      key={persona.id}
                      value={persona.id}
                      className="flex-1"
                      style={{ borderBottomColor: persona.color, borderBottomWidth: currentMap.activePersonaId === persona.id ? '2px' : '0' }}
                    >
                      <User className="h-3 w-3 mr-1" />
                      {persona.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {currentMap.personas.map((persona) => (
                  <TabsContent key={persona.id} value={persona.id} className="space-y-3 mt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-biz-navy">{persona.name}</h3>
                        <p className="text-sm text-biz-grey">{persona.age} • {persona.occupation}</p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(persona.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2 text-sm">
                      {persona.income && (
                        <div>
                          <span className="font-medium text-biz-navy">Income: </span>
                          <span className="text-biz-grey">{persona.income}</span>
                        </div>
                      )}

                      {persona.goals.length > 0 && (
                        <div>
                          <span className="font-medium text-biz-navy">Goals:</span>
                          <ul className="list-disc list-inside text-biz-grey ml-2 mt-1">
                            {persona.goals.map((goal, i) => (
                              <li key={i}>{goal}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {persona.frustrations.length > 0 && (
                        <div>
                          <span className="font-medium text-biz-navy">Frustrations:</span>
                          <ul className="list-disc list-inside text-biz-grey ml-2 mt-1">
                            {persona.frustrations.map((frustration, i) => (
                              <li key={i}>{frustration}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {persona.channels.length > 0 && (
                        <div>
                          <span className="font-medium text-biz-navy">Preferred Channels:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {persona.channels.map((channel) => (
                              <span key={channel} className="text-xs bg-biz-green/10 text-biz-green px-2 py-1 rounded">
                                {channel.replace('-', ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}

            {/* Add New Persona Form */}
            {isAdding && (
              <div className="space-y-3 p-4 border border-biz-grey/20 rounded-lg bg-muted/50">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-biz-navy">New Persona</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsAdding(false)}
                  >
                    Cancel
                  </Button>
                </div>

                <div className="space-y-2">
                  <div>
                    <Label htmlFor="persona-name" className="text-xs">Name *</Label>
                    <Input
                      id="persona-name"
                      placeholder="e.g., Tech-Savvy Millennial"
                      value={newPersona.name}
                      onChange={(e) => setNewPersona({ ...newPersona, name: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="persona-age" className="text-xs">Age</Label>
                      <Input
                        id="persona-age"
                        placeholder="25-34"
                        value={newPersona.age}
                        onChange={(e) => setNewPersona({ ...newPersona, age: e.target.value })}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="persona-income" className="text-xs">Income</Label>
                      <Input
                        id="persona-income"
                        placeholder="$50k-$75k"
                        value={newPersona.income}
                        onChange={(e) => setNewPersona({ ...newPersona, income: e.target.value })}
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="persona-occupation" className="text-xs">Occupation</Label>
                    <Input
                      id="persona-occupation"
                      placeholder="e.g., Marketing Manager"
                      value={newPersona.occupation}
                      onChange={(e) => setNewPersona({ ...newPersona, occupation: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Goals</Label>
                    {newPersona.goals.map((goal, index) => (
                      <Input
                        key={index}
                        placeholder="Enter a goal"
                        value={goal}
                        onChange={(e) => handleArrayChange('goals', index, e.target.value)}
                        className="h-8 text-sm mb-1"
                      />
                    ))}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addArrayItem('goals')}
                      className="h-6 text-xs text-biz-green hover:text-biz-green"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Goal
                    </Button>
                  </div>

                  <div>
                    <Label className="text-xs">Frustrations</Label>
                    {newPersona.frustrations.map((frustration, index) => (
                      <Input
                        key={index}
                        placeholder="Enter a frustration"
                        value={frustration}
                        onChange={(e) => handleArrayChange('frustrations', index, e.target.value)}
                        className="h-8 text-sm mb-1"
                      />
                    ))}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addArrayItem('frustrations')}
                      className="h-6 text-xs text-biz-green hover:text-biz-green"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Frustration
                    </Button>
                  </div>

                  <div>
                    <Label className="text-xs mb-2 block">Preferred Channels</Label>
                    <div className="space-y-2">
                      {availableChannels.map((channel) => (
                        <div key={channel.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`channel-${channel.value}`}
                            checked={newPersona.channels.includes(channel.value)}
                            onCheckedChange={() => toggleChannel(channel.value)}
                          />
                          <label
                            htmlFor={`channel-${channel.value}`}
                            className="text-xs text-foreground cursor-pointer"
                          >
                            {channel.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleAddPersona}
                  className="w-full bg-biz-green hover:bg-biz-green/90"
                  size="sm"
                >
                  Add Persona
                </Button>
              </div>
            )}

            {currentMap.personas.length === 0 && !isAdding && (
              <div className="text-center py-8 text-biz-grey text-sm">
                <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No personas yet.</p>
                <p className="text-xs">Click + to add your first persona</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
