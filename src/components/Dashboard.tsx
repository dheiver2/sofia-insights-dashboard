
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
import { Clock, Users, Phone, TrendingUp, Award, Target, Bell, Settings, Sun, Moon, BarChart3, FileText, Activity, Brain, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Enhanced Professional Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/80 dark:border-slate-700/80 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center shadow-xl">
                  <img 
                    src="/lovable-uploads/3e9a62ac-b44a-4fb5-b48c-edfb073bbdfe.png" 
                    alt="Pulse Logo" 
                    className="h-7 w-7 object-contain filter brightness-0 invert"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Dashboard Pulse
                </h1>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Bem-vinda,</p>
                  <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-medium">
                    {currentData.agent}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 px-3 py-1.5">
                <Clock className="mr-2 h-3 w-3" />
                {currentData.date}
              </Badge>
              
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
              
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-slate-600 dark:text-slate-400 font-medium">Online</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="relative hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                    {notifications}
                  </span>
                )}
              </Button>
              
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              <Button variant="ghost" size="sm" className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <Tabs defaultValue="overview" className="w-full space-y-8">
          {/* Enhanced Tab Navigation */}
          <div className="relative">
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-4 h-14 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-2xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-2">
              <TabsTrigger 
                value="overview" 
                className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-medium transition-all duration-300"
              >
                <Activity className="h-4 w-4" />
                <span>Visão Geral</span>
              </TabsTrigger>
              <TabsTrigger 
                value="metrics" 
                className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-medium transition-all duration-300"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Indicadores</span>
              </TabsTrigger>
              <TabsTrigger 
                value="sofia" 
                className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-medium transition-all duration-300"
              >
                <Brain className="h-4 w-4" />
                <span>Sofia IA</span>
                <Sparkles className="h-3 w-3 opacity-70" />
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-medium transition-all duration-300"
              >
                <FileText className="h-4 w-4" />
                <span>Relatórios</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab 1: Enhanced Overview */}
          <TabsContent value="overview" className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              <div className="xl:col-span-3 space-y-8">
                {/* Enhanced Stats Summary */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Resumo da Performance</h2>
                    <Badge variant="outline" className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Tendência Positiva
                    </Badge>
                  </div>
                  <StatsSummary metrics={currentData.metrics} />
                </div>
                
                {/* Enhanced Key Performance Cards */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Indicadores Principais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <Card className="group bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-blue-900/20 border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-slate-700 dark:text-slate-300 font-medium">Tempo Médio</span>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">
                          {currentData.metrics.avgCallTime}min
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant={getBadgeVariant(getPerformanceLevel(currentData.metrics.avgCallTime, 'time'))}
                            className="text-xs font-medium"
                          >
                            {getPerformanceLevel(currentData.metrics.avgCallTime, 'time')}
                          </Badge>
                          <div className="flex items-center text-green-600 text-sm">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>Meta: 5min</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="group bg-gradient-to-br from-white to-yellow-50/50 dark:from-slate-800 dark:to-yellow-900/20 border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center mr-3">
                              <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <span className="text-slate-700 dark:text-slate-300 font-medium">Satisfação</span>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">
                          {currentData.metrics.satisfaction}/10
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant={getBadgeVariant(getPerformanceLevel(currentData.metrics.satisfaction, 'rating'))}
                            className="text-xs font-medium"
                          >
                            {getPerformanceLevel(currentData.metrics.satisfaction, 'rating')}
                          </Badge>
                          <div className="flex items-center text-green-600 text-sm">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>Meta: 8.0</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="group bg-gradient-to-br from-white to-green-50/50 dark:from-slate-800 dark:to-green-900/20 border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                              <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-slate-700 dark:text-slate-300 font-medium">Resolução</span>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">
                          {currentData.metrics.resolutionRate}%
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant={getBadgeVariant(getPerformanceLevel(currentData.metrics.resolutionRate))}
                            className="text-xs font-medium"
                          >
                            {getPerformanceLevel(currentData.metrics.resolutionRate)}
                          </Badge>
                          <div className="flex items-center text-green-600 text-sm">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>Meta: 85%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="group bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-800 dark:to-purple-900/20 border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-slate-700 dark:text-slate-300 font-medium">Chamadas</span>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">
                          {currentData.metrics.callsHandled}
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs font-medium border-slate-300 dark:border-slate-600">
                            Hoje
                          </Badge>
                          <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                            <span>Meta: 40-50</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Enhanced Chart Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Tendências de Performance</h3>
                  <MetricsChart />
                </div>
              </div>

              {/* Enhanced Sidebar */}
              <div className="space-y-6">
                <QuickActions />
                <SofiaAvatar />
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Enhanced Metrics */}
          <TabsContent value="metrics" className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Indicadores Detalhados</h2>
                <Badge variant="outline" className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                  Atualizado em tempo real
                </Badge>
              </div>
              <PerformanceMetrics metrics={currentData.metrics} />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <MetricsChart />
                </div>
                <div className="space-y-6">
                  <SofiaAvatar />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Enhanced Sofia IA */}
          <TabsContent value="sofia" className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
            <SofiaFeedbackTab metrics={currentData.metrics} agentName={currentData.agent} />
          </TabsContent>

          {/* Tab 4: Enhanced Reports */}
          <TabsContent value="reports" className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Relatórios Avançados</h2>
                <Badge variant="outline" className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                  Análise Completa
                </Badge>
              </div>
              <DetailedReports metrics={currentData.metrics} agentName={currentData.agent} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
