
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PerformanceMetrics } from './PerformanceMetrics';
import { SofiaAvatar } from './SofiaAvatar';
import { DailyFeedback } from './DailyFeedback';
import { MetricsChart } from './MetricsChart';
import { QuickActions } from './QuickActions';
import { StatsSummary } from './StatsSummary';
import { DetailedReports } from './DetailedReports';
import { SofiaFeedbackTab } from './SofiaFeedbackTab';
import { Clock, Users, Phone, TrendingUp, Award, Target, Bell, Settings, Sun, Moon, BarChart3, FileText, Activity, Brain } from 'lucide-react';

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

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Professional Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <img 
                  src="/lovable-uploads/3e9a62ac-b44a-4fb5-b48c-edfb073bbdfe.png" 
                  alt="Pulse Logo" 
                  className="h-6 w-6 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Dashboard Pulse</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Bem-vinda, {currentData.agent}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <Clock className="mr-1 h-3 w-3" />
              {currentData.date}
            </Badge>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8 bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
            <TabsTrigger value="overview" className="flex items-center space-x-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/50">
              <Activity className="h-4 w-4" />
              <span className="font-medium">Visão Geral</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center space-x-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/50">
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">Indicadores</span>
            </TabsTrigger>
            <TabsTrigger value="sofia" className="flex items-center space-x-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900/50">
              <Brain className="h-4 w-4" />
              <span className="font-medium">Sofia IA</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900/50">
              <FileText className="h-4 w-4" />
              <span className="font-medium">Relatórios</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <StatsSummary metrics={currentData.metrics} />
                
                {/* Key Performance Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-blue-500" />
                          <span className="text-slate-700 dark:text-slate-300">Tempo Médio</span>
                        </div>
                        <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-700">
                          Meta: 5min
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
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

                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <div className="flex items-center">
                          <Award className="mr-2 h-4 w-4 text-yellow-500" />
                          <span className="text-slate-700 dark:text-slate-300">Satisfação</span>
                        </div>
                        <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-700">
                          Meta: 8.0
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
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

                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <div className="flex items-center">
                          <Target className="mr-2 h-4 w-4 text-green-500" />
                          <span className="text-slate-700 dark:text-slate-300">Resolução</span>
                        </div>
                        <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-700">
                          Meta: 85%
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
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

                  <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-purple-500" />
                          <span className="text-slate-700 dark:text-slate-300">Chamadas</span>
                        </div>
                        <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-700">
                          Hoje
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {currentData.metrics.callsHandled}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600">
                          Meta: 40-50
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <MetricsChart />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <QuickActions />
                <SofiaAvatar />
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Indicadores */}
          <TabsContent value="metrics" className="space-y-6">
            <PerformanceMetrics metrics={currentData.metrics} />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <MetricsChart />
              </div>
              <div className="space-y-6">
                <SofiaAvatar />
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Sofia IA */}
          <TabsContent value="sofia" className="space-y-6">
            <SofiaFeedbackTab metrics={currentData.metrics} agentName={currentData.agent} />
          </TabsContent>

          {/* Tab 4: Relatórios */}
          <TabsContent value="reports" className="space-y-6">
            <DetailedReports metrics={currentData.metrics} agentName={currentData.agent} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
