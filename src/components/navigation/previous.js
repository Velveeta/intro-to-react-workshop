import { Nav } from 'react-bootstrap';
import React from 'react';

import { RouterLink } from './index';
import lessons from './lessons';

const PreviousLessonLink = ({ lesson }) => {
  const lessonKeys = Object.keys(lessons);
  const currentLessonIndex = lessonKeys.findIndex(lessonKey => lessonKey === lesson);

  if (currentLessonIndex === -1) {
    throw new Error(`Lesson not found: ${lesson}`);
  }

  if (currentLessonIndex === 0) {
    return null;
  }

  const url = lessonKeys[currentLessonIndex - 1];

  return (
    <div className="previous">
      <Nav.Link as={RouterLink} href={url}>&larr; Previous Lesson: {lessons[url]}</Nav.Link>
    </div>
  );
};

export default PreviousLessonLink;
