import { Table } from 'react-bootstrap';
import React from 'react';

import './exercise.tablet.css';

const columns = [
  { key: 'firstName', name: 'First Name' },
  { key: 'lastName', name: 'Last Name' },
  { key: 'email', name: 'Email' },
  { key: 'phone', name: 'Phone' },
  { key: 'balance', name: 'Balance' },
];

const TabletView = ({ data }) => (
  <div className="grid">
    <Table striped={true} bordered={true} hover={true}>
      <thead>
        <tr>
          {columns.map(column => (
            <th className="text-nowrap" key={column.key}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(record => (
          <tr key={record.guid}>
            {columns.map(column => (
              <td key={column.key} className={column.key}>{record[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default TabletView;
