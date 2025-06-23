import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PerformanceMetrics } from './PerformanceMetrics';
import { SofiaAvatar } from './SofiaAvatar';
import { DailyFeedback } from './DailyFeedback';
import { MetricsChart } from './MetricsChart';
import { QuickActions } from './QuickActions';
import { StatsSummary } from './StatsSummary';
import { Clock, Users, Phone, TrendingUp, Award, Target, Bell, Settings, Sun, Moon } from 'lucide-react';

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen pulse-gradient">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-50 glass-strong border-b border-border/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/3e9a62ac-b44a-4fb5-b48c-edfb073bbdfe.png" 
                alt="Pulse Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-gradient">Painel do Atendente</h1>
                <p className="text-sm text-muted-foreground">Bem-vinda, {currentData.agent}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-primary border-primary bg-primary/5">
              <Clock className="mr-1 h-3 w-3" />
              {currentData.date}
            </Badge>
            
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
            
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button 
              onClick={() => setShowFeedback(!showFeedback)}
              className="pulse-accent-gradient hover:scale-105 transition-transform shadow-medium"
            >
              <Users className="mr-2 h-4 w-4" />
              Sofia Feedback
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Stats Summary Row */}
        <StatsSummary metrics={currentData.metrics} />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Metrics Area */}
          <div className="xl:col-span-3 space-y-6">
            <PerformanceMetrics metrics={currentData.metrics} />
            
            {/* Enhanced Key Indicators Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass-card interactive-card scale-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-blue-500" />
                      Tempo Médio
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Meta: 5min
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient mb-2">
                    {currentData.metrics.avgCallTime}min
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={getBadgeVariant(getPerformanceLevel(currentData.metrics.avgCallTime, 'time'))}
                      className="text-xs"
                    >
                      {getPerformanceLevel(currentData.metrics.avgCallTime, 'time')}
                    </Badge>
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card interactive-card scale-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-yellow-500" />
                      Satisfação
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Meta: 8.0
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient mb-2">
                    {currentData.metrics.satisfaction}/10
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={getBadgeVariant(getPerformanceLevel(currentData.metrics.satisfaction, 'rating'))}
                      className="text-xs"
                    >
                      {getPerformanceLevel(currentData.metrics.satisfaction, 'rating')}
                    </Badge>
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card interactive-card scale-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="mr-2 h-4 w-4 text-green-500" />
                      Resolução
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Meta: 85%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient mb-2">
                    {currentData.metrics.resolutionRate}%
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={getBadgeVariant(getPerformanceLevel(currentData.metrics.resolutionRate))}
                      className="text-xs"
                    >
                      {getPerformanceLevel(currentData.metrics.resolutionRate)}
                    </Badge>
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card interactive-card scale-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-purple-500" />
                      Chamadas
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Hoje
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient mb-2">
                    {currentData.metrics.callsHandled}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs text-primary border-primary bg-primary/5">
                      Meta: 40-50
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <MetricsChart />
          </div>

          {/* Sofia and Actions Sidebar */}
          <div className="space-y-6">
            <QuickActions />
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
    </div>
  );
};

export default Dashboard;
