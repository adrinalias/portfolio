import { AlertCircle, CheckCircle, Info, AlertTriangle, Lightbulb } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'danger' | 'success' | 'tip';
  title?: string;
  children: React.ReactNode;
}

const calloutStyles = {
  info: {
    container: 'bg-blue-50 dark:bg-blue-950/30 border-blue-500',
    icon: Info,
    iconColor: 'text-blue-500',
    title: 'text-blue-900 dark:text-blue-100',
  },
  warning: {
    container: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-500',
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
    title: 'text-yellow-900 dark:text-yellow-100',
  },
  danger: {
    container: 'bg-red-50 dark:bg-red-950/30 border-red-500',
    icon: AlertCircle,
    iconColor: 'text-red-500',
    title: 'text-red-900 dark:text-red-100',
  },
  success: {
    container: 'bg-green-50 dark:bg-green-950/30 border-green-500',
    icon: CheckCircle,
    iconColor: 'text-green-500',
    title: 'text-green-900 dark:text-green-100',
  },
  tip: {
    container: 'bg-purple-50 dark:bg-purple-950/30 border-purple-500',
    icon: Lightbulb,
    iconColor: 'text-purple-500',
    title: 'text-purple-900 dark:text-purple-100',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const style = calloutStyles[type];
  const Icon = style.icon;

  return (
    <div className={`border-l-4 ${style.container} p-4 my-6 rounded-r-lg`}>
      <div className="flex gap-3">
        <Icon className={`${style.iconColor} h-5 w-5 flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          {title && (
            <div className={`font-semibold mb-1 ${style.title}`}>
              {title}
            </div>
          )}
          <div className="text-sm leading-relaxed [&>p]:m-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
