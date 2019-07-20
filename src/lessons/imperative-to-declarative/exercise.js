import React from 'react';

import DesktopView from './exercise.desktop';
import fixtureData from './exercise.fixture';
import SmartphoneView from './exercise.smartphone';
import TabletView from './exercise.tablet';

/**
 * Use this module to practice converting traditional imperative code that you might
 * write when consuming various browser-based or 3rd-party APIs, to something more
 * declarative in nature, using React component wrappers and lifecycle methods for
 * determining when certain things need to be set up, invoked, torn down, etc. One
 * example might be a wrapper around the window.fetch API, which would allow you to
 * declaratively embed a data request into your view, such that whenever the view is
 * mounted into the page, it waits for a data response before rendering its components.
 * That might look something like this:
 *
 * const Failure = ({ children, ...props }) => React.cloneElement(React.Children.only(children), props);
 * const Pending = ({ children }) => children;
 * const Success = ({ children, ...props }) => React.cloneElement(React.Children.only(children), props);
 *
 * const Fetch = class extends React.Component {
 *   static defaultProps = {
 *     fetch: window.fetch.bind(window),
 *     method: 'GET',
 *   };
 *
 *   state = {
 *     Component: Pending,
 *     response: {},
 *   };
 *
 *   _isMounted = false;
 *
 *   componentDidMount() {
 *     const { children, fetch, url, ...props } = this.props;
 *
 *     this._isMounted = true;
 *
 *     fetch(url, props)
 *       .then(response => response.json())
 *       .then(response => {
 *         this.setState({ Component: Success, response });
 *       })
 *       .catch(response => {
 *         this.setState({ Component: Failure, response });
 *       });
 *   }
 *
 *   componentWillUnmount() {
 *     this._isMounted = false;
 *   }
 *
 *   _getMatchingStateComponent() {
 *     const { Component } = this.state;
 *     const componentType = (<Component />).type;
 *
 *     return React.Children
 *       .toArray(this.props.children)
 *       .find(component => component.type === componentType) || null;
 *   }
 *
 *   render() {
 *     const component = this._getMatchingStateComponent();
 *
 *     if (!component) {
 *       return null;
 *     }
 *
 *     return React.cloneElement(component, {
 *       ...component.props,
 *       response: this.state.response,
 *     });
 *   }
 * };
 *
 * const Photos = ({ response: photos }) => {
 *   const filteredPhotos = photos.slice(0, 10);
 *
 *   return (
 *     <div>
 *       {filteredPhotos.map(photo => (
 *         <div key={photo.id}>
 *           <img src={photo.thumbnailUrl} title={photo.title} />
 *         </div>
 *       ))}
 *     </div>
 *   );
 * };
 *
 * const DataDrivenView = () => (
 *   <Fetch url="https://jsonplaceholder.typicode.com/photos">
 *     <Pending>
 *       <span>Loading...</span>
 *     </Pending>
 *     <Success>
 *       <Photos />
 *     </Success>
 *     <Failure>
 *       <span>Something went wrong!</span>
 *     </Failure>
 *   </Fetch>
 * );
 *
 * See if you can figure out how to wrap the window.matchMedia API in a declarative component.
 * The goal of this exercise is that you should allow consumers to specify @media-style rules
 * that will then be passed to the window.matchMedia API, and used to inform the components of
 * when it should be rendering at any given time, based on whether or not its rule matches.
 **/

const MediaQuery = () => null;

const Exercise = () => (
  <React.Fragment>
    <MediaQuery query="(max-width: 600px)">
      <SmartphoneView data={fixtureData} />
    </MediaQuery>
    <MediaQuery query="(min-width: 601px) and (max-width: 1024px)">
      <TabletView data={fixtureData} />
    </MediaQuery>
    <MediaQuery query="(min-width: 1025px)">
      <DesktopView data={fixtureData} />
    </MediaQuery>
  </React.Fragment>
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * const MediaQuery = class extends React.Component {
 *   state = {
 *     matches: false,
 *     mql: null,
 *   };
 *
 *   componentDidMount() {
 *     const mql = window.matchMedia(this.props.query);
 *
 *     mql.addEventListener('change', this._checkForMatch);
 *
 *     this.setState({ mql }, this._checkForMatch);
 *   }
 *
 *   componentDidUpdate(prevProps) {
 *     if (prevProps.query !== this.props.query) {
 *       const { mql } = this.state;
 *       const newMql = window.matchMedia(this.props.query);
 *
 *       mql.removeEventListener('change', this._checkForMatch);
 *       newMql.addEventListener('change', this._checkForMatch);
 *
 *       this.setState({ mql: newMql },  this._checkForMatch);
 *     }
 *   }
 *
 *   _checkForMatch = () => {
 *     const { matches, mql } = this.state;
 *
 *     if (mql) {
 *       if (mql.matches !== matches) {
 *         this.setState({ matches: mql.matches });
 *       }
 *     } else if (matches) {
 *       this.setState({ matches: false });
 *     }
 *   };
 *
 *   render() {
 *     const { matches } = this.state;
 *
 *     if (!matches) {
 *       return null;
 *     }
 *
 *     return <React.Fragment>{this.props.children}</React.Fragment>;
 *   }
 * };
 **/
