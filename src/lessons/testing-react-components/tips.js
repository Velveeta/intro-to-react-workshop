import React from 'react';

import Highlight from '../../components/highlight';

const TestingReactComponentsTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        Keep your unit tests simple. They should test a single facet of a single feature. If you have a prop that causes something to conditionally render, test both cases of that, with and without the proper value. If you have a condition that should throw an error, try to create that condition in the test environment, and ensure that the error is thrown. If you're expecting certain verbiage to be present, or certain elements to be present, create the condition that should manifest that and assert that it's correct. Unit tests are simple to write, and typically quick to execute. These should make up the bulk of your testing library.
      </div>
      <div className="mt-3 text-justify">
        Integration tests should make up another segment of your overall test suite, where they make sense. If you have some critical path through your component tree, and something lower down is dependent on something higher up being in a certain state in order for it to look and behave properly, assemble that component tree and make sure the high-level condition is in place so that you can programmatically confirm that the low-level side-effect is <strong>also</strong> in place.
      </div>
      <div className="mt-3 text-justify">
        When it comes to automated testing in the browser, these tend to be the most fragile of any of your tests, but are also the most valuable. These are the tests that are going to use your application in the same way your users will. They'll login, they'll navigate between pages, interact with form elements, request data from endpoints to be displayed and acted upon, etc. These are typically the most expensive for an organization to maintain over time, but can give a high degree of confidence that what you're releasing is going to work as expected.
      </div>
      <div className="mt-3 text-justify">
        In all of these circumstances, take whatever precautions you can in order to make your tests as robust and versatile as possible over their lifetimes. Try to avoid using overly-specific (e.g. id's and class names) <strong>or</strong> overly-generic (e.g. <Highlight>nav</Highlight> or <Highlight>button</Highlight>) selectors to target the elements you're wanting to work with. Whenever possible, use purpose-made attributes to identify these elements, something like <Highlight>data-test-id</Highlight> that can be targeted by your test runner, but don't introduce any styles or behaviors on their own within the application. These make for perfect selectors to latch onto, as they shouldn't have anything to do with presentation, and are unlikely to change very often. Even if they move around on the page, they're still highly targetable. A <Highlight>data-test-id="shipments-grid"</Highlight> is always going to be a shipments grid whether it lives in the center content area or the right-hand column or some kind of popover layer. For core components that are often targeted, consider providing a default test id of a generic name, but allow it to be overridden by the consumer. As an example, imagine a Dropdown component with a default test id of <Highlight>dropdown</Highlight>, but which can be overridden to specify that it's a <Highlight>profile-dropdown</Highlight>. You can also use surrounding components to provide additional context to these, so that if there are multiple on the page, you can easily target the correct one. If you have a <Highlight>language-selection-dropdown</Highlight> in the header, footer, and left-column navigation, you can target the appropriate dropdown for your test by providing some extra selector context with something like <Highlight>[data-test-id="footer"] [data-test-id="language-selection-dropdown"]</Highlight>.
      </div>
    </div>
  </React.Fragment>
);

export default TestingReactComponentsTips;
