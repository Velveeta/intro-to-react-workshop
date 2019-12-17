import { BrowserRouter, Route } from "react-router-dom";
import React, { lazy, Suspense } from 'react';

import Page from './components/page';

const ComponentBasedDevelopmentLesson = lazy(() => import('./lessons/component-based-development'));
const ClassVsFunctionBasedComponentsLesson = lazy(() => import('./lessons/class-vs-function-based-components'));
const CompoundComponentsLesson = lazy(() => import('./lessons/compound-components'));
const Home = lazy(() => import('./home'));
const ImperativeToDeclarativeLesson = lazy(() => import('./lessons/imperative-to-declarative'));
const ControllingComponentsLesson = lazy(() => import('./lessons/controlling-form-components'));
const MemoizationLesson = lazy(() => import('./lessons/memoization'));
const StateManagementWithReduxLesson = lazy(() => import('./lessons/state-management-with-redux'));
const StateVsPropsVsContext = lazy(() => import('./lessons/state-vs-props-vs-context'));
const TestingReactComponents = lazy(() => import('./lessons/testing-react-components'));

const Router = () => (
  <BrowserRouter>
    <Page>
      <Suspense fallback={null}>
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
      </Suspense>
    </Page>
  </BrowserRouter>
);

export default Router;
