import { Button, Row } from 'react-bootstrap';

import React from 'react';

/**
 * Use this module to practice decomposing larger views into smaller sets of discrete,
 * reusable components. By keeping our components small, we make them easier to test,
 * and easier to reuse across the application, meaning less duplicated code. The code
 * that follows should be considered a starting point for taking a view that has grown
 * over time to the point of becoming too large, and figuring out where to create some
 * divisions within it, to migrate subsections out into their own components. Look for
 * sections that are duplicated multiple times, as well as items that are similar enough
 * that they could probably be abstracted into a single implementation with props that
 * can be used to inform them of how to render themselves.
 **/

const MyMonolithicView = class extends React.Component {
  state = {
    pageViews: 0,
    sections: [
      {
        name: 'Science Fiction',
        items: [
          {
            name: 'Star Trek',
            votes: 0,
          },
          {
            name: 'Star Wars',
            votes: 0,
          },
          {
            name: 'The Last Starfighter',
            votes: 0,
          },
        ],
      },
      {
        name: 'Fantasy',
        items: [
          {
            name: 'Lord of the Rings',
            votes: 0,
          },
          {
            name: 'The Dark Crystal',
            votes: 0,
          },
          {
            name: 'Troll',
            votes: 0,
          },
        ],
      },
    ],
  };

  _refs = {
    'Fantasy': React.createRef(),
    'Science Fiction': React.createRef(),
  };

  componentDidMount() {
    const pageViews = Number(sessionStorage.getItem('pageViews') || 0) + 1;

    sessionStorage.setItem('pageViews', pageViews);

    this.setState({ pageViews });
  }

  _addItem = sectionName => () => {
    const itemName = ((this._refs[sectionName] || {}).current || {}).value;

    if (!itemName) {
      alert('Something went wrong. Please refresh the page and try again.');
      return;
    }

    const section = this.state.sections.find(section => section.name === sectionName);

    if (!section) {
      alert(`No ${sectionName} section found!`);
      return null;
    }

    const { items } = section;

    if (items.find(item => item.name === itemName)) {
      alert('That item already exists in the list!');
      return;
    }

    this._refs[sectionName].current.value = '';

    this.setState({
      ...this.state,
      sections: this.state.sections.map(section => {
        if (section.name !== sectionName) {
          return section;
        }

        return {
          ...section,
          items: section.items.concat({
            name: itemName,
            votes: 0,
          }),
        };
      }),
    });
  };

  _renderCounter() {
    return (
      <div>This page has been viewed {this.state.pageViews} times!</div>
    );
  }

  _renderSciFiSeries() {
    const section = this.state.sections.find(section => section.name === 'Science Fiction');

    if (!section) {
      alert('No science fiction section found!');
      return null;
    }

    const { name, items } = section;

    return (
      <fieldset className="m-4 p-4 border border-white">
        <legend className="text-center">{name}</legend>
        {items.map(item => (
          <div key={item.name} className="m-4 text-center">
            <strong>{item.name}</strong>
            <div>This item has {item.votes} votes!</div>
            <Button variant="primary" onClick={() => this._vote(name)(item.name)}>Vote for it now!</Button>
          </div>
        ))}
        <div>
          <input
            defaultValue=""
            ref={this._refs['Science Fiction']}
            placeholder="Add an item to the list!"
            type="text"
          />
          &nbsp;
          <Button variant="primary" onClick={this._addItem('Science Fiction')}>Add item</Button>
        </div>
      </fieldset>
    )
  }

  _renderFantasySeries() {
    const section = this.state.sections.find(section => section.name === 'Fantasy');

    if (!section) {
      alert('No fantasy section found!');
      return null;
    }

    const { name, items } = section;

    return (
      <fieldset className="m-4 p-4 border border-white">
        <legend className="text-center">{name}</legend>
        {items.map(item => (
          <div key={item.name} className="m-4 text-center">
            <strong>{item.name}</strong>
            <div>This item has {item.votes} votes!</div>
            <Button variant="primary" onClick={() => this._vote(name)(item.name)}>Vote for it now!</Button>
          </div>
        ))}
        <div>
          <input
            defaultValue=""
            ref={this._refs['Fantasy']}
            placeholder="Add an item to the list!"
            type="text"
          />
          &nbsp;
          <Button variant="primary" onClick={this._addItem('Fantasy')}>Add item</Button>
        </div>
      </fieldset>
    )
  }

  _vote = sectionName => itemName => {
    const section = this.state.sections.find(section => section.name === sectionName);

    if (!section) {
      alert(`No ${sectionName} section found!`);
      return null;
    }

    const { items } = section;

    if (!items.find(item => item.name === itemName)) {
      alert('That item was not found!');
      return;
    }

    this.setState({
      ...this.state,
      sections: this.state.sections.map(section => {
        if (section.name !== sectionName) {
          return section;
        }

        return {
          ...section,
          items: section.items.map(item => {
            if (item.name !== itemName) {
              return item;
            }

            return {
              ...item,
              votes: item.votes + 1,
            };
          }),
        };
      }),
    });
  };

  render() {
    return (
      <div>
        <Row className="justify-content-between flex-wrap">
          {this._renderSciFiSeries()}
          {this._renderFantasySeries()}
        </Row>
        <div className="text-center">
          {this._renderCounter()}
        </div>
      </div>
    );
  }
};

