import React          from 'react';

import {formatStatus, id as formatId} from './_format';
import {Empty}        from './_utils.jsx';

//----- THEAD

var QuotationHeader = React.createClass({
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

var QuotationStatus = React.createClass({
  render: function () {
    return (
      <td>
        {this.props.status.message}
        <p>{this.props.status.date}</p>
      </td>
    );
  }
});

var QuotationRow = React.createClass({
  render: function () {
    let fakeId  = formatId('quotation', this.props.data);
    let url     = `/quotation/${fakeId}`;
    let status  = formatStatus(this.props.data.time);
    return (
      <tr>
        <td>
          <a href={url}>{fakeId}</a>
        </td>
        <td>{this.props.data.title}</td>
        <td>{this.props.data.customer}</td>
        {status.date ? <QuotationStatus status={status} /> : <td>-</td>}
        <td>€ {this.props.data.price.net}</td>
      </tr>
    );
  }
});

var QuotationBody = React.createClass({
  render: function () {
    let quotationLines = this.props.data.map( (quotation, i) => <QuotationRow key={`quot-${i}`} data={quotation} /> );
    return (
      <tbody>
        {quotationLines}
      </tbody>
    );
  }
})

//----- ALL

var QuotationTable = React.createClass({
  render: function() {
    return (
      <table className="table-pres" cellSpacing="0">
        <QuotationHeader />
        <QuotationBody data={this.props.quotations} />
      </table>
    );
  }
});

var QuotationList = React.createClass({
  render: function() {
    let hasQuotations = this.props.quotations && this.props.quotations.length;
    return hasQuotations ? <QuotationTable {...this.props} /> : <Empty />
  }
});

export {QuotationList as default};
