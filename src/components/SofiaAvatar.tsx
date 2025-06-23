
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Sparkles, Brain, TrendingUp, Zap, Heart } from 'lucide-react';

export const SofiaAvatar = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const messages = [
    {
      text: "Olá! Sou a Sofia, sua líder virtual. Estou aqui para te ajudar! 🌟",
      mood: "happy"
    },
    {
      text: "Analisando seus indicadores em tempo real... 📊",
      mood: "focused"
    },
    {
      text: "Pronta para dar feedback personalizado sobre sua performance! 🎯",
      mood: "excited"
    },
    {
      text: "Vamos alcançar suas metas juntas! 🚀",
      mood: "motivated"
    },
    {
      text: "Seus números estão ótimos hoje! Continue assim! 👏",
      mood: "proud"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
        setIsTyping(false);
      }, 1000);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const activationTimer = setTimeout(() => {
      setIsActive(true);
    }, 1000);

    return () => clearTimeout(activationTimer);
  }, []);

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'from-yellow-400 to-orange-500';
      case 'focused': return 'from-blue-400 to-purple-500';
      case 'excited': return 'from-pink-400 to-red-500';
      case 'motivated': return 'from-green-400 to-blue-500';
      case 'proud': return 'from-purple-400 to-pink-500';
      default: return 'from-primary to-accent';
    }
  };

  const currentMood = messages[currentMessage]?.mood || 'happy';

  return (
    <Card className="glass-card shadow-medium overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-gradient flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            Sofia - Líder Virtual
          </div>
          <Badge variant="outline" className="text-green-500 border-green-400 bg-green-50 dark:bg-green-900/20">
            <Sparkles className="mr-1 h-3 w-3" />
            Online
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enhanced Sofia Avatar */}
        <div className="flex flex-col items-center space-y-4">
          <div className={`relative w-28 h-28 rounded-full p-1 ${isActive ? 'pulse-glow float-animation' : ''}`}>
            <div className={`w-full h-full rounded-full bg-gradient-to-br ${getMoodColor(currentMood)} flex items-center justify-center relative overflow-hidden`}>
              <Brain className="h-12 w-12 text-white animate-pulse" />
              {isActive && (
                <>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Zap className="h-3 w-3 text-white" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Enhanced Message Bubble */}
          <div className="relative glass-strong rounded-2xl p-4 max-w-xs shadow-soft">
            {isTyping ? (
              <div className="flex items-center space-x-2 text-sm">
                <span>Sofia está digitando</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-center scale-in">
                {messages[currentMessage]?.text}
              </div>
            )}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-card"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Sofia Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card rounded-xl p-3 text-center shimmer">
            <div className="text-primary font-semibold text-sm mb-1">IA Status</div>
            <div className="text-green-500 flex items-center justify-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span className="text-xs font-medium">Ativa</span>
            </div>
          </div>
          <div className="glass-card rounded-xl p-3 text-center shimmer">
            <div className="text-primary font-semibold text-sm mb-1">Análises</div>
            <div className="text-blue-500 flex items-center justify-center">
              <Heart className="mr-1 h-3 w-3" />
              <span className="text-xs font-medium">24/7</span>
            </div>
          </div>
        </div>

        {/* Enhanced Action Button */}
        <Button 
          className="w-full pulse-success-gradient hover:scale-105 transition-all duration-300 shadow-medium text-white font-medium"
          onClick={() => setIsActive(!isActive)}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Conversar com Sofia
          <Sparkles className="ml-2 h-4 w-4" />
        </Button>

        {/* Sofia Insights Preview */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-3">
          <div className="text-xs font-medium text-center text-muted-foreground mb-2">
            💡 Insight do Dia
          </div>
          <div className="text-xs text-center">
            "Sua taxa de resolução melhorou 5% esta semana!"
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
