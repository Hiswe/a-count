import React    from 'React';
import {Empty}  from './empty-listing';
import {Input}  from './form';

var Customer      = React.createClass({
  render: function () {
    // value=quotation ? quotation.customer : null
    return (
      <div className="input">
        <label className="item" htmlFor="customer">Customer</label>
        <datalist id="customer-list"></datalist>
        <input className="field" id="customer" list="customer-list" type="text" />
      </div>
    );
  },
});

// .cell-1-4
//   .input
//     label.item(for="send") send
//     input.field.js-send(
//       id="send"
//       name="status[send]"
//       type="checkbox"
//       checked=quotation && quotation.time.send !== false
//       disabled=quotation && quotation.time.send !== false
//     )
//   div=quotation && formatDate(quotation.time.send)
// .cell-1-4
//   .input
//     label.item(for="validated") validated
//     input.field.js-validated(
//       id="validated"
//       name="status[validated]"
//       type="checkbox"
//       checked=quotation && quotation.time.validated !== fals
//       disabled=quotation && quotation.time.validated !== fal
//     )
//   div=quotation && formatDate(quotation.time.validated)
// .cell-1-4
//   .input
//     label.item(for="signed") signed
//     input.field.js-signed(
//       id="signed"
//       name="status[signed]"
//       type="checkbox"
//       checked=quotation && quotation.time.signed !== false
//       disabled=quotation && quotation.time.signed !== false
//     )
//   div=quotation && formatDate(quotation.time.signed)
// .cell-1-4
//   .input
//     label.item(for="done") done
//     input.field.js-done(
//       id="done"
//       name="status[done]"
//       type="checkbox"
//       checked=quotation && quotation.time.done !== false
//       disabled=quotation && quotation.time.done !== false
//     )
//   div=quotation && formatDate(quotation.time.done)

var Status        = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="cell-1-4">

        </div>
      </div>
    );
  }
});

// tr.js-product(id="product-#{index}")
//   td: textarea.js-product-descriptions(
//     name="products[#{index}][description]"
//     rows=1
//   )= opts.description
//   td: input.js-product-quantity(
//     type="number"
//     min="0"
//     step="0.25"
//     name="products[#{index}][quantity]"
//     value=opts.quantity
//   )
//   td: input.js-product-price(
//     type="number"
//     min="0"
//     step="10"
//     name="products[#{index}][price]"
//     value=opts.price
//   )
//   td.total
//     | €&nbsp;
//     span.js-product-total 350
//   td: button.js-product-remove.btn-circular(type="button") ×

var Price         = React.createClass({
  render: function () {
    return (
      <p className="amount">
        {'€\u00A0'} <span>{this.props.amount}</span>
      </p>
    );
  }
})

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
})

var QuotationForm = React.createClass({
  render: function () {
    let quotation   = this.props.quotation;
    let isNew       = quotation._id == null;
    let id          = isNew ? `#quot-${quotation.id}` : `#${quotation._id}`;
    let formAction  = isNew ? '/quotation/' + quotation._id : '/quotation';
    let status      = isNew ? null : <Status />;
    let idInput     = isNew ? <input type="hidden" value={quotation.id} name="id" /> : null;

    return (
      <section>
        <h1>
          Invoice
          <span className="id">{id}</span>
        </h1>
        <form action={formAction}>
          {idInput}
          <div className="row">
            <fieldset className="cell card">
              <Customer />
              {status}
            </fieldset>
            <fieldset className="cell-1-5 card">
              <Input name="tax" type="number" step="any" value={quotation.tax} />
            </fieldset>
          </div>
          <fieldset>
            <Input name="title" />
            <Listing quotation={this.props.quotation} />
            <div className="detail-actions">
              <button className="btn-secondary" formAction="/quotation/add-line" formMethod="post" name="realProductId" value={quotation._id}>
                Add a line
              </button>
            </div>
          </fieldset>
        </form>
        <div className="action">
        </div>
      </section>
    );
  },
});

export {QuotationForm as default};
