interface CustomBlockquoteProps {
  children: React.ReactNode;
}

export function CustomBlockquote({ children }: CustomBlockquoteProps) {
  return (
    <blockquote className="border-l-4 border-primary bg-muted/50 p-4 my-6 rounded-r-lg italic">
      <div className="[&>p]:m-0 [&>p]:leading-relaxed">
        {children}
      </div>
    </blockquote>
  );
}
