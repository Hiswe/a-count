import React        from 'React';

import {Input}                      from './form';
import {formatDate, id as formatId} from './_format';
import {Amount}                     from './_utils';

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
          <button className="btn-circular" formAction="/invoice/remove-line" formMethod="post" name="removeIndex" value={this.props.index}>×</button>
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
        <ListingBody products={this.props.invoice.products} />
        <ListingFooter {...this.props.invoice.price} />
      </table>
    )
  },
});

////////
// WHOLE PAGE
////////

var InvoiceActions = React.createClass({
  render: function () {
    let hasId         = this.props.id != null;
    let convertRoute  = `/invoice/convert-to-invoice/${this.props.id}`;
    let newQuot       = <a key="action-newQuot" href="/invoice" className="btn-fab">+</a>;
    let convert       = <button key="action-convert" className="btn-secondary" formAction={convertRoute} formMethod="post">Convert to invoice</button>;
    return (
      <div className="action">
        <button className="btn" type="submit" name="convertToInvoice" value="false">
          {hasId ? 'Update invoice' : 'Create invoice'}
        </button>
        {hasId ? ['\u00A0', newQuot, '\u00A0', convert] : null}
      </div>
    );
  }
});

var InvoiceForm = React.createClass({
  render: function () {
    console.log(this.props.invoice);
    let invoice     = this.props.invoice;
    let isNew       = invoice._id == null;
    let fakeId      = formatId('invoice', invoice);
    let formAction  = isNew   ? '/invoice' : `/invoice/${fakeId}`;
    let print       = <a key="print" href={`/print/${fakeId }`} className="btn">Print</a>;

    return (
      <section>
        <header>
          <h1>
            {'Invoice\u00A0'}
            <span className="id">{fakeId}</span>
          </h1>
          {isNew ? null : print}
        </header>
        <form action={formAction} method="post">
          <input type="hidden" value={invoice.index.invoice} name="index[invoice]" />
          <input type="hidden" value={invoice.time.created} name="time[created]" />
          {isNew ? null : <input type="hidden" value={invoice._id} name="_id" /> }
          {isNew ? null : <input type="hidden" value={fakeId} name="fakeId" /> }
          <div className="row">
            <fieldset className="cell-2-3 card">
              <Input name="customer" value={invoice.customer} readOnly />
              {isNew ? null : <Status {...invoice.time} />}
            </fieldset>
            <fieldset className="cell-1-3 card">
              <Input name="tax" type="number" step="any" value={invoice.tax} />
            </fieldset>
          </div>
          <fieldset>
            <Input name="title" defaultValue={invoice.title} />
            <Listing invoice={this.props.invoice}/>
            <div className="detail-actions">
              <button className="btn-secondary" formAction="/invoice/recompute" formMethod="post">
                recompute
              </button>
              {'\u00A0'}
              <button className="btn-secondary" formAction="/invoice/add-line" formMethod="post">
                Add a line
              </button>
            </div>
          </fieldset>
          <InvoiceActions id={invoice._id} />
        </form>
      </section>
    );
  },
});

export {InvoiceForm as default};
