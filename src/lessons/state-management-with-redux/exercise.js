// eslint-disable-next-line no-unused-vars
import { connect, Provider } from 'react-redux';
import React from 'react';

// eslint-disable-next-line no-unused-vars
import { deleteItem } from './exercise.action-creators';
import store from './exercise.store';

/**
 * Use this module to practice managing your component state completely externally,
 * using the redux and react-redux libraries to read from a global state tree and
 * apply a set of props and actions to your component. The 'styles' and 'ItemsList'
 * are provided for you, as well as the redux store, constants, and reducer files
 * and implementations. The function definitions have been set up for you in the
 * action creators/handlers files, but will need the implementations written. Then
 * all you need to do is flesh out your mapStateToProps and mapDispatchToProps items
 * and connect your component.
 *
 * If you finish early, and want to try something more advanced, you'll find another
 * block of code commented out below. See if you can figure out how to implement your
 * own. It creates its own internal Provider/Consumer context pair of components, but
 * exports that context as { ReactReduxContext }, so you can make use of it yourself.
 * Remember that whenever a component is 'connect'ed, it will need access to the store
 * object that's been passed to its top-level Provider, in order to subscribe to it
 * for state updates, and will need to return a new component that renders the target
 * component with all of the appropriate state and action values as props. Also bear
 * in mind that it will need to have a way to assign the incoming action functions to
 * be piped through the store, and will also need to eventually unsubscribe from store
 * updates, to prevent memory leaks when the component is eventually destroyed. If you
 * get lost, you'll also find a solution to this portion down below the regular solution.
 *
 * You'll find some example components below. Use them for inspiration of brainstorming
 * purposes. See what you can come up with, and how best to relay data between them.
 *
 **/

const styles = {
  backgroundColor: '#fff',
  color: '#000',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'inline-block',
  marginBottom: '10px',
  marginRight: '5px',
  padding: '0px 8px 2px',
};

// Nothing needs to be done to this component, just implement the other parts to link it to a data source.
// eslint-disable-next-line no-unused-vars
const ItemsList = class extends React.Component {
  static defaultProps = {
    items: [],
  };

  _onRemove = itemIndex => () => {
    this.props.deleteItem(itemIndex);
  };

  render() {
    const { items } = this.props;

    return (
      <React.Fragment>
        {items.map((item, index) => (
          <div key={item}>
            <span onClick={this._onRemove(index)} style={styles}>&times;</span>
            <span>{item}</span>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

// Implement me to reference the proper location in our state tree, and map it to the expected prop name!
// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => ({});

// Implement me to map the right action creator function to the expected prop name!
// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = {};

// Implement me as a connected component that feeds data to ItemsList!
const ShipmentsListContainer = () => null;

const Exercise = () => (
  <Provider store={store}>
    <ShipmentsListContainer />
  </Provider>
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * const mapStateToProps = state => ({
 *   items: state.items,
 * });
 *
 * const mapDispatchToProps = {
 *   deleteItem,
 * };
 *
 * const ShipmentsListContainer = connect(mapStateToProps, mapDispatchToProps)(ItemsList);
 **/

/*********************************************************************
 *      Don't look below here unless you want the other answer!      *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * // Make sure you import bindActionCreators from redux to connect the output actions
 * // to your store, and the context object from react-redux, to pull out its Consumer.
 * import { bindActionCreators } from 'redux';
 * import { ReactReduxContext } from 'react-redux';
 *
 * const { Consumer } = ReactReduxContext;
 *
 * const connect = (mapStateToProps, mapDispatchToProps) => Component => {
 *   const WrappedComponent = class extends React.Component {
 *     constructor(...args) {
 *       super(...args);
 *
 *       this._updateState = this._updateState.bind(this);
 *
 *       this.state = { ...this._updateState() };
 *     }
 *
 *     componentDidMount() {
 *       this._unsubscribe = this.props.store.subscribe(() => {
 *         this.setState({ ...this._updateState() });
 *       });
 *     }
 *
 *     componentWillUnmount() {
 *       this._unsubscribe();
 *     }
 *
 *     _updateState() {
 *       const { store, ...props } = this.props;
 *       const state = store.getState();
 *       const stateProps = mapStateToProps(state, props);
 *
 *       let dispatchProps = mapDispatchToProps;
 *
 *       if (typeof mapDispatchToProps === 'function') {
 *         dispatchProps = mapDispatchToProps(store.dispatch, state, props);
 *       }
 *
 *       const boundDispatchProps = bindActionCreators(dispatchProps, store.dispatch);
 *
 *       return { ...stateProps, ...boundDispatchProps };
 *     }
 *
 *     render() {
 *       const { store, ...props } = this.props;
 *
 *       return <Component {...this.state} {...props} />;
 *     }
 *   };
 *
 *   return props => (
 *     <Consumer>
 *       {({ store }) => <WrappedComponent {...props} store={store} />}
 *     </Consumer>
 *   );
 * };
 *
 * // Bet you had no idea something so small and so simple could be so powerful :)
 **/
