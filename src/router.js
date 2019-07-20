import { BrowserRouter, Route } from "react-router-dom";
import React from 'react';

import ComponentBasedDevelopmentLesson from './lessons/component-based-development';
import ClassVsFunctionBasedComponentsLesson from './lessons/class-vs-function-based-components';
import CompoundComponentsLesson from './lessons/compound-components';
import ImperativeToDeclarativeLesson from './lessons/imperative-to-declarative';
import ControllingComponentsLesson from './lessons/controlling-form-components';
import MemoizationLesson from './lessons/memoization';
import Page from './components/page';
import StateManagementWithReduxLesson from './lessons/state-management-with-redux';
import StateVsPropsVsContext from './lessons/state-vs-props-vs-context';
import TestingReactComponents from './lessons/testing-react-components';

import Home from './home';

const Router = () => (
  <BrowserRouter>
    <Page>
      <Route exact path="/" component={Home} />
      <Route path="/component-based-development" component={ComponentBasedDevelopmentLesson} />
      <Route path="/class-vs-function-based-components" component={ClassVsFunctionBasedComponentsLesson} />
      <Route path="/compound-components" component={CompoundComponentsLesson} />
      <Route path="/controlling-form-components" component={ControllingComponentsLesson} />
      <Route path="/state-vs-props-vs-context" component={StateVsPropsVsContext} />
      <Route path="/state-management-with-redux" component={StateManagementWithReduxLesson} />
      <Route path="/memoization" component={MemoizationLesson} />
      <Route path="/imperative-to-declarative" component={ImperativeToDeclarativeLesson} />
      <Route path="/testing-react-components" component={TestingReactComponents} />
    </Page>
  </BrowserRouter>
);

export default Router;
