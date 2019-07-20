import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import React from 'react';

import './index.css';

const CodeBlock = ({ children, language }) => (
  <SyntaxHighlighter className="code-block" language={language} style={okaidia}>
    {children}
  </SyntaxHighlighter>
);

CodeBlock.defaultProps = {
  language: 'jsx',
};

export default CodeBlock;
