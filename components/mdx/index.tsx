import { Children, isValidElement } from 'react';
import { CodeBlock } from './code-block';
import { Callout } from './callout';
import { Metric, MetricsGrid } from './metrics-grid';
import { ImageZoom } from './image-zoom';
import { CustomLink } from './custom-link';
import { CustomBlockquote } from './custom-blockquote';
import {
  CustomTable,
  CustomThead,
  CustomTh,
  CustomTr,
  CustomTd,
} from './custom-table';

export const mdxComponents = {
  // Custom components
  CodeBlock,
  Callout,
  Metric,
  MetricsGrid,
  ImageZoom,
  
  // Override default HTML elements
  img: ImageZoom,
  a: CustomLink,
  blockquote: CustomBlockquote,
  table: CustomTable,
  thead: CustomThead,
  th: CustomTh,
  tr: CustomTr,
  td: CustomTd,
  
  // Enhanced headings with explicit styling
  h1: (props: any) => (
    <h1 
      className="scroll-mt-20 font-serif font-bold text-4xl mt-12 mb-6 text-foreground" 
      {...props} 
    />
  ),
  h2: (props: any) => (
    <h2 
      className="scroll-mt-20 font-serif font-bold text-3xl mt-12 mb-4 pb-2 border-b border-border text-foreground" 
      {...props} 
    />
  ),
  h3: (props: any) => (
    <h3 
      className="scroll-mt-20 font-serif font-semibold text-xl mt-8 mb-3 text-foreground" 
      {...props} 
    />
  ),
  h4: (props: any) => (
    <h4 
      className="scroll-mt-20 font-serif font-semibold text-lg mt-6 mb-2 text-foreground" 
      {...props} 
    />
  ),
  h5: (props: any) => (
    <h5 
      className="scroll-mt-20 font-serif font-medium text-base mt-4 mb-2 text-foreground" 
      {...props} 
    />
  ),
  h6: (props: any) => (
    <h6 
      className="scroll-mt-20 font-serif font-medium text-sm mt-3 mb-2 text-muted-foreground" 
      {...props} 
    />
  ),
  
  // Paragraph styling
  p: (props: any) => {
    const blockTags = new Set([
      'div',
      'figure',
      'table',
      'pre',
      'ul',
      'ol',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'section',
      'article',
    ]);

    const hasBlockChild = Children.toArray(props.children).some((child) => {
      if (!isValidElement(child)) return false;
      if (child.type === ImageZoom || child.type === Callout || child.type === MetricsGrid) {
        return true;
      }
      return typeof child.type === 'string' && blockTags.has(child.type);
    });

    if (hasBlockChild) {
      return (
        <div className="leading-relaxed text-base my-4 text-foreground" {...props} />
      );
    }

    return (
      <p
        className="leading-relaxed text-base my-4 text-foreground"
        {...props}
      />
    );
  },
  
  // Enhanced pre/code blocks
  pre: ({ children, ...props }: any) => {
    // Check if this is a code block with language
    const childProps = children?.props;
    const className = childProps?.className || '';
    const isCodeBlock = className.startsWith('language-');
    
    if (isCodeBlock) {
      // Pass the language className to CodeBlock
      return <CodeBlock className={className}>{children}</CodeBlock>;
    }
    
    // Fallback for code blocks without language
    return (
      <pre className="overflow-x-auto p-4 bg-muted border border-border rounded-lg my-6" {...props}>
        {children}
      </pre>
    );
  },
  
  // Inline code
  code: ({ className, children, ...props }: any) => {
    // If it's part of a pre block (has language-* class), render it as-is
    // The syntax highlighting will be handled by SyntaxHighlighter in CodeBlock
    if (className?.startsWith('language-')) {
      return <code className={className} {...props}>{children}</code>;
    }
    
    // Otherwise, it's inline code
    return (
      <code
        className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-sm border border-border"
        {...props}
      >
        {children}
      </code>
    );
  },
  
  // Enhanced lists with better spacing
  ul: (props: any) => <ul className="my-4 space-y-0.5 list-disc pl-5 marker:text-primary" {...props} />,
  ol: (props: any) => <ol className="my-4 space-y-0.5 list-decimal pl-5 marker:text-primary" {...props} />,
  li: (props: any) => <li className="leading-relaxed pl-1" {...props} />,
  
  // Text styling
  strong: (props: any) => <strong className="font-semibold text-foreground" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,
  
  // Horizontal rule with styling
  hr: (props: any) => (
    <hr className="my-8 border-border" {...props} />
  ),
};

export type MDXComponents = typeof mdxComponents;
