import { cn } from "@/Lib/utils";
import { ReactNode } from "react";

interface paragraphProps {
  children: ReactNode;
  className?: string;
}

interface typographyListProps {
  items: any[];
  className?: string;
}

export function TypographyList({ items, className }: typographyListProps) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function TypographyH1({ children, className }: paragraphProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 font-extrabold text-4xl tracking-tight text-slate-700",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: paragraphProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 first:mt-0 pb-2 border-b font-semibold text-3xl tracking-tight text-slate-700",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: paragraphProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 font-semibold text-2xl tracking-tight text-slate-700",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children, className }: paragraphProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 font-semibold text-xl tracking-tight text-slate-700",
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyH5({ children, className }: paragraphProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 font-semibold text-lg tracking-tight text-slate-700",
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyP({ children, className }: paragraphProps) {
  return (
    <p className={cn("[&:not(:first-child)]:mt-6 leading-7", className)}>
      {children}
    </p>
  );
}

export function TypographyBlockquote({ children, className }: paragraphProps) {
  return (
    <blockquote className={cn("mt-6 pl-6 border-l-2 italic", className)}>
      {children}
    </blockquote>
  );
}

export function TypographyInlineCode({ children, className }: paragraphProps) {
  return (
    <code
      className={cn(
        "relative bg-muted px-[0.3rem] py-[0.2rem] rounded font-mono font-semibold text-sm",
        className,
      )}
    >
      {children}
    </code>
  );
}

export function TypographyLead({ children, className }: paragraphProps) {
  return (
    <p className={cn("text-muted-foreground text-xl", className)}>{children}</p>
  );
}

export function TypographyLarge({ children, className }: paragraphProps) {
  return (
    <div className={cn("font-semibold text-lg", className)}>{children}</div>
  );
}

export function TypographySmall({ children, className }: paragraphProps) {
  return (
    <small className={cn("font-medium text-sm leading-none", className)}>
      {children}
    </small>
  );
}

export function TypographyMuted({ children, className }: paragraphProps) {
  return <p className={cn("text-slate-500 text-sm", className)}>{children}</p>;
}
