var moment          = require('moment');
var marked          = require('marked');

// templates global datas
function marked(data) {
  // prevent error while passing unsupported marked datas
  if (typeof data !== 'string') return '';
  return marked(data);
};

function formatDate(data) {
  var formatedDate = moment(data).format('DD/MM/YYYY HH:mm');
  return formatedDate === 'Invalid date' ? '' : formatedDate;
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

export {marked, formatDate, formatStatus}
