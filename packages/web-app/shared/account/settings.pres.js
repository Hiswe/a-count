import React from 'react'
import crio from 'crio'
import * as Intl from 'react-intl'

import * as compute from '../utils/compute-total'
import * as Paper from '../layout/paper-sheet'
import * as Tabs from '../ui/tabs'
import * as Field from '../ui/field'
import { Alert } from '../ui/alerts'
import { Button } from '../ui/buttons'
import { FormActions } from '../ui/form'
import { ProductTable } from '../ui-table/products'

import './settings.pres.scss'
export const BASE_CLASS = `setting-form`
export const FORM_ID = BASE_CLASS

const customerExample = {
  name: `Customer name`,
  address: `123 6th St.
__Melbourne, FL 32904__
AUSTRALIA`,
}
const currencies = [
  { value: `USD`, label: `US Dollars` },
  { value: `EUR`, label: `Euros` },
  { value: `THB`, label: `Thai Bahts` },
]
const languages = [
  { value: `fr`, label: `français` },
  { value: `en`, label: `english` },
]

export default function SettingFormPres(props) {
  const { formDraft } = props
  const { quotationConfig, invoiceConfig, productConfig } = formDraft
  const fakeQuotationReference = {
    type: `quotation`,
    product: {
      updatedAt: new Date().toUTCString(),
      reference: `${quotationConfig.prefix}${quotationConfig.startAt}`,
    },
  }
  const fakeInvoiceReference = {
    type: `invoice`,
    product: {
      updatedAt: new Date().toUTCString(),
      reference: `${invoiceConfig.prefix}${invoiceConfig.startAt}`,
    },
  }

  let fakeDocument = crio({
    products: [
      {
        _id: `fake-product-1`,
        checked: true,
        description: `a __product__ example`,
        quantity: 2,
        price: productConfig.price,
      },
      {
        _id: `fake-product-2`,
        checked: true,
        ...productConfig,
      },
    ],
    tax: quotationConfig.tax,
  })
  fakeDocument = fakeDocument.merge(null, compute.totals(fakeDocument))

  return (
    <Tabs.Wrapper>
      <Tabs.List>
        <Tabs.Tab>
          <Intl.FormattedMessage id="configuration.tab.from" />
        </Tabs.Tab>
        <Tabs.Tab>
          <Intl.FormattedMessage id="configuration.tab.default-product" />
        </Tabs.Tab>
        <Tabs.Tab>
          <Intl.FormattedMessage id="configuration.tab.mentions" />
        </Tabs.Tab>
        <Tabs.Tab>
          <Intl.FormattedMessage id="configuration.tab.reference" />
        </Tabs.Tab>
      </Tabs.List>

      {/* USER */}
      <Tabs.Panel>
        <div className={`${BASE_CLASS}__user`}>
          <Field.Select
            name="lang"
            label="field.language"
            value={formDraft.lang}
            options={languages}
          />
          <Field.Select
            name="currency"
            label="field.currency"
            value={formDraft.currency}
            options={currencies}
          />
          <Paper.Sheet part="top-left">
            <Paper.Party title="from" people={formDraft} />
          </Paper.Sheet>
          <div className={`${BASE_CLASS}__user-form`}>
            <Field.Input
              name="name"
              label="field.name"
              value={formDraft.name}
            />
            <Field.Textarea
              name="address"
              label="field.address"
              value={formDraft.address}
            />
          </div>
        </div>
      </Tabs.Panel>

      {/* PRODUCT */}
      <Tabs.Panel>
        <div className={`${BASE_CLASS}__product`}>
          <div className={`${BASE_CLASS}__product-form`}>
            <Field.Input
              name="productConfig[quantity]"
              label="field.quantity"
              type="number"
              value={productConfig.quantity}
            />
            <Field.Input
              name="productConfig[price]"
              label="field.default-price"
              type="number"
              value={productConfig.price}
            />
            <Field.Input
              name="quotationConfig[tax]"
              label="field.tax"
              type="number"
              value={quotationConfig.tax}
            />
          </div>
          <ProductTable readOnly document={fakeDocument} />
        </div>
      </Tabs.Panel>

      {/* MENTIONS */}
      <Tabs.Panel>
        <div className={`${BASE_CLASS}__mentions`}>
          <Field.Textarea
            name="quotationConfig[mentions]"
            label="configuration.mentions.quotations"
            value={quotationConfig.mentions}
          />
          <Paper.Sheet part="bottom">
            <Paper.Mentions content={quotationConfig.mentions} />
          </Paper.Sheet>
          <Field.Textarea
            name="invoiceConfig[mentions]"
            label="configuration.mentions.invoices"
            value={invoiceConfig.mentions}
          />
          <Paper.Sheet part="bottom">
            <Paper.Mentions content={invoiceConfig.mentions} />
          </Paper.Sheet>
        </div>
      </Tabs.Panel>

      {/* REFERENCES */}
      <Tabs.Panel>
        <Alert danger>
          <Intl.FormattedHTMLMessage id="configuration.reference.warning" />
        </Alert>
        <div className={`${BASE_CLASS}__references`}>
          <dl className={`${BASE_CLASS}__references-section`}>
            <dt className={`${BASE_CLASS}__sub-title`}>
              <Intl.FormattedMessage id="page.quotations" />
            </dt>
            <dd className={`${BASE_CLASS}__references-content`}>
              <div className={`${BASE_CLASS}__references-form`}>
                <Field.Input
                  name="quotationConfig[prefix]"
                  label="field.prefix"
                  value={quotationConfig.prefix}
                />
                <Field.Input
                  name="quotationConfig[startAt]"
                  label="field.start-at"
                  value={quotationConfig.startAt}
                  type="number"
                  min="0"
                  step="1"
                />
              </div>
              <Paper.Sheet part="top-right">
                <Paper.Reference {...fakeQuotationReference} />
              </Paper.Sheet>
            </dd>
          </dl>
          <dl className={`${BASE_CLASS}__references-section`}>
            <dt className={`${BASE_CLASS}__sub-title`}>
              <Intl.FormattedMessage id="page.invoices" />
            </dt>
            <dd className={`${BASE_CLASS}__references-content`}>
              <div className={`${BASE_CLASS}__references-form`}>
                <Field.Input
                  name="invoiceConfig[prefix]"
                  label="field.prefix"
                  value={invoiceConfig.prefix}
                />
                <Field.Input
                  name="invoiceConfig[startAt]"
                  label="field.start-at"
                  value={invoiceConfig.startAt}
                  type="number"
                  min="0"
                  step="1"
                />
              </div>
              <Paper.Sheet part="top-right">
                <Paper.Reference {...fakeInvoiceReference} />
              </Paper.Sheet>
            </dd>
          </dl>
        </div>
      </Tabs.Panel>

      {/* ACTIONS */}
      <FormActions>
        <Button type="submit">
          <Intl.FormattedMessage id="configuration.button.save" />
        </Button>
      </FormActions>
    </Tabs.Wrapper>
  )
}
