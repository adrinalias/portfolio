import { ExternalLink } from 'lucide-react';

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children: React.ReactNode;
}

export function CustomLink({ href, children, ...props }: CustomLinkProps) {
  const isExternal = href?.startsWith('http');
  const isAnchor = href?.startsWith('#');

  return (
    <a
      href={href}
      {...props}
      {...(isExternal && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
      className="inline-flex items-center gap-1 text-primary hover:underline"
    >
      {children}
      {isExternal && <ExternalLink className="h-3 w-3 inline-block" />}
    </a>
  );
}
