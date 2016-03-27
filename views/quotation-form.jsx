import React        from 'react';

import {Input}                      from './form.jsx';
import {formatDate, id as formatId} from './_format';
import {Amount}                     from './_utils.jsx';

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
    // done is for when work is finished
    let steps     = ['send', 'validated', 'signed', 'done']
    let checkbox  = steps.map((s, i) => <StatusLine key={`status-${i}`} name={s} value={this.props[s]} />);

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
    let product     = this.props.product;
    let total       = product.quantity * product.price;
    let i           = `products[${this.props.index}]`;
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
          <Amount value={total} />
        </td>
        <td>
          <button className="btn-circular" formAction="/quotation/remove-line" formMethod="post" name="removeIndex" value={this.props.index}>×</button>
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
          <td><Amount value={this.props.net} /></td>
          <td></td>
        </tr>
        <tr>
          <td colSpan="3">Taxes</td>
          <td><Amount value={this.props.taxes} /></td>
          <td></td>
        </tr>
        <tr>
          <td colSpan="3">Total with taxes</td>
          <td><Amount value={this.props.total} /></td>
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
    let hasCustomer = this.props.list != null;
    if (!hasCustomer) return <p>not customers founded</p>;
    let customers   = this.props.list.map( (c, i) => <option key={i} value={c.name} />)
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
    let hasId         = this.props.id != null;
    let convertRoute  = `/quotation/convert-to-invoice/${this.props.id}`;
    let newQuot       = <a key="action-newQuot" href="/quotation" className="btn-fab">+</a>;
    let convert       = <button key="action-convert" className="btn-secondary" formAction={convertRoute} formMethod="post">Convert to invoice</button>;
    return (
      <div className="action">
        <button className="btn" type="submit" name="convertToInvoice" value="false">
          {hasId ? 'Update quotation' : 'Create quotation'}
        </button>
        {hasId ? ['\u00A0', newQuot, '\u00A0', convert] : null}
      </div>
    );
  }
});

var QuotationForm = React.createClass({
  statics: {
    load: '/api/quotation/:fakeId',
  },
  render: function () {
    let quotation   = this.props.quotation;
    let isNew       = quotation._id == null;
    let fakeId      = formatId('quotation', quotation);
    let formAction  = isNew   ? '/quotation' : `/quotation/${fakeId}`;
    let print       = <a key="print" href={`/print/${fakeId }`} className="btn">Print</a>;

    return (
      <div>
        <header>
          <h1>
            {'Quotation\u00A0'}
            <span className="id">{fakeId}</span>
          </h1>
          {isNew ? null : print}
        </header>
        <form action={formAction} method="post">
          <input type="hidden" value={quotation.index.quotation} name="index[quotation]" />
          <input type="hidden" value={quotation.time.created} name="time[created]" />
          {isNew ? null : <input type="hidden" value={quotation._id} name="_id" /> }
          {isNew ? null : <input type="hidden" value={fakeId} name="fakeId" /> }
          <div className="row">
            <fieldset className="cell-2-3 card">
              <Customer list={this.props.customers} current={quotation.customer} />
              {isNew ? null : <Status {...quotation.time} />}
            </fieldset>
            <fieldset className="cell-1-3 card">
              <Input name="tax" type="number" step="any" value={quotation.tax} />
            </fieldset>
          </div>
          <fieldset>
            <Input name="title" defaultValue={quotation.title} />
            <Listing quotation={this.props.quotation}/>
            <div className="detail-actions">
              <button className="btn-secondary" formAction="/quotation/recompute" formMethod="post">
                recompute
              </button>
              {'\u00A0'}
              <button className="btn-secondary" formAction="/quotation/add-line" formMethod="post">
                Add a line
              </button>
            </div>
          </fieldset>
          <QuotationActions id={quotation._id} />
        </form>
      </div>
    );
  },
});

export {QuotationForm as default};
