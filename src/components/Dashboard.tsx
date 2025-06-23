
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PerformanceMetrics } from './PerformanceMetrics';
import { SofiaAvatar } from './SofiaAvatar';
import { DailyFeedback } from './DailyFeedback';
import { MetricsChart } from './MetricsChart';
import { Clock, Users, Phone, TrendingUp, Award, Target } from 'lucide-react';

interface DashboardData {
  agent: string;
  date: string;
  metrics: {
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
  };
}

const Dashboard = () => {
  const [currentData, setCurrentData] = useState<DashboardData>({
    agent: "Maria Silva",
    date: new Date().toLocaleDateString('pt-BR'),
    metrics: {
      avgCallTime: 4.2,
      satisfaction: 8.7,
      resolutionRate: 89,
      callsHandled: 45,
      waitTime: 12,
      escalationRate: 8,
      firstCallResolution: 82,
      qualityScore: 9.1,
      adherenceSchedule: 95,
      salesConversion: 15
    }
  });

  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeedback(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getPerformanceLevel = (score: number, type: 'percentage' | 'rating' | 'time' = 'percentage') => {
    if (type === 'rating') {
      if (score >= 8.5) return 'excellent';
      if (score >= 7.0) return 'good';
      if (score >= 6.0) return 'average';
      return 'needs-improvement';
    }
    
    if (type === 'time') {
      if (score <= 15) return 'excellent';
      if (score <= 30) return 'good';
      if (score <= 60) return 'average';
      return 'needs-improvement';
    }
    
    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 60) return 'average';
    return 'needs-improvement';
  };

  const getBadgeVariant = (level: string) => {
    switch (level) {
      case 'excellent': return 'default';
      case 'good': return 'secondary';
      case 'average': return 'outline';
      default: return 'destructive';
    }
  };

  return (
    <div className="min-h-screen pulse-gradient p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <img 
            src="/lovable-uploads/3e9a62ac-b44a-4fb5-b48c-edfb073bbdfe.png" 
            alt="Pulse Logo" 
            className="h-12 w-auto"
          />
          <div>
            <h1 className="text-3xl font-bold text-primary">Painel do Atendente</h1>
            <p className="text-muted-foreground">Bem-vinda, {currentData.agent}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-primary border-primary">
            {currentData.date}
          </Badge>
          <Button 
            onClick={() => setShowFeedback(!showFeedback)}
            className="pulse-glow"
          >
            <Users className="mr-2 h-4 w-4" />
            Sofia Feedback
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <PerformanceMetrics metrics={currentData.metrics} />
          
          {/* Key Indicators Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-primary" />
                  Tempo Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {currentData.metrics.avgCallTime}min
                </div>
                <Badge 
                  variant={getBadgeVariant(getPerformanceLevel(currentData.metrics.avgCallTime, 'time'))}
                  className="mt-2"
                >
                  {getPerformanceLevel(currentData.metrics.avgCallTime, 'time')}
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Award className="mr-2 h-4 w-4 text-primary" />
                  Satisfação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {currentData.metrics.satisfaction}/10
                </div>
                <Badge 
                  variant={getBadgeVariant(getPerformanceLevel(currentData.metrics.satisfaction, 'rating'))}
                  className="mt-2"
                >
                  {getPerformanceLevel(currentData.metrics.satisfaction, 'rating')}
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Target className="mr-2 h-4 w-4 text-primary" />
                  Resolução
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {currentData.metrics.resolutionRate}%
                </div>
                <Badge 
                  variant={getBadgeVariant(getPerformanceLevel(currentData.metrics.resolutionRate))}
                  className="mt-2"
                >
                  {getPerformanceLevel(currentData.metrics.resolutionRate)}
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-primary" />
                  Chamadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {currentData.metrics.callsHandled}
                </div>
                <Badge variant="outline" className="mt-2 text-primary border-primary">
                  Hoje
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4 text-primary" />
                  Qualidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {currentData.metrics.qualityScore}/10
                </div>
                <Badge 
                  variant={getBadgeVariant(getPerformanceLevel(currentData.metrics.qualityScore, 'rating'))}
                  className="mt-2"
                >
                  {getPerformanceLevel(currentData.metrics.qualityScore, 'rating')}
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  Vendas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {currentData.metrics.salesConversion}%
                </div>
                <Badge 
                  variant={getBadgeVariant(getPerformanceLevel(currentData.metrics.salesConversion))}
                  className="mt-2"
                >
                  {getPerformanceLevel(currentData.metrics.salesConversion)}
                </Badge>
              </CardContent>
            </Card>
          </div>

          <MetricsChart />
        </div>

        {/* Sofia Avatar and Feedback */}
        <div className="space-y-6">
          <SofiaAvatar />
          {showFeedback && (
            <DailyFeedback 
              metrics={currentData.metrics} 
              agentName={currentData.agent}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
