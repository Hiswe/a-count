import slugify from '@sindresorhus/slugify'

export function getPreviewTitle( document ) {
  const reference     = document.get(`reference`)
  const documentName  = document.get(`name`)
  const customerName  = document.get(`customer.name`)
  if (!documentName || !customerName) return reference
  return `${reference}_${ slugify(customerName) }_${ slugify( documentName) }`
}

export default getPreviewTitle
