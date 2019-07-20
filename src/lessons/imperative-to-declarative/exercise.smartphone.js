import { Row } from 'react-bootstrap';
import React from 'react';

import './exercise.smartphone.css';

const SmartphoneView = ({ data }) => (
  data.map(record => (
    <div className="tile p-2" key={record.guid}>
      <Row className="justify-content-between">
        <div>
          Name:<br />
          {record.firstName} {record.lastName}
        </div>
        <div>
          Balance:<br />
          {record.balance}
        </div>
      </Row>
    </div>
  ))
);

export default SmartphoneView;
