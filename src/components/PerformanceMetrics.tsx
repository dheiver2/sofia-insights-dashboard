import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Users, 
  CheckCircle, 
  Phone, 
  Timer, 
  TrendingUp,
  Target,
  Award,
  Calendar,
  ShoppingCart,
  Filter,
  Grid,
  List
} from 'lucide-react';

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

interface PerformanceMetricsProps {
  metrics: Metrics;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<'all' | 'excellent' | 'needs-improvement'>('all');

  const indicators = [
    {
      id: 1,
      title: "Tempo Médio de Atendimento",
      value: `${metrics.avgCallTime} min`,
      progress: Math.min((5 / metrics.avgCallTime) * 100, 100),
      icon: Clock,
      target: "< 5 min",
      status: metrics.avgCallTime <= 5 ? 'excellent' : metrics.avgCallTime <= 7 ? 'good' : 'needs-improvement',
      color: 'blue'
    },
    {
      id: 2,
      title: "Satisfação do Cliente",
      value: `${metrics.satisfaction}/10`,
      progress: metrics.satisfaction * 10,
      icon: Award,
      target: "> 8.0",
      status: metrics.satisfaction >= 8 ? 'excellent' : metrics.satisfaction >= 7 ? 'good' : 'needs-improvement',
      color: 'yellow'
    },
    {
      id: 3,
      title: "Taxa de Resolução",
      value: `${metrics.resolutionRate}%`,
      progress: metrics.resolutionRate,
      icon: CheckCircle,
      target: "> 85%",
      status: metrics.resolutionRate >= 85 ? 'excellent' : metrics.resolutionRate >= 70 ? 'good' : 'needs-improvement',
      color: 'green'
    },
    {
      id: 4,
      title: "Chamadas Atendidas",
      value: metrics.callsHandled.toString(),
      progress: Math.min((metrics.callsHandled / 50) * 100, 100),
      icon: Phone,
      target: "40-50/dia",
      status: metrics.callsHandled >= 40 ? 'excellent' : metrics.callsHandled >= 30 ? 'good' : 'needs-improvement',
      color: 'purple'
    },
    {
      id: 5,
      title: "Tempo de Espera",
      value: `${metrics.waitTime}s`,
      progress: Math.max(100 - (metrics.waitTime / 60) * 100, 0),
      icon: Timer,
      target: "< 30s",
      status: metrics.waitTime <= 30 ? 'excellent' : metrics.waitTime <= 60 ? 'good' : 'needs-improvement',
      color: 'orange'
    },
    {
      id: 6,
      title: "Taxa de Escalação",
      value: `${metrics.escalationRate}%`,
      progress: Math.max(100 - metrics.escalationRate * 5, 0),
      icon: TrendingUp,
      target: "< 10%",
      status: metrics.escalationRate <= 10 ? 'excellent' : metrics.escalationRate <= 15 ? 'good' : 'needs-improvement',
      color: 'red'
    },
    {
      id: 7,
      title: "Resolução na 1ª Chamada",
      value: `${metrics.firstCallResolution}%`,
      progress: metrics.firstCallResolution,
      icon: Target,
      target: "> 80%",
      status: metrics.firstCallResolution >= 80 ? 'excellent' : metrics.firstCallResolution >= 70 ? 'good' : 'needs-improvement',
      color: 'teal'
    },
    {
      id: 8,
      title: "Score de Qualidade",
      value: `${metrics.qualityScore}/10`,
      progress: metrics.qualityScore * 10,
      icon: Award,
      target: "> 8.5",
      status: metrics.qualityScore >= 8.5 ? 'excellent' : metrics.qualityScore >= 7 ? 'good' : 'needs-improvement',
      color: 'pink'
    },
    {
      id: 9,
      title: "Aderência ao Horário",
      value: `${metrics.adherenceSchedule}%`,
      progress: metrics.adherenceSchedule,
      icon: Calendar,
      target: "> 90%",
      status: metrics.adherenceSchedule >= 90 ? 'excellent' : metrics.adherenceSchedule >= 80 ? 'good' : 'needs-improvement',
      color: 'indigo'
    },
    {
      id: 10,
      title: "Conversão de Vendas",
      value: `${metrics.salesConversion}%`,
      progress: metrics.salesConversion * 5,
      icon: ShoppingCart,
      target: "> 12%",
      status: metrics.salesConversion >= 12 ? 'excellent' : metrics.salesConversion >= 8 ? 'good' : 'needs-improvement',
      color: 'emerald'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'needs-improvement': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'needs-improvement': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getColorClasses = (color: string, status: string) => {
    const colorMap: any = {
      blue: {
        icon: 'text-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800'
      },
      yellow: {
        icon: 'text-yellow-500',
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        border: 'border-yellow-200 dark:border-yellow-800'
      },
      green: {
        icon: 'text-green-500',
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800'
      },
      purple: {
        icon: 'text-purple-500',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800'
      },
      orange: {
        icon: 'text-orange-500',
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        border: 'border-orange-200 dark:border-orange-800'
      },
      red: {
        icon: 'text-red-500',
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-200 dark:border-red-800'
      },
      teal: {
        icon: 'text-teal-500',
        bg: 'bg-teal-50 dark:bg-teal-900/20',
        border: 'border-teal-200 dark:border-teal-800'
      },
      pink: {
        icon: 'text-pink-500',
        bg: 'bg-pink-50 dark:bg-pink-900/20',
        border: 'border-pink-200 dark:border-pink-800'
      },
      indigo: {
        icon: 'text-indigo-500',
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
        border: 'border-indigo-200 dark:border-indigo-800'
      },
      emerald: {
        icon: 'text-emerald-500',
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        border: 'border-emerald-200 dark:border-emerald-800'
      }
    };
    
    return colorMap[color] || colorMap.blue;
  };

  const filteredIndicators = indicators.filter(indicator => {
    if (filterStatus === 'all') return true;
    return indicator.status === filterStatus;
  });

  return (
    <Card className="glass-card shadow-medium">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-gradient">10 Indicadores de Performance</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterStatus(filterStatus === 'all' ? 'excellent' : filterStatus === 'excellent' ? 'needs-improvement' : 'all')}
              className="text-xs"
            >
              <Filter className="mr-1 h-3 w-3" />
              {filterStatus === 'all' ? 'Todos' : filterStatus === 'excellent' ? 'Excelentes' : 'Melhorar'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="h-3 w-3" /> : <Grid className="h-3 w-3" />}
            </Button>
          </div>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            {indicators.filter(i => i.status === 'excellent').length} Excelentes
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            {indicators.filter(i => i.status === 'good').length} Bons
          </Badge>
          <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
            {indicators.filter(i => i.status === 'needs-improvement').length} Melhorar
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4" : "space-y-3"}>
          {filteredIndicators.map((indicator, index) => {
            const Icon = indicator.icon;
            const colorClasses = getColorClasses(indicator.color, indicator.status);
            
            return (
              <div 
                key={indicator.id}
                className={`glass-card rounded-xl border interactive-card scale-in ${colorClasses.border}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`p-4 rounded-xl ${colorClasses.bg}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-5 w-5 ${colorClasses.icon}`} />
                      <span className="font-medium text-sm">{indicator.title}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(indicator.status)} border-current text-xs`}
                    >
                      {indicator.status === 'excellent' ? 'Excelente' : 
                       indicator.status === 'good' ? 'Bom' : 'Melhorar'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gradient">{indicator.value}</span>
                      <span className="text-xs text-muted-foreground">Meta: {indicator.target}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="w-full bg-secondary/50 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(indicator.status)}`}
                          style={{ width: `${Math.min(indicator.progress, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        {Math.round(indicator.progress)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
