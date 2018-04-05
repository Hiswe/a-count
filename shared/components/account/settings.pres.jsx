import React, { Fragment } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import { PaperSheet, Party, Reference, Mentions } from '../layout/paper-sheet.jsx'
import { Form, FormActions } from '../ui/form.jsx'
import { Button } from '../ui/buttons.jsx'
import { Input, Textarea, Select } from '../ui/field.jsx'
import { ProductTable, ProductLine } from '../ui/table-product.jsx'

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

function SettingFormPres( props ) {
  const {
    isSaving,
    intl,
    formData,
    handleFormChange,
    handleSubmit,
  } = props
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
    price: quotationConfig.price,
  }
  const fakeProducts = [
    fakeProduct,
    quotationConfig
  ]

  return (
    <Form
      id={ `${BASE_CLASS}` }
      action={ `/users/${formData.id}` }
      isSaving={ isSaving }
      onChange={ handleFormChange }
      onSubmit={ handleSubmit }
    >
      <input type="hidden" name="id"                  defaultValue={ formData.id } />
      <input type="hidden" name="quotationConfig[id]" defaultValue={ quotationConfig.id } />
      <input type="hidden" name="invoiceConfig[id]"   defaultValue={ invoiceConfig.id } />
      <input type="hidden" name="productConfig[id]"   defaultValue={ productConfig.id } />

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
                label={intl.formatMessage({ id: `field.language` })}
                value={ formData.lang }
              >{ languages.map( c => (
                <option key={ c.value } value={ c.value }>{ c.label }</option>
              ))}
              </Select>
              <Select
                name="currency"
                label={intl.formatMessage({ id: `field.currency` })}
                value={ formData.currency }
              >{ currencies.map( c => (
                <option key={ c.value } value={ c.value }>{ c.label }</option>
              ))}
              </Select>
              <PaperSheet part="top-left">
                <Party title="from" {...formData} />
              </PaperSheet>
              <div className={`${BASE_CLASS}__user-form`}>
                <Input
                  name="name"
                  label={intl.formatMessage({ id: `field.name` })}
                  value={ formData.name }
                />
                <Textarea
                  name="address"
                  label={intl.formatMessage({ id: `field.address` })}
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
                  label={intl.formatMessage({ id: `field.description` })}
                  value={ productConfig.description }
                />
                <Input
                  name="productConfig[quantity]"
                  label={intl.formatMessage({ id: `field.quantity` })}
                  type="number"
                  value={ productConfig.quantity }
                />
                <Input
                  name="quotationConfig[tax]"
                  label={intl.formatMessage({ id: `field.tax` })}
                  type="number"
                  value={ quotationConfig.tax }
                />
              </div>
              <PaperSheet part="center">
                <ProductTable readOnly
                  products={ fakeProducts }
                  tax={ quotationConfig.tax }
                  currency={ quotationConfig.currency }
                >
                  <ProductLine readOnly
                    product={ fakeProduct }
                    currency={ quotationConfig.currency }
                  />
                  <ProductLine readOnly
                    product={ productConfig }
                    currency={ quotationConfig.currency }
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
                label={intl.formatMessage({ id: `configuration.mentions.quotations` })}
                value={ quotationConfig.mentions }
              />
              <PaperSheet part="bottom">
                <Mentions content={ quotationConfig.mentions }/>
              </PaperSheet>
              <Textarea
                name="invoiceConfig[mentions]"
                label={intl.formatMessage({ id: `configuration.mentions.invoices` })}
                value={ invoiceConfig.mentions }
              />
              <PaperSheet part="bottom">
                <Mentions content={ invoiceConfig.mentions }/>
              </PaperSheet>
            </div>
          </TabPanel>

          {/* REFERENCES */}
          <TabPanel>
            <p className={`${BASE_CLASS}__warning`}>
              <FormattedHTMLMessage id="configuration.reference.warning" />
            </p>
            <div className={`${BASE_CLASS}__references`}>
              <dl className={`${BASE_CLASS}__references-section`}>
                <dt className={`${BASE_CLASS}__sub-title`}>
                  <FormattedMessage id="page.quotations" />
                </dt>
                <dd className={`${BASE_CLASS}__references-content`}>
                  <div className={`${BASE_CLASS}__references-form`}>
                    <Input
                      name="quotationConfig[prefix]"
                      label={intl.formatMessage({ id: `field.prefix` })}
                      value={ quotationConfig.prefix }
                    />
                    <Input
                      name="quotationConfig[startAt]"
                      label={intl.formatMessage({ id: `field.start-at` })}
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
                      label={intl.formatMessage({ id: `field.prefix` })}
                      value={ invoiceConfig.prefix }
                    />
                    <Input
                      name="invoiceConfig[startAt]"
                      label={intl.formatMessage({ id: `field.start-at` })}
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
    </Form>
  )
}

export default injectIntl( SettingFormPres )
