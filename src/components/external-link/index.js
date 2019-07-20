import React from 'react';

import './index.css';

const ExternalLink = ({ children, href }) => (
  <a className="external-link" href={href} rel="noopener noreferrer" target="_blank">{children}</a>
);

export default ExternalLink;
