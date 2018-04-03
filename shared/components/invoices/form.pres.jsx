import React from 'react'
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import Form from '../ui/form.jsx'
import { Main, Meta, Content } from '../layout/main.jsx'
import { PaperSheet, Reference, Between, Party, Subject, Mentions } from '../layout/paper-sheet.jsx'
import { ProductTable, ProductLine } from '../ui/table-product.jsx'

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
          <PaperSheet>
            <Reference type="invoice" product={ formData } />
            <Between>
              <Party title="from" {...user} />
              <Party title="to" {...formData.customer} />
            </Between>
            <Subject value={ formData.name } />
            <ProductTable readOnly
              products={ formData.products }
              tax={ formData.tax }
              currency={ user.currency }
            >
              {formData.products.map( (product, index) =>  (
                <ProductLine
                  readOnly
                  key={ index }
                  product={ product }
                  currency={ user.currency }
                />
              ))}
            </ProductTable>
            <Mentions content={ user.invoiceConfig.mentions } />
          </PaperSheet>
        </Content>
      </Main>
    </Form>
  )
}

export default injectIntl( InvoiceFormPres )
