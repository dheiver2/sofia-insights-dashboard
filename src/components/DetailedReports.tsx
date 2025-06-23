
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Target,
  Award,
  Clock,
  Phone,
  Users,
  AlertCircle
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

interface DetailedReportsProps {
  metrics: Metrics;
  agentName: string;
}

export const DetailedReports: React.FC<DetailedReportsProps> = ({ metrics, agentName }) => {
  const reportSections = [
    {
      title: 'Relatório de Performance Semanal',
      description: 'Análise completa dos últimos 7 dias',
      icon: FileText,
      downloadable: true,
      data: [
        { label: 'Chamadas Atendidas', value: metrics.callsHandled * 7, target: 300, unit: 'chamadas' },
        { label: 'Tempo Médio', value: metrics.avgCallTime, target: 5, unit: 'min' },
        { label: 'Satisfação', value: metrics.satisfaction, target: 8.0, unit: '/10' },
        { label: 'Taxa de Resolução', value: metrics.resolutionRate, target: 85, unit: '%' }
      ]
    },
    {
      title: 'Análise de Qualidade',
      description: 'Indicadores de qualidade do atendimento',
      icon: Award,
      downloadable: true,
      data: [
        { label: 'Qualidade Geral', value: metrics.qualityScore, target: 9.0, unit: '/10' },
        { label: 'Primeira Resolução', value: metrics.firstCallResolution, target: 80, unit: '%' },
        { label: 'Taxa de Escalação', value: metrics.escalationRate, target: 10, unit: '%' },
        { label: 'Aderência ao Cronograma', value: metrics.adherenceSchedule, target: 95, unit: '%' }
      ]
    },
    {
      title: 'Métricas de Tempo',
      description: 'Análise dos tempos de atendimento',
      icon: Clock,
      downloadable: true,
      data: [
        { label: 'Tempo de Espera', value: metrics.waitTime, target: 15, unit: 'seg' },
        { label: 'Tempo Médio de Chamada', value: metrics.avgCallTime, target: 5, unit: 'min' },
        { label: 'Conversão de Vendas', value: metrics.salesConversion, target: 12, unit: '%' }
      ]
    }
  ];

  const getPerformanceColor = (value: number, target: number, isLowerBetter: boolean = false) => {
    const ratio = isLowerBetter ? target / value : value / target;
    if (ratio >= 1) return 'text-green-600';
    if (ratio >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressValue = (value: number, target: number, isLowerBetter: boolean = false) => {
    if (isLowerBetter) {
      return Math.min(100, (target / value) * 100);
    }
    return Math.min(100, (value / target) * 100);
  };

  const getTrendIcon = (value: number, target: number, isLowerBetter: boolean = false) => {
    const isGood = isLowerBetter ? value <= target : value >= target;
    return isGood ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Relatórios Detalhados</h2>
          <p className="text-muted-foreground">Análise completa de performance - {agentName}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Período
          </Button>
          <Button className="pulse-accent-gradient">
            <Download className="mr-2 h-4 w-4" />
            Exportar Tudo
          </Button>
        </div>
      </div>

      {/* Report Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {reportSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <Card key={sectionIndex} className="glass-card interactive-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                  {section.downloadable && (
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.data.map((item, itemIndex) => {
                  const isLowerBetter = item.label.includes('Tempo') || item.label.includes('Escalação');
                  const progressValue = getProgressValue(item.value, item.target, isLowerBetter);
                  
                  return (
                    <div key={itemIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.label}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`font-bold ${getPerformanceColor(item.value, item.target, isLowerBetter)}`}>
                            {item.value}{item.unit}
                          </span>
                          {getTrendIcon(item.value, item.target, isLowerBetter)}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Progress value={progressValue} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Meta: {item.target}{item.unit}</span>
                          <span>{Math.round(progressValue)}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-500" />
              <span>Objetivos Alcançados</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Satisfação do Cliente</span>
                <Badge variant={metrics.satisfaction >= 8.0 ? "default" : "destructive"}>
                  {metrics.satisfaction >= 8.0 ? "Alcançado" : "Pendente"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxa de Resolução</span>
                <Badge variant={metrics.resolutionRate >= 85 ? "default" : "destructive"}>
                  {metrics.resolutionRate >= 85 ? "Alcançado" : "Pendente"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Qualidade do Atendimento</span>
                <Badge variant={metrics.qualityScore >= 9.0 ? "default" : "destructive"}>
                  {metrics.qualityScore >= 9.0 ? "Alcançado" : "Pendente"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span>Pontos de Atenção</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.escalationRate > 10 && (
                <div className="flex items-center space-x-2 text-orange-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Taxa de escalação acima do ideal</span>
                </div>
              )}
              {metrics.avgCallTime > 5 && (
                <div className="flex items-center space-x-2 text-orange-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Tempo médio de chamada elevado</span>
                </div>
              )}
              {metrics.satisfaction < 8.0 && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Satisfação abaixo da meta</span>
                </div>
              )}
              {metrics.escalationRate <= 10 && metrics.avgCallTime <= 5 && metrics.satisfaction >= 8.0 && (
                <div className="text-green-600 text-sm">
                  ✓ Todos os indicadores dentro do esperado
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
