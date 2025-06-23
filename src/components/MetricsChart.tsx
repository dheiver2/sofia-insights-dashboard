
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';

const weeklyData = [
  { day: 'Seg', satisfaction: 8.2, calls: 38, resolution: 85 },
  { day: 'Ter', satisfaction: 8.5, calls: 42, resolution: 88 },
  { day: 'Qua', satisfaction: 8.1, calls: 35, resolution: 82 },
  { day: 'Qui', satisfaction: 8.7, calls: 45, resolution: 89 },
  { day: 'Sex', satisfaction: 8.4, calls: 40, resolution: 87 },
];

const dailyHours = [
  { hour: '08h', calls: 3, avgTime: 4.2 },
  { hour: '09h', calls: 5, avgTime: 3.8 },
  { hour: '10h', calls: 6, avgTime: 4.1 },
  { hour: '11h', calls: 7, avgTime: 4.5 },
  { hour: '12h', calls: 4, avgTime: 3.9 },
  { hour: '13h', calls: 5, avgTime: 4.0 },
  { hour: '14h', calls: 8, avgTime: 4.3 },
  { hour: '15h', calls: 7, avgTime: 4.1 },
  { hour: '16h', calls: 6, avgTime: 4.2 },
  { hour: '17h', calls: 4, avgTime: 3.7 },
];

export const MetricsChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Performance */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Performance Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="satisfaction" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Satisfação"
              />
              <Line 
                type="monotone" 
                dataKey="resolution" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Resolução %"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Distribution */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Distribuição Diária
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="calls" fill="hsl(var(--primary))" name="Chamadas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
