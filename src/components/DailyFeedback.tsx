
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  AlertTriangle, 
  CheckCircle,
  Lightbulb,
  Heart,
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

interface DailyFeedbackProps {
  metrics: Metrics;
  agentName: string;
}

export const DailyFeedback: React.FC<DailyFeedbackProps> = ({ metrics, agentName }) => {
  const [currentFeedback, setCurrentFeedback] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

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

  const feedbacks = [
    {
      type: 'greeting',
      icon: Heart,
      title: 'Bom dia, Maria!',
      message: `Analisei sua performance de hoje e tenho insights valiosos para compartilhar com você.`,
      color: 'text-pink-400'
    },
    {
      type: 'overall',
      icon: Star,
      title: 'Performance Geral',
      message: `Sua pontuação geral hoje foi de ${overallScore}/100. ${overallScore >= 80 ? 'Excelente trabalho!' : overallScore >= 60 ? 'Bom desempenho, mas há espaço para melhorias.' : 'Vamos trabalhar juntas para melhorar seus resultados.'}`,
      color: overallScore >= 80 ? 'text-green-400' : overallScore >= 60 ? 'text-yellow-400' : 'text-red-400'
    },
    {
      type: 'strength',
      icon: Award,
      title: 'Pontos Fortes',
      message: getStrengthMessage(metrics),
      color: 'text-green-400'
    },
    {
      type: 'improvement',
      icon: TrendingUp,
      title: 'Áreas de Melhoria',
      message: getImprovementMessage(metrics),
      color: 'text-yellow-400'
    },
    {
      type: 'tips',
      icon: Lightbulb,
      title: 'Dicas Personalizadas',
      message: getPersonalizedTips(metrics),
      color: 'text-blue-400'
    },
    {
      type: 'motivation',
      icon: Target,
      title: 'Motivação do Dia',
      message: `Lembre-se: cada chamada é uma oportunidade de fazer a diferença na vida de alguém. Você tem o potencial para ser ainda melhor amanhã!`,
      color: 'text-purple-400'
    }
  ];

  function getStrengthMessage(metrics: Metrics): string {
    const strengths = [];
    
    if (metrics.satisfaction >= 8.5) strengths.push('excelente satisfação do cliente');
    if (metrics.qualityScore >= 8.5) strengths.push('alta qualidade nas chamadas');
    if (metrics.resolutionRate >= 85) strengths.push('ótima taxa de resolução');
    if (metrics.adherenceSchedule >= 90) strengths.push('pontualidade exemplar');
    if (metrics.firstCallResolution >= 80) strengths.push('eficiência na resolução');
    
    return strengths.length > 0 
      ? `Seus principais pontos fortes hoje foram: ${strengths.join(', ')}. Continue assim!`
      : 'Você mostrou dedicação em todas as áreas. Continue se esforçando!';
  }

  function getImprovementMessage(metrics: Metrics): string {
    const improvements = [];
    
    if (metrics.avgCallTime > 5) improvements.push('reduzir tempo médio de chamada');
    if (metrics.waitTime > 30) improvements.push('diminuir tempo de espera');
    if (metrics.escalationRate > 10) improvements.push('reduzir escalações');
    if (metrics.salesConversion < 12) improvements.push('melhorar conversão de vendas');
    
    return improvements.length > 0
      ? `Foque em: ${improvements.slice(0, 2).join(' e ')}. Isso terá grande impacto nos seus resultados.`
      : 'Você está performando muito bem em todas as áreas!';
  }

  function getPersonalizedTips(metrics: Metrics): string {
    if (metrics.avgCallTime > 5) {
      return 'Para reduzir o tempo de chamada: prepare um script mental, use perguntas direcionadas e pratique escuta ativa.';
    }
    if (metrics.satisfaction < 8) {
      return 'Para melhorar a satisfação: use o nome do cliente, demonstre empatia e confirme se a solução atendeu às expectativas.';
    }
    if (metrics.salesConversion < 12) {
      return 'Para aumentar vendas: identifique necessidades, apresente benefícios claros e crie senso de urgência apropriado.';
    }
    return 'Continue aplicando suas técnicas atuais. Considere compartilhar suas boas práticas com a equipe!';
  }

  useEffect(() => {
    setIsTyping(true);
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    return () => clearTimeout(typingTimer);
  }, [currentFeedback]);

  const nextFeedback = () => {
    setCurrentFeedback((prev) => (prev + 1) % feedbacks.length);
  };

  const prevFeedback = () => {
    setCurrentFeedback((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  const current = feedbacks[currentFeedback];
  const Icon = current.icon;

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <CardTitle className="text-lg text-primary flex items-center">
          <Icon className={`mr-2 h-5 w-5 ${current.color}`} />
          Feedback da Sofia
          <Badge variant="outline" className="ml-2 text-xs">
            {currentFeedback + 1}/{feedbacks.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Feedback Content */}
        <div className="bg-secondary/30 rounded-lg p-4 min-h-[120px] flex flex-col justify-center">
          <h3 className={`font-semibold mb-2 ${current.color}`}>
            {current.title}
          </h3>
          
          {isTyping ? (
            <div className="flex items-center space-x-1">
              <span>Sofia está digitando</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed animate-fade-in">
              {current.message}
            </p>
          )}
        </div>

        {/* Overall Score Progress */}
        {current.type === 'overall' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Score Geral</span>
              <span className="font-semibold">{overallScore}/100</span>
            </div>
            <Progress 
              value={overallScore} 
              className="h-2"
            />
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={prevFeedback}
            disabled={currentFeedback === 0}
          >
            Anterior
          </Button>
          
          <div className="flex space-x-1">
            {feedbacks.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentFeedback ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={nextFeedback}
            disabled={currentFeedback === feedbacks.length - 1}
          >
            Próximo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
