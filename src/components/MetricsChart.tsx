
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, BarChart3, Activity, Calendar } from 'lucide-react';

const weeklyData = [
  { day: 'Seg', satisfaction: 8.2, calls: 38, resolution: 85, quality: 8.8 },
  { day: 'Ter', satisfaction: 8.5, calls: 42, resolution: 88, quality: 9.0 },
  { day: 'Qua', satisfaction: 8.1, calls: 35, resolution: 82, quality: 8.5 },
  { day: 'Qui', satisfaction: 8.7, calls: 45, resolution: 89, quality: 9.2 },
  { day: 'Sex', satisfaction: 8.4, calls: 40, resolution: 87, quality: 8.9 },
  { day: 'Sáb', satisfaction: 8.3, calls: 28, resolution: 90, quality: 9.1 },
  { day: 'Dom', satisfaction: 8.6, calls: 22, resolution: 92, quality: 9.3 },
];

const dailyHours = [
  { hour: '08h', calls: 3, avgTime: 4.2, satisfaction: 8.1 },
  { hour: '09h', calls: 5, avgTime: 3.8, satisfaction: 8.3 },
  { hour: '10h', calls: 6, avgTime: 4.1, satisfaction: 8.5 },
  { hour: '11h', calls: 7, avgTime: 4.5, satisfaction: 8.2 },
  { hour: '12h', calls: 4, avgTime: 3.9, satisfaction: 8.7 },
  { hour: '13h', calls: 5, avgTime: 4.0, satisfaction: 8.4 },
  { hour: '14h', calls: 8, avgTime: 4.3, satisfaction: 8.6 },
  { hour: '15h', calls: 7, avgTime: 4.1, satisfaction: 8.8 },
  { hour: '16h', calls: 6, avgTime: 4.2, satisfaction: 8.3 },
  { hour: '17h', calls: 4, avgTime: 3.7, satisfaction: 8.9 },
];

export const MetricsChart = () => {
  const [activeChart, setActiveChart] = useState('weekly');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong rounded-lg p-3 border border-border/50 shadow-medium">
          <p className="font-medium text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey === 'satisfaction' || entry.dataKey === 'quality' ? '/10' : 
               entry.dataKey === 'resolution' ? '%' : 
               entry.dataKey === 'avgTime' ? 'min' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Weekly Performance */}
      <Card className="glass-card shadow-medium">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-gradient flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Performance Semanal
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={activeChart === 'weekly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveChart('weekly')}
                className="text-xs"
              >
                Semanal
              </Button>
              <Button
                variant={activeChart === 'daily' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveChart('daily')}
                className="text-xs"
              >
                Diário
              </Button>
            </div>
          </div>
          <div className="flex space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
              <Activity className="mr-1 h-3 w-3" />
              Tempo Real
            </Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
              <Calendar className="mr-1 h-3 w-3" />
              7 dias
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="satisfactionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="resolutionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="satisfaction"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#satisfactionGradient)"
                name="Satisfação"
              />
              <Area
                type="monotone"
                dataKey="resolution"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#resolutionGradient)"
                name="Resolução %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Distribution */}
      <Card className="glass-card shadow-medium">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-gradient flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Distribuição Horária
          </CardTitle>
          <div className="flex space-x-2">
            <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
              Hoje
            </Badge>
            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
              Pico: 14h-15h
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dailyHours}>
              <defs>
                <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="hour" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="calls" 
                fill="url(#callsGradient)" 
                name="Chamadas"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
