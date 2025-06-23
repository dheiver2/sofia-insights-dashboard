
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Sparkles, Brain, TrendingUp } from 'lucide-react';

export const SofiaAvatar = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Olá! Sou a Sofia, sua líder virtual. Estou aqui para te ajudar!",
    "Analisando seus indicadores em tempo real...",
    "Pronta para dar feedback personalizado sobre sua performance!",
    "Vamos alcançar suas metas juntas!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const activationTimer = setTimeout(() => {
      setIsActive(true);
    }, 1000);

    return () => clearTimeout(activationTimer);
  }, []);

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-primary flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          Sofia - Líder Virtual
          <Badge variant="outline" className="ml-2 text-green-400 border-green-400">
            <Sparkles className="mr-1 h-3 w-3" />
            Online
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sofia Avatar */}
        <div className="flex flex-col items-center space-y-4">
          <div className={`relative w-24 h-24 rounded-full pulse-accent-gradient p-1 ${isActive ? 'pulse-glow' : ''}`}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="h-10 w-10 text-background animate-pulse" />
            </div>
            {isActive && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          {/* Message Bubble */}
          <div className="relative bg-secondary/50 rounded-lg p-3 max-w-xs">
            <div className="text-sm text-center animate-fade-in">
              {messages[currentMessage]}
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-secondary/50"></div>
            </div>
          </div>
        </div>

        {/* Sofia Status */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-secondary/30 rounded-lg p-2 text-center">
            <div className="text-primary font-semibold">AI Status</div>
            <div className="text-green-400 flex items-center justify-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              Ativa
            </div>
          </div>
          <div className="bg-secondary/30 rounded-lg p-2 text-center">
            <div className="text-primary font-semibold">Análises</div>
            <div className="text-blue-400 flex items-center justify-center mt-1">
              <MessageSquare className="mr-1 h-3 w-3" />
              Prontas
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full pulse-accent-gradient hover:scale-105 transition-transform"
          onClick={() => setIsActive(!isActive)}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Conversar com Sofia
        </Button>
      </CardContent>
    </Card>
  );
};
