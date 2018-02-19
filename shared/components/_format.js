import moment from 'moment'
import marked from 'marked'

// prevent error while passing unsupported marked datas
const safeMarked = data => {
  if (typeof data !== 'string') return ''
  return marked(data)
}

function formatDate(data) {
  if (typeof data !== `string`) return ``
  const formatedDate = moment(data).format(`DD/MM/YY HH:mm:ss`)
  return formatedDate === `Invalid date` ? `` : formatedDate
}

function id(type, businessForm, config) {
  let {prefix, startingAt}  = config[type];
  var createdAt             = moment(businessForm.time.created).format('YYMM');
  return  `${prefix}${createdAt}-${startingAt + ~~businessForm.index[type]}`;
}

function formatStatus(status) {
  let message, date;
  if (status.done) {
    message = 'done';
    date    = formatDate(status.done);
  } else if (status.signed) {
    message = 'signed';
    date    = formatDate(status.signed);
  } else if (status.validated) {
    message = 'validated';
    date    = formatDate(status.validated);
  } else if (status.send) {
    message = 'send';
    date    = formatDate(status.send);
  } else {
    message = '-';
  }
  return {message, date};
}

function invoiceStatus(status) {
  let message, date;
  switch(status) {
    case status.fullyPaid:
      message = 'fully paid';
      date    = formatDate(status.paid);
      break;
    case status.paritally:
      message = 'fully paid';
      date    = formatDate(status.paid);
      break;
    case status.invoiceSend:
      message = 'send';
      date    = formatDate(status.invoiceSend);
      break;
    default:
      drink = 'Unknown drink!';
  }
  return {message, date};

};

export {
  safeMarked,
  formatDate,
  formatStatus,
  id,
}
