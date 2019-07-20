import React from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import CodeBlock from '../../components/code-block';
import ExternalLink from '../../components/external-link';
import FilePath from '../../components/file-path';
import Highlight from '../../components/highlight';
import Lesson from '../../components/lesson';

import Tips from './tips';

const TestingReactComponentsLesson = () => {
  useRegisterNavLink('https://jestjs.io/docs/en/expect.html', 'Jest Assertions');
  useRegisterNavLink('https://airbnb.io/enzyme/docs/api/shallow.html', 'Enzyme Documentation');
  useRegisterNavLink('https://docs.cypress.io/api/api/table-of-contents.html', 'Cypress API');

  return (
    <Lesson tips={<Tips />}>
      <h1>Testing React Components</h1>
      <div className="mt-4 text-justify">
        Testing is almost always a controversial topic. What do you test? How do you test it? How much of it do you test? Are units enough, or do you need integration, or actual automated UI tests? What's the difference anyway? And what tools are available to make it easier for developers to keep up with changes, because if it's not easy, tests will go stale and be a huge pain to try to keep in sync with ongoing code updates. There are a whole slew of other questions that come up when the subject of testing arises.
      </div>
      <div className="mt-4 text-justify">
        <div>For the purposes of this lesson, I'll standardize the vocabulary used:</div>
        <div>
          <ul>
            <li>Unit tests are very granular tests that test inputs to outputs. Functions should ideally be pure and <ExternalLink href="https://simple.wikipedia.org/wiki/Idempotence">idempotent</ExternalLink>. Given the same set of inputs, you should always have the same outputs, so that you can automate the aspect of calling it with predetermined inputs, and assert that the outputs match the expected values.</li>
            <li>Integration tests go a step further, and when certain actions are taken (e.g. clicking a button, calling a function, making an asynchronous request to some web service), they validate that certain side-effects have also taken place (e.g. some downstream function was called, some additional header has been attached to a request body, some event listener has been established, etc).</li>
            <li>Automated UI tests, also often referred to as end-to-end tests, are tests that actually run within the confines of a browser, whether driven by something like Selenium, Puppeteer, Casper, Cypress, or any other webdriver type of utility, or headlessly for certain browsers that allow for that type of webdriving. They typically validate entire workflows, usually happy and sad paths, such as "Is the user able to login, navigate to their profile, update their username, save it, and have that change reflected in their profile?"</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 text-justify">
        The most popular testing library for use with React projects is probably Jest. It's published by the same people that publish React (Facebook), and comes with a huge number of utility functions that obviate the need for some popular testing add-ons (e.g. sinon and various dependency mocking utilities). It allows you to create your own mock/spy functions, either as generic wrappers, or with specific implementations (e.g. if you want to test that a webservice response yields the desired state update, but don't want to actually issue a request or wait for one for actually respond, you can mock out the webservice endpoint to respond with a given payload, instantaneously). It allows you to use fake timers, so that if you have certain timeouts in your code, you don't need to wait for them to actually lapse in order for your test to complete. You can simple enable fake timers, and tell it to fast forward the time by N milliseconds. If you're using timeouts heavily throughout your application, this can literally shave minutes off of your test runs. It also comes with a pretty fully-featured assertion vocabularly, and familiar Jasmine-like syntax for the structure of your test modules themselves.
      </div>
      <div className="mt-4 text-justify">
        Arguably, one of the best features it offers is the ability to do what's called <Highlight>snapshot testing</Highlight>. On an initial test run, it can create a serialized snapshot to store in a file on disk and be checked in to your respository, and on subsequent runs, it simply validates that the output snapshot of the test matches the stored snapshot of the previous run. Some people use this to validate that markup structure hasn't accidentally changed from one component iteration to the next, but the main place where it shines is in redux testing. You can easily snapshot any object that comes out of an actual creator, as well as state transformations after the action has been dispatched through the reducer, without having to write a bunch of individual assertions to validate that specific properties are present or contain a specific value. You can just visually scan the snapshot and confirm those aspects manually, and once it's in a shape that's good to go, check it in and just execute against it for all future test runs. If those conditions ever change, you'll be notified with a test failure, and if the change is legitimate, you can just update the snapshot and check it as part of your changeset. A sample set of unit tests for different aspects of a reducer might look like this:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`/* action-creators.spec.js */
import { myActionCreator } from './action-creators';

describe('MyComponent', () => {
  describe('Action Creators', () => {
    describe('myActionCreator', () => {
      it('should match its stored snapshot', () => {
        const testValue = 'Test Value';

        expect(myActionCreator(testValue)).toMatchSnapshot();
      });
    });
  });
});`}</CodeBlock>
        <CodeBlock>{`/* action-handlers.spec.js */
import { myActionHandler } from './action-handlers';

describe('MyComponent', () => {
  describe('Action Handlers', () => {
    describe('myActionHandler', () => {
      it('should match its stored snapshot', () => {
        const testState = { value: '' };
        const testAction = { value: 'Test Value' };

        expect(myActionHandler(state, testAction)).toMatchSnapshot();
      });
    });
  });
});`}</CodeBlock>
        <CodeBlock>{`/* reducer.js */
import { MY_ACTION_TYPE } from './constants';
import { myActionCreator } from './action-creators';
import reducer from './reducer';

describe('MyComponent', () => {
  describe('Reducer', () => {
    describe(MY_ACTION_TYPE, () => {
      it('should match its stored snapshot', () => {
        const testState = { value: '' };
        const testValue = 'Test Value';
        const textAction = myActionCreator(testValue);

        expect(reducer(testState, testAction)).toMatchSnapshot();
      });
    });
  });
});`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Jest is often paired with another library called Enzyme for specific aspects of testing React components. Enzyme allows you to virtually mount components in isolated conditions, in order to test them individually, apart from the views they may be made a member of. In this way, you can validate in a sandboxed way, whether the input props of your component yield the expected outputs, whether those are registered event listeners, CSS class names, child components, or anything else. You can also programmatically change props and state conditions to ensure that related changes are also present in the component. Once you can validate all of those conditions in an isolated format, it doesn't matter what other component it's made a part of, you can be ensured that if that component passes the correct props, this component will behave in the correct ways. This is true unit testing at the component level. You can even choose what level of mounting you want to do to your target component, so that you can assert generically that certain subcomponent types are present, or assert more specifically whether certain markup structures are present, depending on how deeply you want to test them. A sample set of tests for a React component using Jest and Enzyme might look like this:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import { shallow, mount } from 'enzyme';
import MyComponent from './component';
import SomeSubcomponent from '../some-subcomponent';

const testValue = 'Test Value';
const props = {
  value: testValue,
};

describe('MyComponent', () => {
  describe('render', () => {
    it('should mount with no errors', () => {
      expect(() => {
        mount(<MyComponent {...props} />);
      }).not.toThrow();
    });

    it('should render an instance of SomeSubcomponent', () => {
      const component = shallow(<MyComponent {...props} />);

      expect(component.find(SomeSubcomponent).length).toBe(1);
    });

    it('should apply an onClick function prop to SomeSubcomponent', () => {
      const component = shallow(<MyComponent {...props} />);

      expect(typeof component.find(SomeSubcomponent).prop('onClick')).toBe('function');
    });
  });
});`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Unit tests are typically very small in nature, depending on how deeply you're testing various aspects of your application, and can be invaluable tools for catching the occasional mistake in your code. It's easy for something to slip through because it doesn't throw a runtime error, but automated tests like these can help catch logical and behavioral errors in a matter of seconds.
      </div>
      <div className="mt-4 text-justify">
        Integration tests go a little bit deeper, and test how different components actually relate to each other. They typically take some liberties about knowing certain implementation details behind subcomponents (or whhen testing non-component pieces of a system, knowing certain implementation details behind parts of the overall system), in order to be able to assert that those details are present in the final product. Because of this, integration details can be a bit more fragile than unit tests, because if something changes within a component, you no longer have to just update the unit tests around that component, but potentially other test modules that integrate with, to make sure those tests are in sync with the expected changes in the downstream module. A sample set of integration tests for a React component might look like this:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import { mount } from 'enzyme';
import MyComponent from './component';
import SomeSubcomponent from '../some-subcomponent';
import SomeListItemComponent from '../some-list-item-component';

const valueLength = 3;
const testValues = (new Array(valueLength)).fill(true).map((_, index) => \`Test Value $\{index + 1}\`);
const props = {
  value: testValues,
};

describe('MyComponent', () => {
  describe('render', () => {
    it(\`should render $\{valueLength} instances of SomeListItemComponent\`, () => {
      const component = mount(<MyComponent {...props} />);
      const subcomponent = component.find(SomeSubcomponent);

      expect(subcomponent.find(SomeListItemComponent).length).toBe(valueLength);
    });

    it(\`should call our onClick function when a SomeListItemComponent component is clicked, and pass its value\`, () => {
      const onClickSpy = jest.fn();
      const component = mount(<MyComponent {...props} onClick={onClickSpy} />);
      const subcomponent = component.find(SomeSubcomponent);
      const listItemComponent = subcomponent.find(SomeListItemComponent).at(0);

      listItemComponent.simulate('click');

      expect(onClickSpy).toHaveBeenCalledOnce();
      expect(onClickSpy).toHaveBeenCalledWith(testValues[0]);
    });
  });
});`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        When it comes to in-browser testing, Selenium is an old tried-and-true method that's been used for years, and has support for driving multiple browsers. However, those tests can be very brittle, not just because automated UI is brittle in general (it's the *most* brittle of the 3 methods covered here, because tests can break simply by having elements move from one spot on the page to another), but because of the way Selenium communicates with the browser instance, it can drop transmission packets and timeout its connection, causing test runs to fail through no fault of the actual tests or the page itself. Puppeteer is a Chromedriver published by Google, which does a nice job of interfacing with Chrome for the purpose of testing web pages the way a user would actually use them. It currently only offers support for driving Chrome, but has an experimental branch for use with Firefox. One of the newer offerings is called Cypress, which claims to have a Selenium-like product that will be capable of driving multiple browsers, but with a whole new communication platform, to prevent the timeout issues associated with Selenium. In additional, it allows for recording of test runs, as well as stepping forward and backward through test steps, so that if something fails, you can see every step along the path to failure.
      </div>
      <div className="mt-4 text-justify">
        One nice thing about Cypress's API is that all of its function calls are written in a synchronous fashion, so there's no need to litter your code with 1000 <Highlight>await</Highlight> statements like you would in a normal Puppeteer script. It will also auto-retry failing operations until the test times itself out, so if your page is loading content dynamically, and your test is attempting to assert against the presence of something that hasn't finished loading, there's no need for you to write retry logic into your test, Cypress will continue to retry the operation for you until it passes or times out. This lesson's exercise is going to involve some test authoring in both Jest and Cypress, using Jest for simple unit tests, and then writing some assertions against this actual project to get your feet wet with Cypress test authoring. Open the project's <FilePath>src/lessons/testing-react-components/exercise.js</FilePath> file to get started writing some simple tests with Jest and Enzyme, as well as some automated tests using Cypress.
      </div>
    </Lesson>
  );
};

export default TestingReactComponentsLesson;
