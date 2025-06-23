
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DailyFeedback } from './DailyFeedback';
import { SofiaAvatar } from './SofiaAvatar';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Award, 
  Lightbulb, 
  Activity,
  BarChart3,
  MessageSquare,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Star
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

interface SofiaFeedbackTabProps {
  metrics: Metrics;
  agentName: string;
}

export const SofiaFeedbackTab: React.FC<SofiaFeedbackTabProps> = ({ metrics, agentName }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const calculateOverallScore = () => {
    const scores = [
      metrics.satisfaction * 10,
      metrics.resolutionRate,
      metrics.firstCallResolution,
      metrics.qualityScore * 10,
      metrics.adherenceSchedule,
      Math.max(100 - metrics.escalationRate * 5, 0),
      Math.min((5 / metrics.avgCallTime) * 100, 100),
      Math.max(100 - (metrics.waitTime / 60) * 100, 0),
      Math.min((metrics.callsHandled / 50) * 100, 100),
      metrics.salesConversion * 5
    ];
    
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const overallScore = calculateOverallScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
    return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
  };

  const insights = [
    {
      icon: Award,
      title: 'Pontos Fortes',
      items: [
        ...(metrics.satisfaction >= 8.5 ? ['Excelente satisfação do cliente'] : []),
        ...(metrics.qualityScore >= 8.5 ? ['Alta qualidade nas chamadas'] : []),
        ...(metrics.resolutionRate >= 85 ? ['Ótima taxa de resolução'] : []),
        ...(metrics.adherenceSchedule >= 90 ? ['Pontualidade exemplar'] : [])
      ],
      color: 'text-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Oportunidades',
      items: [
        ...(metrics.avgCallTime > 5 ? ['Reduzir tempo médio de chamada'] : []),
        ...(metrics.waitTime > 30 ? ['Diminuir tempo de espera'] : []),
        ...(metrics.escalationRate > 10 ? ['Reduzir escalações'] : []),
        ...(metrics.salesConversion < 12 ? ['Melhorar conversão de vendas'] : [])
      ],
      color: 'text-orange-600'
    },
    {
      icon: Lightbulb,
      title: 'Recomendações',
      items: [
        'Pratique técnicas de escuta ativa',
        'Use perguntas abertas para identificar necessidades',
        'Confirme sempre o entendimento do cliente',
        'Mantenha um tom empático e profissional'
      ],
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sofia - Inteligência Artificial</h2>
            <p className="text-slate-600 dark:text-slate-400">Análise completa da sua performance</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sofia Avatar & Status */}
        <div className="lg:col-span-1">
          <SofiaAvatar />
        </div>

        {/* Performance Score */}
        <div className="lg:col-span-2">
          <Card className={`${getScoreBgColor(overallScore)} border-2`}>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Star className={`h-6 w-6 ${getScoreColor(overallScore)}`} />
                <span className={getScoreColor(overallScore)}>Performance Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {isAnalyzing ? (
                <div className="space-y-3">
                  <div className="animate-pulse">
                    <Brain className="h-12 w-12 mx-auto text-purple-500" />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Sofia está analisando seus dados...</p>
                </div>
              ) : (
                <>
                  <div className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>
                    {overallScore}/100
                  </div>
                  <Progress value={overallScore} className="h-3" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {overallScore >= 80 ? 'Excelente desempenho!' : 
                     overallScore >= 60 ? 'Bom desempenho, continue melhorando!' : 
                     'Há oportunidades de melhoria significativas.'}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card key={index} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 ${insight.color}`}>
                  <Icon className="h-5 w-5" />
                  <span>{insight.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {insight.items.length > 0 ? (
                    insight.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">
                        {insight.title === 'Pontos Fortes' ? 'Continue se dedicando em todas as áreas!' : 
                         insight.title === 'Oportunidades' ? 'Você está performando muito bem!' : 
                         'Mantenha suas boas práticas atuais!'}
                      </span>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Daily Feedback Component */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-purple-500" />
            <span>Feedback Detalhado da Sofia</span>
            <Badge variant="outline" className="ml-2">
              <Sparkles className="h-3 w-3 mr-1" />
              IA Personalizada
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DailyFeedback metrics={metrics} agentName={agentName} />
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
            <Target className="h-5 w-5" />
            <span>Próximos Passos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-semibold">Treinamento Personalizado</div>
                <div className="text-sm text-muted-foreground">Baseado na sua performance atual</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-semibold">Metas da Semana</div>
                <div className="text-sm text-muted-foreground">Definir objetivos específicos</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
