import React        from 'React';

import {Empty}      from './empty-listing';
import {Input}      from './form';
import {formatDate} from './_format';

////////
// MISC
////////

var Price         = React.createClass({
  render: function () {
    return (
      <p className="amount">
        {'€\u00A0'} <span>{this.props.amount}</span>
      </p>
    );
  }
});

////////
// META INFORMATIONS (top of form)
////////

var StatusLine    = React.createClass({
  render: function () {
    let id        = this.props.name;
    let name      = `status[${id}]`;
    let isChecked = this.props.value !== false;

    return (
      <div className="cell-1-4">
        <Input id={id} name={name} type="checkbox" checked={isChecked} disabled={isChecked} />
        <div>{formatDate(this.props.value)}</div>
      </div>
    );
  },
});

var Status        = React.createClass({
  render: function () {
    let steps     = ['send', 'validated', 'signed', 'done']
    let checkbox  = steps.map((s, i) => <StatusLine key={i} name={s} value={this.props[s]} />);

    return (
      <div className="row">
        {checkbox}
      </div>
    );
  }
});

////////
// LISTING BLOCK
////////

var Line          = React.createClass({
  render: function () {
    let product = this.props.product;
    let total   = product.quantity * product.price;
    let i       = `products[${this.props.index}]`;
    return (
      <tr>
        <td>
          <textarea name={`${i}[description]`} rows="1" defaultValue={product.description} />
        </td>
        <td>
          <input type="number" min="0" step="0.25" name={`${i}[quantity]`} defaultValue={product.quantity} />
        </td>
        <td>
          <input type="number" min="0" step="10" name={`${i}[price]`} defaultValue={product.price} />
        </td>
        <td className="total">
          <Price amount={total} />
        </td>
        <td>
          <button className="btn-circular" type="button">×</button>
        </td>
      </tr>
    );
  }
});

var ListingBody   = React.createClass({
  render: function () {
    let products  = this.props.products;
    let body      = products.map( (p, i) => ( <Line key={i} index={i} product={p} /> ) );
    return (
      <tbody>
        {body}
      </tbody>
    );
  },
});

var ListingFooter = React.createClass({
  render: function () {
    return (
      <tfoot>
        <tr>
          <td colSpan="3">Total net</td>
          <td><Price amount={this.props.net} /></td>
          <td></td>
        </tr>
        <tr>
          <td colSpan="3">Taxes</td>
          <td><Price amount={this.props.taxes} /></td>
          <td></td>
        </tr>
        <tr>
          <td colSpan="3">Total with taxes</td>
          <td><Price amount={this.props.total} /></td>
          <td></td>
        </tr>
      </tfoot>
    );

  }
});

var Listing       = React.createClass({
  render: function () {
    return (
      <table className="table-form" cellSpacing="0">
        <thead>
          <tr>
            <th>Désignation</th>
            <th>Jours</th>
            <th>PU HT</th>
            <th>Total HT</th>
            <th></th>
          </tr>
        </thead>
        <ListingBody products={this.props.quotation.products} />
        <ListingFooter {...this.props.quotation.price} />
      </table>
    )
  },
});

var Customer      = React.createClass({
  render: function () {
    let customers = this.props.list.map( (c, i) => <option key={i} value={c.name} />)
    return (
      <div className="input">
        <label className="item" htmlFor="customer">Customer</label>
        <datalist id="customer-list">
          {customers}
        </datalist>
        <input className="field" id="customer" name="customer" list="customer-list" type="text" defaultValue={this.props.current} />
      </div>
    );
  },
});

////////
// WHOLE PAGE
////////

var QuotationActions = React.createClass({
  render: function () {
    let hasId     = this.props.id != null;
    let newQuot   = <a key="newQuot" href="/quotation" className="btn-secondary">New quotation</a>;
    let print     = <a key="print" href={`/print/${this.props.id}`} className="btn-secondary">Print</a>;
    return (
      <div className="action">
        <button className="btn" type="submit" name="convertToInvoice" value="false">
          {hasId ? 'Update quotation' : 'Create quotation'}
        </button>
        {hasId ? ['\u00A0', newQuot, '\u00A0', print] : null}
      </div>
    );
  }
});

var QuotationForm = React.createClass({
  render: function () {
    let quotation   = this.props.quotation;
    let isNew       = quotation._id == null;
    let id          = isNew ? `#quot-${quotation.id}` : `#${quotation._id}`;
    let formAction  = isNew ? '/quotation' : `/quotation/${quotation._id}`;
    let status      = isNew ? null : <Status {...quotation.time} />;
    let idInput     = isNew ? <input type="hidden" value={quotation.id} name="id" /> : null;

    return (
      <section>
        <h1>
          Invoice
          <span className="id">{id}</span>
        </h1>
        <form action={formAction} method="post">
          {idInput}
          <div className="row">
            <fieldset className="cell card">
              <Customer list={this.props.customers} current={quotation.customer} />
              {status}
            </fieldset>
            <fieldset className="cell-1-5 card">
              <Input name="tax" type="number" step="any" value={quotation.tax} />
            </fieldset>
          </div>
          <fieldset>
            <Input name="title" defaultValue={quotation.title} />
            <Listing quotation={this.props.quotation} />
            <div className="detail-actions">
              <button className="btn-secondary" formAction="/quotation/add-line" formMethod="post" name="realProductId" value={quotation._id}>
                Add a line
              </button>
            </div>
          </fieldset>
          <QuotationActions id={quotation._id} />
        </form>
      </section>
    );
  },
});

export {QuotationForm as default};
