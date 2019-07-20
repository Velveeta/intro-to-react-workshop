import React from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import ExerciseSandbox from '../../components/exercise-sandbox';
import FilePath from '../../components/file-path';
import Lesson from '../../components/lesson';

import Exercise from './exercise';
import Tips from './tips';

const ComponentBasedDevelopmentLesson = () => {
  useRegisterNavLink('https://reactjs.org/docs/thinking-in-react.html', 'Thinking in React');

  return (
    <Lesson tips={<Tips />}>
      <h1>Component-based Development</h1>
      <div className="mt-4 text-justify">
        Component-based development is what React is all about. It's the process of looking at the goal you're trying to accomplish, and breaking that up into logical groupings of UI and behavior, which may themselves be composed of smaller pieces of logical groupings of UI and behavior, and then implementing those bits and pieces in a way that is as reusable and as extensible as possible.
      </div>
      <div className="mt-4 text-justify">
        This exercise is just about getting comfortable with the concept of breaking things down into more bite-sized pieces. The UI being rendered below is constructed of one gigantic view, with plenty of opportunity for decomposing it into smaller views that can then be reinserted. Doing this makes for more reusable code, which is easier to test individually, and also makes your markup more semantic. Other people should be able to look at the components comprising a view, and be able to pretty easily reason out what they mean, without having to dive into each one to read how it works. Descriptive component and tag names make your views read like well-structured documents, which is great for ongoing maintenance concerns over the lifetime of views the make up most applications. Open the project's <FilePath>src/lessons/component-based-development/exercise.js</FilePath> file to start deconstructing it into something a lot more manageable.
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
    </Lesson>
  );
};

export default ComponentBasedDevelopmentLesson;
