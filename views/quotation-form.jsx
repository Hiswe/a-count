import React        from 'react'
import { connect }  from 'react-redux'
import { Link }     from 'react-router'

import {Input}                      from './form.jsx';
import {formatDate, id as formatId} from './_format';
import {
  Amount,
  getInformationsFromFakeId,
} from './_utils.jsx'
import {
  PrintBtn,
  Meta,
} from './business-form-meta.jsx'

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

////////
// WHOLE PAGE
////////

let Actions = (props) => {
  let newQuot       = <a key="action-newQuot" href="/quotation" className="btn-fab">+</a>
  let convertRoute  = `/quotation/convert-to-invoice/${props.businessForm.id}`;
  let convert       = <button key="action-convert" className="btn-secondary" formAction={convertRoute} formMethod="post">Convert to invoice</button>;

  return (
    <div className="action">
      <button className="btn" type="submit" name="convertToInvoice" value="false">
        {props.isNew ? 'Create quotation' : 'Update quotation'}
      </button>
      {props.isNew ? null : ['\u00A0', newQuot, '\u00A0', convert]}
    </div>
  )
}

function mapActions(state, ownProps) {
  let infos = getInformationsFromFakeId(state, ownProps)
  return infos
}

Actions = connect(mapActions)(Actions)

// var QuotationForm = React.createClass({
//   render: function () {
//     let quotation   = this.props.quotation;
//     let isNew       = quotation._id == null;
//     let fakeId      = formatId('quotation', quotation);
//     let formAction  = isNew   ? '/quotation' : `/quotation/${fakeId}`;
//     let print       = <a key="print" href={`/print/${fakeId }`} className="btn">Print</a>;

//     return (
//       <div>
//         <header>
//           <h1>
//             {'Quotation\u00A0'}
//             <span className="id">{fakeId}</span>
//           </h1>
//           {isNew ? null : print}
//         </header>
//         <form action={formAction} method="post">
//           <input type="hidden" value={quotation.index.quotation} name="index[quotation]" />
//           <input type="hidden" value={quotation.time.created} name="time[created]" />
//           {isNew ? null : <input type="hidden" value={quotation._id} name="_id" /> }
//           {isNew ? null : <input type="hidden" value={fakeId} name="fakeId" /> }
//           <div className="row">
//             <fieldset className="cell-2-3 card">
//               <Customer list={this.props.customers} current={quotation.customer} />
//               {isNew ? null : <Status {...quotation.time} />}
//             </fieldset>
//             <fieldset className="cell-1-3 card">
//               <Input name="tax" type="number" step="any" value={quotation.tax} />
//             </fieldset>
//           </div>
//           <fieldset>
//             <Input name="title" defaultValue={quotation.title} />
//             <Listing quotation={this.props.quotation}/>
//             <div className="detail-actions">
//               <button className="btn-secondary" formAction="/quotation/recompute" formMethod="post">
//                 recompute
//               </button>
//               {'\u00A0'}
//               <button className="btn-secondary" formAction="/quotation/add-line" formMethod="post">
//                 Add a line
//               </button>
//             </div>
//           </fieldset>
//           <QuotationActions id={quotation._id} />
//         </form>
//       </div>
//     );
//   },
// });

const HiddenInputs = (props) => (
  <div className="hidden-inputs">
  </div>
)

let QuotationForm = (props) => (
  <div>
    <header>
      <h1>
        {'Quotation\u00A0'}
      </h1>
      <PrintBtn {...props.params} />
    </header>
    <form method="post" action={props.formAction}>
      {props.isNew ? null : <HiddenInputs /> }
      <Meta {...props} />
      <Actions {...props.params} />
    </form>
  </div>
)

function mapStateToProps(state, ownProps) {
  return {}
  const customerId  = ownProps.params.customerId
  const newCustomer = typeof customerId === 'undefined'
  const submitMsg   = newCustomer ? 'Create customer' : 'Update customer'
  if (newCustomer) {
    return {
      formAction: '/customer',
      newCustomer,
      submitMsg,
      customer: {},
    }
  }
  const customer = state.entities.customers[customerId]
  return {
    formAction: `/customer/${customer._id}`,
    newCustomer,
    submitMsg,
    customer,
  }
}

// export {QuotationForm as default};
export default connect(mapStateToProps)(QuotationForm)
