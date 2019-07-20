import { Table } from 'react-bootstrap';
import React from 'react';

import './exercise.desktop.css';

const columns = [
  { key: 'firstName', name: 'First Name' },
  { key: 'lastName', name: 'Last Name' },
  { key: 'age', name: 'Age' },
  { key: 'company', name: 'Company' },
  { key: 'email', name: 'Email' },
  { key: 'phone', name: 'Phone' },
  { key: 'address', name: 'Address' },
  { key: 'balance', name: 'Balance' },
];

const DesktopView = ({ data }) => (
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

export default DesktopView;
