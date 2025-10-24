"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // simple className merge utility, create if missing

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn("rounded-xl border border-border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }) {
  return <div className={cn("p-4", className)} {...props}>{children}</div>;
}

export function CardHeader({ className, children, ...props }) {
  return <div className={cn("p-4 border-b border-border", className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props}>{children}</h3>;
}

export function CardDescription({ className, children, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props}>{children}</p>;
}
