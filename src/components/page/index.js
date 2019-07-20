import React from 'react';

import Navigation from '../navigation';

import './index.css';

const Page = ({ children }) => (
  <React.Fragment>
    <header>
      <Navigation />
    </header>
    <div className="content">
      {children}
    </div>
  </React.Fragment>
);

export default Page;
