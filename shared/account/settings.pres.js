import React from 'react'
import {
  FormattedMessage,
  FormattedHTMLMessage
} from 'react-intl'

import { PaperSheet, Party, Reference, Mentions } from '../layout/paper-sheet'
import { Alert } from '../ui/alerts'
import { Button } from '../ui/buttons'
import { FormActions } from '../ui/form'
import { Tabs, TabList, TabListHeader, Tab, TabPanel } from '../ui/tabs'
import { Input, Textarea, Select } from '../ui/field'
import { ProductTable, ProductLineDisplay } from '../ui-table/products'

import './settings.pres.scss'
export const BASE_CLASS = `setting-form`
export const FORM_ID    = BASE_CLASS

const customerExample = {
  name: `Customer name`,
  address: `123 6th St.
__Melbourne, FL 32904__
AUSTRALIA`
}
const currencies = [
  {value: `USD`, label: `USD`},
  {value: `EUR`, label: `EUR`},
]
const languages = [
  {value: `fr`, label: `français`},
  {value: `en`, label: `english`},
]

export default function SettingFormPres( props ) {
  const { formData  } = props

  const {
    quotationConfig,
    invoiceConfig,
    productConfig,
  } = formData
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
  const fakeProduct = {
    description: `a *product* example`,
    quantity: 2,
    price: productConfig.price,
  }
  const fakeProducts = [
    fakeProduct,
    productConfig,
  ]

  return (
    <Tabs>
      <TabList>
        <Tab>
          <FormattedMessage id="configuration.tab.from" />
        </Tab>
        <Tab>
          <FormattedMessage id="configuration.tab.default-product" />
        </Tab>
        <Tab>
          <FormattedMessage id="configuration.tab.mentions" />
        </Tab>
        <Tab>
          <FormattedMessage id="configuration.tab.reference" />
        </Tab>
      </TabList>

      {/* USER */}
      <TabPanel>
        <div className={`${BASE_CLASS}__user`}>
          <Select
            name="lang"
            label="field.language"
            value={ formData.lang }
            options={ languages }
          />
          <Select
            name="currency"
            label="field.currency"
            value={ formData.currency }
            options={ currencies }
          />
          <PaperSheet part="top-left">
            <Party title="from" people={formData} />
          </PaperSheet>
          <div className={`${BASE_CLASS}__user-form`}>
            <Input
              name="name"
              label="field.name"
              value={ formData.name }
            />
            <Textarea
              name="address"
              label="field.address"
              value={ formData.address }
            />
          </div>
        </div>
      </TabPanel>

      {/* PRODUCT */}
      <TabPanel>
        <div className={`${BASE_CLASS}__product`}>
          <div className={`${BASE_CLASS}__product-form`}>
            <Textarea
              name="productConfig[description]"
              label="field.description"
              value={ productConfig.description }
            />
            <Input
              name="productConfig[quantity]"
              label="field.quantity"
              type="number"
              value={ productConfig.quantity }
            />
            <Input
              name="quotationConfig[tax]"
              label="field.tax"
              type="number"
              value={ quotationConfig.tax }
            />
          </div>
          <PaperSheet part="center">
            <ProductTable readOnly
              products={ fakeProducts }
              tax={ quotationConfig.tax }
              currency={ formData.currency }
            >
              <ProductLineDisplay
                product={ fakeProduct }
                currency={ formData.currency }
              />
              <ProductLineDisplay
                product={ productConfig }
                currency={ formData.currency }
              />
            </ProductTable>
          </PaperSheet>
        </div>
      </TabPanel>

      {/* MENTIONS */}
      <TabPanel>
        <div className={`${BASE_CLASS}__mentions`}>
          <Textarea
            name="quotationConfig[mentions]"
            label="configuration.mentions.quotations"
            value={ quotationConfig.mentions }
          />
          <PaperSheet part="bottom">
            <Mentions content={ quotationConfig.mentions }/>
          </PaperSheet>
          <Textarea
            name="invoiceConfig[mentions]"
            label="configuration.mentions.invoices"
            value={ invoiceConfig.mentions }
          />
          <PaperSheet part="bottom">
            <Mentions content={ invoiceConfig.mentions }/>
          </PaperSheet>
        </div>
      </TabPanel>

      {/* REFERENCES */}
      <TabPanel>
        <Alert danger>
          <FormattedHTMLMessage id="configuration.reference.warning" />
        </Alert>
        <div className={`${BASE_CLASS}__references`}>
          <dl className={`${BASE_CLASS}__references-section`}>
            <dt className={`${BASE_CLASS}__sub-title`}>
              <FormattedMessage id="page.quotations" />
            </dt>
            <dd className={`${BASE_CLASS}__references-content`}>
              <div className={`${BASE_CLASS}__references-form`}>
                <Input
                  name="quotationConfig[prefix]"
                  label="field.prefix"
                  value={ quotationConfig.prefix }
                />
                <Input
                  name="quotationConfig[startAt]"
                  label="field.start-at"
                  value={ quotationConfig.startAt }
                  type="number"
                  min="0"
                  step="1"
                />
              </div>
              <PaperSheet part="top-right">
                <Reference {...fakeQuotationReference} />
              </PaperSheet>
            </dd>
          </dl>
          <dl className={`${BASE_CLASS}__references-section`}>
            <dt className={`${BASE_CLASS}__sub-title`}>
              <FormattedMessage id="page.invoices" />
            </dt>
            <dd className={`${BASE_CLASS}__references-content`}>
              <div className={`${BASE_CLASS}__references-form`}>
                <Input
                  name="invoiceConfig[prefix]"
                  label="field.prefix"
                  value={ invoiceConfig.prefix }
                />
                <Input
                  name="invoiceConfig[startAt]"
                  label="field.start-at"
                  value={ invoiceConfig.startAt }
                  type="number"
                  min="0"
                  step="1"
                />
              </div>
              <PaperSheet part="top-right">
                <Reference {...fakeInvoiceReference} />
              </PaperSheet>
            </dd>
          </dl>
        </div>
      </TabPanel>

      {/* ACTIONS */}
      <FormActions>
        <Button type="submit">
          <FormattedMessage id="configuration.button.save" />
        </Button>
      </FormActions>
    </Tabs>
  )
}
