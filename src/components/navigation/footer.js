import React from 'react';

import NextLessonLink from './next';
import PreviousLessonLink from './previous';

import './footer.css';

const NavigationFooter = ({ lesson }) => (
  <footer className="navigation-footer">
    <PreviousLessonLink lesson={lesson} />
    <NextLessonLink lesson={lesson} />
  </footer>
);

export default NavigationFooter;
