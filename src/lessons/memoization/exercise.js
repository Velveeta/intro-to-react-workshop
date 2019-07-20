import { Row } from 'react-bootstrap';
import React from 'react';

import fixtureData from './exercise.fixture';

import './exercise.css';

/**
 * Use this module to practice writing multiple components of varying types, which can
 * be combined in different ways to create multiple larger components. This is at the
 * heart of React development, figuring out the best ways to make use of the components
 * you already have, to make more complex components. By making them small and granular,
 * you isolate testing concerns, and can mostly get away with testing integration points
 * in more complex components you compose from those lower-level ones.
 *
 * You'll find some example components below. Use them for inspiration of brainstorming
 * purposes. See what you can come up with, and how best to relay data between them.
 **/

const Tile = ({
  about,
  address,
  age,
  company,
  email,
  name,
  phone,
  picture,
  registered,
  removeTile,
}) => (
  <div className="memo-tile m-2">
    <Row className="justify-content-between flex-nowrap p-4">
      <div className="p-2">
        <img src={picture} alt={name.first + ' ' + name.last} />
      </div>
      <div className="p-2">
        <div className="remove text-center" onClick={removeTile}>&times;</div>
        <div>Name: <span>{name.first} {name.last}</span></div>
        <div>Age: <span>{age}</span></div>
        <div>Email Address: <span>{email}</span></div>
        <div>Phone Number: <span>{phone}</span></div>
        <div>Company: <span>{company}</span></div>
        <div>Address: <span>{address}</span></div>
        <div>Registration Date: <span>{registered}</span></div>
        <div>About {name.first} {name.last}: <span>{about}</span></div>
      </div>
    </Row>
  </div>
);

const TileList = class extends React.Component {
  state = {
    data: [...fixtureData],
    formField: '',
  };

  _onRemove = index => {
    this.setState({
      data: this.state.data.filter((record, idx) => idx !== index),
    });
  };

  _onChange = (e) => {
    this.setState({ formField: e.target.value });
  };

  render() {
    const { data, formField } = this.state;

    return (
      <React.Fragment>
        <div className="p-2 text-center">
          <input onChange={this._onChange} placeholder="Some random form field" type="text" value={formField} />
        </div>
        <Row className="flex-wrap justify-content-around align-items-start">
          {data.map((record, index) => {
            const computedRecord = {...record};

            computedRecord.name = {
              first: record.firstName,
              last: record.lastName,
            };

            delete computedRecord.firstName;
            delete computedRecord.lastName;

            return (
              <Tile key={index} {...computedRecord} removeTile={() => this._onRemove(index)} />
            );
          })}
        </Row>
      </React.Fragment>
    );
  }
};

const Exercise = () => (
  <TileList />
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * // Convert the Tile component from functional to class-based PureComponent, because
 * // we're going to bind an _onRemove function to it, so the parent can pass a singular
 * // instance of that handler down, rather than a new inline-arrow function instance
 * // for every single render cycle. We'll use it to propagate the record's 'guid' prop
 * // back up to the parent to filter its list of data elements.
 *
 * const Tile = class extends React.PureComponent {
 *   _onRemove = () => {
 *     const { guid, onRemove } = this.props;
 *
 *     if (onRemove) {
 *       onRemove(guid);
 *     }
 *   };
 *
 *   render() {
 *     const {
 *       about,
 *       address,
 *       age,
 *       company,
 *       email,
 *       // Convert the 'name' prop from an object to 2 single string primitives. This
 *       // helps for the purposes of shallow comparing the incoming props, since we're
 *       // not passing a new object instance on every render cycle, which was being
 *       // built inside of the map loop that was constructing the list of Tiles.
 *       firstName,
 *       lastName,
 *       phone,
 *       picture,
 *       registered,
 *       removeTile,
 *     } = this.props;
 *
 *     // Change the onClick handler below to reference our new 'this._onRemove' function,
 *     // and the references to name.first and name.last to use firstName and lastName.
 *     return (
 *       <div className="memo-tile m-2">
 *         <Row className="justify-content-between flex-nowrap p-4">
 *           <div className="p-2">
 *             <img src={picture} alt={firstName + ' ' + lastName} />
 *           </div>
 *           <div className="p-2">
 *             <div className="remove text-center" onClick={this._onRemove}>&times;</div>
 *             <div>Name: <span>{firstName} {lastName}</span></div>
 *             <div>Age: <span>{age}</span></div>
 *             <div>Email Address: <span>{email}</span></div>
 *             <div>Phone Number: <span>{phone}</span></div>
 *             <div>Company: <span>{company}</span></div>
 *             <div>Address: <span>{address}</span></div>
 *             <div>Registration Date: <span>{registered}</span></div>
 *             <div>About {firstName} {lastName}: <span>{about}</span></div>
 *           </div>
 *         </Row>
 *       </div>
 *     );
 *   }
 * };
 *
 * const TileList = class extends React.Component {
 *   state = {
 *     data: [...fixtureData],
 *     formField: '',
 *   };
 *
 *   // Receive 'guid' vs 'index', which is a much more reliable field to filter against
 *   _onRemove = guid => {
 *     this.setState({
 *       data: this.state.data.filter(record => record.guid !== guid),
 *     });
 *   };
 *
 *   _onChange = (e) => {
 *     this.setState({ formField: e.target.value });
 *   };
 *
 *   render() {
 *     const { data, formField } = this.state;
 *
 *     // Pass 'this._onRemove' as the 'onRemove' handler, which passes a singular function
 *     // reference for shallow comparison purposes. Also, scrap the manually-constructed
 *     // object garbage we were doing here previously, and pass the record as it is. Use
 *     // the 'record.guid' field as the key, it's much more reliable than array index.
 *     return (
 *       <React.Fragment>
 *         <div className="p-2 text-center">
 *           <input onChange={this._onChange} placeholder="Some random form field" type="text" value={formField} />
 *         </div>
 *         <Row className="flex-wrap justify-content-around align-items-start">
 *           {data.map(record => (
 *             <Tile key={record.guid} {...record} onRemove={this._onRemove} />
 *           ))}
 *         </Row>
 *       </React.Fragment>
 *     );
 *   }
 * };
 **/
