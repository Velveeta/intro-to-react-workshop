import React from 'react';

import './index.css';

const Highlight = ({ children, className }) => (
  <code className={className}>{children}</code>
);

export default Highlight;
