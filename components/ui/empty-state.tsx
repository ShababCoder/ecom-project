"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateAction {
  label: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  icon?: LucideIcon;
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16",
        className,
      )}
    >
      <div className="mb-6 rounded-full bg-muted p-6">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          <Button
            onClick={action.onClick}
            disabled={action.disabled}
            asChild={!!action.href}
          >
            {action.href ? (
              <a href={action.href} className="flex items-center gap-2">
                {action.icon && <action.icon className="h-4 w-4" />}
                {action.label}
              </a>
            ) : (
              <span className="flex items-center gap-2">
                {action.icon && <action.icon className="h-4 w-4" />}
                {action.label}
              </span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
