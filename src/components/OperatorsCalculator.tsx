import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Clock, Users, Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Process {
  id: string;
  description: string;
  cycleTime: number;
}

interface Station {
  id: string;
  name: string;
  processes: Process[];
}

type StationChartRow = {
  name: string;
  cycleTime: number;
  operators: number;
  underTakt: number; // green part
  overTakt: number;  // red part
};

const OperatorsCalculator = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getInitialStations = (): Station[] => ([
    {
      id: '1',
      name: 'Station 1',
      processes: [
        { id: '1-1', description: 'Assembly', cycleTime: 45 },
        { id: '1-2', description: 'Quality Check', cycleTime: 15 },
      ],
    },
    {
      id: '2',
      name: 'Station 2',
      processes: [{ id: '2-1', description: 'Packaging', cycleTime: 30 }],
    },
  ]);

  const [workingHours, setWorkingHours] = useState<number>(8);
  const [dailyDemand, setDailyDemand] = useState<number>(480);
  const [stations, setStations] = useState<Station[]>(getInitialStations());
  const [expandedStations, setExpandedStations] = useState<string[]>(['1', '2']);

  const [results, setResults] = useState<{
    taktTime: number;
    totalOperators: number;
    stationData: StationChartRow[];
  } | null>(null);

  const addStation = () => {
    const newId = String(stations.length + 1);
    setStations([
      ...stations,
      {
        id: newId,
        name: `Station ${newId}`,
        processes: [{ id: `${newId}-1`, description: 'New Process', cycleTime: 30 }],
      },
    ]);
    setExpandedStations([...expandedStations, newId]);
  };

  const removeStation = (stationId: string) => {
    setStations(stations.filter((s) => s.id !== stationId));
    setExpandedStations((prev) => prev.filter((id) => id !== stationId));
  };

  const addProcess = (stationId: string) => {
    setStations(
      stations.map((station) => {
        if (station.id === stationId) {
          const newProcessId = `${stationId}-${station.processes.length + 1}`;
          return {
            ...station,
            processes: [
              ...station.processes,
              { id: newProcessId, description: 'New Process', cycleTime: 30 },
            ],
          };
        }
        return station;
      })
    );
  };

  const removeProcess = (stationId: string, processId: string) => {
    setStations(
      stations.map((station) => {
        if (station.id === stationId) {
          return {
            ...station,
            processes: station.processes.filter((p) => p.id !== processId),
          };
        }
        return station;
      })
    );
  };

  const updateProcess = (
    stationId: string,
    processId: string,
    field: 'description' | 'cycleTime',
    value: string | number
  ) => {
    setStations(
      stations.map((station) => {
        if (station.id === stationId) {
          return {
            ...station,
            processes: station.processes.map((process) => {
              if (process.id === processId) {
                return { ...process, [field]: value };
              }
              return process;
            }),
          };
        }
        return station;
      })
    );
  };

  const toggleStation = (stationId: string) => {
    setExpandedStations((prev) =>
      prev.includes(stationId)
        ? prev.filter((id) => id !== stationId)
        : [...prev, stationId]
    );
  };

  const calculateLineBalance = () => {
    const availableTimeSeconds = workingHours * 60 * 60;
    const taktTime = availableTimeSeconds / dailyDemand;

    const stationData: StationChartRow[] = stations.map((station) => {
      const totalCycleTime = station.processes.reduce((sum, p) => sum + p.cycleTime, 0);
      const operators = Math.ceil(totalCycleTime / taktTime);

      return {
        name: station.name,
        cycleTime: totalCycleTime,
        operators,
        underTakt: Math.min(totalCycleTime, taktTime),
        overTakt: Math.max(totalCycleTime - taktTime, 0),
      };
    });

    const totalOperators = stationData.reduce((sum, s) => sum + s.operators, 0);

    setResults({ taktTime, totalOperators, stationData });
  };

  const resetCalculator = () => {
    setWorkingHours(8);
    setDailyDemand(480);
    setStations(getInitialStations());
    setExpandedStations(['1', '2']);
    setResults(null);
  };

  return (
    <section id="operators-calculator" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        <div ref={ref} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass-panel-subtle text-xs font-medium text-primary mb-4">
              Calculator Tool
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Operators</span>
              <span className="text-foreground"> Calculator</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate the optimal number of operators needed for your production line.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Basic Inputs */}
              <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Production Parameters
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Working Hours/Day
                    </label>
                    <Input
                      type="number"
                      value={workingHours}
                      onChange={(e) => setWorkingHours(Number(e.target.value))}
                      className="bg-muted/50 border-glass-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Daily Demand (units)
                    </label>
                    <Input
                      type="number"
                      value={dailyDemand}
                      onChange={(e) => setDailyDemand(Number(e.target.value))}
                      className="bg-muted/50 border-glass-border"
                    />
                  </div>
                </div>
              </div>

              {/* Stations */}
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Stations & Processes
                  </h3>
                  <Button variant="outline" size="sm" onClick={addStation}>
                    <Plus className="w-4 h-4" />
                    Add Station
                  </Button>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {stations.map((station) => (
                    <div key={station.id} className="glass-panel-subtle p-4">
                      <div className="flex items-center justify-between mb-3">
                        <button
                          onClick={() => toggleStation(station.id)}
                          className="flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {expandedStations.includes(station.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          {station.name}
                        </button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addProcess(station.id)}
                            className="text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeStation(station.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {expandedStations.includes(station.id) && (
                        <div className="space-y-2">
                          {station.processes.map((process) => (
                            <div
                              key={process.id}
                              className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg"
                            >
                              <Input
                                value={process.description}
                                onChange={(e) =>
                                  updateProcess(station.id, process.id, 'description', e.target.value)
                                }
                                placeholder="Process description"
                                className="flex-1 h-8 text-sm bg-transparent border-glass-border/50"
                              />
                              <Input
                                type="number"
                                value={process.cycleTime}
                                onChange={(e) =>
                                  updateProcess(station.id, process.id, 'cycleTime', Number(e.target.value))
                                }
                                className="w-20 h-8 text-sm bg-transparent border-glass-border/50"
                              />
                              <span className="text-xs text-muted-foreground">sec</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeProcess(station.id, process.id)}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculate + Reset */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="hero" size="lg" onClick={calculateLineBalance} className="w-full">
                  <Calculator className="w-5 h-5" />
                  Calculate
                </Button>
                <Button variant="destructive" size="lg" onClick={resetCalculator} className="w-full">
                  Reset
                </Button>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {results ? (
                <>
                  {/* Result Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-panel p-6 text-center glow-box">
                      <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                      <div className="text-3xl font-bold gradient-text">
                        {results.taktTime.toFixed(1)}s
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Takt Time</div>
                    </div>
                    <div className="glass-panel p-6 text-center glow-box">
                      <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                      <div className="text-3xl font-bold gradient-text">
                        {results.totalOperators}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Total Operators Required</div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="glass-panel p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Station Cycle Time vs Takt Time
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={results.stationData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis
                            dataKey="name"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                          />
                          <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            label={{
                              value: 'Seconds',
                              angle: -90,
                              position: 'insideLeft',
                              style: { fill: 'hsl(var(--muted-foreground))' },
                            }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                            }}
                            labelStyle={{ color: 'hsl(var(--foreground))' }}
                          />
                          <ReferenceLine
                            y={results.taktTime}
                            stroke="hsl(var(--primary))"
                            strokeDasharray="5 5"
                            strokeWidth={2}
                            label={{
                              value: 'Takt Time',
                              position: 'right',
                              fill: 'hsl(var(--primary))',
                              fontSize: 12,
                            }}
                          />

                          {/* Green under takt + Red over takt (stacked) */}
                          <Bar dataKey="underTakt" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="overTakt" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Station List */}
                  <div className="glass-panel p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Station Details
                    </h3>
                    <div className="space-y-3">
                      {results.stationData.map((station, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 glass-panel-subtle"
                        >
                          <span className="font-medium text-foreground">{station.name}</span>
                          <div className="flex items-center gap-6">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Cycle: </span>
                              <span
                                className={
                                  station.cycleTime > results.taktTime
                                    ? 'text-destructive font-medium'
                                    : 'text-foreground'
                                }
                              >
                                {station.cycleTime}s
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Operators: </span>
                              <span className="text-primary font-medium">{station.operators}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="glass-panel p-12 text-center">
                  <Calculator className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Configure Your Production Line
                  </h3>
                  <p className="text-muted-foreground">
                    Add your stations and processes, then click "Calculate" to see operator requirements
                    and cycle time analysis.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperatorsCalculator;
