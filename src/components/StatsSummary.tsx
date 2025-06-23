
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Metrics {
  avgCallTime: number;
  satisfaction: number;
  resolutionRate: number;
  callsHandled: number;
  waitTime: number;
  escalationRate: number;
  firstCallResolution: number;
  qualityScore: number;
  adherenceSchedule: number;
  salesConversion: number;
}

interface StatsSummaryProps {
  metrics: Metrics;
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({ metrics }) => {
  const stats = [
    {
      label: 'Performance Geral',
      value: '87%',
      change: '+2.3%',
      trend: 'up',
      color: 'text-green-600'
    },
    {
      label: 'Chamadas Hoje',
      value: metrics.callsHandled.toString(),
      change: '+5',
      trend: 'up',
      color: 'text-blue-600'
    },
    {
      label: 'Satisfação Média',
      value: `${metrics.satisfaction}/10`,
      change: '+0.2',
      trend: 'up',
      color: 'text-purple-600'
    },
    {
      label: 'Taxa Resolução',
      value: `${metrics.resolutionRate}%`,
      change: '0%',
      trend: 'stable',
      color: 'text-orange-600'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3" />;
      case 'down': return <TrendingDown className="h-3 w-3" />;
      default: return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="glass-card interactive-card slide-up border-l-4 border-l-primary/50"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <div className="text-right">
                <Badge 
                  variant="outline" 
                  className={`${getTrendColor(stat.trend)} border-current text-xs`}
                >
                  <span className="flex items-center space-x-1">
                    {getTrendIcon(stat.trend)}
                    <span>{stat.change}</span>
                  </span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
