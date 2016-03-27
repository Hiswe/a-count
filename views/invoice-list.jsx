import React          from 'React';

import {formatStatus, id as formatId} from './_format';
import {Empty}        from './_utils';

//----- THEAD

var InvoiceHeader = React.createClass({
  render: function () {
    return (
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>customer</th>
          <th>status</th>
          <th>total HT</th>
        </tr>
      </thead>
    );
  }
});

//----- TBODY

var InvoiceStatus = React.createClass({
  render: function () {
    return (
      <td>
        {this.props.status.message}
        <p>{this.props.status.date}</p>
      </td>
    );
  }
});
var EmptyInvoiceStatus = React.createClass({
  render: function () {
    return (
      <td>-</td>
    );
  }
});

var Row = React.createClass({
  render: function () {
    let fakeId  = formatId('invoice', this.props.data);
    let url     = `/invoice/${fakeId}`;
    let status  = formatStatus(this.props.data.time);
    return (
      <tr>
        <td>
          <a href={url}>{fakeId}</a>
        </td>
        <td>{this.props.data.title}</td>
        <td>{this.props.data.customer}</td>
        {status.date ? <InvoiceStatus status={status} /> : <td>-</td>}
        <td>€ {this.props.data.price.net}</td>
      </tr>
    );
  }
});

var InvoiceBody = React.createClass({
  render: function () {
    let Line = this.props.data.map((invoice, i) => <Row key={`invoice-${i}`} data={invoice} /> );
    return (
      <tbody>
        {Line}
      </tbody>
    );
  }
})

//----- ALL

var InvoiceTable = React.createClass({
  render: function() {
    return (
      <table className="table-pres" cellSpacing="0">
        <InvoiceHeader />
        <InvoiceBody data={this.props.invoices} />
      </table>
    );
  }
});

var InvoiceList = React.createClass({
  statics: {
    load: '/api/invoices',
  },
  render: function() {
    let hasInvoices = this.props.invoices && this.props.invoices.length;
    return hasInvoices ? <InvoiceTable {...this.props} /> : <Empty />
  }
});

export {InvoiceList as default};
