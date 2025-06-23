
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
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
  ShoppingCart
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
  const indicators = [
    {
      id: 1,
      title: "Tempo Médio de Atendimento",
      value: `${metrics.avgCallTime} min`,
      progress: Math.min((5 / metrics.avgCallTime) * 100, 100),
      icon: Clock,
      target: "< 5 min",
      status: metrics.avgCallTime <= 5 ? 'excellent' : metrics.avgCallTime <= 7 ? 'good' : 'needs-improvement'
    },
    {
      id: 2,
      title: "Satisfação do Cliente",
      value: `${metrics.satisfaction}/10`,
      progress: metrics.satisfaction * 10,
      icon: Award,
      target: "> 8.0",
      status: metrics.satisfaction >= 8 ? 'excellent' : metrics.satisfaction >= 7 ? 'good' : 'needs-improvement'
    },
    {
      id: 3,
      title: "Taxa de Resolução",
      value: `${metrics.resolutionRate}%`,
      progress: metrics.resolutionRate,
      icon: CheckCircle,
      target: "> 85%",
      status: metrics.resolutionRate >= 85 ? 'excellent' : metrics.resolutionRate >= 70 ? 'good' : 'needs-improvement'
    },
    {
      id: 4,
      title: "Chamadas Atendidas",
      value: metrics.callsHandled.toString(),
      progress: Math.min((metrics.callsHandled / 50) * 100, 100),
      icon: Phone,
      target: "40-50/dia",
      status: metrics.callsHandled >= 40 ? 'excellent' : metrics.callsHandled >= 30 ? 'good' : 'needs-improvement'
    },
    {
      id: 5,
      title: "Tempo de Espera",
      value: `${metrics.waitTime}s`,
      progress: Math.max(100 - (metrics.waitTime / 60) * 100, 0),
      icon: Timer,
      target: "< 30s",
      status: metrics.waitTime <= 30 ? 'excellent' : metrics.waitTime <= 60 ? 'good' : 'needs-improvement'
    },
    {
      id: 6,
      title: "Taxa de Escalação",
      value: `${metrics.escalationRate}%`,
      progress: Math.max(100 - metrics.escalationRate * 5, 0),
      icon: TrendingUp,
      target: "< 10%",
      status: metrics.escalationRate <= 10 ? 'excellent' : metrics.escalationRate <= 15 ? 'good' : 'needs-improvement'
    },
    {
      id: 7,
      title: "Resolução na 1ª Chamada",
      value: `${metrics.firstCallResolution}%`,
      progress: metrics.firstCallResolution,
      icon: Target,
      target: "> 80%",
      status: metrics.firstCallResolution >= 80 ? 'excellent' : metrics.firstCallResolution >= 70 ? 'good' : 'needs-improvement'
    },
    {
      id: 8,
      title: "Score de Qualidade",
      value: `${metrics.qualityScore}/10`,
      progress: metrics.qualityScore * 10,
      icon: Award,
      target: "> 8.5",
      status: metrics.qualityScore >= 8.5 ? 'excellent' : metrics.qualityScore >= 7 ? 'good' : 'needs-improvement'
    },
    {
      id: 9,
      title: "Aderência ao Horário",
      value: `${metrics.adherenceSchedule}%`,
      progress: metrics.adherenceSchedule,
      icon: Calendar,
      target: "> 90%",
      status: metrics.adherenceSchedule >= 90 ? 'excellent' : metrics.adherenceSchedule >= 80 ? 'good' : 'needs-improvement'
    },
    {
      id: 10,
      title: "Conversão de Vendas",
      value: `${metrics.salesConversion}%`,
      progress: metrics.salesConversion * 5,
      icon: ShoppingCart,
      target: "> 12%",
      status: metrics.salesConversion >= 12 ? 'excellent' : metrics.salesConversion >= 8 ? 'good' : 'needs-improvement'
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

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <CardTitle className="text-xl text-primary">10 Indicadores de Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {indicators.map((indicator) => {
            const Icon = indicator.icon;
            return (
              <div 
                key={indicator.id}
                className="p-4 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-primary" />
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
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{indicator.value}</span>
                    <span className="text-xs text-muted-foreground">Meta: {indicator.target}</span>
                  </div>
                  
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(indicator.status)}`}
                      style={{ width: `${Math.min(indicator.progress, 100)}%` }}
                    />
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
