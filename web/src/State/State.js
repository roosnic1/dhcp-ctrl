import React, { Component } from 'react';
import { Table } from 'antd';
import './State.css';

const columns = [{
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Lease Period',
  dataIndex: 'leasePeriod',
  key: 'leasePeriod',
}, {
  title: 'Bind Time',
  dataIndex: 'bindTime',
  key: 'bindTime',
}, {
  title: 'MAC ',
  dataIndex: 'hwa',
  key: 'mac',
  render: text => <span>{text}</span>
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      N/A
    </span>
  ),
}];

class State extends Component {

  constructor() {
    super();
    this.state = {
      dhcpEntries: []
    };
  }

  componentDidMount() {
    fetch('/v1/api/state')
      .then(data => data.json())
      .then((data) => {
        this.setState({
          dhcpEntries: data
        });
      });
  }

  render() {
    return (
      <div className="State">
        <h1>State</h1>
        <Table columns={columns} dataSource={this.state.dhcpEntries} />
      </div>
    );
  }
}

export default State;
