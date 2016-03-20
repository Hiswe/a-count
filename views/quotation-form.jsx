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

var Line          = React.createClass({
  render: function () {
    return (
      <tr>
        <td>
          <textarea />
        </td>
        <td>
          <input type="number" min="0" step="0.25" />
        </td>
        <td>
          <input type="number" min="0" step="10" />
        </td>
        <td className="total">
          {'€\u00A0'} <span></span>
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
    return (
      <tbody>
        <Line />
      </tbody>
    );
  },
});

// tfoot
//   tr
//     td(colspan=3) Total Net
//     td
//       |€&nbsp;
//       span.js-total-net=quotation ? quotation.price.net : emptyTotal.net
//     td
//   tr
//     td(colspan=3) Taxes
//     td
//       |€&nbsp;
//       span.js-total-tax=quotation ? quotation.price.taxes : emptyTotal.taxes
//     td
//   tr
//     td(colspan=3) Total with taxes
//     td
//       |€&nbsp;
//       span.js-total-all=quotation ? quotation.price.total : emptyTotal.total
//     td

var Listing       = React.createClass({
  render: function () {
    return (
      <fieldset>
        <Input name="title" />
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
          <ListingBody />
          <tfoot>
            <tr>
              <td colSpan="3">Total net</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="3">Taxes</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="3">Total with taxes</td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <div className="detail-actions">
          <button className="btn-secondary" type="button">
            Add a line
          </button>
        </div>
      </fieldset>

    )
  },
})

var QuotationForm = React.createClass({
  render: function () {
    let quotation   = this.props.quotation;
    let id          = quotation ? '#' + quotation._id : '#quot-' + this.props.quotationId;
    let formAction  = quotation ? '/quotation/' + quotation._id : '/quotation';
    let status      = quotation ? <Status /> : null;

    return (
      <section>
        <h1>
          Invoice
          <span className="id">{id}</span>
        </h1>
        <form action={formAction}>
          <input type="hidden" value={this.props.quotationId} name="id" />
          <div className="row">
            <fieldset className="cell card">
              <Customer />
              {status}
            </fieldset>
            <fieldset className="cell-1-5 card">
              <Input name="tax" type="number" step="any" />
            </fieldset>
          </div>
          <Listing />
        </form>
        <div className="action">
        </div>
      </section>
    );
  },
});

export {QuotationForm as default};
