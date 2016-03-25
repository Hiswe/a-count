import React          from 'React';

import {formatStatus, id as formatId} from './_format';
import {Empty}        from './_utils';

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
  static: {
    load: '/api/quotations',
  },
  componentWillMount: function () {
    console.log('----------- QuotationList : componentWillMount');
  },
  render: function() {
    console.log('--------- QuotationList');
    console.log(this.props);
    console.log(this.props.quotations != null && this.props.quotations.length);
    let hasQuotations = this.props.quotations && this.props.quotations.length;
    return (
      <section>
        <h1>quotations</h1>
        {hasQuotations ? <QuotationTable {...this.props} /> : <Empty />}
      </section>
    )
  }
});

export {QuotationList as default};
