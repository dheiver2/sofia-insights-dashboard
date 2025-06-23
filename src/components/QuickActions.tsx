
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  PhoneCall, 
  Coffee, 
  Clock, 
  MessageSquare, 
  BarChart3,
  FileText,
  RefreshCw
} from 'lucide-react';

export const QuickActions = () => {
  const actions = [
    {
      icon: Phone,
      label: 'Nova Chamada',
      color: 'bg-green-500 hover:bg-green-600',
      urgent: false
    },
    {
      icon: Coffee,
      label: 'Pausar',
      color: 'bg-orange-500 hover:bg-orange-600',
      urgent: false
    },
    {
      icon: Clock,
      label: 'Intervalo',
      color: 'bg-blue-500 hover:bg-blue-600',
      urgent: false
    },
    {
      icon: MessageSquare,
      label: 'Chat',
      color: 'bg-purple-500 hover:bg-purple-600',
      urgent: true,
      badge: '3'
    }
  ];

  const reports = [
    { icon: BarChart3, label: 'Relatórios' },
    { icon: FileText, label: 'Histórico' },
    { icon: RefreshCw, label: 'Atualizar' }
  ];

  return (
    <Card className="glass-card shadow-medium">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-gradient flex items-center">
          <PhoneCall className="mr-2 h-5 w-5" />
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary Actions */}
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                className={`${action.color} text-white h-12 relative float-animation`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Icon className="mr-2 h-4 w-4" />
                {action.label}
                {action.urgent && action.badge && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1">
                    {action.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        {/* Secondary Actions */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-2">
            {reports.map((report, index) => {
              const Icon = report.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-10 glass-card hover:bg-primary/10 hover:border-primary/50"
                >
                  <Icon className="h-3 w-3" />
                  <span className="sr-only">{report.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Online</span>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
              Disponível
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