const Exercise = () => (
  <MyMonolithicView />
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * // This set of components is by no means the only way that these components can or should
 * // be separated, but does demonstrate a good way to decompose them. Since the state in the
 * // original example wasn't being persisted anywhere, but was rather initial state, it could
 * // actually be moved down to lower level components. This allows us to create instance-bound
 * // callbacks that keep consistent references from one render cycle to the next, which helps
 * // with certain optimizations learned in a later lesson.
 *
 * // The PageCounter component can be completely self-contained, and is easily migrated out
 * // of the main component and into its own, which can now be shared to other pages if that's
 * // something we desire at a later time.
 *
 * // Each Item now has its own component, which means we can update styles or behaviors for
 * // all Items in one place and at one time. It can also house the state for each Item's vote
 * // count, moving that state down from higher level components. The AddItemField components
 * // also have their own definitions now, which track their own text input refs, without those
 * // needing to be passed down to them. With those pieces moved out, the Section component can
 * // be drastically reduced in size.
 *
 * // Now we can create new components for ScifiSection and FantasySection, which are one of the
 * // only places holding state, for their initial list of titles. They pass an onAddItem callback
 * // down to lower-level components in order to be alerted when an item is being added to their
 * // section, but other than that, their render logic is pretty simple.
 *
 * // Finally, with all of that moved out of the main MyMonolithicView component, that component
 * // can be collapsed down to almost nothing, and since it isn't needing to hold state anymore,
 * // it can be changed from a class-based component to a functional one instead. Testing it
 * // also become much easier at this point, since we really only need to check that it renders
 * // the other components we're expecting, and not whether those components behave as expected,
 * // since those testing concerns can be handled within the test suites for those components.
 *
 * const AddItemField = class extends React.Component {
 *   _ref = React.createRef();
 *
 *   _onClick = () => {
 *     const { value } = this._ref.current;
 *
 *     if (this.props.onClick(value)) {
 *       this._ref.current.value = '';
 *     }
 *   };
 *
 *   render() {
 *     return (
 *       <div>
 *         <input
 *           defaultValue=""
 *           ref={this._ref}
 *           placeholder="Add an item to the list!"
 *           type="text"
 *         />
 *         &nbsp;
 *         <Button variant="primary" onClick={this._onClick}>Add item</Button>
 *       </div>
 *     );
 *   }
 * };
 *
 * const Item = class extends React.Component {
 *   state = {
 *     votes: 0,
 *   };
 *
 *   _onVote = () => {
 *     this.setState({ votes: this.state.votes + 1 });
 *   };
 *
 *   render() {
 *     return (
 *       <div className="m-4 text-center">
 *         <strong>{this.props.name}</strong>
 *         <div>This item has {this.state.votes} votes!</div>
 *         <Button variant="primary" onClick={this._onVote}>Vote for it now!</Button>
 *       </div>
 *     );
 *   }
 * };
 *
 * const Section = ({ items, name, onAddItem }) => (
 *   <fieldset className="m-4 p-4 border border-white">
 *     <legend className="text-center">{name}</legend>
 *     {items.map(item => (
 *       <Item key={item} name={item} />
 *     ))}
 *     <AddItemField onClick={onAddItem} />
 *   </fieldset>
 * );
 *
 * const PageCounter = class extends React.Component {
 *   state = {
 *     pageViews: 0,
 *   };
 *
 *   componentDidMount() {
 *     const pageViews = Number(sessionStorage.getItem('pageViews') || 0) + 1;
 *
 *     sessionStorage.setItem('pageViews', pageViews);
 *
 *     this.setState({ pageViews });
 *   }
 *
 *   render() {
 *     return <div>This page has been viewed {this.state.pageViews} times!</div>;
 *   }
 * };
 *
 * const ScifiSection = class extends React.Component {
 *   state = {
 *     items: [
 *       'Star Trek',
 *       'Star Wars',
 *       'The Last Starfighter',
 *     ],
 *   };
 *
 *   _onAddItem = itemName => {
 *     const { items } = this.state;
 *
 *     if (items.includes(itemName)) {
 *       alert('That item already exists in the list!');
 *       return;
 *     }
 *
 *     this.setState({
 *       items: items.concat(itemName),
 *     });
 *
 *     return true;
 *   };
 *
 *   render() {
 *     return <Section items={this.state.items} name="Science Fiction" onAddItem={this._onAddItem} />;
 *   }
 * };
 *
 * const FantasySection = class extends React.Component {
 *   state = {
 *     items: [
 *       'Lord of the Rings',
 *       'The Dark Crystal',
 *       'Troll',
 *     ],
 *   };
 *
 *   _onAddItem = itemName => {
 *     const { items } = this.state;
 *
 *     if (items.includes(itemName)) {
 *       alert('That item already exists in the list!');
 *       return;
 *     }
 *
 *     this._ref.current.value = '';
 *
 *     this.setState({
 *       items: items.concat(itemName),
 *     });
 *
 *     return true;
 *   };
 *
 *   render() {
 *     return <Section items={this.state.items} name="Fantasy" onAddItem={this._onAddItem} />;
 *   }
 * };
 *
 * const MyMonolithicView = () => (
 *   <div>
 *     <Row className="justify-content-between flex-wrap">
 *       <ScifiSection />
 *       <FantasySection />
 *     </Row>
 *     <div className="text-center">
 *       <PageCounter />
 *     </div>
 *   </div>
 * );
 **/
