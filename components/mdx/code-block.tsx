'use client';

import { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ children, className, filename, showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : 'light';

  const handleCopy = async () => {
    const code = extractTextContent(children);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const extractTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractTextContent).join('');
    if (node && typeof node === 'object' && 'props' in node) {
      return extractTextContent((node as any).props.children);
    }
    return '';
  };

  // Extract language from className (e.g., "language-python" -> "python")
  const language = className?.replace(/language-/, '') || 'text';
  const codeContent = extractTextContent(children);

  return (
    <div className="relative group my-6 not-prose">
      {filename && (
        <div className="flex items-center justify-between bg-muted/50 border border-border rounded-t-lg px-4 py-2 font-mono text-xs text-muted-foreground">
          <span>{filename}</span>
        </div>
      )}
      <div className="relative">
        <div className={`rounded-lg overflow-hidden border border-border ${filename ? 'rounded-t-none border-t-0' : ''} [&_.linenumber]:opacity-0 [&_.linenumber]:transition-opacity group-hover:[&_.linenumber]:opacity-100 [@media(hover:none)]:[&_.linenumber]:opacity-100`}>
          <SyntaxHighlighter
            language={language}
            style={currentTheme === 'dark' ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: '0.875rem',
              padding: '1rem',
            }}
            showLineNumbers={showLineNumbers}
          >
            {codeContent}
          </SyntaxHighlighter>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity bg-background/80 hover:bg-background"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
