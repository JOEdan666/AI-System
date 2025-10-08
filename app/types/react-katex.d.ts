declare module 'react-katex' {
  import { ReactNode } from 'react';
  
  interface InlineMathProps {
    math: string;
    errorColor?: string;
    renderError?: (error: Error) => ReactNode;
    settings?: Record<string, any>;
  }
  
  interface BlockMathProps {
    math: string;
    errorColor?: string;
    renderError?: (error: Error) => ReactNode;
    settings?: Record<string, any>;
  }
  
  export function InlineMath(props: InlineMathProps): ReactNode;
  export function BlockMath(props: BlockMathProps): ReactNode;
}