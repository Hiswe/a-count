import moment from 'moment'

export function formatDate( data, format = `DD/MM/YY HH:mm:ss` ) {
  if (typeof data !== `string`) return ``
  const formatedDate = moment(data).format( format )
  return formatedDate === `Invalid date` ? `` : formatedDate
}
