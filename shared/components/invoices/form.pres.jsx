import React from 'react'
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import Form from '../ui/form.jsx'
import { Main, Meta, Content } from '../layout/main.jsx'
import PrintInvoice from './print.jsx'
// import { PaperSheet, Reference, Between, Party, Subject, Mentions } from '../layout/paper-sheet.jsx'
// import { ProductTable, ProductLine } from '../ui/table-product.jsx'

export const BASE_CLASS = `invoice-form`
export const FORM_ID = BASE_CLASS

function InvoiceFormPres( props ) {
  const { formData, user } = props

  return (
    <Form
      isSaving={ props.isSaving }
      onChange={ props.handleFormChange }
      onSubmit={ props.handleSubmit }
    >
      <Main withMeta>
        <Meta>
        </Meta>
        <Content>
          <PrintInvoice />
        </Content>
      </Main>
    </Form>
  )
}

export default injectIntl( InvoiceFormPres )
