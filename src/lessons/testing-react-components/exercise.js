import React from 'react';

/**
 * Use this module to practice writing test coverage for components. Below, you'll find a
 * TestableComponent component that takes a couple of optional props, and renders nothing
 * unless one of those props has been passed. Your job will be to open the exercise.spec.js
 * file and write test coverage around the different use cases those props define. You'll
 * find a scaffolding created for you with 4 tests that automatically fail until they've
 * been implemented. From the command line, just run 'yarn test' to confirm whether or not
 * your test coverage is good enough to satisfy those conditions. As you continue iterating
 * on your tests, the jest process will automatically run on each save, as long as you leave
 * it in watch mode. Once you've gotten all of your tests passing, you can switch to the
 * second part of this exercise: writing some Cypress automated tests to test this page.
 *
 * Go ahead and ^C at the command line to kill the jest process, and run 'yarn test:e2e:dev'.
 * This will launch the Cypress test runner in interactive mode.
 **/

export const TestableComponent = ({ renderSomething, throwError }) => {
  if (throwError) {
    throw new Error('You should not have passed a throw prop.');
  }

  if (renderSomething) {
    return <span>Hello World!</span>;
  }

  return null;
};

const Exercise = props => (
  <TestableComponent {...props} />
);

export default Exercise;
