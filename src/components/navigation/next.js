import { Nav } from 'react-bootstrap';
import React from 'react';

import { RouterLink } from './index';
import lessons from './lessons';

const NextLessonLink = ({ lesson }) => {
  const lessonKeys = Object.keys(lessons);
  const currentLessonIndex = lessonKeys.findIndex(lessonKey => lessonKey === lesson);

  if (currentLessonIndex === -1) {
    throw new Error(`Lesson not found: ${lesson}`);
  }

  if (currentLessonIndex === lessonKeys.length - 1) {
    return null;
  }

  const url = lessonKeys[currentLessonIndex + 1];

  return (
    <div className="next">
      <Nav.Link as={RouterLink} href={url}>Next Lesson: {lessons[url]} &rarr;</Nav.Link>
    </div>
  );
};

export default NextLessonLink;
